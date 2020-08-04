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
  minutes: object[];
  rainingInfo: string;
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
    }, 800);

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
      this.minutes = response.minutely;
      this.whenWillItRain(this.minutes);
      // console.log(this.minutes);
    });
  }
  updateWeather() {
    setInterval(() => {
      // this.getWeather(this.zipcode);
      this.getOneCallWeather();
    }, 600000);
  }
  whenWillItRain(array: any[]): void {
    let rainIn = array.indexOf((obj) => obj.precipitation > 0);
    let rainTill = array.indexOf((obj) => {
      obj.precipitation === 0;
    });
    console.log('rainIn', rainIn, 'rainTill', rainTill);
    if (rainIn >= 0) {
      if (rainIn <= 1) {
        this.rainingInfo = `Rain in ${rainIn} minute.`;
      } else {
        this.rainingInfo = `Rain in ${rainIn} minutes.`;
      }
    } else if (rainTill >= 0) {
      if (rainTill <= 1) {
        this.rainingInfo = `Rain till ${rainTill} minute.`;
      } else {
        this.rainingInfo = `Rain till ${rainTill} minutes.`;
      }
    } else {
      this.rainingInfo = 'No rain for the next 60 minutes';
    }

    // console.log(this.rainingInfo);
  }

  setSunTime(sunrise, sunset) {
    this.openWeatherService.setSunTime(sunrise, sunset);
  }
}
