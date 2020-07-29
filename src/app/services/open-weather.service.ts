import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherService {
today:any = new Date;
  constructor() { }

  testService():void {
    console.log('service works');
  }
}
