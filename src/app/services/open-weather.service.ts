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
  getOneCallWeather(latitude: number, longitude: number): Observable<any> {
    this.longitude = longitude;
    this.latitude = latitude;
    return this.http.get(
      `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&exclude=hourly&appid=${this.apiKey}`
    );
    // console.log(this.longitude, this.latitude);
  }

  //   getLocation() {
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(pos => {
  //     this.longitude = pos.coords.longitude;
  //     this.latitude = pos.coords.latitude;
  //     return this.latitude, this.longitude;
  //     // console.log(this.longitude, this.latitude);
  //   })
  // }
  // }

  testService(): void {
    console.log('service works');
  }
  setSunTime(sunrise: string, sunset: string): void {
    this.sunset = sunset;
    this.sunrise = sunrise;
  }
  setLocation(latitude: number, longitude: number) {
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
