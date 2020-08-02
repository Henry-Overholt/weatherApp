import { Component, OnInit } from '@angular/core';
import { OpenWeatherService } from './../services/open-weather.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  today: any = new Date();
  isDay: boolean;
  sunrise: string;
  sunset: string;
  totalTime: number;
  sunriseValue: number;
  sunsetValue: number;
  hours: any;
  current: any = this.today.getHours();
  zip: string = '48073';
  constructor(private openWeatherService: OpenWeatherService) {}

  ngOnInit(): void {
    // this.openWeatherService.getOneCallWeather('48073').subscribe(response )
    setInterval(() => {
      //every 2 seconds update the time in the component
      this.today = Date();
    }, 2000);
    setTimeout(() => {
      //delay converting the time to so that functions don't run until we get the time. limits bugs
      this.translateTime([
        this.openWeatherService.sunrise,
        this.openWeatherService.sunset,
      ]);
    }, 200);
    setInterval(() => {
      //every 5 minutes recalculate sun or moon location based on time.
      this.isItDaytime();
    }, 60000);
  }

  translateTime(array) {
    //takes an array of two values, the first being the sunrise timestamp, second being sunset timestamp. Then converts them to normal time syntax.
    let zeroHour = new Date(array[0] * 1000).getHours(); //returns the hour of the sunrise
    let zeroMin = new Date(array[0] * 1000).getMinutes(); //returns the min of the sunsrise
    let hundredHour = new Date(array[1] * 1000).getHours(); //returns the hour of the sunset
    let hundredMin = new Date(array[1] * 1000).getMinutes(); //return the hour of the sunrise
    this.sunriseValue = (zeroHour + zeroMin / 60) * 10; //sets the sunrise value as number.(percentage of the hour gone by) multplies it by ten so we see bigger changes in the percentage the sun moves.
    this.sunsetValue = (hundredHour + hundredMin / 60) * 10; //sets the sunset value as number.(percentage of the hour gone by) multplies it by ten so we see bigger changes in the percentage the sun moves.
    this.totalTime = this.sunsetValue - this.sunriseValue; //subtracts the sunrise and sunset values to then find percetage latter.
    for (let i = 0; i < array.length; i++) {
      let unix_timestamp = array[i];
      // Create a new JavaScript Date object based on the timestamp
      // multiplied by 1000 so that the argument is in milliseconds, not seconds.
      let date = new Date(unix_timestamp * 1000);
      // Hours part from the timestamp
      if (i === 0) {
        //if its first through for loop it's sunrise time, therefore no need to subtract 12.
        this.hours = date.getHours();
      } else {
        this.hours = date.getHours() - 12;
      } //subtracts 12 from hour to write it on AM/PM schedule
      // let hours = date.getHours();
      // Minutes part from the timestamp
      let minutes = '0' + date.getMinutes();
      // Will display time in 10:30:23 format
      let formattedTime = this.hours + ':' + minutes.substr(-2);
      if (i === 0) {
        this.sunrise = formattedTime;
      } else {
        this.sunset = formattedTime;
      }
      // console.log(formattedTime);
    }
    this.isItDaytime();
  }

  isItDaytime(): void {
    //asks if the current time value is in the daylight hours or moonlight
    let currentHour = new Date().getHours();
    if (currentHour === 0) {
      //conditional statement used if left running it grabs the next days sunrise and sunset
      this.updateSunrise(this.zip);
    }
    let currentMin = new Date().getMinutes();
    this.current = (currentHour + currentMin / 60) * 10;
    if (this.current >= this.sunriseValue && this.current <= this.sunsetValue) {
      document.getElementById('moon').style.visibility = 'hidden'; //daytime functions
      this.isDay = true;
      this.moveSun();
    } else {
      document.getElementById('sun').style.visibility = 'hidden'; //nighttime functions
      this.isDay = false;
      this.moveMoon();
    }
  }
  moveSun(): void {
    //finds the current value of time, then finds it's percentage through the day we have come
    let timePassed = this.current - this.sunriseValue;
    let percentage = Math.floor((timePassed / this.totalTime) * 100); //sets percentage as position from left of border;
    document.getElementById('sun').style.visibility = 'visible';
    document.getElementById('sun').style.left = `${percentage}%`;
    // document.getElementById("sun").style.transitionDuration = '2s';
    // console.log(percentage);
  }
  moveMoon(): void {
    let timeTillSunrise = 240 - this.sunsetValue + this.sunriseValue;
    let timePassed;
    document.getElementById('moon').style.visibility = 'visible';
    if (this.current > this.sunsetValue) {
      timePassed = this.current - this.sunsetValue;
    } else {
      timePassed = 240 - this.sunsetValue + this.current;
    }
    let percentage = Math.floor((timePassed / timeTillSunrise) * 100);
    document.getElementById('moon').style.right = `${percentage}%`;
    // console.log(percentage)
  }
  updateSunrise(zip: string): void {
    this.openWeatherService.getWeather(zip).subscribe((response) => {
      this.translateTime([response.sys.sunrise, response.sys.sunset]);
    });
  }
}
