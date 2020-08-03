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
  zipcode: string = '48073';
  windSpeed: any;
  windDirection: number;
  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.openWeatherService.setLocation(
          pos.coords.latitude,
          pos.coords.longitude
        );

        // console.log(pos.coords.latitude, pos.coords.longitude);
        console.log('here');
      });
    } else {
      this.openWeatherService.setLocation(43.331429, -83.045753);

      console.log('not here');
    }
    setTimeout(() => {
      this.getOneCallWeather();
      this.updateWeather();
    }, 500);

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
      this.setSunTime(
        parseInt(response.sys.sunrise),
        parseInt(response.sys.sunset)
      );
    });
  }
  getOneCallWeather() {
    this.openWeatherService.getOneCallWeather().subscribe((response) => {
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
      this.setSunTime(
        parseInt(response.current.sunrise),
        parseInt(response.current.sunset)
      );
    });
  }
  updateWeather() {
    setInterval(() => {
      // this.getWeather(this.zipcode);
      this.getOneCallWeather();
    }, 600000);
  }
  convertKtoF(number: number): number {
    return Math.floor((number - 273.15) * (9 / 5) + 32);
  }

  convertFtoC(): void {}
  convertCtoF(): void {}
  setSunTime(sunrise, sunset) {
    this.openWeatherService.setSunTime(sunrise, sunset);
  }
}
