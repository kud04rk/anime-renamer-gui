import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  directory = new BehaviorSubject<string[]>([]);
  videos = new BehaviorSubject<string[]>([]);

  constructor() {
    electron.ipcRenderer.once('selecteddir', (event, location) => {
      this.directory.next(location);
    });

    electron.ipcRenderer.on('getvalidvideo', (event, validvideos) => {
      this.videos.next(validvideos);
      console.log(validvideos);
    });
  }

  opendialog() {
    electron.ipcRenderer.send('opendialog');
  }

  selectanime() {
    electron.ipcRenderer.send('openselector');
  }
}


