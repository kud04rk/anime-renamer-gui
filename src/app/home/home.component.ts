import { WindowService } from './../shared/window.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {  FormGroup,  Validators, FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Animename } from '../shared/animename.modal';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  directory='';
  validvideos: string[];
  beforefiles;
  selectanime: FormGroup;
  removetext: FormGroup;
  dispanime='';
  seriesid=0;
  disbale=false;
  help=true;
  disabledbuttons=true;
  toggleremover=false;

  constructor( private window: WindowService, private cdr: ChangeDetectorRef, private fbsearch: FormBuilder, private fbremove: FormBuilder,private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.resetForm();
    this.resetremoveform();
    this.window.directory.subscribe((value) => {
      this.directory = value;
      console.log(this.directory);
      this.disbale=true;
      if(this.directory == ''){
        this.disabledbuttons=true;
      }
      else{
        this.disabledbuttons=false;
      }
      this.cdr.detectChanges();
    });

    this.window.videos.subscribe((files) =>{
      this.validvideos= files;
      console.log(this.validvideos);
      this.checkvalidfiles(this.validvideos);
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
  checkvalidfiles(validvideos: string[]) {
    this.beforefiles=validvideos.map(file => {
      const temp=file.split('.');
      return{
        isinvalid: isNaN(Number(temp[0])),
        filename: file } as Animename;
    });
  }
  resetremoveform() {
    this.removetext = this.fbremove.group({
      subtext: ['', Validators.required]
    });
  }

  resetForm() {
    this.selectanime = this.fbsearch.group({
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
      if(this.directory=''){
        this.toastr.error('error', 'invalid directory');
      }
      else{
        this.window.prepare();
      }
    }
    remove(){
      this.toggleremover=true;
    }
    removetextfn(value){
      this.toggleremover=false;
      this.window.remove(value.subtext);
    }
    rename() {
      this.window.rename(this.seriesid);
    }
    organize() {
      this.window.organize();
    }
    download() {
      this.window.download(this.seriesid);
    }

    helptoggle() {
      this.help=!this.help;
    }

}
