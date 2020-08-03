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
  tomorrowDate: any;
  todayWeather: any;
  todayTemps: number[];
  tomorrowTemps: number[];
  twoDaysAheadTemps: number[];

  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    this.tomorrow = this.openWeatherService.tomorrow;
    this.twoDaysAhead = this.openWeatherService.twoDaysAhead;
    setTimeout(() => {
      this.getWeatherDate();
    }, 800);
  }
  getWeatherDate() {
    this.openWeatherService.getOneCallWeather().subscribe((response) => {
      this.todayWeather = response.daily[0];
      this.roundTemp(
        [
          this.todayWeather.temp.morn,
          this.todayWeather.temp.day,
          this.todayWeather.temp.eve,
        ],
        0
      );
      this.tomorrowWeather = response.daily[1];
      this.roundTemp(
        [
          this.tomorrowWeather.temp.morn,
          this.tomorrowWeather.temp.day,
          this.tomorrowWeather.temp.eve,
        ],
        1
      );
      this.twoDaysAheadWeather = response.daily[2];
      this.roundTemp(
        [
          this.twoDaysAheadWeather.temp.morn,
          this.twoDaysAheadWeather.temp.day,
          this.twoDaysAheadWeather.temp.eve,
        ],
        2
      );
      console.log(this.tomorrowWeather);
      console.log(this.twoDaysAheadWeather);
    });
  }
  roundTemp(array: number[], day: number): void {
    let dayToRound = [];
    array.forEach((num) => {
      dayToRound.push(Math.floor(num));
    });
    if (day === 0) {
      this.todayTemps = dayToRound;
    } else if (day === 1) {
      this.tomorrowTemps = dayToRound;
    } else {
      this.twoDaysAheadTemps = dayToRound;
    }
  }
  getLocation() {
    this.getWeatherDate();
  }
}
