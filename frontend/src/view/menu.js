import React, { Component } from "react";
import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Text,
  StyleProvider
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "./native-base-theme/components";
import custom from "./native-base-theme/variables/custom";

export default class Menu extends Component {
  render() {
    const uri = "https://unsplash.it/400/400";
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container>
          <Content contentContainerStyle={{ flex: 1 }}>
            <Grid>
              <Col
                size={20}
                style={{
                  backgroundColor: "#635DB7",
                  height: "100vh",
                  borderWidth: 1
                }}
              >
                <Row
                  size={30}
                  style={{
                    backgroundColor: "#635DB7",
                    justifyContent: "center"
                  }}
                >
                  <Thumbnail
                    style={{
                      height: 200,
                      width: 200,
                      alignSelf: "center",
                      borderRadius: 100
                    }}
                    source={{ uri: uri }}
                  ></Thumbnail>
                </Row>
                <Row size={70} style={{ backgroundColor: "#98a45f" }}>
                  <Col>
                    <ListItem itemDivider>
                      <Text style={{ fontSize: 24 }}>Transaksi</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("x")}>
                      <Text>Jual</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("x")}>
                      <Text>Beli</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("x")}>
                      <Text>Tukar Tambah</Text>
                    </ListItem>
                    <ListItem itemDivider>
                      <Text style={{ fontSize: 24 }}>Member</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("y")}>
                      <Text>Tambah Member</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("y")}>
                      <Text>List Member</Text>
                    </ListItem>
                    <ListItem itemDivider button>
                      <Text style={{ fontSize: 1 }}> </Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("z")}>
                      <Text style={{ fontSize: 24 }}>Laporan</Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("z")}>
                      <Text style={{ fontSize: 24 }}>Print Barcode</Text>
                    </ListItem>
                    <ListItem itemDivider button>
                      <Text style={{ fontSize: 24 }}> News Feed </Text>
                    </ListItem>
                    <ListItem button onPress={() => console.log("z")}>
                      <Text>Member Ber-ulang tahun</Text>
                    </ListItem>
                    <ListItem last button onPress={() => console.log("z")}>
                      <Text>Member > 25 Poin </Text>
                    </ListItem>
                  </Col>
                </Row>
              </Col>
              <Col size={80}></Col>
            </Grid>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}