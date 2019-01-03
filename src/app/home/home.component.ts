import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  worksheet: any[];
  show = 12;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('https://wumiya.github.io/prince/assets/prince.xlsx', {responseType: "arraybuffer"})
      .subscribe((data) => {
        const u8 = new Uint8Array(data);
        const wb: XLSX.WorkBook = XLSX.read(u8, {type: 'array'});
        const ws: XLSX.WorkSheet = wb.Sheets[wb.SheetNames[0]];
        const worksheet = XLSX.utils.sheet_to_json(ws);
        this.worksheet = worksheet;
      }, (err) => {
        console.log(err);
      });
  }

}
