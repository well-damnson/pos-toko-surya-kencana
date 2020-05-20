import React, { Component, useState, useEffect } from 'react';
import {
  Container,
  Item,
  Input,
  Content,
  Text,
  Button,
  Form,
  Textarea,
} from 'native-base';
import { View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Hook from '@/wrapper';

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
    return (
      <Container>
        <Content>
          <Grid>
            <Row style={{ margin: 10, justifyContent: 'center' }}>
              <Text style={{ fontSize: 24 }}>Ubah Data Member</Text>
            </Row>
            <Row style={{ margin: 10 }}>
              <Text style={{ alignSelf: 'center', flex: 1.5 }}>Nama:</Text>
              <View style={{ flex: 0.05 }} />
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
            </Row>

            <Row style={{ margin: 10, padding: '5' }}>
              <Text style={{ alignSelf: 'center', flex: 1.5 }}>
                Tanggal Lahir:{' '}
              </Text>
              <View style={{ flex: 0.05 }} />
              <View
                style={{
                  padding: '20',
                  flex: 2.5,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <TextInput
                  placeholder="DD"
                  style={{
                    textAlign: 'center',
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderColor: 'grey',
                    height: '3vh',
                    borderWidth: 1,
                    width: '5vw',
                  }}
                />
                <TextInput
                  placeholder="MM"
                  style={{
                    textAlign: 'center',
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderColor: 'grey',
                    height: '3vh',
                    borderWidth: 1,
                    width: '5vw',
                  }}
                />
                <TextInput
                  placeholder="YYYY"
                  style={{
                    textAlign: 'center',
                    marginRight: 5,
                    backgroundColor: 'white',
                    borderColor: 'grey',
                    height: '3vh',
                    borderWidth: 1,
                    width: '5vw',
                  }}
                />
              </View>
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>No HP:</Text>
              <View style={{ flex: 0.05 }} />
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
            </Row>

            <Row size={3} style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Alamat:</Text>
              <View style={{ flex: 0.05 }} />
              <Form style={{ flex: 2 }}>
                <Textarea rowSpan={5} bordered placeholder="masukan alamat" />
              </Form>
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Barcode:</Text>
              <View style={{ flex: 0.05 }} />
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
            </Row>

            <Row style={{ margin: 10, justifyContent: 'center' }}>
              <Button
                rounded
                light
                style={{ alignSelf: 'center', backgroundColor: '#D9D9D9' }}
              >
                <Text>Simpan</Text>
              </Button>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}

let ModalUbahMember = ({ data, submit }) => {
  let defaultState = {
    nama: '',
    alamat: '',
    hp: '',
    lahir: ['', '', ''],
    barcode: '',
    type: 'member',
  };

  let [state, setState] = useState({
    ...defaultState,
  });

  let { Client } = Hook.useClientState();

  let setter = (key, value) => {
    setState((state) => ({ ...state, [key]: value }));
  };

  let setLahir = (index, value) => {
    let { lahir } = state;
    lahir[index] = value;
    setState((state) => ({ ...state, lahir }));
  };
  useEffect(() => {
    if (data) setState(data);
  }, [data]);

  // let submit = async () => {
  //   if (
  //     state.nama.length &&
  //     state.alamat.length &&
  //     state.hp.length &&
  //     state.lahir[0].length &&
  //     state.lahir[1].length &&
  //     state.lahir[2].length &&
  //     state.barcode.length
  //   ) {
  //     try {
  //       let RegistrationServices = Client.service('register');
  //       let result = await RegistrationServices.create(state);
  //       console.log(result);
  //       setState({ ...defaultState });
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  // };
  console.log(data);

  // console.log(state);
  return (
    <Container>
      <Content>
        <Grid>
          <Row style={{ margin: 10, justifyContent: 'center' }}>
            <Text style={{ fontSize: 24 }}>Ubah Data Member</Text>
          </Row>
          <Row style={{ margin: 10 }}>
            <Text style={{ alignSelf: 'center', flex: 1.5 }}>Nama:</Text>
            <View style={{ flex: 0.05 }} />
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
                value={state.nama}
                onChangeText={(text) => {
                  setter('nama', text);
                }}
              />
            </Item>
          </Row>

          <Row style={{ margin: 10, padding: '5' }}>
            <Text style={{ alignSelf: 'center', flex: 1.5 }}>
              Tanggal Lahir:{' '}
            </Text>
            <View style={{ flex: 0.05 }} />
            <View
              style={{
                padding: '20',
                flex: 2.5,
                alignSelf: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}
            >
              <TextInput
                placeholder="DD"
                style={{
                  textAlign: 'center',
                  marginRight: 5,
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  height: '3vh',
                  borderWidth: 1,
                  width: '5vw',
                }}
                value={state.lahir[0]}
                onChangeText={(text) => {
                  setLahir(0, text);
                }}
              />
              <TextInput
                placeholder="MM"
                style={{
                  textAlign: 'center',
                  marginRight: 5,
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  height: '3vh',
                  borderWidth: 1,
                  width: '5vw',
                }}
                value={state.lahir[1]}
                onChangeText={(text) => {
                  setLahir(1, text);
                }}
              />
              <TextInput
                placeholder="YYYY"
                style={{
                  textAlign: 'center',
                  marginRight: 5,
                  backgroundColor: 'white',
                  borderColor: 'grey',
                  height: '3vh',
                  borderWidth: 1,
                  width: '5vw',
                }}
                value={state.lahir[2]}
                onChangeText={(text) => {
                  setLahir(2, text);
                }}
              />
            </View>
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>No HP:</Text>
            <View style={{ flex: 0.05 }} />
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
                value={state.hp}
                onChangeText={(text) => {
                  setter('hp', text);
                }}
              />
            </Item>
          </Row>

          <Row size={3} style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Alamat:</Text>
            <View style={{ flex: 0.05 }} />
            <Form style={{ flex: 2 }}>
              <Textarea
                rowSpan={5}
                bordered
                placeholder="masukan alamat"
                value={state.alamat}
                onChangeText={(text) => {
                  setter('alamat', text);
                }}
              />
            </Form>
          </Row>

          <Row style={{ margin: 10 }}>
            <Text style={{ flex: 1.5 }}>Barcode:</Text>
            <View style={{ flex: 0.05 }} />
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
                value={state.barcode}
                onChangeText={(text) => {
                  setter('barcode', text);
                }}
              />
            </Item>
          </Row>

          <Row style={{ margin: 10, justifyContent: 'center' }}>
            <Button
              rounded
              light
              style={{ alignSelf: 'center', backgroundColor: '#D9D9D9' }}
              onPress={()=>{submit(state)}}
            >
              <Text>Simpan</Text>
            </Button>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default ModalUbahMember;
