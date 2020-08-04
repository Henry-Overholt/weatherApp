import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from './../services/open-weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  today: any = new Date();
  dayOfWeek: string = this.openWeatherService.day;
  temperature: number;
  currentWeather: any;
  feelsLike: number;
  weatherConditionIcon: string;
  weatherConditionDescription: string;
  cityName: string;
  stateName: string;
  zipcode: string = '48073';
  windSpeed: any;
  windDirection: number;
  minutes: object[];
  rainingInfo: string;
  latitude: number;
  longitude: number;
  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        // this.openWeatherService.setLocation(
        //   pos.coords.latitude,
        //   pos.coords.longitude
        // );
        this.getOneCallWeather(pos.coords.latitude, pos.coords.longitude);
        this.getWeatherCityName(pos.coords.latitude, pos.coords.longitude);
        this.latitude = pos.coords.latitude;
        this.longitude = pos.coords.longitude;
        console.log('HOME COMPONENT ~ here');
      });
    } else {
      this.getOneCallWeather(43.331429, -83.045753);
      this.getWeatherCityName(43.331429, -83.045753);
      this.latitude = 43.331429;
      this.longitude = -83.045753;
      console.log('HOME COMPONENT not here');
    }

    this.updateWeather();

    // this.getWeather(this.zipcode);
  }

  getWeather(zip: string): void {
    this.openWeatherService.getWeather(zip).subscribe((response) => {
      this.temperature = Math.floor(response.main.temp);
      this.feelsLike = Math.floor(response.main.feels_like);
      this.weatherConditionDescription = response.weather[0].description;
      this.weatherConditionIcon = response.weather[0].icon;
      this.windSpeed = response.wind.speed;
      this.windDirection = parseInt(response.wind.deg);
      document.getElementById(
        'windDirection'
      ).style.transform = `rotate(${this.windDirection}deg)`;
      // this.setSunTime(
      //   parseInt(response.sys.sunrise),
      //   parseInt(response.sys.sunset)
      // );
    });
  }
  getWeatherCityName(latitude: number, longitude: number) {
    this.openWeatherService
      .getWeatherCity(latitude, longitude)
      .subscribe((response) => {
        this.cityName = response.localityInfo.administrative[3].name;
        this.stateName = response.localityInfo.administrative[1].name;
        // console.log(response);
      });
    console.log(this.cityName);
  }
  getOneCallWeather(latitude: number, longitude: number) {
    this.openWeatherService
      .getOneCallWeather(latitude, longitude)
      .subscribe((response) => {
        // this.cityName = response.timezone;
        // console.log(response);
        this.temperature = Math.floor(response.current.temp);
        this.feelsLike = Math.floor(response.current.feels_like);
        this.weatherConditionDescription =
          response.current.weather[0].description;
        this.weatherConditionIcon = response.current.weather[0].icon;
        this.windSpeed = response.current.wind_speed;
        this.windDirection = parseInt(response.current.wind_deg);
        document.getElementById(
          'windDirection'
        ).style.transform = `rotate(${this.windDirection}deg)`;

        this.minutes = response.minutely;
        this.whenWillItRain(this.minutes);
      });
  }
  updateWeather() {
    setInterval(() => {
      this.getOneCallWeather(this.latitude, this.longitude);
    }, 600000);
  }
  whenWillItRain(array: any[]): void {
    let rainIn = array.findIndex((obj) => obj.precipitation > 0);
    let rainTill = array.findIndex((obj) => {
      obj.precipitation === 0;
    });
    console.log('rainIn', rainIn, 'rainTill', rainTill);
    if (rainIn > 0) {
      if (rainIn === 1) {
        this.rainingInfo = `Rain in ${rainIn} minute.`;
      } else {
        this.rainingInfo = `Rain in ${rainIn} minutes.`;
      }
    } else if (rainTill > 0) {
      if (rainTill === 1) {
        this.rainingInfo = `Rain for ${rainTill} minute.`;
      } else {
        this.rainingInfo = `Rain for ${rainTill} minutes.`;
      }
    } else {
      this.rainingInfo = 'No rain for the next 60 minutes';
    }

    // console.log(this.rainingInfo);
  }
}
