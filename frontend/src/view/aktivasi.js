import React, { Component } from "react";
import {
  Container,
  Input,
  Content,
  Text,
  StyleProvider,
  Button
} from "native-base";
import { View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";

export default class ContentExample extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container style={{ height: "100vh" }}>
          <Content
            contentContainerStyle={{ justifyContent: "center", flex: 1 }}
            style={{ alignSelf: "center" }}
          >
            <Grid style={{ width: "60vw" }}>
              <Row size={25}></Row>
              <Row
                Row
                size={50}
                style={{
                  backgroundColor: "green",
                  justifyContent: "center",
                  borderWidth: 3,
                  borderRadius: 20
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    padding: 20
                  }}
                >
                  <View
                    style={{
                      flexDirection: "Row",
                      justifyContent: "center",
                      flex: 4
                    }}
                  >
                    <Text style={{ fontSize: 48, alignSelf: "center" }}>
                      Activation:{" "}
                    </Text>
                    <Text style={{ fontSize: 48, alignSelf: "center" }}>
                      XXXX-YYYY-ZZZZ-AAAA
                    </Text>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      flexDirection: "Row",
                      justifyContent: "center",
                      flex: 2,
                      paddingHorizontal: 50
                    }}
                  >
                    <View>
                      <Text style={{ fontSize: 48 }}>License: </Text>
                    </View>
                    <View>
                      <Input
                        style={{
                          fontSize: 48,
                          borderWidth: 1,
                          borderRadius: 10
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 1 }} />
                  <View
                    style={{
                      flexDirection: "Row",
                      justifyContent: "center",
                      flex: 2,
                      paddingHorizontal: 50
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: 48,
                          paddingHorizontal: 18
                        }}
                      >
                        Secret:{" "}
                      </Text>
                    </View>
                    <View>
                      <Input
                        style={{
                          fontSize: 48,
                          borderWidth: 1,
                          borderRadius: 10
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ flex: 2 }} />
                  <View
                    style={{
                      flexDirection: "Row",
                      justifyContent: "center",
                      flex: 1
                    }}
                  >
                    <Button light style={{ borderRadius: 10 }}>
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
