import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  directory = new BehaviorSubject<string[]>([]);
  videos = new BehaviorSubject<string[]>([]);
  animelist = new BehaviorSubject<any[]>([{'seriesName':'test','banner':'/banners/posters/78857-1.jpg','overview':'testoverview'}]);
  animename;

  constructor() {
    electron.ipcRenderer.once('selecteddir', (event, location) => {
      this.directory.next(location);
    });

    electron.ipcRenderer.on('getvalidvideo', (event, validvideos) => {
      this.videos.next(validvideos);
    });

    electron.ipcRenderer.on('animelist', (event, anime) => {
      this.animelist.next(JSON.parse(anime));
    });
  }

  opendialog() {
    electron.ipcRenderer.send('opendialog');
  }

  selectanime(animename) {
    electron.ipcRenderer.send('openselector');
  }


}


