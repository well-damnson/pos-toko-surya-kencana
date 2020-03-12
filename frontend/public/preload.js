const electron = require('electron');
const app = electron.remote.app;
const isDev = require('electron-is-dev');
const { machineId } = require('node-machine-id');
const fs = require('fs');
const path = require('path');

console.log('preload loaded');

let option = {
  alnum: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
  mIdShift: 3,
  insertFormat: 'aabaab',
  twistFormat: [9, 2, 5, 8, 1, 10, 3, 0, 7, 4, 11, 6],
};

let createActivationCode = (res) => {
  let { alnum } = option;
  machineId({ original: true }).then((id) => {
    let joined = id.split('-').join('');
    if (option.mIdShift % joined.length !== 0) {
      let num = option.mIdShift % joined.length;
      joined = joined.slice(num, joined.length) + joined.slice(0, num);
    }
    let array8byte = [
      joined.slice(0, 8),
      joined.slice(8, 16),
      joined.slice(16, 24),
      joined.slice(24, 32),
    ];
    let activation = array8byte.map((bytes) => {
      let array2byte = [
        bytes.slice(0, 2),
        bytes.slice(2, 4),
        bytes.slice(4, 6),
        bytes.slice(6, 8),
      ];
      let result = array2byte
        .map((byte) => {
          return alnum[parseInt(byte, 16) % 36];
        })
        .join('');
      return result;
    });
    res(activation.join('-'));
  });
};

window.ActivationCode = () => {
  return new Promise(createActivationCode);
};

let licenseDebug = (obj) => {
  let toNumber = (str) => {
    let { alnum } = option;
    let result =
      '' +
      str
        .split('')
        .map((chr) => {
          let index = alnum.indexOf(chr);
          if (index < 10) {
            return '0' + index;
          } else {
            return '' + index;
          }
        })
        .join('');
    return result;
  };

  let toAlnum = (nums) => {
    let { alnum } = option;
    let result = '';
    for (let index = 0; index < nums.length / 2; index++) {
      const numberInStr = nums.slice(index * 2, (index + 1) * 2);
      let number = parseInt(numberInStr, 10) % alnum.length;
      result += '' + alnum[number];
    }
    return result;
  };

  let createSecret = (length = 8) => {
    let { alnum } = option;
    let result = '';
    for (let index = 0; index < length; index++) {
      result += alnum[Math.floor(Math.random() * alnum.length)];
    }
    return result;
  };

  let { secret, activationCode } = obj;
  secret = secret || createSecret();

  let array4char = activationCode.split('-');
  let array6char = array4char.map((chars, i) => {
    let format = option.insertFormat;
    let A = chars;
    let B = secret.slice(i * 2, (i + 1) * 2);
    let indexA = 0;
    let indexB = 0;
    let result = '';
    for (let index = 0; index < format.length; index++) {
      const condition = format[index];
      if (condition === 'a') {
        result += A[indexA];
        indexA++;
      } else if (condition === 'b') {
        result += B[indexB];
        indexB++;
      }
    }
    return result;
  });
  let array6charTwisted = array6char.map((chars, i) => {
    let numbers = toNumber(chars);
    let arrayNumbers = numbers.split('');
    let format = option.twistFormat;
    let twisted = format
      .map((arrayIndex) => {
        return arrayNumbers[arrayIndex];
      })
      .join('');
    return toAlnum(twisted);
  });
  let licenseJoined = array6charTwisted.join('');
  let license = [
    licenseJoined.slice(0, 4),
    licenseJoined.slice(4, 8),
    licenseJoined.slice(8, 12),
    licenseJoined.slice(12, 16),
    licenseJoined.slice(16, 20),
    licenseJoined.slice(20, 24),
  ].join('-');

  // DONE CREATING LICENSE
  console.log('License:', license);
  console.log('Secret:', secret);
  return { license, secret };
};

let authenticateLicense = (license) => {
  return new Promise(createActivationCode).then((activationCode) => {
    let debug = licenseDebug({ activationCode, secret: license.secret });
    console.log(debug);
    if (license.license === debug.license) {
      console.log('Activation Success');
      return true;
    } else {
      return false;
    }
  });
};

let haveLicense = () => {
  const filename = 'lice.nse';
  let loc = path.join(app.getPath('userData'), filename);
  let exists = fs.existsSync(loc);
  if (exists) {
    let rawdata = fs.readFileSync(loc, 'utf8');
    let result = JSON.parse(rawdata);
    return result;
  } else {
    return false;
  }
};

let saveLicense = (license) => {
  const filename = 'lice.nse';
  let data = JSON.stringify(license);
  let loc = path.join(app.getPath('userData'), filename);

  fs.writeFileSync(loc, data);
  console.log('Saved');
};

window.Activate = (license) => {
  return new Promise((res) => {
    authenticateLicense(license).then((authenticated) => {
      if (authenticated) {
        saveLicense(license);
        res(true);
      } else {
        res(false);
      }
    });
  });
};

window.checkLicense = () => {
  return new Promise((res) => {
    let having = haveLicense();
    if (having) {
      authenticateLicense(having).then(res);
    } else {
      res(false);
    }
  });
};

window.path = () => {
  console.log(app.getPath('userData'));
};
// 13 23 04 10 12 00 32 14 10 33 16 06 29 33 05 07;

let dummy = () => {
  if (!license && !secret) {
    // CREATE LICENSE, DUMP AND ACTIVATE
    let license = licenseDebug(obj);
    console.log(license);

    // NOW CHECK IF LICENSE IS GOOD
    let decode = true;

    if (decode) {
      let activationCodePromise = new Promise(createActivationCode).then(
        (activationCode) => {
          let debug = licenseDebug({ activationCode, secret: license.secret });
          console.log(debug);
          if (
            license.license === debug.license &&
            license.secret === debug.secret
          ) {
            console.log('Activation Success');
          }
        },
      );
    }
  }
};
