const { app, BrowserWindow, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');
let mainWindow;





const path = require('path')
// const PEPPERFLASH_PLUGIN = __dirname.indexOf("asar") >=0 ? 'resources/resources/pepperflashplugin.dll' : 'resources/resources/pepperflashplugin.dll'
// let pluginName
// pluginName = PEPPERFLASH_PLUGIN
// pluginName = '../../resources/pepperflashplugin.dll'
// astecagay = path.join(__dirname, pluginName)
// app.commandLine.appendSwitch('ppapi-flash-path', astecagay)
// let flashPath = path.join(__dirname, pluginName);
localflash = 'C:/Users/Caique/Desktop/Launcher/dist/win-unpacked/resources/resources/pepperflashplugin.dll'
app.commandLine.appendSwitch('ppapi-flash-path', localflash);
// app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
// app.commandLine.appendSwitch('ppapi-flash-path', astecagay)
app.commandLine.appendSwitch('ppapi-flash-version', '32.0.0.344');






function createWindow () {
  mainWindow = new BrowserWindow({
	title: localflash,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
	  plugins: true
    },
  });
  // mainWindow.loadFile('index.html');
  mainWindow.loadURL('https://get.adobe.com/br/flashplayer/about/');
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
  mainWindow.once('ready-to-show', () => {
  autoUpdater.checkForUpdatesAndNotify();
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

function closeNotification() {
  notification.classList.add('hidden');
}

function restartApp() {
  ipcRenderer.send('restart_app');
}

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});