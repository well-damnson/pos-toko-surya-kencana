const machineId = require('node-machine-id').machineId;
const fs = require('fs');
const EE = require('events');
const CryptoJS = require('crypto-js');

const licenseEmitter = new EE();
const path = './lice.nse';

const _SECRET_ = 'P3k5i445OjNa';

// {
//   license: String,
//   secret: String
// }

// AES(UUID, SECRET) = LICENSE

function encrypt(data, secret) {
  console.log('process: encrypt', {data, secret});
  if (typeof data !== 'string' || data instanceof String) {
    data = data.toString();
  }
  let result = CryptoJS.AES.encrypt(data, secret || _SECRET_).toString();
  let result1 = CryptoJS.AES.encrypt(data, _SECRET_).toString();
  console.log('result: encrypt', {result, result1});
  return result;
}
function decrypt(data, secret) {
  let result = CryptoJS.AES.decrypt(data, secret || _SECRET_).toString(
    CryptoJS.enc.Utf8,
  );
  return result;
}

function checkValid(licenseWithSecret, uuid) {
  console.log('process: checkValid', {...licenseWithSecret, uuid});
  let {license, secret} = licenseWithSecret;
  if (license !== undefined && license.length > 0) {
    let decrypted = decrypt(license, secret);
    if (decrypted === uuid) return true;
  } else {
    return false;
  }
}

async function checkFile() {
  console.log('checking license');
  let rawdata = await fs.readFileSync(path, 'utf8');
  console.log(rawdata);
  let licenseWithSecret = JSON.parse(decrypt(rawdata));
  let uuid = await machineId(true);
  return checkValid(licenseWithSecret, uuid);
}

function setApp(app, value) {
  app.set('licenseValid', value);
  console.log('License:', app.get('licenseValid'));
}

function randomString(length) {
  let available = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
  ];
  let result = '';
  for (let index = 0; index < length; index++) {
    result += available[Math.floor(Math.random() * available.length)];
  }
  return result;
}
async function debugTest() {
  let uuid = await machineId(true);
  let secret = randomString(10);
  let license = encrypt(uuid, secret);
  let decrypted = decrypt(license, secret);
  let toConsole = {uuid, secret, license, decrypted};
  console.log('TESTING: ', toConsole);
  // return {license, secret};
}

async function test(app) {
  let make = async function(license, secret) {
    let uuid = await machineId(true);
    console.log('process: make', {license, secret, uuid});
    let valid = checkValid({license, secret}, uuid);
    console.log('result: make', valid);
    if (valid) {
      try {
        let data = encrypt(JSON.stringify({license, secret}));
        console.log(data);
        await fs.writeFileSync(path, data);
      } catch (error) {
        console.log(error);
      }
      setApp(app, true);
      licenseEmitter.removeAllListeners('newLicense');
      licenseEmitter.emit('resultLicense', true);
    } else {
      licenseEmitter.emit('resultLicense', false);
    }
  };
  try {
    if (fs.existsSync(path)) {
      //file exists
      console.log('license file exist');
      let checkResult = await checkFile();
      if (checkResult) {
        console.log('Thank You for Buying this Software');
        setApp(app, true);
      } else {
        console.log('License File Exists but License Not Valid');
        setApp(app, false);
        licenseEmitter.on('newLicense', make);
      }
    } else {
      //file not exists
      console.log('License File NOT Exist');
      console.log('Ask Support for Licensing');
      if (process.env.NODE_ENV !== 'production') await debugTest();
      // console.log('Testing:', await debugTest());

      setApp(app, false);
      licenseEmitter.on('newLicense', make);
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  license: test,
  licenseEvent: licenseEmitter,
};
