import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  nomor : number;
  num : number;

  tampil : boolean = false;

  constructor() {
    this.num = Math.floor(Math.random() * 11);   
  }

  check(){
    if(this.num == this.nomor){
      alert("Jawaban anda benar");
      this.tampil = true;
    }
  }

}
