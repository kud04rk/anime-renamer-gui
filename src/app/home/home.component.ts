import { WindowService } from './../shared/window.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {  FormGroup,  Validators, FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  directory='';
  validvideos: string[];
  selectanime: FormGroup;
  dispanime='';
  seriesid=0;
  disbale=false;

  constructor( private window: WindowService, private cdr: ChangeDetectorRef, private fblogin: FormBuilder ) { }

  ngOnInit(): void {
    this.resetForm();
    this.window.directory.subscribe((value) => {
      this.directory = value;
      console.log(this.directory);
      this.disbale=true;
      this.cdr.detectChanges();
    });

    this.window.videos.subscribe((files) =>{
      this.validvideos= files;
      console.log(this.validvideos);
      this.cdr.detectChanges();
    });
    this.window.seriesidobs.asObservable().subscribe((result) => {
      console.log(result);
      this.seriesid=result;
      if(result==0){
        this.dispanime='';
      }
      else{
        this.dispanime=result.toString();
      }
      this.cdr.detectChanges();
    });
   }

  resetForm() {
    this.selectanime = this.fblogin.group({
      animename: ['', Validators.required]
    });
  }


  get_location() {
    this.window.opendialog();
    }

    get_namer(name) {
      console.log(name);
      this.dispanime=name.animename;
      this.window.selectanime(name.animename);
    }

    prepare(){

    }
    remove(){

    }
    rename() {

    }
    organize() {

    }
    download() {
      
    }

}
