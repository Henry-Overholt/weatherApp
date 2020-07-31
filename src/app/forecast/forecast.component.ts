import { Component, OnInit } from '@angular/core';
import {
OpenWeatherService
} from "./../services/open-weather.service";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
twoDaysAhead:string ;
tomorrow:string;
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {this.tomorrow = this.openWeatherService.tomorrow;
    this.twoDaysAhead= this.openWeatherService.twoDaysAhead;
  }

}
