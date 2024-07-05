let cityName=document.querySelector('.weather_city')
let dateTime=document.querySelector('.weather_date_time')
let w_forecast=document.querySelector('.weather_forecast')
let w_icon=document.querySelector('.weather_icon')
let w_temperature=document.querySelector('.weather_temperature')
let w_minTem=document.querySelector('.weather_min')
let w_maxTem=document.querySelector('.weather_max')


let W_feelsLike=document.querySelector('.weather_feelsLike')
let W_humidity=document.querySelector('.weather_humidity')
let W_wind=document.querySelector('.weather_wind')
let W_pressure=document.querySelector('.weather_pressure')

let weatherSearch=document.querySelector('.weather_search')

//37492c6dbb6302b7d462b416f8b94361


// actul country name
const getCountryname=(code)=>{
return  new Intl.DisplayNames([code], { type: 'region' }).of(code)
}
// =========getdateTime=========
const getDateTime=(dt)=>{
    const curtDate=new Date(dt*1000)
    console.log(curtDate)
    const Option={
        weekday:"long",
        year:"numeric",
        month:"long",
        day:"numeric",
        hour:"numeric",
        minute:"numeric",
    }
    const foremater=new Intl.DateTimeFormat('en-US',Option);
    const formatDate=foremater.format(curtDate)
    return formatDate
}


let city="Lahore"
// seacrh functionality
weatherSearch.addEventListener('submit',(e)=>{
    e.preventDefault()
    let cityName=document.querySelector('.city_name')
    console.log(cityName.value)
    city=cityName.value
    getWeatherData()
    city=cityName.value
})


const getWeatherData=async()=>{
    const weatherApi= `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=37492c6dbb6302b7d462b416f8b94361`;
    try{
    
        const res=await fetch(weatherApi)
        const Data=await res.json();
        console.log(Data)
        const {main ,name, weather, wind, sys, dt}=Data;

        cityName.innerHTML=`${name},${getCountryname(sys.country)}`
        dateTime.innerHTML=getDateTime(dt);
        w_forecast.innerHTML=weather[0].main;
        w_icon.innerHTML=`<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`;


        w_temperature.innerHTML=`${main.temp}&#176`;
        w_minTem.innerHTML=`Min:${main.temp.toFixed()}&#176`
        w_maxTem.innerHTML=`Max:${main.temp.toFixed()}&#176`

        W_feelsLike.innerHTML=`${main.feels_like.toFixed()}&#176`;
        W_humidity.innerHTML=`${main.humidity.toFixed()}&#176`;
        W_wind.innerHTML=`${wind.deg.toFixed()}&#176`;
        W_pressure.innerHTML=`${main.pressure.toFixed()}&#176`;
        

   
    }catch(error){
        console.log(error)
    }

}

document.body.addEventListener("load",getWeatherData())
