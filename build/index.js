/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/images/icons.jsx":
/*!*****************************************!*\
  !*** ./src/components/images/icons.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _images_icons_fog_removebg_icon_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../images/icons/fog-removebg-icon.png */ "./src/images/icons/fog-removebg-icon.png");
/* harmony import */ var _images_icons_night_clear_removebg_icon_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/icons/night_clear-removebg-icon.png */ "./src/images/icons/night_clear-removebg-icon.png");
/* harmony import */ var _images_icons_night_cloudy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/icons/night_cloudy-removebg-icon.png */ "./src/images/icons/night_cloudy-removebg-icon.png");
/* harmony import */ var _images_icons_rainy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/icons/rainy-removebg-icon.png */ "./src/images/icons/rainy-removebg-icon.png");
/* harmony import */ var _images_icons_snow_removebg_icon_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/icons/snow-removebg-icon.png */ "./src/images/icons/snow-removebg-icon.png");
/* harmony import */ var _images_icons_storm_removebg_icon_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../images/icons/storm-removebg-icon.png */ "./src/images/icons/storm-removebg-icon.png");
/* harmony import */ var _images_icons_sunny_cloudy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../images/icons/sunny_cloudy-removebg-icon.png */ "./src/images/icons/sunny_cloudy-removebg-icon.png");
/* harmony import */ var _images_icons_sunny_removebg_icon_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../images/icons/sunny-removebg-icon.png */ "./src/images/icons/sunny-removebg-icon.png");









// images/icons.js
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  fog: _images_icons_fog_removebg_icon_png__WEBPACK_IMPORTED_MODULE_0__,
  nightClear: _images_icons_night_clear_removebg_icon_png__WEBPACK_IMPORTED_MODULE_1__,
  nigthCloudy: _images_icons_night_cloudy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_2__,
  rainy: _images_icons_rainy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_3__,
  snow: _images_icons_snow_removebg_icon_png__WEBPACK_IMPORTED_MODULE_4__,
  storm: _images_icons_storm_removebg_icon_png__WEBPACK_IMPORTED_MODULE_5__,
  sunny: _images_icons_sunny_removebg_icon_png__WEBPACK_IMPORTED_MODULE_7__,
  sunnyCloud: _images_icons_sunny_cloudy_removebg_icon_png__WEBPACK_IMPORTED_MODULE_6__
});

// Importing

/***/ }),

/***/ "./src/components/location-wheather-element.jsx":
/*!******************************************************!*\
  !*** ./src/components/location-wheather-element.jsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_datepicker_dist_react_datepicker_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-datepicker/dist/react-datepicker.css */ "./node_modules/react-datepicker/dist/react-datepicker.css");
/* harmony import */ var _style_main_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../style/main.scss */ "./src/style/main.scss");
/* harmony import */ var _images_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/icons */ "./src/components/images/icons.jsx");
/* harmony import */ var _utils_forecast__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/forecast */ "./src/components/utils/forecast.jsx");
/* harmony import */ var _pagination_Pagination__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pagination/Pagination */ "./src/components/pagination/Pagination.js");










// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEXT_LOCATIONS':
      return action.payload.data;
    case 'SET_SELECTED_FORECAST':
      return state.map(country => {
        return country.ID === action.payload.ID ? {
          ...country,
          selected: true,
          forecastToday: action.payload.forecastToday
        } : {
          ...country,
          selected: false
        };
      });
    case 'SET_WEATHER':
      return state.map(country => {
        /*   console.log(country.ID);
          console.log(action.payload.ID); */
        return country.ID === action.payload.ID ? {
          ...country,
          /*    weather: action.payload.weather, 
             description: action.payload.description  */
          name: action.payload.name,
          temp_c: action.payload.temp_c,
          temp_f: action.payload.temp_f,
          localtime: action.payload.localtime,
          condition: action.payload.condition
        } : country;
      });
    default:
      return state;
  }
};
const AppElements = ({
  dataLocation,
  limit,
  totalCount
}) => {
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);

  // const [locationList , setLocationList]  = useState(dataLocation); 
  const [dataListState, dispatchDataList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useReducer)(reducer, dataLocation);
  const [isHideList, setIsHideList] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [currentPage, setCurrentPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [recordsPerPage] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(limit);
  const selectedViewCities = dataListState.find(city => city?.selected);
  const [searchFilter, setSearchFilter] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Memoize filtered data to avoid recalculation on every render
  const filteredData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    // return;
    return dataListState.filter(item => item.title.toLowerCase().includes(searchFilter.toLowerCase()));
  }, [searchFilter, dataListState]);

  // console.log(limit , "limitlimit");
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const fetchWeatherData = async (country, retries = 2) => {
      const apiKey = '6d558a4ea0de48179a020450240710'; // Replace with your OpenWeather API key
      // action: 'get_jobadder',
      // react_ajax_object.ajax_react
      try {
        const response = await fetch(
        // `${react_ajax_object.ajax_react}?action=get_weather_api&q="${country.latitude},${country.longitude}"`
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.latitude},${country.longitude}`);
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
              localtime: weatherData.location.localtime
            }
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
              ID: country.ID
            }
          });
        }
      }
    };

    // Initiate fetching weather data for all countries
    const fetchAllWeatherData = async () => {
      await Promise.all(dataListState.map(country => fetchWeatherData(country)));
    };
    fetchAllWeatherData();
  }, [currentPage]);
  const clickInforCityWeather = async id => {
    setIsHideList(true);
    const apiKey = '6d558a4ea0de48179a020450240710'; // Replace with your OpenWeather API key
    const CitybyID = dataListState.find(city => city?.ID === id);

    /* console.log(CitybyID.longitude);
    console.log(CitybyID.latitude); */
    try {
      const response = await fetch(
      // `${react_ajax_object.ajax_react}?action=get_weather_api&q="${country.latitude},${country.longitude}"`
      `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${CitybyID.latitude},${CitybyID.longitude}`);
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
            forecastToday: weatherData?.forecast?.forecastday[0]
          }
        });
      } else {
        throw new Error('Weather data is not available');
      }
    } catch (error) {
      console.error(`Error fetching weather data for ${CitybyID.name}: ${error.message}`);
      dispatchDataList({
        type: 'SET_ERROR',
        payload: {
          ID: CitybyID.ID
        }
      });
    }

    /*  dispatchDataList({
         type: 'SET_SELECTED',
         payload: {
           ID: id,
           selected:true,
         },
       });  */
  };
  const clickBackList = () => {
    setIsHideList(false);
  };
  const changePage = async page => {
    const firstPageIndex = (page - 1) * recordsPerPage;
    const lastPageIndex = firstPageIndex + recordsPerPage;
    try {
      const response = await fetch(`${react_ajax_object.ajax_react}?action=get_next_list_location&limit=${limit}&page=${page}`);
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
          }
        });
      } else {
        throw new Error(' data is not available');
      }
    } catch (error) {
      console.error(`Error fetching weather data for ${CitybyID.name}: ${error.message}`);
    }
    setCurrentPage(page);

    //  window.scrollTo({ top: 0, behavior: 'smooth' })
  };
  if (loading) return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, "Loading...");
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "text",
    placeholder: "Filter countries",
    value: searchFilter,
    onChange: e => setSearchFilter(e.target.value)
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "city-information " + (isHideList ? "slideshow" : "slidehide")
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "back-button",
    onClick: clickBackList
  }, " back "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "upper-information"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "temparature-info rain-chance"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", null, selectedViewCities?.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "chance_rain"
  }, "Chance of rain : ", selectedViewCities?.forecastToday.day.daily_chance_of_rain, " %")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "temperature"
  }, selectedViewCities?.temp_c, "\xB0c")), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "imge_condition condition_code_" + selectedViewCities?.condition?.code
  }))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "middle-information"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, selectedViewCities?.excerpt), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "todays-forecast"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h4", null, "Today's Forecast"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "hrly-forecast"
  }, selectedViewCities?.forecastToday.hour.map((item, index) => index < 6 && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    keydsf: index,
    className: "forecast-time-report condition_hr_code_report_1063"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_utils_forecast__WEBPACK_IMPORTED_MODULE_4__.formatTime)(item.time_epoch)), item?.condition?.code, {
    1009: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].sunnyCloud
    }),
    1180: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].sunnyCloud
    }),
    1219: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].snow
    }),
    1153: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].sunnyCloud
    }),
    1063: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].sunnyCloud
    }),
    1183: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].rainy
    }),
    1189: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].rainy
    }),
    1030: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].fog
    }),
    1198: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].snow
    }),
    1225: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].snow
    }),
    1000: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].nightClear
    }),
    1003: (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: _images_icons__WEBPACK_IMPORTED_MODULE_3__["default"].sunnyCloud
    })
  }[item?.condition?.code], (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "temperature"
  }, item.temp_c, "\xB0c"))))))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "city-list " + (isHideList ? "animate-hide" : "animate-show")
  }, filteredData.map(item => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "city-card " + ("condition_code_" + item?.condition?.code),
    onClick: () => clickInforCityWeather(item.ID)
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("h2", {
    className: "city-name"
  }, item.title), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bottom-temp"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "temperature_all"
  }, item.temp_f, "\xB0f / ", item.temp_c, "\xB0c "), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "temperature"
  }, item.temp_c, "\xB0c"), {
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
  }[item?.condition?.code])))), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_pagination_Pagination__WEBPACK_IMPORTED_MODULE_5__["default"], {
    className: "pagination-item " + (isHideList ? "animate-hide" : "animate-show"),
    currentPage: currentPage,
    totalCount: totalCount,
    pageSize: limit,
    onPageChange: page => {
      changePage(page);
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppElements);

/***/ }),

/***/ "./src/components/pagination/Pagination.js":
/*!*************************************************!*\
  !*** ./src/components/pagination/Pagination.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _usePagination__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./usePagination */ "./src/components/pagination/usePagination.js");
/* harmony import */ var _pagination_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pagination.scss */ "./src/components/pagination/pagination.scss");





const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;
  const paginationRange = (0,_usePagination__WEBPACK_IMPORTED_MODULE_2__.usePagination)({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    // console.log(currentPage === lastPage)
    if (currentPage === lastPage) return;
    onPageChange(currentPage + 1);
  };
  const onPrevious = () => {
    console.log(currentPage);
    if (currentPage <= 1) return;
    onPageChange(currentPage - 1);
  };
  let lastPage = paginationRange[paginationRange.length - 1];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("ul", {
    // className={classnames('pagination-container', { [className]: className })}
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('pagination', {
      [className]: className
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('page-item', {
      disabled: currentPage === 1
    }),
    onClick: onPrevious
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "page-link",
    href: "javascript:void(0)",
    "aria-label": "Previous"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\xAB"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sr-only"
  }, "Previous"))), paginationRange.map(pageNumber => {
    if (pageNumber === _usePagination__WEBPACK_IMPORTED_MODULE_2__.DOTS) {
      return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
        className: "page-item dots"
      }, "\u2026");
    }
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
      className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('page-item', {
        selected: pageNumber === currentPage
      }),
      onClick: () => onPageChange(pageNumber)
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      className: "page-link",
      href: "javascript:void(0)"
    }, pageNumber));
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("li", {
    className: classnames__WEBPACK_IMPORTED_MODULE_1___default()('page-item', {
      disabled: currentPage === lastPage
    }),
    onClick: onNext
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    className: "page-link",
    href: "javascript:void(0)",
    "aria-label": "Next"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    "aria-hidden": "true"
  }, "\xBB"), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", {
    className: "sr-only"
  }, "Next"))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Pagination);

/***/ }),

/***/ "./src/components/pagination/usePagination.js":
/*!****************************************************!*\
  !*** ./src/components/pagination/usePagination.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOTS: () => (/* binding */ DOTS),
/* harmony export */   usePagination: () => (/* binding */ usePagination)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const DOTS = '...';
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({
    length
  }, (_, idx) => idx + start);
};
const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);
  return paginationRange;
};

/***/ }),

/***/ "./src/components/utils/forecast.jsx":
/*!*******************************************!*\
  !*** ./src/components/utils/forecast.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateChanceOfRain: () => (/* binding */ calculateChanceOfRain),
/* harmony export */   formatTime: () => (/* binding */ formatTime)
/* harmony export */ });
// myFunctions.js
function calculateChanceOfRain(humidity, cloudCoverage, precipMm) {
  // Define the weights for each factor
  const humidityWeight = 0.4;
  const cloudWeight = 0.3;
  const precipWeight = 0.3;

  // Normalize the precipitation (assuming that 1mm or more strongly indicates rain)
  const precipFactor = Math.min(precipMm, 1) / 1;

  // Calculate the chance of rain
  const chanceOfRain = (humidity / 100 * humidityWeight + cloudCoverage / 100 * cloudWeight + precipFactor * precipWeight) * 100; // Convert to percentage

  return chanceOfRain;
}

// myFunctions.js
function formatTime(epochTime) {
  const date = new Date(epochTime * 1000); // Multiply by 1000 to convert to milliseconds
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/***/ }),

/***/ "./node_modules/react-datepicker/dist/react-datepicker.css":
/*!*****************************************************************!*\
  !*** ./node_modules/react-datepicker/dist/react-datepicker.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/components/pagination/pagination.scss":
/*!***************************************************!*\
  !*** ./src/components/pagination/pagination.scss ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/style/main.scss":
/*!*****************************!*\
  !*** ./src/style/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/images/icons/fog-removebg-icon.png":
/*!************************************************!*\
  !*** ./src/images/icons/fog-removebg-icon.png ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/fog-removebg-icon.c1300c6c.png";

/***/ }),

/***/ "./src/images/icons/night_clear-removebg-icon.png":
/*!********************************************************!*\
  !*** ./src/images/icons/night_clear-removebg-icon.png ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/night_clear-removebg-icon.32a50bc7.png";

/***/ }),

/***/ "./src/images/icons/night_cloudy-removebg-icon.png":
/*!*********************************************************!*\
  !*** ./src/images/icons/night_cloudy-removebg-icon.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/night_cloudy-removebg-icon.63ceb2d3.png";

/***/ }),

/***/ "./src/images/icons/rainy-removebg-icon.png":
/*!**************************************************!*\
  !*** ./src/images/icons/rainy-removebg-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/rainy-removebg-icon.49a38f89.png";

/***/ }),

/***/ "./src/images/icons/snow-removebg-icon.png":
/*!*************************************************!*\
  !*** ./src/images/icons/snow-removebg-icon.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/snow-removebg-icon.d9e2ed09.png";

/***/ }),

/***/ "./src/images/icons/storm-removebg-icon.png":
/*!**************************************************!*\
  !*** ./src/images/icons/storm-removebg-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/storm-removebg-icon.cb2991d1.png";

/***/ }),

/***/ "./src/images/icons/sunny-removebg-icon.png":
/*!**************************************************!*\
  !*** ./src/images/icons/sunny-removebg-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/sunny-removebg-icon.61a3cdd7.png";

/***/ }),

/***/ "./src/images/icons/sunny_cloudy-removebg-icon.png":
/*!*********************************************************!*\
  !*** ./src/images/icons/sunny_cloudy-removebg-icon.png ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "images/sunny_cloudy-removebg-icon.b59b17ab.png";

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = window["wp"]["element"];

/***/ }),

/***/ "./node_modules/classnames/index.js":
/*!******************************************!*\
  !*** ./node_modules/classnames/index.js ***!
  \******************************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = '';

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (arg) {
				classes = appendClass(classes, parseValue(arg));
			}
		}

		return classes;
	}

	function parseValue (arg) {
		if (typeof arg === 'string' || typeof arg === 'number') {
			return arg;
		}

		if (typeof arg !== 'object') {
			return '';
		}

		if (Array.isArray(arg)) {
			return classNames.apply(null, arg);
		}

		if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes('[native code]')) {
			return arg.toString();
		}

		var classes = '';

		for (var key in arg) {
			if (hasOwn.call(arg, key) && arg[key]) {
				classes = appendClass(classes, key);
			}
		}

		return classes;
	}

	function appendClass (value, newClass) {
		if (!newClass) {
			return value;
		}
	
		if (value) {
			return value + ' ' + newClass;
		}
	
		return value + newClass;
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_location_wheather_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/location-wheather-element */ "./src/components/location-wheather-element.jsx");



var appIntegration = document.getElementsByClassName("listing-location-weather");
if (appIntegration !== null) {
  Array.from(appIntegration).forEach(function (e) {
    var _e$querySelector, _preElement$textConte;
    const preElement = (_e$querySelector = e.querySelector("pre")) !== null && _e$querySelector !== void 0 ? _e$querySelector : "";
    const textContent = (_preElement$textConte = preElement.textContent.trim()) !== null && _preElement$textConte !== void 0 ? _preElement$textConte : [];
    const JSONdata = JSON.parse(textContent);
    const limit = e.getAttribute('limit') !== null ? e.getAttribute('limit') : 5;
    const total = e.getAttribute('totalcount') !== null ? e.getAttribute('totalcount') : 0;
    // console.log(JSONdata, "appIntegration");
    (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.render)((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_location_wheather_element__WEBPACK_IMPORTED_MODULE_2__["default"], {
      dataLocation: JSONdata,
      limit: limit,
      totalCount: total
    }), e);
  });
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map