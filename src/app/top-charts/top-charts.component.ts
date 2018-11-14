import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Chart } from 'chart.js';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-top-charts',
  templateUrl: './top-charts.component.html',
  styleUrls: ['./top-charts.component.scss']
})
export class TopChartsComponent implements OnInit {

  chart: any; // This will hold our chart info
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
        let ttl_wk_in_charts = this.worksheet.map(res => res.cummulative_weeks_in_charts_lifetime/10);
        let years = this.worksheet.map(res => res.year);

        this.chart = new Chart('canvas', { 
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
                borderColor: '#ffcc00'
              }],
            labels: years,
          },
          options: {
            tooltips: {
              mode: 'index',
            },
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
