import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
today:any = new Date;
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
  }



}
