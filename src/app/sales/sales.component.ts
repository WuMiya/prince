import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  chart: any[]; // This will hold our chart info
  worksheet: any[];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get('prince.xlsx', {responseType: "arraybuffer"})
      .subscribe((data) => {
        const u8 = new Uint8Array(data);
        const wb: XLSX.WorkBook = XLSX.read(u8, {type: 'array'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[2]];
        const worksheet = XLSX.utils.sheet_to_json(ws);
        this.worksheet = worksheet;

        let wk_in_charts = this.worksheet.map(res => res.weeks_in_top_100charts);
        let ttl_wk_in_charts = this.worksheet.map(res => (res.cummulative_weeks_in_charts_lifetime/10).toFixed(2));
        let years = this.worksheet.map(res => res.year);

        this.chart = new Chart('canvas', { 
          type: 'line',
          data: {
            // x-axis
            labels: years,
            datasets: [
              {
                data: wk_in_charts,
                label: 'week in top 100 charts',
                borderColor: '#3cba9f',
                fill: false
              },
              {
                data: ttl_wk_in_charts,
                label: 'cummulative weeks (unit of 10)',
                borderColor: '#ffcc00',
                fill: false
              }
            ]
          },
          options: {
            scales: {
              xAxes: [{
                display: true
              }]
            }
          }
        });
      }, (err) => {
        console.log(err);
      });

    // const mydata = {
    //   "message": "",
    //   "cod": "200",
    //   "city_id": 2643743,
    //   "calctime": 0.0875,
    //   "cnt": 3,
    //   "list": [
    //     {
    //       "main": {
    //         "temp": 279.946,
    //         "temp_min": 279.946,
    //         "temp_max": 279.946,
    //         "pressure": 1016.76,
    //         "sea_level": 1024.45,
    //         "grnd_level": 1016.76,
    //         "humidity": 27.9
    //       },
    //       "wind": {
    //         "speed": 4.59,
    //         "deg": 163.001
    //       },
    //       "clouds": {
    //         "all": 92
    //       },
    //       "weather": [
    //         {
    //           "id": 500,
    //           "main": "Rain",
    //           "description": "light rain",
    //           "icon": "10n"
    //         }
    //       ],
    //       "rain": {
    //         "3h": 2.69
    //       },
    //       "dt": 1485717216
    //     },
    //     {
    //       "main": {
    //         "temp": 282.597,
    //         "temp_min": 282.597,
    //         "temp_max": 282.597,
    //         "pressure": 1012.12,
    //         "sea_level": 1019.71,
    //         "grnd_level": 1012.12,
    //         "humidity": 28.37
    //       },
    //       "wind": {
    //         "speed": 4.04,
    //         "deg": 226
    //       },
    //       "clouds": {
    //         "all": 92
    //       },
    //       "weather": [
    //         {
    //           "id": 500,
    //           "main": "Rain",
    //           "description": "light rain",
    //           "icon": "10n"
    //         }
    //       ],
    //       "rain": {
    //         "3h": 0.405
    //       },
    //       "dt": 1485745061
    //     },
    //     {
    //       "main": {
    //         "temp": 279.38,
    //         "pressure": 1011,
    //         "humidity": 27.5,
    //         "temp_min": 278.15,
    //         "temp_max": 280.15
    //       },
    //       "wind": {
    //         "speed": 2.6,
    //         "deg": 30
    //       },
    //       "clouds": {
    //         "all": 90
    //       },
    //       "weather": [
    //         {
    //           "id": 701,
    //           "main": "Mist",
    //           "description": "mist",
    //           "icon": "50d"
    //         },
    //         {
    //           "id": 741,
    //           "main": "Fog",
    //           "description": "fog",
    //           "icon": "50d"
    //         }
    //       ],
    //       "dt": 1485768552
    //     }
    //   ]
    // }
  
    // let temp_max = mydata['list'].map(res => (res.main.temp_max/10).toFixed(2));
    // let temp_min = mydata['list'].map(res => (res.main.temp_min/10).toFixed(2));
    // let humidity = mydata['list'].map(res => (res.main.humidity).toFixed(2));
    // let alldates = mydata['list'].map(res => res.dt);
    
    // let weatherDates:any[] = [];

    // // format the date time
    // alldates.map(d => {
    //   let jsdate = new Date(d * 1000);
    //   weatherDates.push(jsdate.toLocaleTimeString('en', {year: 'numeric', month: 'short', day: 'numeric'}));

    //   this.chart = new Chart('canvas', { 
    //     type: 'line',
    //     data: {
    //       // x-axis
    //       labels: weatherDates,
    //       datasets: [
    //         {
    //           data: temp_max,
    //           label: 'temp_max',
    //           borderColor: '#3cba9f',
    //           fill: false
    //         },
    //         {
    //           data: temp_min,
    //           label: 'temp_min',
    //           borderColor: '#ffcc00',
    //           fill: false
    //         },
    //         {
    //           data: humidity,
    //           label: 'humidity',
    //           borderColor: '#2196F3',
    //           fill: false
    //         }
    //       ]
    //     },
    //     options: {
    //       scales: {
    //         xAxes: [{
    //           display: true
    //         }],
    //       //   yAxes: [{
    //       //     ticks: {
    //       //         // suggestedMin: 27,
    //       //         // suggestedMax: 30,
    //       //         // stepSize: 0.3,
    //       //         // callback: function(value, index, values) {
    //       //         //   return value + ' C';
    //       //       }
    //       //     }
    //       // }]
    //       }
    //     }
    //   });
    // })
  }
}
