import React, { useRef, useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import ReactToPrint from 'react-to-print';

import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Form,
  Item,
  StyleProvider,
  Picker,
  Icon,
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import getTheme from './../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';

import Hook from '@/wrapper';

let test = (data) => {
  let { nama, berat, kadar, barcode } = data;
  let refer;
  let code = (
    <div ref={(r) => refer}>
      <Barcode
        value={barcode}
        height={50}
        width={2}
        renderer={'canvas'}
        margin={0}
        displayValue={false}
      />
    </div>
  );
  console.log(refer);

  return code;
};

let SingleBarcode = (data) => {
  let { nama, berat, kadar, barcode } = data;
  let code = test(data);
  // <Image style={{ width: 400, height: 200 }} src={}></Image>;

  return (
    <div style={{ marginLeft: 10, marginTop: 4, width: 250 }}>
      <p style={{ margin: 5 }}>{nama}</p>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <div style={{ flexDirection: 'column' }}>
          {code}
          <p style={{ margin: 0, textAlign: 'center' }}>{barcode}</p>
        </div>
        <div
          style={{
            flexDirection: 'column',
            height: 60,
            width: 48,
            marginLeft: 5,
            display: 'flex',
          }}
        >
          <div
            style={{
              display: 'table-cell',
              verticalAlign: 'middle',
            }}
          >
            <p style={{ margin: 0 }}>{berat} gr</p>
          </div>
          <div
            style={{
              margin: 0,
              display: 'table-cell',
              verticalAlign: 'middle',
            }}
          >
            <p style={{ margin: 0 }}>{kadar} %</p>
          </div>
        </div>
      </div>
    </div>
  );
};

let MultiBarcode = (props) => {
  // console.log('PROPS:', props);
  // let randomDataCreator = (number) => {
  //   let samplename = ['CMK', 'ACP', 'SKF', 'REK', 'VKM', 'PRK'];
  //   let result = [];
  //   for (let index = 0; index < number; index++) {
  //     let obj = {};
  //     obj.nama = samplename[Math.floor(Math.random() * samplename.length)];
  //     obj.berat = Math.floor(Math.random() * 40);
  //     obj.kadar = Math.floor(Math.random() * 50) + 45;
  //     obj.barcode = '000000000000';
  //     result.push(obj);
  //   }
  //   return result;
  // };
  // let data = randomDataCreator(37);
  let { data } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'white',
      }}
    >
      {data.map((single, i) => (
        <div style={{ padding: 0 }} key={i}>
          {SingleBarcode(single)}
        </div>
      ))}
    </div>
  );
};

let Page = (props) => {
  let { children } = props;
  return <div style={{ width: 794 }}>{children}</div>;
};

let Render = () => {
  let { Client } = Hook.useClientState();
  let printRef = useRef();
  let [posisi, setPosisi] = useState('-');
  let [pickItem, setPickItem] = useState([]);
  let [printItem, setPrintItem] = useState([]);
  useEffect(() => {
    let fetchFunction = async () => {
      let ItemAreaServices = Client.service('item-area');
      let data = await ItemAreaServices.find();
      console.log(data);
      let pos = {};
      for (let index = 0; index < data.length; index++) {
        const item = data[index];
        let { posisi } = item;
        pos[posisi] = true;
      }
      let pickItem = Object.keys(pos);
      console.log(pickItem);
      setPickItem(pickItem);
    };
    fetchFunction();
  }, []);

  useEffect(() => {
    let fetchFunction = async () => {
      console.log('PICKITEM:', posisi);
      if (posisi === '-') {
        setPrintItem([]);
      } else {
        let ItemAreaServices = Client.service('item-area');
        let data = await ItemAreaServices.find({ query: { posisi } });
        console.log(data);
        setPrintItem(data);
      }
    };
    fetchFunction();
  }, [posisi]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <StyleProvider style={getTheme(custom)}>
          <Form
            style={{
              flex: 2,
              alignSelf: 'center',
              height: '3vh',
              backgroundColor: '#FFF',
              width: '20vw',
            }}
          >
            <Picker
              mode="dropdown"
              style={{ width: undefined }}
              selectedValue={posisi}
              onValueChange={setPosisi}
            >
              <Picker.Item label="Pilih" value="-" />
              {pickItem.map((val, i) => (
                <Picker.Item key={i} label={val} value={val} />
              ))}
            </Picker>
          </Form>
        </StyleProvider>

        <div style={{ flex: 1 }}></div>
        <ReactToPrint
          trigger={() => (
            <p
              style={{
                textAlign: 'right',
                margin: 0,
                padding: '1em',
                backgroundColor: 'blue',
              }}
            >
              Print this out!
            </p>
          )}
          content={() => printRef.current}
          pageStyle={
            '@page { size: A4;  margin: 2mm; } @media print { body { -webkit-print-color-adjust: exact; min-device-pixel-ratio: 2;} }'
          }
        />
      </div>

      <div ref={printRef} style={{ margin: 0 }}>
        <Page>
          <MultiBarcode data={printItem} />
        </Page>
      </div>
    </div>
  );
};

export default Render;
