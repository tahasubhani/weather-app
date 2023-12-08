let form=document.querySelector('form');
const api_key ='9c9c06ef02c4826ceca66c0e6ea8b22b';
const kelvin_unit = 273.15

//   main structure of api 
form.addEventListener('submit', async function(a){
    a.preventDefault()

    let city_name = document.querySelector('input').value;

    let  api_url =`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}`;

    let res = await fetch(api_url)
    res = await res.json();
    set_date(res);
    set_location(res);
    set_temp(res);
    clouds(res);
    sunrise(res);
    sunset(res);
    humidity(res);
    pressure(res)
    });

    function set_date(res){

        const months_short=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

        let dt = res.dt*1000;
        let date = new Date(dt)

        let month_index = date.getMonth();
        let month =months_short[month_index];
        let current_date =date.getDate();
        let minutes = date.getMinutes();
        let hours = date.getHours();
        let ampm = '';
        
        if(hours >=12){
            hours = hours - 12;
            ampm = 'pm';    
        }else{
            ampm = 'am'   
        };

        let final_date =` ${month} ${current_date}, ${hours}:${minutes}${ampm}`
        let date_span = document.getElementById('date');
        date_span.innerText=final_date;
        
    }
    
    function set_location (res){
        let location = res.name
        let country =res.sys.country
        let  final_location = `${location},${country}`;
        let id =document.getElementById('location');
            id.innerText=final_location;
    };

    function set_temp(res){
        let temp = res.main.temp;
        let temp_in_cel = temp - kelvin_unit;
            temp_in_cel = temp_in_cel.toFixed(0)
            final_temp = `${temp_in_cel}&deg C`    
        let id = document.getElementById('temp')
            id.innerHTML=final_temp
    };

    function clouds(res){
        let clouds = res.main.feels_like;
        let feel_like_cel = clouds - kelvin_unit;
        feel_like_cel = feel_like_cel.toFixed(0);
        let sky = res.weather[0].description
        
        final_clouds = ` FeelsLike ${feel_like_cel}&deg C. ${sky}`;
        let id = document.getElementById('clouds')
        id.innerHTML=final_clouds;
    };

    function humidity(res){
        let humidity = res.main.humidity; 
        final_humidity = `<strong>humidity</strong>:${humidity}`    
        let id =document .getElementById('humidity') 
        id.innerHTML= final_humidity
    };

    function pressure(res){
        let pressure = res.main.pressure; 
        final_pressure = `<strong>pressure</strong>:${pressure}`    
        let id =document.getElementById('pressure') 
        id.innerHTML = final_pressure
        console.log(res)
    };

    function sunrise(res){
        let sun = res.sys.sunrise*1000;
        let date = new Date(sun)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let ampm=""
        if(hours>=12){
            hours = hours-12
            ampm ='am'
        }else{
            ampm ='pm'
        }
        final_sunrise =`<strong>sunrise</strong>: ${hours}:${minutes}${ampm}`;
        let id = document.getElementById('sunrise')
        id.innerHTML=final_sunrise

        
    };
    function sunset(res){
        let sun = res.sys.sunset*1000;
        let date = new Date(sun)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let ampm=""
        if(hours>=12){
            hours = hours-12
            ampm ='am'
        }else{
            ampm ='pm'
        }
        final_sunset =`<strong>sunset</strong>: ${hours}:${minutes}${ampm}`;
        let id = document.getElementById('sunset')
        id.innerHTML=final_sunset
    };

   
    



