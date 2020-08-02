import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from './../services/open-weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit {
  twoDaysAhead: string;
  tomorrow: string;
  tomorrowWeather: any;
  twoDaysAheadWeather: any;

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    this.tomorrow = this.openWeatherService.tomorrow;
    this.twoDaysAhead = this.openWeatherService.twoDaysAhead;
    setTimeout(() => {
      this.getWeatherDate();
    }, 500);
  }
  getWeatherDate() {
    this.openWeatherService.getOneCallWeather().subscribe((response) => {
      this.tomorrowWeather = response;
      console.log(this.tomorrowWeather);
    });
  }
  getLocation() {
    this.getWeatherDate();
  }
}
