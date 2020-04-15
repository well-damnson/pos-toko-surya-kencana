import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Item,
  Input,
  Content,
  Text,
  StyleProvider,
  Button,
  Form,
  Picker,
} from 'native-base';
import { View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Hook from '@/wrapper';

let ModalTambahItem = ({ submit, close }) => {
  let defaultState = {
    nama: '',
    jenis: '-',
    jenisBaru: '',
    berat: '',
    kadar: '',
    posisi: '-',
    posisiBaru: '',
    picture: '',
    beli: '',
  };

  let [state, setState] = useState({
    ...defaultState,
  });

  let [toSubmit, setToSubmit] = useState({});

  useEffect(() => {
    let {
      nama,
      jenis,
      jenisBaru,
      berat,
      kadar,
      posisi,
      posisiBaru,
      beli,
      picture,
    } = state;
    setToSubmit({
      nama,
      jenis: jenis === '-' ? jenisBaru : jenis,
      berat,
      kadar,
      posisi: posisi === '-' ? posisiBaru : posisi,
      beli,
      picture,
    });
  }, [state]);

  let [jenisList, setJenisList] = useState([]);
  let [posisiList, setPosisiList] = useState([]);

  let { Client } = Hook.useClientState();

  let setter = (key, value, numberOnly = false) => {
    if (numberOnly) {
      value = value.replace(/[^\d.-]/g, '');
    }
    setState((state) => ({ ...state, [key]: value }));
  };
  useEffect(() => {
    let jenisList = {};
    let posisList = {};
    let dataFetch = async () => {
      let itemAreaServices = Client.service('item-area');
      let data = await itemAreaServices.find();
      data.forEach(({ posisi, jenis }) => {
        jenisList[jenis] = true;
        posisiList[posisi] = true;
      });
      setJenisList(Object.keys(jenisList));
      setPosisiList(Object.keys(posisiList));
    };
    dataFetch();
  }, []);

  console.log(state);

  return (
    <Container>
      <Content>
        <Grid>
          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Nama:</Text>
            <View style={{ flex: 0.2 }} />
            <Item
              style={{
                flex: 2,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
              }}
              regular
            >
              <Input
                value={state.nama}
                onChangeText={(text) => setter('nama', text)}
                style={{ height: '3vh' }}
              />
            </Item>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Jenis:</Text>
            <View style={{ flex: 0.2 }} />
            <Form
              style={{
                flex: 2,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
                paddingLeft: state.jenis === '-' ? 30 : 0,
              }}
            >
              <Picker
                mode="dropdown"
                placeholder="jenis"
                // placeholderStyle={{ color: "#bfc6ea" }}
                // placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={state.jenis}
                onValueChange={(value) => {
                  setter('jenis', value);
                }}
              >
                <Picker.Item label="Buat Baru" value="-" />
                {jenisList.map((value, index) => (
                  <Picker.Item key={index} label={value} value={value} />
                ))}
              </Picker>
            </Form>
            <div
              style={{
                alignSelf: 'center',
                display: state.jenis === '-' ? 'block' : 'none',
                marginLeft: 20,
              }}
            >
              <TextInput
                style={{
                  width: '10vw',
                  height: '3vh',
                  borderWidth: '1px',
                }}
                value={state.jenisBaru}
                onChangeText={(text) => setter('jenisBaru', text)}
              />
            </div>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Berat: </Text>
            <View style={{ flex: 0.2 }} />
            <Item
              style={{
                flex: 1.5,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
              }}
              regular
            >
              <Input
                value={state.berat}
                onChangeText={(text) => setter('berat', text)}
                style={{ height: '3vh' }}
              />
            </Item>
            <Text style={{ marginHorizontal: 10 }}>gr</Text>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Kadar:</Text>
            <View style={{ flex: 0.2 }} />
            <Item
              style={{
                flex: 1.5,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
              }}
              regular
            >
              <Input
                value={state.kadar}
                onChangeText={(text) => setter('kadar', text)}
                style={{ height: '3vh' }}
              />
            </Item>
            <Text style={{ marginHorizontal: 10 }}>%</Text>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Posisi:</Text>
            <View style={{ flex: 0.2 }} />
            <Form
              style={{
                flex: 2,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
                paddingLeft: state.posisi === '-' ? 30 : 0,
              }}
            >
              <Picker
                mode="dropdown"
                placeholder="Select your SIM"
                placeholderStyle={{ color: '#bfc6ea' }}
                placeholderIconColor="#007aff"
                style={{ width: undefined }}
                selectedValue={state.posisi}
                onValueChange={(value) => setter('posisi', value)}
              >
                <Picker.Item label="Buat Baru" value="-" />
                {posisiList.map((value, index) => (
                  <Picker.Item key={index} label={value} value={value} />
                ))}
              </Picker>
            </Form>
            <div
              style={{
                alignSelf: 'center',
                display: state.posisi === '-' ? 'block' : 'none',
                marginLeft: 20,
              }}
            >
              <TextInput
                style={{
                  width: '10vw',
                  height: '3vh',
                  borderWidth: '1px',
                }}
                value={state.posisiBaru}
                onChangeText={(text) => setter('posisiBaru', text)}
              />
            </div>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Gambar:</Text>
            <View style={{ flex: 0.2 }} />
            <Button
              rounded
              light
              style={{
                flex: 1,
                alignSelf: 'center',
                height: '3vh',
                justifyContent: 'center',
                backgroundColor: '#D9D9D9',
                width: '20vw',
              }}
            >
              <Text>Unggah</Text>
            </Button>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Harga Beli:</Text>
            <View style={{ flex: 0.2 }} />

            <Item
              style={{
                flex: 2,
                alignSelf: 'center',
                height: '3vh',
                backgroundColor: '#FFF',
                width: '20vw',
              }}
              regular
            >
              <Input
                style={{ height: '3vh' }}
                value={state.beli}
                onChangeText={(text) => setter('beli', text)}
              />
            </Item>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row style={{ margin: 10 }}>
            <View style={{ flex: 3 }} />
            <Button
              rounded
              light
              style={{ backgroundColor: '#D9D9D9' }}
              onPress={() => {
                submit(toSubmit);
                setState(defaultState);
              }}
            >
              <Text>Simpan</Text>
            </Button>
            <View style={{ flex: 1, flexGrow: 10, flexBasis: 25 }} />
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default ModalTambahItem;

// dibawah ini gk dipake
class ContentExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selected2: undefined,
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value,
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value,
    });
  }
  render() {
    console.log(this.props);
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Nama:</Text>
              <View style={{ flex: 0.2 }} />
              <Item
                style={{
                  flex: 2,
                  alignSelf: 'center',
                  height: '3vh',
                  backgroundColor: '#FFF',
                  width: '20vw',
                }}
                regular
              >
                <Input style={{ height: '3vh' }} />
              </Item>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Jenis:</Text>
              <View style={{ flex: 0.2 }} />
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
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}
                >
                  <Picker.Item label="Pilih" value="key0" />
                  <Picker.Item label="Kalung" value="key1" />
                  <Picker.Item label="Liontin" value="key2" />
                  <Picker.Item label="Anting" value="key3" />
                  <Picker.Item label="Cincin" value="key4" />
                </Picker>
              </Form>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Berat: </Text>
              <View style={{ flex: 0.2 }} />
              <Item
                style={{
                  flex: 1.5,
                  alignSelf: 'center',
                  height: '3vh',
                  backgroundColor: '#FFF',
                  width: '20vw',
                }}
                regular
              >
                <Input style={{ height: '3vh' }} />
              </Item>
              <Text style={{ marginHorizontal: 10 }}>gr</Text>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Kadar:</Text>
              <View style={{ flex: 0.2 }} />
              <Item
                style={{
                  flex: 1.5,
                  alignSelf: 'center',
                  height: '3vh',
                  backgroundColor: '#FFF',
                  width: '20vw',
                }}
                regular
              >
                <Input style={{ height: '3vh' }} />
              </Item>
              <Text style={{ marginHorizontal: 10 }}>%</Text>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Posisi:</Text>
              <View style={{ flex: 0.2 }} />
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
                  placeholder="Select your SIM"
                  placeholderStyle={{ color: '#bfc6ea' }}
                  placeholderIconColor="#007aff"
                  style={{ width: undefined }}
                  selectedValue={this.state.selected2}
                  onValueChange2={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Pilih" value="key0" />
                  <Picker.Item label="A1" value="key1" />
                  <Picker.Item label="A2" value="key2" />
                  <Picker.Item label="B1" value="key3" />
                  <Picker.Item label="B2" value="key4" />
                </Picker>
              </Form>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Gambar:</Text>
              <View style={{ flex: 0.2 }} />
              <Button
                rounded
                light
                style={{
                  flex: 1,
                  alignSelf: 'center',
                  height: '3vh',
                  justifyContent: 'center',
                  backgroundColor: '#D9D9D9',
                  width: '20vw',
                }}
              >
                <Text>Unggah</Text>
              </Button>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Harga Beli:</Text>
              <View style={{ flex: 0.2 }} />

              <Item
                style={{
                  flex: 2,
                  alignSelf: 'center',
                  height: '3vh',
                  backgroundColor: '#FFF',
                  width: '20vw',
                }}
                regular
              >
                <Input style={{ height: '3vh' }} />
              </Item>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <View style={{ flex: 3 }} />
              <Button rounded light style={{ backgroundColor: '#D9D9D9' }}>
                <Text>Simpan</Text>
              </Button>
              <View style={{ flex: 1, flexGrow: 10, flexBasis: 25 }} />
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
