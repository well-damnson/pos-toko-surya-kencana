var fs = require('fs');
var _ = require('lodash');
var exec = require('child_process').exec;
var prepend = require('./utils').prepend;
var dbOptions = {
  user: '',
  pass: '',
  host: '127.0.0.1',
  port: 27017,
  database: 'backend',
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: './backup/', // i.e. /var/database-backup/
};
/* return date object */
var stringToDate = function(dateString) {
  return new Date(dateString);
};
/* return if variable is empty or not. */
var empty = function(mixedVar) {
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }
  return false;
};
// Auto backup script
module.exports = function dbAutoBackUp() {
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    var date = new Date();
    var beforeDate, oldBackupDir, oldBackupPath;
    var currentDate = stringToDate(date); // Current date
    var newBackupDir =
      currentDate.getFullYear() +
      '-' +
      prepend(currentDate.getMonth() + 1, 2) +
      '-' +
      prepend(currentDate.getDate(), 2);
    var newBackupPath = dbOptions.autoBackupPath + 'mongodump-' + newBackupDir; // New backup path for current backup process
    // check for remove old backup after keeping # of days given in configuration
    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate);
      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup); // Substract number of days to keep backup and remove old backup
      oldBackupDir =
        beforeDate.getFullYear() +
        '-' +
        (beforeDate.getMonth() + 1) +
        '-' +
        beforeDate.getDate();
      oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir; // old backup(after keeping # of days)
    }
    var cmd =
      'mongodump --host ' +
      dbOptions.host +
      ' --port ' +
      dbOptions.port +
      ' --db ' +
      dbOptions.database +
      ' --out ' +
      newBackupPath; // Command for mongodb dump process
    console.log('cmd:', cmd);
    if (dbOptions.user && dbOptions.pass)
      cmd += ' --username ' + dbOptions.user + ' --password ';

    exec(cmd, function(error, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      console.log(error);
      if (empty(error)) {
        // check for remove old backup after keeping # of days given in configuration
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, function(err) {
              console.log(err);
            });
          }
        }
      }
    });
  }
};
