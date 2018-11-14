import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  chart: any; // This will hold our chart info
  worksheet: any[];
  
  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get('prince.xlsx', {responseType: "arraybuffer"})
      .subscribe((data) => {
        const u8 = new Uint8Array(data);
        const wb: XLSX.WorkBook = XLSX.read(u8, {type: 'array'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
        const worksheet = XLSX.utils.sheet_to_json(ws);
        this.worksheet = worksheet;
        console.log(this.worksheet);

        let worldwide_Sales = this.worksheet.map(res => res.worldwide_Sales);
        let years = this.worksheet.map(res => res.Year);

        this.chart = new Chart('canvas', { 
          type: 'line',
          data: {
            // x-axis
            labels: years,
            datasets: [
              {
                data: worldwide_Sales,
                label: 'Worldwide Sales',
                borderColor: '#3cba9f',
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

 
  }
}
