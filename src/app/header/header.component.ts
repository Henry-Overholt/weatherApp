import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
today:any;
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
    this.today=this.openWeatherService.today;
  }

}
