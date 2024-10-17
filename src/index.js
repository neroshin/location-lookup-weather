import { render } from "@wordpress/element";
import AppElements from "./components/location-wheather-element";
var appIntegration = document.getElementsByClassName("listing-location-weather");

if (appIntegration !== null) {

  Array.from(appIntegration).forEach(function (e) {
    const preElement = e.querySelector("pre") ?? "";
    const textContent = preElement.textContent.trim() ?? [];
    const JSONdata = JSON.parse(textContent);
   
    const limit = e.getAttribute('limit') !== null ? e.getAttribute('limit') : 5;
    const total = e.getAttribute('totalcount') !== null ? e.getAttribute('totalcount') : 0;
    // console.log(JSONdata, "appIntegration");
    render(  <AppElements dataLocation={JSONdata} limit={limit} totalCount={total}/>, e);
  })

  

  
}