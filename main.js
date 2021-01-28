
// importing electron module

const electron = require('electron'); // storing it in electron

// import path for file handling and joining the path of the html file

const path = require('path'); // storing it in path

//import url module for using url.format

const url = require('url');

// Creating a Main Window to Display like a Browser
// It is just like a Browser Window

const {BrowserWindow, app, ipcMain} = electron; // import this objects to Electron



// Creating a Browser Window object and storing it to mainWin
let mainWin;

// checking if the app is ready to execute or not. Electron Does that
// it is done by app.on('ready', function);

app.on('ready', function(){
    mainWin = new BrowserWindow({
        width: 400,
        height: 630,
        webPreferences: {
            nodeIntegration: true, // to allow the integration for html and node
            devTools: false // not allowing the developer tools to open
        }
    });

    // loading a remote url webpage to show by url.format
    mainWin.loadURL(url.format({
        pathname: path.join(__dirname, 'calculator.html'),
        protocol: 'file:',
        slashes: true
    })); // this simply means file://C:/users/alex/desktop/../html file

    // removing any, in this case the default menu
    mainWin.removeMenu();
});

// catch Number from ipcrenderer
// catch it with ipcMain

ipcMain.on('num:calc', function(e, inputField){
    let result = eval(inputField);

    // sending the webpage by webcontent.send
    mainWin.webContents.send('result:display', result);
});
