import { WindowService } from './../shared/window.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-selectanime',
  templateUrl: './selectanime.component.html',
  styleUrls: ['./selectanime.component.scss']
})
export class SelectanimeComponent implements OnInit {
  listanime: any [];
  imgsrc='https://www.thetvdb.com/';

  constructor(private window: WindowService,  private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.window.animelist.asObservable().subscribe(files => {
      this.listanime=files;
      console.log(this.listanime);
      this.cdr.detectChanges();
  });
}



}
