function dateToArray(ms) {
  let newDate = new Date(ms);
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let array = [prepend(date, 2), prepend(month, 2), year];
  return array;
}

function arrayToDate(array) {
  let date = array[0];
  let month = array[1];
  let year = array[2];
  let ms = Date.parse(`${month}/${date}/${year}`);
  return ms;
}

function prepend(number, width, z) {
  z = z || '0';
  number = number + '';
  return number.length >= width
    ? number
    : new Array(width - number.length + 1).join(z) + number;
}

function filterObject(baseObj, acceptableKeys) {
  const keys = Object.keys(baseObj);
  let newData = {};
  for (const key of keys) {
    if (acceptableKeys.indexOf(key) > -1) {
      newData[key] = baseObj[key];
    }
  }
  return newData;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function backup() {
  // let now = new Date();
  // console.log(now);
  // console.log(now.toISOString());
  // console.log(now.toJSON());
  // console.log(now.toUTCString());
  // let dir = './backup';
  // let filename = `${
  //   now
  //     .toISOString()
  //     .replace(/-/g, '')
  //     .replace(/:/g, '')
  //     .replace(/T/g, '')
  //     .split('.')[0]
  // }.json`;

  // if (!fs.existsSync(dir)) {
  //   fs.mkdirSync(dir, {recursive: true});
  // }
  // await fs.writeFile(`backup/${filename}`, JSON.stringify(data), (err) => {
  //   if (err) {
  //     throw err;
  //   }
  //   console.log(`File Saved as ${dir}/${filename}`);
  // });
  // return;

  require('./backupScript')();
}

function restore() {
  require('./restoreScript')();
}

module.exports = {
  dateToArray,
  arrayToDate,
  prepend,
  filterObject,
  capitalizeFirstLetter,
  backup,
  restore,
};
