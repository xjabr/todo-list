var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './build/Todo-List-win32-x64',
  outputDirectory: './installers',
  authors: 'Gabriele Lanzamfae',
  exe: './todolist.exe',
  setupExe: 'todo-list-setup.exe',
  setupIcon: 'media/img/icon.ico'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`Error: ${e.message}`));
