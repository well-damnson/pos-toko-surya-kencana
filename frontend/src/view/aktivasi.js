import React, { Component } from "react";
import {
  Container,
  Input,
  Content,
  Text,
  StyleProvider,
  Button,
} from "native-base";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "../native-base-theme/components";
import custom from "../native-base-theme/variables/custom";
import Pastel from "../context/color";

export default class ContentExample extends Component {
  state = {
    license: "",
    secret: "",
    activation: "XXXX-XXXX-XXXX-XXXX",
  };
  async componentDidMount() {
    // let activated = await window.checkLicense();
    // if (activated) {
    //   console.log('Activated already, Activation Not Needed');
    // } else {
    //   console.log('Activation Needed');
    // }
    let res = await window.ActivationCode();
    console.log(res);
    this.setState((state) => ({ ...state, activation: res }));
  }
  handleText = (part, text) => {
    this.setState((state) => ({ ...state, [part]: text }));
  };
  handleActivation = () => {
    window
      .Activate({
        license: this.state.license,
        secret: this.state.secret,
      })
      .then((res) => {
        if (res) {
          console.log("Activation Success");
        }
      });
  };
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container style={{ height: "100vh" }}>
          <Content
            contentContainerStyle={{
              justifyContent: "center",
              flex: 1,
            }}
            style={{ alignSelf: "center" }}
          >
            <Grid style={{ width: "60vw" }}>
              <Row size={25}></Row>
              <Row
                Row
                size={50}
                style={{
                  backgroundColor: Pastel.lback,
                  justifyContent: "center",
                  borderWidth: 3,
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    padding: 20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      flex: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 48,
                        alignSelf: "center",
                      }}
                    >
                      Activation:{" "}
                    </Text>
                    <Text
                      style={{
                        fontSize: 48,
                        alignSelf: "center",
                      }}
                    >
                      {this.state.activation}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      flex: 2,
                      paddingHorizontal: 50,
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 48 }}>License: </Text>
                    </View>
                    <View>
                      <Input
                        onChangeText={(text) => {
                          this.handleText("license", text);
                        }}
                        style={{
                          fontSize: 48,
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      flex: 2,
                      paddingHorizontal: 50,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 48,
                          paddingHorizontal: 18,
                        }}
                      >
                        Secret:{" "}
                      </Text>
                    </View>
                    <View>
                      <Input
                        onChangeText={(text) => {
                          this.handleText("secret", text);
                        }}
                        style={{
                          fontSize: 48,
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 2 }} />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      flex: 1,
                    }}
                  >
                    <Button
                      disabled={false}
                      light
                      style={{ borderRadius: 10 }}
                      onClick={() => {
                        console.log("click");
                        window.Activate({
                          license: this.state.license,
                          secret: this.state.secret,
                        });
                      }}
                    >
                      <Text>Daftar</Text>
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
  }
}
