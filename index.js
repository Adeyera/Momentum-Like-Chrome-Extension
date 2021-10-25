// Getting the session whether morning or afternoon

const date = new Date();
let hours = date.getHours();
let message =
  hours < 12 ? "Good Morning" : hours < 18 ? "Good Afternoon" : "Good Evening";
function randomValue() {
  let random = Math.round(Math.random()*100)
  return random
}


function search() {
  const inputValue = document.getElementById("input").value;
  console.log(inputValue);
  if (inputValue !== "") {
    window.location = "https://www.google.com/search?q=" + inputValue;
    }
}
function pressEnter() {
  input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("searchIcon").click();
  }
});
}
// To get Unsplash background image
function fetchUnsplash() {
  fetch(
    `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${message}`
  )
    .then((res) => res.json())
    .then((data) => {
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
      document.getElementById("author").textContent = `By: ${data.user.name}`;
    })
    .catch((err) => {
      // Use a default background image/author
      document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080
      )`;
      document.getElementById("author").textContent = `By: Dodi Achmad`;
    });
}

function fetchBitcoin() {
  fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
    .then((res) => {
      if (!res.ok) {
        throw Error("Something went wrong");
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById("crypto-top").innerHTML = `
            
            <h2>${data.name}</h2>
        `;
      document.getElementById("crypto").innerHTML += `
            <div>
            <p>Current = $${data.market_data.current_price.usd}</p>
            <p>Up = $${data.market_data.high_24h.usd}</p>
            <p>Down = $${data.market_data.low_24h.usd}</p>
            </div>
        `;
    })
    .catch((err) => console.error(err));
}

function getCurrentTime() {
  document.getElementById("greeting--session").textContent = message;
  let liveDate = date.toLocaleTimeString("en-us", { timeStyle: "short" });
  document.getElementById("time").textContent = liveDate;
}
// let quoteId = 0;

function updateQuoteId(data) {
  let quoteId = randomValue()
  console.log(quoteId)
  let quote = data[quoteId].text;
  document.getElementById(
    "quote"
  ).innerHTML = `<blockquote> ${quote} </blockquote>`;
  console.log(quoteId);
}

function getNewQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      if (!response.ok) {
        throw Error("Something wen wrong with quote");
      }
      return response.json();
    })
    .then(function (data) {
      updateQuoteId(data);
    })
    .catch((err) => console.error(err));
}

// Get location
function getWeatherLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    fetch(
      `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Weather data not available");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
            <div class="cloud"> <i class='bx bx-cloud'></i></div>
            
            <div class="weather-info">
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-town">${data.name}</p>
            </div>
            
            `;
      })
      .catch((err) => console.error(err));
  });
}

// Main Function

// Morning afternoon or evening
fetchUnsplash(); // Background image
fetchBitcoin(); // Bitcoin data
getCurrentTime(); // Current time
getWeatherLocation();
getNewQuote(); // New Quote
setInterval(getNewQuote, 5000); // Get new quote every 5 seconds
setInterval(getCurrentTime, 1000); // Update Time every 1 second
pressEnter()