import React from 'react'
import { useState , useEffect , useReducer , useMemo  } from 'react';
import DatePicker from 'react-datepicker'; 
import "react-datepicker/dist/react-datepicker.css";
import "../style/main.scss";
import icon from './images/icons';

import {formatTime} from './utils/forecast'
import Pagination from './pagination/Pagination';

// Reducer function
const reducer = (state, action) => {
    
    switch (action.type) {
      case 'SET_NEXT_LOCATIONS':
        return action.payload.data;
      case 'SET_SELECTED_FORECAST':
        return state.map((country) =>
        {
            return country.ID === action.payload.ID
            ? 
            { ...country, 
                selected: true,
                forecastToday: action.payload.forecastToday,
            }
            :  { ...country, 
                selected: false,
            } ;
        }
        ) ; 
      case 'SET_WEATHER':
         return state.map((country) =>
            {
            /*   console.log(country.ID);
              console.log(action.payload.ID); */
              return country.ID === action.payload.ID
                ? 
                { ...country, 
                 /*    weather: action.payload.weather, 
                    description: action.payload.description  */
                    name: action.payload.name,
                    temp_c: action.payload.temp_c,
                    temp_f: action.payload.temp_f,
                    localtime: action.payload.localtime,
                    condition: action.payload.condition,
                }
                : country ;
            }
            ) ; 
      default:
        return state;
    }
  };

const AppElements = ({dataLocation , limit , totalCount}) => {
    const [ loading, setLoading ] = useState(false)

    // const [locationList , setLocationList]  = useState(dataLocation); 
    const [dataListState, dispatchDataList] = useReducer(reducer, dataLocation); 
    const [isHideList, setIsHideList] = useState(false); 


    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(limit);

    const selectedViewCities = dataListState.find(city => city?.selected);

    const [searchFilter, setSearchFilter] = useState('');

    // Memoize filtered data to avoid recalculation on every render
  const filteredData = useMemo(() => {
    // return;
    return dataListState.filter(item => 
      item.title.toLowerCase().includes(searchFilter.toLowerCase())
    ); 
  }, [searchFilter, dataListState]);


  // console.log(limit , "limitlimit");
    useEffect(() => {


         const fetchWeatherData = async (country, retries = 2) => {
            const apiKey = '6d558a4ea0de48179a020450240710'; // Replace with your OpenWeather API key
            // action: 'get_jobadder',
            // react_ajax_object.ajax_react
            try {
              const response = await fetch(
                // `${react_ajax_object.ajax_react}?action=get_weather_api&q="${country.latitude},${country.longitude}"`
                `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.latitude},${country.longitude}`
              );
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
      
              const weatherData = await response.json();
              // Dispatch action to set the weather data
              if (weatherData.location) {
                dispatchDataList({
                  type: 'SET_WEATHER',
                  payload: {
                    ID: country.ID,
                    name: weatherData.location.name,
                    temp_c: weatherData.current.temp_c,
                    temp_f: weatherData.current.temp_f,
                    condition: weatherData.current.condition,
                    localtime: weatherData.location.localtime,
                  },
                });
              } else {
                throw new Error('Weather data is not available');
              }
            } catch (error) {
              console.error(`Error fetching weather data for ${country.name}: ${error.message}`);
      
              // Retry logic
              if (retries > 0) {
                console.log(`Retrying for ${country.name}, attempts left: ${retries}`);
                fetchWeatherData(country, retries - 1); // Retry fetching data
              } else {
                // Dispatch action to set error if all retries fail
                dispatch({
                  type: 'SET_ERROR',
                  payload: {
                    ID: country.ID,
                  },
                });
              }
            }
          };
      
          // Initiate fetching weather data for all countries
          const fetchAllWeatherData = async () => {
            await Promise.all(dataListState.map((country) => fetchWeatherData(country)));
          };
      
          fetchAllWeatherData(); 
    }, [currentPage])
    const clickInforCityWeather = async (id) =>{
        setIsHideList(true);

        const apiKey = '6d558a4ea0de48179a020450240710'; // Replace with your OpenWeather API key
        const CitybyID = dataListState.find(city => city?.ID === id);

        /* console.log(CitybyID.longitude);
        console.log(CitybyID.latitude); */
        try {
          const response = await fetch(
            // `${react_ajax_object.ajax_react}?action=get_weather_api&q="${country.latitude},${country.longitude}"`
            `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${CitybyID.latitude},${CitybyID.longitude}`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const weatherData = await response.json();
          // console.log(weatherData);
          // Dispatch action to set the weather data
          if (weatherData.location) {


            dispatchDataList({
                type: 'SET_SELECTED_FORECAST',
                payload: {
                  ID: CitybyID.ID,
                  forecastToday : weatherData?.forecast?.forecastday[0]
                },
              });

          } else {
            throw new Error('Weather data is not available');
          }
        } catch (error) {
          console.error(`Error fetching weather data for ${CitybyID.name}: ${error.message}`);
  
          dispatchDataList({
            type: 'SET_ERROR',
            payload: {
              ID: CitybyID.ID,
            },
          });
        }




       /*  dispatchDataList({
            type: 'SET_SELECTED',
            payload: {
              ID: id,
              selected:true,
            },
          });  */
    }

    const clickBackList = () =>{
        setIsHideList(false);
    }

    const changePage = async (page) => {
		  
     const firstPageIndex = (page - 1) * recordsPerPage;
      const lastPageIndex = firstPageIndex + recordsPerPage;
    
    try {
      const response = await fetch(
        `${react_ajax_object.ajax_react}?action=get_next_list_location&limit=${limit}&page=${page}`
      
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const locationData = await response.json();
     
      // Dispatch action to set the weather data
       if (locationData.length > 0) {
      

        dispatchDataList({
          type: 'SET_NEXT_LOCATIONS',
          payload: {
            data: locationData
          },
        }); 


      } else {
        throw new Error(' data is not available');
      } 
    } catch (error) {
      console.error(`Error fetching weather data for ${CitybyID.name}: ${error.message}`);

     
    }


       setCurrentPage(page);
  
      //  window.scrollTo({ top: 0, behavior: 'smooth' })
    }
   
    




    if (loading) return (
        <>
            Loading...
        </>
    )


    return (
        <>
      {/*   {JSON.stringify(filteredData)} */}
        <input 
        type="text" 
        placeholder="Filter countries"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      {/* {searchFilter} */}
        <div className={"city-information " + (isHideList? "slideshow" : "slidehide")}>
            <span className="back-button"  onClick={clickBackList}> back </span>


          <div className="upper-information">
               <div className="temparature-info rain-chance">
                <div>
                      <h2>
                        {selectedViewCities?.title}
                        
                        </h2>
                        <span className="chance_rain">Chance of rain : { selectedViewCities?.forecastToday.day.daily_chance_of_rain } %</span>
                  </div>
                  <span className="temperature">{selectedViewCities?.temp_c}°c</span>
               </div>


              <div>
                    <div className={("imge_condition condition_code_" + selectedViewCities?.condition?.code)}>

                    </div>
              </div>

              
          </div>
            
         <div className="middle-information">
            <p>
              {selectedViewCities?.excerpt}
            </p>

            <div className="todays-forecast">
                    <h4>Today's Forecast</h4>
                    <div className="hrly-forecast">


                      {/* {JSON.stringify(selectedViewCities?.forecastToday.hour[0].time_epoch)} */}
                     

                     {selectedViewCities?.forecastToday.hour.map((item, index)=>(
                       index < 6 && <div  keydsf={index} className="forecast-time-report condition_hr_code_report_1063">
                               <span>{formatTime(item.time_epoch)}</span>
                               
                      {item?.condition?.code}
                                {
                                    {
                                      1009: <img src={icon.sunnyCloud}/>, 
                                    1180: <img src={icon.sunnyCloud}/>, 
                                    1219: <img src={icon.snow}/>, 
                                    1153: <img src={icon.sunnyCloud}/>,
                                    1063: <img src={icon.sunnyCloud}/>,
                                    1183: <img src={icon.rainy}/>,
                                    1189: <img src={icon.rainy}/>,
                                    1030: <img src={icon.fog}/>,
                                    1198: <img src={icon.snow}/>,
                                    1225: <img src={icon.snow}/>,
                                    1000: <img src={icon.nightClear}/>,
                                    1003: <img src={icon.sunnyCloud}/>
                                    }[item?.condition?.code]
                                }

                              <span className="temperature">{item.temp_c}°c</span> 
                        </div>
                      )) }
                      
                    </div>
            </div>
         </div>

        
       </div>
      
       <div className={"city-list " + (isHideList? "animate-hide" : "animate-show")}>
            {filteredData.map(item =>(
                
                <div className={"city-card " + ("condition_code_" + item?.condition?.code) } 
                onClick={() => clickInforCityWeather(item.ID)}>
                   {/*  {JSON.stringify(item)} */}
                        <h2 className="city-name">{item.title}</h2>
                        {/* <p className="temperature">Temperature: 25°C</p> */}

                        <div className="bottom-temp">
                             <p className="temperature_all">{item.temp_f}°f / {item.temp_c}°c </p>
                             <p className="temperature">{item.temp_c}°c</p>

                            {
                                {
                                1219: "Snow",
                                1009: "Cloudy",
                                1153: "Cloudy",
                                1063: "Cloudy",
                                1183: "Rain",
                                1189: "Rain",
                                1030: "Fog",
                                1198: "Snow",
                                1225: "Snow",
                                1000: "Clear",
                                1180: "Cloudy", 
                                1003: "Cloudy"
                                }[item?.condition?.code]
                            }
                        </div>
                       
                </div>
            ))}
           
          
        </div>


        <Pagination
            className={"pagination-item " + (isHideList? "animate-hide" : "animate-show")}
            currentPage={currentPage}
            totalCount={totalCount}
            pageSize={limit}
            onPageChange={page => {changePage(page)}}
          />


           
        

       
          

       
       
         
        </>
     );
}

export default AppElements;