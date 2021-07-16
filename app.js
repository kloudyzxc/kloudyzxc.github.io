window.addEventListener("load", ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let dateToday = document.querySelector('.date-day');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            //const proxy = 'http://cors-anywhere.herokuapp.com/';
           // const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
           const api = `https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            //const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=48930bedade24970fe4d3425cefb16dc`
            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //
                    temperatureDegree.textContent = Math.floor((temperature-32)*5/9);
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //
                    setIcons(icon, document.querySelector('.icon'));

                });
        });
    }

    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    dateToday.textContent = date;
    
    
    function setIcons(icon, iconID){
        const skycons = new Skycons ({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }

});


