import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
today:any = new Date
isDay:boolean;
sunrise:string;
sunset:string;
totalTime:number;
sunriseTimeStamp:number;
sunsetTimeStamp:number;
sunriseValue:number;
sunsetValue:number;
hours:any;
current:any = this.today.getHours();
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
// this.openWeatherService.getOneCallWeather('48073').subscribe(response )    

    setInterval(() => {
      this.today = Date();
      
    },2000);
    setInterval(()=> {
    this.isItDaytime();
    },60000)
    setTimeout(()=> {
      this.translateTime([this.openWeatherService.sunrise,this.openWeatherService.sunset]);
      // this.sunrise =this.openWeatherService.sunrise;
      // this.sunset =this.openWeatherService.sunset;
    },200);
  }

  translateTime(array) {
    // this.sunriseTimeStamp = array[0];
    // this.sunsetTimeStamp = array[1];
    //
    let zeroHour = new Date(array[0]* 1000).getHours();
    let zeroMin = new Date(array[0]* 1000).getMinutes();
    let hundredHour = new Date(array[1]  * 1000).getHours();
    let hundredMin = new Date(array[1]  * 1000).getMinutes();
    this.sunriseValue = zeroHour + (zeroMin/60);
    this.sunsetValue= hundredHour + (hundredMin/60);
    this.totalTime = this.sunsetValue-this.sunriseValue;
    // console.log(this.totalTime);
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
    // console.log(formattedTime);
    } 
    this.isItDaytime(); 
  }

  isItDaytime() {
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();
    this.current = currentHour + (currentMin/60);
    if (this.current >= this.sunriseValue && this.current <=this.sunsetValue) {
      this.isDay = true;
      this.moveSun();
    } else {
      this.isDay = false;
      this.moveMoon();
    }
    
    }
    moveSun() {
    let timePassed = this.current - this.sunriseValue ;
    let percentage = Math.floor((timePassed/this.totalTime)*100);
    document.getElementById("sun").style.left=`${percentage}%`;
    document.getElementById("sun").style.transitionDuration = '2s';
    console.log(percentage);
    }
    moveMoon() {
      let timeTillSunrise = (24 - this.sunsetValue) + this.sunriseValue;
      this.current = new Date().getHours();
      let timePassed;
      if (this.current > this.sunsetValue) {
          timePassed = this.current - this.sunsetValue;
        } else {
          timePassed = (24 - this.sunsetValue)+this.current;
        }
      let percentage = Math.floor((timePassed/timeTillSunrise)*100);
      document.getElementById("moon").style.right=`${percentage}%`;
      document.getElementById("moon").style.transitionDuration = '2s';
      console.log(percentage)
    }
}

