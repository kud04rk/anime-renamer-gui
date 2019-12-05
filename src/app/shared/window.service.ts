import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  directory = new BehaviorSubject<string>('');
  videos = new BehaviorSubject<string[]>([]);
  animelist = new BehaviorSubject<any[]>([{'seriesName':'test','banner':'/banners/posters/78857-1.jpg','overview':'testoverview','id': '126'}]);
  animename;
  seriesidobs = new BehaviorSubject<number>(0);

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
    electron.ipcRenderer.on('seriesid', (event, id) => {
      console.log(id);
      this.seriesidobs.next(id);
    });

  }

  opendialog() {
    electron.ipcRenderer.send('opendialog');
  }

  selectanime(animename) {
    electron.ipcRenderer.send('openselector',animename);
  }

  sendid(seriesid) {
    electron.ipcRenderer.send('id',seriesid);
    }

    prepare(){
      electron.ipcRenderer.send('prepare');
    }
    remove(subtext){
      electron.ipcRenderer.send('remover',subtext);
    }
    rename(seriesid) {
      electron.ipcRenderer.send('rename',seriesid);
    }
    organize() {
      electron.ipcRenderer.send('organize');
    }
    download(seriesid) {
      electron.ipcRenderer.send('download',seriesid);
    }



}
