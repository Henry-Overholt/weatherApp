import { Component, OnInit } from '@angular/core';
import { OpenWeatherService} from './../services/open-weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
today:any = new Date;
dayOfWeek:string = this.openWeatherService.day;
temperature:number;
currentWeather:any;
feelsLike:number;
weatherConditionIcon:string;
weatherConditionDescription:string;
zipcode:string  = "48073"
windSpeed:any;
windDirection:number;
  constructor(private openWeatherService:OpenWeatherService) { }

  ngOnInit(): void {
      this.getWeather(this.zipcode);
    this.updateWeather();
  }

getWeather(zip:string):void {
 
  this.openWeatherService.getWeather(zip).subscribe(response => {
this.temperature = this.convertKtoF(response.main.temp);
this.feelsLike = this.convertKtoF(response.main.feels_like);
this.weatherConditionDescription = response.weather[0].description;
this.weatherConditionIcon = response.weather[0].icon;
this.windSpeed = response.wind.speed;
this.windDirection = parseInt(response.wind.deg);
document.getElementById("windDirection").style.transform=`rotate(${this.windDirection}deg)`;
this.setSunTime(parseInt(response.sys.sunrise), parseInt(response.sys.sunset));
  })
}
updateWeather() {
  setInterval(()=>{
    this.getWeather(this.zipcode);
  }, 600000);
}
convertKtoF(number:number):number {
  return Math.floor((number - 273.15) *(9/5) + 32);
}
convertFtoC():void {

}
convertCtoF():void {}
setSunTime(sunrise, sunset) {
 this.openWeatherService.setSunTime(sunrise, sunset);
}
}
