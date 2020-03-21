import React, { Component, useState } from 'react';
import {
  Container,
  Input,
  Content,
  Text,
  StyleProvider,
  Button,
  Toast,
} from 'native-base';
import { View } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import getTheme from '../native-base-theme/components';
import custom from '../native-base-theme/variables/custom';

import Hook from '@/wrapper';

// export default class ContentExample extends Component {
let Login = () => {
  // static contextType = Context.ClientStateContext;
  let dispatch = Hook.useNav().pop();
  console.log(dispatch);
  let { Client } = Hook.useClientState();
  let [state, setState] = useState({ name: '', password: '', loading: false });
  let onLoginHandler = async () => {
    let res = new Promise((res, rej) => {
      setState((state) => ({ ...state, loading: true }));
      let next = async () => {
        try {
          let { name, password } = state;
          // let Client = this.context.Client;
          Client.authenticate({
            strategy: 'local',
            name,
            password,
          })
            .then(() => {
              console.log('TEST LOGGED IN');
              res(true);
            })
            .catch((e) => {
              console.log('ERROR:', e);
              res(e);
            });
        } catch (error) {
          res(error);
        }
      };
      next();
    });
    let success = await res;
    if (success === true) {
      dispatch('Blank');
    } else {
      // MEANS LOGIN FAILED
      setState((state) => ({ ...state, loading: false }));
    }
  };

  return (
    <StyleProvider style={getTheme(custom)}>
      <Container style={{ height: '100vh' }}>
        <Content
          contentContainerStyle={{
            justifyContent: 'center',
            flex: 1,
          }}
          style={{ alignSelf: 'center' }}
        >
          <Grid style={{ width: '60vw' }}>
            <Row size={25}></Row>
            <Row
              Row
              size={50}
              style={{
                backgroundColor: 'green',
                justifyContent: 'center',
                borderWidth: 3,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                  padding: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 4,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 48,
                      alignSelf: 'center',
                    }}
                  >
                    Login
                  </Text>
                </View>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 2,
                    paddingHorizontal: 50,
                  }}
                >
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 2 }}>
                    <Text style={{ fontSize: 24 }}>Nama: </Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 8 }}>
                    <Input
                      onChangeText={(text) => {
                        setState((state) => ({
                          ...state,
                          name: text,
                        }));
                      }}
                      value={state.name}
                      style={{
                        fontSize: 24,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 2,
                    paddingHorizontal: 50,
                  }}
                >
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 4 }}>
                    <Text
                      style={{
                        fontSize: 24,
                        paddingHorizontal: 18,
                      }}
                    >
                      Password:{' '}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View style={{ flex: 12 }}>
                    <Input
                      secureTextEntry={true}
                      onChangeText={(text) => {
                        setState((state) => ({
                          ...state,
                          password: text,
                        }));
                      }}
                      value={state.password}
                      style={{
                        fontSize: 24,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 2 }} />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    flex: 1,
                  }}
                >
                  <Button
                    disabled={!state.loading}
                    light
                    style={{ borderRadius: 10 }}
                    onClick={() => {
                      onLoginHandler();
                    }}
                  >
                    <Text>Masuk</Text>
                  </Button>
                </View>
                <View style={{ flex: 1 }} />
              </View>
            </Row>
            <Row size={25}></Row>
          </Grid>
        </Content>
      </Container>
    </StyleProvider>
  );
};
export default Login;
