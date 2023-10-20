import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

function Main() {
  const [weatherState, setWeatherState] = useState("");
  const [temp, setTemp] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  //const [city, setCity] = useState('');

  const [forecastNight1, setForecastNight1] = useState("");
  const [forecastNight2, setForecastNight2] = useState("");
  const [forecastNight3, setForecastNight3] = useState("");
  const [forecastNight4, setForecastNight4] = useState("");
  const [forecastNight5, setForecastNight5] = useState("");

  const [forecastDay1, setForecastDay1] = useState("");
  const [forecastDay2, setForecastDay2] = useState("");
  const [forecastDay3, setForecastDay3] = useState("");
  const [forecastDay4, setForecastDay4] = useState("");
  const [forecastDay5, setForecastDay5] = useState("");

  const [forecastImageDay1, setForecastImageDay1] = useState("");
  const [forecastImageDay2, setForecastImageDay2] = useState("");
  const [forecastImageDay3, setForecastImageDay3] = useState("");
  const [forecastImageDay4, setForecastImageDay4] = useState("");
  const [forecastImageDay5, setForecastImageDay5] = useState("");

  const [milesPerHour, setMilesPerHour] = useState(0);
  const [humidity, setHumidity] = useState("");
  const [visibility, setVisibility] = useState(0);
  const [airPressure, setAirPressure] = useState(0);

  const [cityName, setCityName] = useState("");
  const [latitude, setLatitude] = useState(47.8409);
  const [longitude, setLongitude] = useState(25.9138);
  let [recentSearches, setRecentSearches] = useState(["Cluj", "Radauti"]);
  const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  const [chosenRecentSearch, setChosenRecentSearch] = useState(false);

  const clear = {
    img: "./images/Clear.png",
    description: "Clear",
  };

  const clouds = {
    img: "./images/HeavyCloud.png",
    description: "Clouds",
  };

  const rain = {
    img: "./images/LightRain.png",
    description: "Rain",
  };

  const thunderstorm = {
    img: "./images/Thunderstorm.png",
    description: "Thuderstorm",
  };

  const drizzle = {
    img: "./images/HeavyRain.png",
    description: "Drizzle",
  };

  const snow = {
    img: "./images/Snow.png",
    description: "Snow",
  };

  //const apiKey5Days = "0fc7a17f5407196edefd20609b52664d";
  const mainApi = "0fc7a17f5407196edefd20609b52664d";

  //const url5Days = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${mainApi}&units=metric&imperial=miles/hour`;
  //const mainUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${mainApi}&units=metric&imperial=miles/hour`;
  //const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${mainApi}`;

  //getData function

  const currentDate = new Date();
  const options = {
    day: "numeric",
    weekday: "short",
    month: "short",
  };

  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  let futureDate = new Date(currentDate);
  futureDate.setDate(currentDate.getDate() + 2);
  futureDate = futureDate.toLocaleDateString(undefined, options);

  let futureDate1 = new Date(currentDate);
  futureDate1.setDate(currentDate.getDate() + 3);
  futureDate1 = futureDate1.toLocaleDateString(undefined, options);

  let futureDate2 = new Date(currentDate);
  futureDate2.setDate(currentDate.getDate() + 4);
  futureDate2 = futureDate2.toLocaleDateString(undefined, options);

  let futureDate3 = new Date(currentDate);
  futureDate3.setDate(currentDate.getDate() + 5);
  futureDate3 = futureDate3.toLocaleDateString(undefined, options);

  let tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);

  let tomorrow1 = new Date(currentDate);
  tomorrow1.setDate(currentDate.getDate() + 2);

  let tomorrow2 = new Date(currentDate);
  tomorrow2.setDate(currentDate.getDate() + 3);

  let tomorrow3 = new Date(currentDate);
  tomorrow3.setDate(currentDate.getDate() + 4);

  let tomorrow4 = new Date(currentDate);
  tomorrow4.setDate(currentDate.getDate() + 5);

  //add recent Searches to array
  const addRecentSearch = (cityName) => {
    setRecentSearches([...recentSearches, cityName]);
  };

  //fetch for desired City

  const getCoords = async () => {
    const cityUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${mainApi}`;
      const res = await fetch(cityUrl);
      const data = await res.json();

      setLatitude(data[0].lat);
      setLongitude(data[0].lon);
      console.log(data[0].lat, data[0].lon);
  };
  


  //function to delete recent searches 
  const deleteRecentSearch = (indexToDelete) => {
    
    setRecentSearches(
      recentSearches.filter((city, index) => {
        return index !== indexToDelete;
      })
    );
    console.log(recentSearches);
  };

  //function to choose from recent searches

  const chooseRecent = (city) => {
   
    console.log(city);
    setCityName(city);
    setChosenRecentSearch(true);
    
    setIsSearchBoxOpen(false);
  }

  const handleForecast = (day, night) => {
    const Year = day.getFullYear();
    const Month = String(day.getMonth() + 1).padStart(2, "0");
    const Day = String(day.getDate()).padStart(2, "0");
    const Time = night;

    const formatted = `${Year}-${Month}-${Day} ${Time}`;

    return formatted;
  };

  const getTomorrowNight = handleForecast(tomorrow, "00:00:00");
  const getTomorrow1Night = handleForecast(tomorrow1, "00:00:00");
  const getTomorrow2Night = handleForecast(tomorrow2, "00:00:00");
  const getTomorrow3Night = handleForecast(tomorrow3, "00:00:00");
  const getTomorrow4Night = handleForecast(tomorrow4, "00:00:00");

  const getTomorrowDay = handleForecast(tomorrow, "12:00:00");
  const getTomorrow1Day = handleForecast(tomorrow1, "12:00:00");
  const getTomorrow2Day = handleForecast(tomorrow2, "12:00:00");
  const getTomorrow3Day = handleForecast(tomorrow3, "12:00:00");
  const getTomorrow4Day = handleForecast(tomorrow4, "12:00:00");

  // fetching the first part
 
    const mainUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${mainApi}&units=metric&imperial=miles/hour`;
    const fetchWeatherData = async () => {
      const response = await fetch(mainUrl);
      const data = await response.json();

      console.log(data);

      // get weather condition image and weather condition

      setWeatherState(
        data.weather[0].main === "Clouds"
          ? clouds.img
          : data.weather[0].main === "Rain"
          ? rain.img
          : data.weather[0].main === "Thuderstorm"
          ? thunderstorm.img
          : data.weather[0].main === "Snow"
          ? snow.img
          : data.weather[0].main === "Drizzle"
          ? drizzle.img
          : data.weather[0].main === "Clear"
          ? clear.img
          : ""
      );

      setWeatherCondition(
        data.weather[0].main === "Clouds"
          ? clouds.description
          : data.weather[0].main === "Rain"
          ? rain.description
          : data.weather[0].main === "Thuderstorm"
          ? thunderstorm.description
          : data.weather[0].main === "Snow"
          ? snow.description
          : data.weather[0].main === "Drizzle"
          ? drizzle.description
          : data.weather[0].main === "Clear"
          ? clear.description
          : ""
      );

      // set temperature condition value
      setTemp(data.main.temp.toFixed(0));
      // set City name
      setCityName(data.name);
      setMilesPerHour(data.wind.speed);
      setHumidity(data.main.humidity);
      setVisibility(((data.visibility / 1000) * 0.621371).toFixed(1));
      setAirPressure(data.main.pressure);
    };
    //fetchWeatherData();
 
  


    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${mainApi}&units=metric&imperial=miles/hour`;
    const getFetch5Days = async () => {
      const res = await fetch(url5Days);
      const data = await res.json();
      //console.log(data);

      data.list.forEach((el) => {
        if (el.dt_txt === getTomorrowNight) {
          setForecastNight1(el.main.temp.toFixed(0));
        }

        if (el.dt_txt === getTomorrow1Night) {
          setForecastNight2(el.main.temp.toFixed(0));
        }

        if (el.dt_txt === getTomorrow2Night) {
          setForecastNight3(el.main.temp.toFixed(0));
        }

        if (el.dt_txt === getTomorrow3Night) {
          setForecastNight4(el.main.temp.toFixed(0));
        }

        if (el.dt_txt === getTomorrow4Night) {
          setForecastNight5(el.main.temp.toFixed(0));
        }
      });

      data.list.forEach((el) => {
        if (el.dt_txt === getTomorrowDay) {
          setForecastDay1(el.main.temp.toFixed(0));
          setForecastImageDay1(
            el.weather[0].main === "Clouds"
              ? clouds.img
              : el.weather[0].main === "Rain"
              ? rain.img
              : el.weather[0].main === "Thuderstorm"
              ? thunderstorm.img
              : el.weather[0].main === "Snow"
              ? snow.img
              : el.weather[0].main === "Drizzle"
              ? drizzle.img
              : el.weather[0].main === "Clear"
              ? clear.img
              : ""
          );
        }

        if (el.dt_txt === getTomorrow1Day) {
          setForecastDay2(el.main.temp.toFixed(0));
          setForecastImageDay2(
            el.weather[0].main === "Clouds"
              ? clouds.img
              : el.weather[0].main === "Rain"
              ? rain.img
              : el.weather[0].main === "Thuderstorm"
              ? thunderstorm.img
              : el.weather[0].main === "Snow"
              ? snow.img
              : el.weather[0].main === "Drizzle"
              ? drizzle.img
              : el.weather[0].main === "Clear"
              ? clear.img
              : ""
          );
        }

        if (el.dt_txt === getTomorrow2Day) {
          setForecastDay3(el.main.temp.toFixed(0));
          setForecastImageDay3(
            el.weather[0].main === "Clouds"
              ? clouds.img
              : el.weather[0].main === "Rain"
              ? rain.img
              : el.weather[0].main === "Thuderstorm"
              ? thunderstorm.img
              : el.weather[0].main === "Snow"
              ? snow.img
              : el.weather[0].main === "Drizzle"
              ? drizzle.img
              : el.weather[0].main === "Clear"
              ? clear.img
              : ""
          );
        }

        if (el.dt_txt === getTomorrow3Day) {
          setForecastDay4(el.main.temp.toFixed(0));
          setForecastImageDay4(
            el.weather[0].main === "Clouds"
              ? clouds.img
              : el.weather[0].main === "Rain"
              ? rain.img
              : el.weather[0].main === "Thuderstorm"
              ? thunderstorm.img
              : el.weather[0].main === "Snow"
              ? snow.img
              : el.weather[0].main === "Drizzle"
              ? drizzle.img
              : el.weather[0].main === "Clear"
              ? clear.img
              : ""
          );
        }

        if (el.dt_txt === getTomorrow4Day) {
          setForecastDay5(el.main.temp.toFixed(0));
          setForecastImageDay5(
            el.weather[0].main === "Clouds"
              ? clouds.img
              : el.weather[0].main === "Rain"
              ? rain.img
              : el.weather[0].main === "Thuderstorm"
              ? thunderstorm.img
              : el.weather[0].main === "Snow"
              ? snow.img
              : el.weather[0].main === "Drizzle"
              ? drizzle.img
              : el.weather[0].main === "Clear"
              ? clear.img
              : ""
          );
        }
      });
    };

   useEffect(() => {
      fetchWeatherData();
      getFetch5Days();
   },[latitude, longitude])
 

  // let filteredArray = [...recentSearches];


  // Use useEffect to watch for changes in chosenRecentSearch
useEffect(() => {
  if (chosenRecentSearch) {
    // When chosenRecentSearch is true, make the API calls
    getCoords();
    setChosenRecentSearch(false); // Reset chosenRecentSearch
  }
}, [chosenRecentSearch]);
 

  return (
    <div>
      <div className="md:flex">

        <div className="md:flex md:w-3/6 color">
        {!isSearchBoxOpen && (
          <>
            {/* first part of the app */}
            <div className="md:w-full md:h-auto md:color">
              <div className="background-image">
                <div>
                  <button
                    onClick={() => {
                      setIsSearchBoxOpen(true);
                    }}
                    className="text-white p-2 bg-slate-500 mt-4 ml-4"
                  >
                    Search for places
                  </button>
                </div>

                <div className="flex flex-col justify-center items-center child">
                  <div className="mt-10 pb-16 md:pb-24">
                    <img src={weatherState} alt="img"></img>
                  </div>

                  <div className="text-white flex flex-col justify-center items-center">
                    <p className=" pb-10 text-8xl md:pb-18">{temp}&deg;C</p>
                    <p className="text-2xl pb-10 md:pb-18">{weatherCondition}</p>
                    <p className="pb-6">Today &#8226; {formattedDate}</p>
                    <div className="flex py-12 gap-3">
                      <p>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </p>
                      <p className="text-2xl">{cityName}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {isSearchBoxOpen && (
          //search by country modal
        
          <div className="color pt-12 px-4 relative w-full">
            <div className=" text-white top-0 right-5 absolute ">
              <p
                className="text-2xl cursor-pointer"
                onClick={() => {
                  
                  setIsSearchBoxOpen(false);
                }}
              >
                x
              </p>
            </div>
            <div>
              <div className="flex gap-4">
                <input
                  className="color border-2 px-6 basis-2/3 text-white outline-none"
                  type="text"
                  placeholder="search location..."
                  
                  onChange={(e) => {
                    setCityName(e.target.value);
                  }}
                ></input>

                <button
                  className="bg-indigo-600 text-white basis-1/3 px-4 py-2 hover:bg-indigo-500"
                  onClick={() => {
                    console.log("mamasita", cityName);
                    addRecentSearch(cityName);
                    getCoords();
                    setIsSearchBoxOpen(false);
                  }}
                >
                  Search
                </button>
              </div>

              <ul className="text-white flex flex-col gap-4 pt-10">
                {recentSearches.map((search, index) => {
                  return (
                    <li onClick={() => {chooseRecent(search)}} className="p-4 hover:border-2 flex items-center justify-between">
                      
                      {search}{" "}
                      <span
                        className="text-red-500 items-center cursor-pointer"
                        onClick={() => (deleteRecentSearch(index))}
                      >
                        X
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        </div>

       
      <div className="flex flex-col md:w-full color">
        {/* second part of the app */}
        <div className="flex flex-wrap gap-4 px-2 text-white justify-center pt-12 custom-color2 md:flex-nowrap md:pb-4 border-none">
          <div className="flex flex-col color w-1/3 items-center outline-none">
            <p className="text-sm pt-4">Tomorrow</p>
            <img src={forecastImageDay1} className="pb-8 w-20 h-28"></img>
            <div className="flex gap-4 justify-center text-sm pb-4">
              <p>{forecastDay1}&deg;C</p>
              <p>{forecastNight1}&deg;C</p>
            </div>
          </div>

          <div className="flex flex-col color w-1/3 items-center">
            <p className="text-sm pt-4">{futureDate}</p>
            <img src={forecastImageDay2} className="pb-8 w-20 h-28"></img>
            <div className="flex gap-4 justify-center text-sm pb-4">
              <p>{forecastDay2}&deg;C</p>
              <p>{forecastNight2}&deg;C</p>
            </div>
          </div>

          <div className="flex flex-col color w-1/3 items-center">
            <p className="text-sm pt-4">{futureDate1}</p>
            <img src={forecastImageDay3} className="w-20 h-28 pb-8"></img>
            <div className="flex  gap-4 justify-center text-sm pb-4">
              <p>{forecastDay3}&deg;C</p>
              <p>{forecastNight3}&deg;C</p>
            </div>
          </div>

          <div className="flex flex-col color w-1/3 items-center">
            <p className="text-sm pt-4">{futureDate2}</p>
            <img src={forecastImageDay4} className="w-20 h-28 pb-8"></img>
            <div className="flex  gap-4 justify-center text-sm pb-4">
              <p>{forecastDay4}&deg;C</p>
              <p>{forecastNight4}&deg;C</p>
            </div>
          </div>

          <div className="flex flex-col color w-1/3 items-center">
            <p className="text-sm pt-4">{futureDate3}</p>
            <img src={forecastImageDay5} className="w-20 h-28 pb-8"></img>
            <div className="flex gap-4 justify-center text-sm pb-4">
              <p>{forecastDay5}&deg;C</p>
              <p>{forecastNight5}&deg;C</p>
            </div>
          </div>
        </div>

        {/* third part of the app */}

        <div className="custom-color2 text-white px-8">
          <p className="py-10 text-xl font-bold">Today's Highlights</p>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col color items-center py-8">
              <p className="mb-4">Wind Status</p>
              <p>
                <span className="text-5xl">{milesPerHour}</span>mph
              </p>
            </div>

            <div className=" flex flex-col color items-center py-8">
              <p className="mb-4">Humidity</p>
              <p className="pb-4">
                <span className="text-5xl">{humidity}</span>%
              </p>
              <progress min="0" max="100" value={humidity}></progress>
            </div>

            <div className="flex flex-col color items-center py-8">
              <p className="mb-4">Visibility</p>
              <p className="text-5xl">{visibility} miles</p>
            </div>

            <div className="flex flex-col color items-center py-8">
              <p className="mb-4">Air Pressure</p>
              <p className="text-5xl">{airPressure} mb</p>
            </div>
          </div>

          <div className="flex pb-16 flex-col relative items-center">
            <p className="absolute bottom-0">
              created by Iulian Caldarescu           
            </p>
          </div>
        </div>

        </div>
      </div>
      

    </div>
  );
}

export default Main;
