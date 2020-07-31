import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {openWeather} from './../../environments/openWeather.environment';


@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
today:any = new Date;
dayOfWeek :string[] = [
  'Sunday',
  'Monday',
  'Tuesday',
  "Wednesday",
  'Thursday',
  "Friday",
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday"
];
apiKey:string = openWeather.openWeather.apiKey;
numDay:number = this.today.getDay();
day:string = this.dayOfWeek[this.numDay];
tomorrow:string=this.dayOfWeek[(this.numDay +1)];
twoDaysAhead:string=this.dayOfWeek[this.numDay +2];
sunset:string;
sunrise:string;

  constructor(private http:HttpClient) { }
  getWeather(event_zip:string):Observable<any> {
return this.http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${event_zip}&appid=${this.apiKey}`)
  }
  getOneCallWeather(eventzip:string):Observable<any> {
    return this.http.get(`https://api.openweathermap.org/data/2.5/onecall?zip=${eventzip}exclude=hourly,daily&appid=${this.apiKey}`);
  }

  testService():void {
    console.log('service works');
  }
  setSunTime(sunrise:string, sunset:string):void {
    this.sunset = sunset;
    this.sunrise = sunrise;
  }
}
