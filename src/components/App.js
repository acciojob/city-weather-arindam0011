import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [city, setCity] = useState("");
  const [apiData, setApiData] = useState(null);
  const[apiCity, setApiCity] = useState("");
 
  useEffect(() => {
    const getData = async () => {
      if (apiCity) {
        try {
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=03848967c30bc88033d0f78a2df95495`);
          const data = await res.json();
           // Log data to see its structure
          if (data.cod === 200) {
            setApiData(data);
            setApiCity(city)
            setCity(""); 
          } else {
            setApiData(null);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setApiData(null);
        }
      }
    };
    getData();
  }, [apiCity]);

  const toFahrenheit = (temp) => {
    return parseInt((temp - 273.15) * 9 / 5 + 32);
  };

  return (
    <div className="App" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", 
      height: "100vh", width: "100vw", padding: "10px"}}>

 
    <div id="main" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", 
      height: "400px", width: "400px", backgroundColor: "lightgray", borderRadius: "10px", padding: "10px"
     }}>
      <input
      className="search"
      style={{ marginBottom: "10px" , padding: "10px", borderRadius: "10px", width: "300px", border: "none", outline: "none"}}
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && setApiCity(city)}
      />
      {apiData && apiData.main ? (  
        <div id="data" className="weather" >
          <h1 id="city">{apiData.name}</h1>
          <h2 id="temp">{toFahrenheit(apiData.main.temp)}°F</h2>
          <p id="desc">{apiData.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      ) : (
        apiCity && <p>No data available for the city!</p>
      )}
    </div>
    </div>
  );
};

export default App;
