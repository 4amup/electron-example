const electron = require('electron')
// 控制应用生命周期的模块
const app = electron.app
// 创建原生浏览器窗口的模块
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// 保持一个对于window对象的全局引用，不然在JavaScript运行垃圾回收时，窗口会自动关闭
let mainWindow

function createWindow () {
  // 创建一个浏览器窗口
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // 然后载入这个app的index.html文件
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // 打开开发工具
  // mainWindow.webContents.openDevTools()

  // 窗口关闭时发出事件消息
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，通常会把多个 window 对象存放在一个数组里面，这时候你要删除一致的对象。

    mainWindow = null
  })
}

// Electron 完成了初始化并且准备创建浏览器窗口的时候，这个方法就被调用。
// 一些APIs只能在这个事件发生后使用
app.on('ready', createWindow)

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
  // 在 OS X 上，一般在用户在按下 Cmd + Q 之前，应用都会保持活动状态。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // 在OS X平台上，点击dock栏图标，同时没有其他窗口开着的话，app通常会再次打开一个窗口
  if (mainWindow === null) {
    createWindow()
  }
})
