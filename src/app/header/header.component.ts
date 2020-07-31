import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
today:any = new Date
isDay:boolean = false;
sunrise:string;
sunset:string;
totalTime:number;
sunriseTimeStamp:number;
sunsetTimeStamp:number;
hours:any;
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
// this.openWeatherService.getOneCallWeather('48073').subscribe(response )    

    setInterval(() => {
      this.today = Date()
    },1000);
    setTimeout(()=> {
      this.translateTime([this.openWeatherService.sunrise,this.openWeatherService.sunset]);
      // this.sunrise =this.openWeatherService.sunrise;
      // this.sunset =this.openWeatherService.sunset;
    },200);
  }

  translateTime(array) {
    this.sunriseTimeStamp = array[0];
    this.sunsetTimeStamp = array[1];
    this.totalTime = this.sunsetTimeStamp-this.sunriseTimeStamp;
    // console.log(totalTime);
    for (let i = 0; i< array.length; i++) {
    let unix_timestamp = array[i];
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(unix_timestamp * 1000);
    // Hours part from the timestamp
    if (i === 0) {
      this.hours = date.getHours();
    } else {this.hours = date.getHours()-12;};
    
      
    // let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Will display time in 10:30:23 format
    let formattedTime = this.hours + ':' + minutes.substr(-2);
    if (i === 0) {
      this.sunrise = formattedTime;
    } else {this.sunset = formattedTime};
    console.log(formattedTime);
    }  
    // this.moveSun();
  }

  moveSun() {
    // if (this.sunsetTimeStamp < this.today.getTime()) {
    //   this.isDay =true;
    // } else {
    //   this.isDay = false;
    }

// console.log("Current Time", this.today.getTime(), );
// // let timePassed = this.sunsetTimeStamp -this.today.getTime();
// // console.log(timePassed);
//     document.querySelector("i").style.left ="50%";
//   }

}

