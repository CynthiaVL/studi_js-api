/*
- Récupérer la direction du vent
- Récupérer la vitesse du vent

https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,rain,cloud_cover,wind_speed_10m,wind_direction_10m&timezone=auto
*/

class Weather {
    constructor(latitude, longitude) {
        this.lat = latitude;
        this.long = longitude;
        this.url = '';
        this.init();
    }

    init(){
        this.builUrl();
        this.getWindData();
    }

    builUrl() {
        const baseUrl = 'https://api.open-meteo.com/v1/forecast';
        const lalitude = 'latitude=' + this.lat;
        const longitude = 'longitude=' + this.long;
        const params = ['temperature_2m','is_day','rain','cloud_cover','wind_speed_10m','wind_direction_10m'];
        const paramsStringList = params.join(',')
        const timezone = 'timezone=Europe%2FLondon';
        this.url = `${baseUrl}?${lalitude}&${longitude}&current=${paramsStringList}&${timezone}`
    }

    getWindData() {
        fetch(this.url)
            .then(response => response.json())
            .then((data) => {
                console.log('data', data)
            });
    }

}

export { Weather }