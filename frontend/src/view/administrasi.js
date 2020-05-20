import React, { Component } from 'react';
import { Container, Input, Content, Text, Button } from 'native-base';
import { View, TextInput } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

import Hook from '@/wrapper';
let Admin = () => {
  let { Client } = Hook.useClientState();

  let [state, setState] = React.useState({
    license: 'abcd-efgh-ijkl-mnop-abcd-efgh-ijkl-mnop-abcd-efgh-ijkl-mnop',
    secret: 'abcd-efgh-ijkl-mnop',
  });
  let toSubmitDefault = {
    name: '',
    password: '',
    type: 'admin',
  };
  let [toSubmit, setToSubmit] = React.useState({
    ...toSubmitDefault,
  });
  let setter = (key, value) => {
    setToSubmit((state) => ({ ...state, [key]: value }));
  };
  React.useEffect(() => {
    let newState = window.checkHavingLicense();
    console.log(newState);
    setState(newState);
  }, []);

  let submit = () => {
    let submitData = async () => {
      let Services = Client.service('register');
      let data = await Services.create(toSubmit);
      console.log(data);
      if (data._id) {
        setToSubmit(toSubmitDefault);
      }
    };
    submitData();
  };
  return (
    <Container style={{ height: '100vh' }}>
      <Content
        contentContainerStyle={{
          justifyContent: 'flex-start',
          flex: 1,
        }}
      >
        <Grid>
          <Row size={25}>
            <Col
              size={40}
              style={{
                borderBottomWidth: 2,
                borderBottomColor: 'black',
                padding: 30,
                paddingTop: 50,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  License:{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {state.license}
                </Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  Secret:{' '}
                </Text>
                <Text
                  style={{
                    fontSize: 24,
                  }}
                >
                  {state.secret}
                </Text>
              </View>
            </Col>
            <Col size={60}></Col>
          </Row>
          <Col size={75}>
            <Row size={2} style={{ padding: 20 }}>
              <Text style={{ fontSize: 24 }}>Tambah Admin</Text>
            </Row>
            <Row size={2} style={{ padding: 25 }}>
              <Text style={{ fontSize: 24 }}>Nama: </Text>
              <TextInput
                style={{
                  height: 24,
                  borderWidth: 1,
                  borderColor: 'grey',
                  width: '15vw',
                }}
                value={toSubmit.name}
                onChangeText={(text) => {
                  setter('name', text);
                }}
              />
            </Row>
            <Row size={2} style={{ padding: 25 }}>
              <Text style={{ fontSize: 24 }}>Sandi: </Text>
              <TextInput
                secureTextEntry={true}
                style={{
                  height: 24,
                  borderWidth: 1,
                  borderColor: 'grey',
                  width: '15vw',
                }}
                value={toSubmit.password}
                onChangeText={(text) => {
                  setter('password', text);
                }}
              />
            </Row>
            <Row size={2} style={{ padding: 25 }}>
              <Button onPress={submit}>
                <Text>Simpan</Text>
              </Button>
            </Row>
            <Row size={80} style={{}}></Row>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};

export default Admin;

class admin extends Component {
  state = {
    license: 'abcd-efgh-ijkl-mnop-abcd-efgh-ijkl-mnop-abcd-efgh-ijkl-mnop',
    secret: 'abcd-efgh-ijkl-mnop',
  };

  render() {
    return (
      <Container style={{ height: '100vh' }}>
        <Content
          contentContainerStyle={{
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          <Grid>
            <Row size={25}>
              <Col
                size={40}
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: 'black',
                  padding: 30,
                  paddingTop: 50,
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    License:{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {this.state.license}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    Secret:{' '}
                  </Text>
                  <Text
                    style={{
                      fontSize: 24,
                    }}
                  >
                    {this.state.secret}
                  </Text>
                </View>
              </Col>
              <Col size={60}></Col>
            </Row>
            <Col size={75}>
              <Row size={2} style={{ padding: 20 }}>
                <Text style={{ fontSize: 24 }}>Tambah Admin</Text>
              </Row>
              <Row size={2} style={{ padding: 25 }}>
                <Text style={{ fontSize: 24 }}>Nama: </Text>
                <TextInput
                  style={{
                    height: 24,
                    borderWidth: 1,
                    borderColor: 'grey',
                    width: '15vw',
                  }}
                />
              </Row>
              <Row size={2} style={{ padding: 25 }}>
                <Text style={{ fontSize: 24 }}>Sandi: </Text>
                <TextInput
                  secureTextEntry={true}
                  style={{
                    height: 24,
                    borderWidth: 1,
                    borderColor: 'grey',
                    width: '15vw',
                  }}
                />
              </Row>
              <Row size={2} style={{ padding: 25 }}>
                <Button>
                  <Text>Simpan</Text>
                </Button>
              </Row>
              <Row size={80} style={{}}></Row>
            </Col>
          </Grid>
        </Content>
      </Container>
    );
  }
}
