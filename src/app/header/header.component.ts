import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';
import { ɵBROWSER_SANITIZATION_PROVIDERS__POST_R3__ } from '@angular/platform-browser';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  
})
export class HeaderComponent implements OnInit {
today:any = new Date
isDay:boolean = true;
sunrise:string;
sunset:string;
totalTime:number;
sunriseTimeStamp:number;
sunsetTimeStamp:number;
hours:any;
current:any = this.today.getHours();
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
// this.openWeatherService.getOneCallWeather('48073').subscribe(response )    

    setInterval(() => {
      this.today = Date();
      
      // this.isItDaytime();
    },1000);
    setInterval(()=> {
    this.isItDaytime();
    },600000)
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
    // console.log(formattedTime);
    }  
    this.isItDaytime();
  }

  isItDaytime() {
    let zero = new Date(this.sunriseTimeStamp * 1000).getHours();
    let hundred = new Date(this.sunsetTimeStamp  * 1000).getHours();
    this.totalTime = hundred-zero;
    this.current = new Date().getHours();
    // console.log("Zero", zero)
    // console.log( "hundred", hundred)
    // console.log( 'this.Current', this.current);
    if (this.current >= zero && this.current <= hundred) {
      this.isDay = true;
      this.moveSun(zero);
      console.log(this.isDay)
    } else {
      this.isDay = false;
      this.moveMoon(zero, hundred);
      console.log(this.isDay)
    }
    
    }
    moveSun(sunriseHour) {

     
    let timePassed = this.current - sunriseHour ;
    let percentage = Math.floor((timePassed/this.totalTime)*100);
   
    document.getElementById("sun").style.left=`${percentage}%`;
    document.getElementById("sun").style.transitionDuration = '2s';
 console.log(percentage)
    }
    moveMoon(zero, hundred) {
let timeTillSunrise = (24 - hundred) + zero;
this.current = new Date().getHours();
let timePassed;
if (this.current > hundred) {
  timePassed = this.current - hundred;
} else {
  timePassed = (24 - hundred)+this.current;
}
let percentage = Math.floor((timePassed/timeTillSunrise)*100);
document.getElementById("moon").style.right=`${percentage}%`;
    document.getElementById("moon").style.transitionDuration = '2s';
// console.log(timeTillSunrise);
    }
}

