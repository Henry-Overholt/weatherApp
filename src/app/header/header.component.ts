import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
today:any = new Date
isDay:boolean = true;
sunrise:string ="6:24 AM";
sunset:string ="8:54 PM";
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
    this.today=this.openWeatherService.today;
    setInterval(() => {
      this.today = Date()
    },1000);
  }

}
