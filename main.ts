import { app, BrowserWindow, screen, ipcMain, remote } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from "fs";

let win: BrowserWindow = null;
let selwin: BrowserWindow = null;

const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


function sendvalidfiles(path) {
  process.chdir(path);
  const cwd = process.cwd();
  fs.readdir('.', {withFileTypes: true}, (err, files) => {
    if (!err) {
        const re = /(?:\.([^.]+))?$/;
        const videos = files
          .filter(file => file.isFile() && ['mkv', 'mp4', 'avi', 'flv', 'mpg', 'mpeg', 'wmv', 'webm', 'vob', 'mov', '3gp', 'ogv'].includes(re.exec(file.name)[1]))
          .map(file => `${file.name}`);
        win.webContents.send("getvalidvideo", videos);
    }
});
}

function opendialog() {
const {dialog} = require('electron');

  dialog.showOpenDialog(win, {
    properties: ['openDirectory']
  }).then(result => {
    console.log(result.canceled);
    win.webContents.send('selecteddir', result.filePaths);
    console.log(result.filePaths);
    sendvalidfiles(result.filePaths[0]);
  }).catch(err => {
    console.log(err)
  })

}

ipcMain.on("opendialog", (event) => {
  opendialog();
});


let {PythonShell} = require('python-shell')

function selectanime(anime) {
  console.log('anime selector');
  console.log(anime);
  selwin= new BrowserWindow({width:800 , height:600,webPreferences: {
    nodeIntegration: true,
    allowRunningInsecureContent: (serve) ? true : false,
  },});
  if(serve){
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    selwin.loadURL('http://localhost:4200/#/selector');
  }
  else{
  selwin.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html#/selector'),
    protocol: 'file:',
    slashes: true
  }));
}
var options = {
  scriptPath : path.join(__dirname, '/backend/'),
  args : [anime]
}

let pyshell = new PythonShell('start.py', options);

pyshell.on('message', function(message) {
  selwin.webContents.send("animelist", message);
})
if(serve){
  selwin.webContents.openDevTools();}
}

function closewindow() {
  selwin.close();
}

function runrenamer(seriesid) {
  var options = {
    scriptPath : path.join(__dirname, '/backend/'),
    args : [seriesid]
  }

  let pyshell = new PythonShell('reanmer.py', options);

  pyshell.on('message', function(message) {
    selwin.webContents.send("renamerres", message);
  })
}

function runprepare() {
  var options = {
    scriptPath : path.join(__dirname, '/backend/')
  }

  let pyshell = new PythonShell('reanmer.py', options);

  pyshell.on('message', function(message) {
    selwin.webContents.send("renamerres", message);
  })
}
function runremover(subtext) {
  var options = {
    scriptPath : path.join(__dirname, '/backend/'),
    args : [subtext]
  }

  let pyshell = new PythonShell('reanmer.py', options);

  pyshell.on('message', function(message) {
    selwin.webContents.send("renamerres", message);
  })
}
function runorganizer() {
  var options = {
    scriptPath : path.join(__dirname, '/backend/')
  }

  let pyshell = new PythonShell('reanmer.py', options);

  pyshell.on('message', function(message) {
    selwin.webContents.send("renamerres", message);
  })
}
function rundownload(seriesid) {
  var options = {
    scriptPath : path.join(__dirname, '/backend/'),
    args : [seriesid]
  }

  let pyshell = new PythonShell('reanmer.py', options);

  pyshell.on('message', function(message) {
    selwin.webContents.send("renamerres", message);
  })
}


ipcMain.on('openselector', (event,anime) => {
  selectanime(anime);
});

ipcMain.on('id', (event,seriesid) => {
  console.log(seriesid);
  win.webContents.send("seriesid", seriesid);
  closewindow();
});

ipcMain.on('prepare', (event) => {
  runprepare();
});
ipcMain.on('remover', (event,subtext) => {
  runremover(subtext);
});

ipcMain.on('rename', (event,seriesid) => {
  runrenamer(seriesid);
});
ipcMain.on('organize', (event) => {
  runorganizer();
});
ipcMain.on('download', (event,seriesid) => {
  rundownload(seriesid);
});








