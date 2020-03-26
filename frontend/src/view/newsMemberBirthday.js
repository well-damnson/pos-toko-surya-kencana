import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Item,
  StyleProvider,
} from 'native-base';
import { Text, View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';
import { currency } from '../utils';

import Hook from '@/wrapper';

// Use prebuilt version of RNVI in dist folder
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// Generate required css
import iconFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

// section 1 - Header               untuk memasukan barcode member
// section 2 - Label penanda        penanda halaman
// section 3 - Tabel Utama          Jual/Beli/Tukar sesuai kebutuhan
//  section 3.1 - whitespace        untuk memberikan kesan rapih
//  section 3.2 - Tabel             seperti namanya
//   section 3.2.1 - Tabel          fungsi utama ada di sini
//   section 3.2.2 - Total harga    untuk me-rekap total jual/beli
//  section 3.3 - Tombol Aksi       lokasi tombol sesuai kebutuhan
// section 4 - whitespace           untuk estetik

let NewsBirthday = () => {
  let { Client } = Hook.useClientState();
  let [data, setData] = useState([]);
  useEffect(() => {
    let birthdayFetch = async () => {
      let newsServices = Client.service('news');
      let { birthday } = await newsServices.find();
      console.log(birthday);
      return birthday;
    };
    let data = birthdayFetch();
    setData(data);
  }, []);
  return (
    <StyleProvider style={getTheme(custom)}>
      <Container>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Grid>
            <Row size={2}></Row>
            <Row size={100} style={{ backgroundColor: '#f2e3c6' }}>
              <Grid style={{ padding: 10 }}>
                <Col size={2}></Col>
                <Col size={75} style={{ backgroundColor: '#c2eec7' }}>
                  <Row size={95}>
                    <Col
                      size={10}
                      style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}
                    >
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Nomor
                      </Text>
                    </Col>
                    <Col
                      size={25}
                      style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}
                    >
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Nama
                      </Text>
                    </Col>
                    <Col
                      size={25}
                      style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}
                    >
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        No. Telefon
                      </Text>
                    </Col>
                    <Col
                      size={50}
                      style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}
                    >
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Alamat
                      </Text>
                    </Col>
                    <Col
                      size={25}
                      style={{ backgroundColor: '#f6dbdb', borderWidth: 1 }}
                    >
                      <Text style={{ alignSelf: 'center', fontSize: 24 }}>
                        Ulang Tahun
                      </Text>
                    </Col>
                  </Row>
                  {/*section 3.2.2 - total harga */}
                </Col>
                {/* section 3.3 Tombol Aksi*/}
                <Col size={2}></Col>
              </Grid>
            </Row>
            {/* section 4 - white space */}
            <Row size={2} style={{ backgroundColor: '#FFF' }}></Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
};

export default NewsBirthday;
