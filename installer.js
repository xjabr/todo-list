var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
  appDirectory: './build/Todo List-win32-x64',
  outputDirectory: './build/installers',
  authors: 'Gabriele Lanzamfae',
  description: 'Simple Todo List',
  exe: './todolist.exe',
  setupExe: 'TodoList-setup.exe',
  setupIcon: 'media/img/icon.ico'
});

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`Error: ${e.message}`));
