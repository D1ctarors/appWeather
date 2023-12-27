"use strict";

window.addEventListener("load", () => {
  document.querySelector("body").classList.add("loaded");
});

window.addEventListener("DOMContentLoaded", () => {
  const apiKey = "188c212bb30c0a673685a9e0f3081e23";

  const wrapper = document.querySelector(".wrapper"),
    header = document.querySelector(".header"),
    main = document.querySelector(".main"),
    footer = document.querySelector(".footer"),
    searchForm = document.querySelector("#search-form"),
    inputValueForm = searchForm.querySelector("input");

  function getLocation() {
    return inputValueForm.value;
  }

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const location = getLocation();

    console.log(`Смотрим на погоду в ${location}`);
    getData(location);
  });

  function getData(location) {
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=ru&appid=${apiKey}`
    );

    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        let data = JSON.parse(this.responseText);
        console.log(data);

        renderPage(data);
        insertProperties(data);
      } else {
        console.log("Город не найден!");
      }
    };

    request.send();
  }

  function currentDay() {
    let currentDate = new Date();

    // Определение дней недели и месяцев
    let daysOfWeek = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];
    let months = [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "Октября",
      "Ноября",
      "Декабря",
    ];

    // Получаем номер дня недели, номер дня в месяце и номер месяца
    let dayOfWeek = currentDate.getDay();
    let dayOfMonth = currentDate.getDate();
    let month = currentDate.getMonth();

    // Форматируем вывод
    let formattedDate =
      daysOfWeek[dayOfWeek] + ", " + dayOfMonth + " " + months[month];

    return formattedDate;
  }

  function renderPage(data) {
    let city = document.querySelector(".header__city");
    let date = document.querySelector(".header__date");
    let weatherIcon = document.querySelector(".info__icon");
    let temp = document.querySelector(".info__temp");
    let weatherStatus = document.querySelector(".info__status");

    city.innerHTML = data.name;
    date.innerHTML = currentDay();
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="">`;
    temp.innerHTML = Math.round(data.main.temp);
    weatherStatus.innerHTML = data.weather[0].description;
  }

  function insertProperties(data) {
    let propertiesWrap = document.querySelector(".info-list");

    propertiesWrap.innerHTML = "";

    let propertiesData = {
      feelings: {
        status: "Ощущения",
        icon: '<i class="fa-solid fa-align-center" style="color: #000000;"></i>',
        value: `${Math.round(data.main.feels_like)} <sup>o</sup>`,
      },
      windSpeed: {
        status: "Скорость ветра",
        icon: '<i class="fa-solid fa-wind" style="color: #000000;"></i>',
        value: `${Math.round(data.wind.speed)} м/c`,
      },
      humidity: {
        status: "Влажность",
        icon: '<i class="fa-solid fa-droplet" style="color: #000000;"></i>',
        value: `${data.main.humidity} %`,
      },
      cloudcover: {
        status: "Облачность",
        icon: '<i class="fa-brands fa-cloudversify" style="color: #000000;"></i>',
        value: `${data.clouds.all} %`,
      },
      visibility: {
        status: "Видимость",
        icon: '<i class="fa-solid fa-eye" style="color: #000000;"></i>',
        value: `${data.visibility / 100} %`,
      },
    };

    Object.keys(propertiesData).forEach(function (key) {
      let item = `<li class="info-list__inner">
              <div>
                <div class="inner__image">${propertiesData[key].icon}</div>
                <div class="inner__status">${propertiesData[key].status}</div>
              </div>
              <div class="inner__date">${propertiesData[key].value}</div>
            </li>`;

      propertiesWrap.innerHTML += item;
    });
  }

  //   let location = document.querySelector(".header__city"),
  //     nowDate = document.querySelector(".header__date");

  //   function createItem(data) {
  //     let item = `<div class="farecast__item item">
  //                       <div class="item__date">${data.date}</div>
  //                       <div class="item__icon"><img src="${data.icon}" alt=""></div>
  //                       <div class="item__temp">${data.temp}<sup>o</sup></div>
  //                   </div>`;
  //     return item;
  //   }

  //   function insertItem() {
  //     for (let i = 0; i < DB.length; i++) {
  //       let item = createItem(DB[i]);
  //       forecastWrap.innerHTML += item;
  //     }
  //   }

  //   insertItem();
});
