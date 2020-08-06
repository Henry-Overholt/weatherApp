import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { openWeather } from './../../environments/openWeather.environment';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  today: any = new Date();
  dayOfWeek: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
  ];
  apiKey: string = environment.openWeather.apiKey;
  // openWeather.openWeather.apiKey;
  numDay: number = this.today.getDay();
  day: string = this.dayOfWeek[this.numDay];
  tomorrow: string = this.dayOfWeek[this.numDay + 1];
  twoDaysAhead: string = this.dayOfWeek[this.numDay + 2];
  sunset: string;
  sunrise: string;
  longitude: number;
  latitude: number;
  constructor(private http: HttpClient) {}
  getWeather(event_zip: string): Observable<any> {
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/weather?zip=${event_zip}&appid=${this.apiKey}`
    );
  }
  getWeatherCity(latitude: number, longitude: number): Observable<any> {
    return this.http.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );
  }
  getOneCallWeather(latitude: number, longitude: number): Observable<any> {
    this.longitude = longitude;
    this.latitude = latitude;
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly&appid=${this.apiKey}`
    );
  }
}
