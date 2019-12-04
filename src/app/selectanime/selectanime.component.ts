import { WindowService } from './../shared/window.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { removeSummaryDuplicates } from '@angular/compiler';

@Component({
  selector: 'app-selectanime',
  templateUrl: './selectanime.component.html',
  styleUrls: ['./selectanime.component.scss']
})
export class SelectanimeComponent implements OnInit {
  listanime: any [];
  seriesid;

  constructor(private window: WindowService,  private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.window.animelist.asObservable().subscribe(files => {
      this.listanime=files;
      console.log(this.listanime);
      this.cdr.detectChanges();
  });
  this.window.seriesidobs.asObservable().subscribe(res => {
    console.log(res);
  });
}
selectedanime(index) {
  this.seriesid=this.listanime[index].id;
  console.log(this.seriesid);
  this.window.sendid(this.seriesid);

}



}
