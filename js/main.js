async function getDate(loc) {
  let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=05a13b4ed9f64aa98bd134549240301&q=${loc}&days=3`)
  let finalres = await response.json()
  displayToDay(finalres.location , finalres.current), displayDays(finalres.forecast.forecastday);
}

getDate('cairo')

document.getElementById('search').addEventListener('keyup' , function (a){
  getDate(a.target.value)
})

const days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month =["January","February","March","April","May","June","July","August","September","October","November","December"];


function displayToDay(x , y) {
  let z = new Date(y.last_updated) ;
  let cartoona = `
  <div class="today forecast">
    <div class="forecast-header d-flex justify-content-between align-items-center" id="today">
      <div class="day">${days[z.getDay()]}</div>
      <div class="date">${z.getDate() + month[z.getMonth()]}</div>
    </div>
    <div class="forecast-content">
      <div class="location">${x.name}</div>
      <div class="degree d-flex justify-content-between align-items-center">
        <div class="num">${y.temp_c}<sup>o</sup>C</div>
        <div class="forecast-icon">
          <img src="https:${y.condition.icon}" width="90" alt="">
        </div>
      </div>
      <div class="custom">${y.condition.text}</div>
      <span><i class="fa-solid fa-umbrella"></i> 20%</span>
      <span><i class="fa-solid fa-wind"></i> 18km/h</span>
      <span><i class="fa-regular fa-compass"></i> East</span>
    </div>
  </div>
  `
  document.getElementById("forecast").innerHTML = cartoona ;
}

function displayDays (x) {
  let cartoona = ``;
  for (let i = 1; i < x.length ; i++) {
    cartoona += `
    <div class="forecast">
    <div class="forecast-header">
      <div>${days[new Date(x[i].date).getDay()]}</div>
    </div>
    <div class="forecast-content">
      <div class="foresact-icon">
        <img src="https:${x[i].day.condition.icon}" width="48" alt="" />
      </div>
      <div class="degree">${x[i].day.maxtemp_c}<sup>o</sup>C</div>
      <small>${x[i].day.mintemp_c}<sup>o</sup></small>
      <div class="custom">${x[i].day.condition.text}</div>
    </div>
  </div>`
  }
  document.getElementById("forecast").innerHTML += cartoona;
}
