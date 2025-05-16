"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "./App.css";
import "./Going.css";

import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

function GoingOutPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [day, setDay] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showPopup, setShowPopup] = useState(false);

  const apiKey = "74613d23be969520aba795220ef2679b";
  const latitude = -1.2921;
  const longitude = 36.8219;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Could not fetch weather data:", error);
        setError(error);
        setLoading(false);
      }
    };

    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date();
    setDay(daysOfWeek[today.getDay()]);

    fetchWeatherData();
  }, []);

  const getWeatherDescription = () => {
    if (weatherData?.weather?.length > 0) {
      const description = weatherData.weather[0].description.toLowerCase();
      if (description.includes("rain")) return "rainy";
      if (description.includes("cloud")) return "cloudy";
      if (description.includes("clear")) return "clear";
      if (description.includes("snow")) return "snowy";
      return "likely " + description;
    }
    return "";
  };

  const getWeatherIcon = () => {
    if (weatherData?.weather?.length > 0) {
      const iconCode = weatherData.weather[0].icon;
      return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    }
    return "";
  };

  const getItemOptions = () => {
    const weatherCondition = getWeatherDescription();
    if (weatherCondition.includes("rain")) {
      return ["Umbrella", "Raincoat", "Waterproof shoes"];
    } else if (weatherCondition.includes("cloud")) {
      return ["Light jacket", "Sunglasses"];
    } else if (weatherCondition === "clear") {
      return ["Sunglasses", "Sunscreen", "Hat"];
    } else if (weatherCondition.includes("snow")) {
      return ["Heavy coat", "Gloves", "Scarf", "Boots"];
    } else {
      return ["Comfortable shoes", "A good book"];
    }
  };

  const handleItemChange = (item, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    }
  };

  const itemOptions = getItemOptions();
  const totalItems = itemOptions.length;
  const progressValue =
    totalItems > 0 ? (selectedItems.length / totalItems) * 100 : 0;

  useEffect(() => {
    if (progressValue === 100) {
      setShowPopup(true);
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [progressValue]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="going-out-page-container">
          <h1>Headed Out? Here's the weather forecast and what you'll need !!</h1>
          <div className="weather-items-container">
            Loading weather information...
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavBar />
        <div className="going-out-page-container">
          <h1>Headed Out? Here's the weather forecast and what you'll need !!</h1>
          <div className="weather-items-container">
            Error fetching weather data. Please try again later.
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Main UI
  return (
    <>
      <NavBar />
      <div className="going-out-page-container">
        <h1>Headed Out? Here's the weather forecast and what you'll need !!</h1>
        <div className="weather-items-container">
          <div className="weather-info">
            <h2>Today is {day}</h2>
            {weatherData && (
              <div className="current-weather">
                <img
                  src={getWeatherIcon()}
                  alt="Weather Icon"
                  className="weather-icon"
                />
                <p>
                  It is {getWeatherDescription()} with a temperature of{" "}
                  {Math.round(weatherData.main.temp)}°C.
                </p>
              </div>
            )}
          </div>

          <div className="items-to-carry">
            <h3>What's in your backpack ?</h3>
            <ul className="item-list">
              {itemOptions.map((item) => (
                <li key={item} className="flex items-center space-x-2">
                  <Checkbox
                    id={item}
                    checked={selectedItems.includes(item)}
                    onCheckedChange={(checked) =>
                      handleItemChange(item, checked)
                    }
                  />
                  <label
                    htmlFor={item}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="progress-bar-container"
            style={{ width: "100%", marginTop: "20px" }}
          >
            <div className="custom-progress-bar">
              <div className="fill" style={{ width: `${progressValue}%` }} />
            </div>
          </div>

          {showPopup && (
            <div className="popup-message">Now you are all set!</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GoingOutPage;
