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
  showDetails: boolean;
  showWeeks: boolean;
  chart: any; // This will hold our chart info
  worksheet: any[];
  worksheet1: any[];

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.http.get('https://wumiya.github.io/prince/assets/prince.xlsx', {responseType: "arraybuffer"})
      .subscribe((data) => {
        const u8 = new Uint8Array(data);
        const wb: XLSX.WorkBook = XLSX.read(u8, {type: 'array'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
        const worksheet = XLSX.utils.sheet_to_json(ws);
        this.worksheet = worksheet;

        const ws1: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[2]];
        const worksheet1 = XLSX.utils.sheet_to_json(ws1);
        this.worksheet1 = worksheet1;

        let wk_in_charts = this.worksheet1.map(res => res.weeks_in_top_100charts);
        let ttl_wk_in_charts = this.worksheet1.map(res => res.cummulative_weeks_in_charts_lifetime/10);
        let years1 = this.worksheet1.map(res => res.year);

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
                borderColor: '#ba3c96',
                fill: false,
                borderWidth: 5
              }
            ]
          },
          options: {
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  fontColor: '#fff',
                }
              }],
              yAxes: [{
                ticks: {
                  fontColor: '#fff',
                }
              }]
            },
            legend: {
              labels: {
                fontColor: '#fff'
              }
            }
          }
        });

        this.chart = new Chart('canvas1', { 
          type: 'bar',
          data: {
            datasets: [{
                data: wk_in_charts,
                label: 'week in top 100 charts',
                backgroundColor: '#3cba9f',
              },{
                type: 'line',
                data: ttl_wk_in_charts,
                label: 'cummulative weeks (unit of 10)',
                borderColor: '#ffcc00',
                borderWidth: 4
              }],
            labels: years1,
          },
          options: {
            tooltips: {
              mode: 'index',
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  fontColor: '#fff',
                }
              }],
              yAxes: [{
                ticks: {
                  fontColor: '#fff',
                }
              }]
            },
            legend: {
              labels: {
                fontColor: '#fff'
              }
            }
          }
        });



      }, (err) => {
        console.log(err);
      });

 
  }
}
