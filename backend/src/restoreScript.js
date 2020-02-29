const fs = require('fs');
const dateToArray = require('./utils').dateToArray;
const prepend = require('./utils').prepend;

var exec = require('child_process').exec;

var dbOptions = {
  user: '',
  pass: '',
  host: '127.0.0.1',
  port: 27017,
  autoBackupPath: './backup/',
};

function listDirectory() {
  return new Promise((res, rej) => {
    fs.readdir(dbOptions.autoBackupPath, {withFileTypes: true}, function(
      err,
      items,
    ) {
      if (err) rej(err);
      let directories = items
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);

      for (var i = 0; i < directories.length; i++) {
        console.log(directories[i]);
      }
      res(directories);
    });
  });
}

async function getLatestPath() {
  let directories = await listDirectory();
  let dates = directories.map((item) => {
    let split = item.split('-');
    let date = new Date(split[1], Number(split[2]) - 1, split[3]);
    return date;
  });
  var latestDate = new Date(Math.max.apply(null, dates));
  let array = dateToArray(latestDate);
  let path =
    dbOptions.autoBackupPath +
    'mongodump-' +
    array[2] +
    '-' +
    prepend(array[1], 2) +
    '-' +
    prepend(array[0], 2);
  return path;
}

async function dbRestore() {
  var cmd =
    'mongorestore ' +
    (await getLatestPath()) +
    ' --host ' +
    dbOptions.host +
    ' --port ' +
    dbOptions.port;

  if (dbOptions.user && dbOptions.pass)
    cmd += ' --username ' + dbOptions.user + ' --password ';
  console.log(cmd);
  exec(cmd, function(error, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    console.log(error);
  });
}

module.exports = dbRestore;
