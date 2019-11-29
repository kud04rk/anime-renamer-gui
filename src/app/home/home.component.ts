import { WindowService } from './../shared/window.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  directory: string;
  validvideos: string[];

  constructor( private window: WindowService, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.window.directory.subscribe((value) => {
      this.directory = value[0];
      console.log(this.directory);
      this.cdr.detectChanges();
    });

    this.window.videos.subscribe((files) =>{
      this.validvideos= files;
      console.log(this.validvideos);
      this.cdr.detectChanges();
    });
   }


  get_location() {
    this.window.opendialog();
    }

    get_namer() {
      this.window.selectanime();
    }

}
