import React, { Component } from "react";
import {
  Container,
  Content,
  Left,
  Right,
  Button,
  Input,
  Item,
  StyleProvider
} from "native-base";
import { Text, View } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "../native-base-theme/components";
import custom from "../native-base-theme/variables/custom";
import { currency } from "../utils";

// Use prebuilt version of RNVI in dist folder
import Icon from "react-native-vector-icons/dist/FontAwesome";

// Generate required css
import iconFont from "react-native-vector-icons/Fonts/FontAwesome.ttf";
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: FontAwesome;
}`;

// Create stylesheet
const style = document.createElement("style");
style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

export default class Jual extends Component {
  render() {
    return (
      <StyleProvider style={getTheme(custom)}>
        <Container>
          <Content contentContainerStyle={{ flex: 1 }}>
            <Grid>
              {/* section 1 - Header */}
              <Row
                size={10}
                style={{ backgroundColor: "#d3ece1", justifyContent: "center" }}
              >
                <Text style={{ alignSelf: "center" }}>Member Barcode: </Text>
                <Item
                  style={{
                    alignSelf: "center",
                    height: "3vh",
                    backgroundColor: "#FFF",
                    width: "15vw"
                  }}
                  regular
                >
                  <Input style={{ height: "3vh" }} />
                </Item>
                <Button
                  light
                  style={{
                    alignSelf: "center",
                    marginLeft: "1vw",
                    borderWidth: 1,
                    borderRadius: 15
                  }}
                >
                  <Text> Tambahkan Manual </Text>
                </Button>
              </Row>
              {/* section 2 - label penanda jual */}
              <Row
                size={7}
                style={{ backgroundColor: "#FFF", justifyContent: "center" }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: "5vw",
                    fontSize: 24,
                    padding: 5
                  }}
                >
                  Barang Dijual
                </Text>
              </Row>
              {/* section 3 - tabel penjualan */}
              <Row size={75} style={{ backgroundColor: "#f2e3c6" }}>
                <Grid>
                  {/* section 3.1 - whitespace */}
                  <Col size={5}></Col>
                  {/* section 3.2 - tabel */}
                  <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                    {/* section 3.2.1 - tabel isi */}
                    <Row size={95}>
                      <Col
                        size={5}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Nomor
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Kode Barang
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Berat
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Kadar
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Harga
                        </Text>
                      </Col>
                      <Col
                        size={10}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Tools
                        </Text>
                      </Col>
                    </Row>
                    {/*section 3.2.2 - total harga */}
                    <Row
                      size={10}
                      style={{
                        backgroundColor: "#c2eec7",
                        justifyContent: "center",
                        borderWidth: 1
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        Total Harga
                      </Text>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        {currency()}
                      </Text>
                    </Row>
                  </Col>
                  {/* section 3.3 Tombol Aksi*/}
                  <Col size={20}>
                    <Button
                      light
                      style={{
                        alignSelf: "center",
                        marginLeft: "1vw",
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 50,
                        width: "10vw",
                        justifyContent: "center"
                      }}
                    >
                      <Text>Tambah Barang</Text>
                    </Button>
                    <View style={{ flex: 1 }}></View>
                  </Col>
                </Grid>
              </Row>
              <Row
                size={7}
                style={{ backgroundColor: "#FFF", justifyContent: "center" }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginLeft: "5vw",
                    fontSize: 24,
                    padding: 5
                  }}
                >
                  Barang DiBeli
                </Text>
              </Row>
              {/* section 3 - tabel penjualan */}
              <Row size={75} style={{ backgroundColor: "#f2e3c6" }}>
                <Grid>
                  {/* section 3.1 - whitespace */}
                  <Col size={5}></Col>
                  {/* section 3.2 - tabel */}
                  <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                    {/* section 3.2.1 - tabel isi */}
                    <Row size={95}>
                      <Col
                        size={5}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Nomor
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Berat
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Kadar
                        </Text>
                      </Col>
                      <Col
                        size={15}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Harga
                        </Text>
                      </Col>
                      <Col
                        size={10}
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Tools
                        </Text>
                      </Col>
                    </Row>
                    {/*section 3.2.2 - total harga */}
                    <Row
                      size={10}
                      style={{
                        backgroundColor: "#c2eec7",
                        justifyContent: "center",
                        borderWidth: 1
                      }}
                    >
                      <Text
                        style={{
                          alignSelf: "center",
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        Total Harga
                      </Text>
                      <Text
                        style={{
                          alignSelf: "center",
                          fontWeight: "bold",
                          fontSize: 24
                        }}
                      >
                        {currency()}
                      </Text>
                    </Row>
                  </Col>
                  {/* section 3.3 Tombol Aksi*/}
                  <Col size={20}>
                    <Button
                      light
                      style={{
                        alignSelf: "center",
                        marginLeft: "1vw",
                        borderWidth: 1,
                        borderRadius: 15,
                        marginTop: 50,
                        width: "10vw",
                        justifyContent: "center"
                      }}
                    >
                      <Text>Tambah Barang</Text>
                    </Button>
                    <View style={{ flex: 1 }}></View>
                    <Button
                      light
                      style={{
                        alignSelf: "center",
                        marginLeft: "1vw",
                        borderWidth: 1,
                        borderRadius: 15,
                        marginBottom: 50,
                        width: "10vw",
                        justifyContent: "center"
                      }}
                    >
                      <Text> Selesai </Text>
                    </Button>
                  </Col>
                </Grid>
              </Row>
              {/* section 4 - white space */}
              <Row size={1} style={{ backgroundColor: "#FFF" }}></Row>
            </Grid>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

// section 1 - Header               untuk memasukan barcode member
// section 2 - Label penanda        penanda halaman
// section 3 - Tabel Utama          Jual/Beli/Tukar sesuai kebutuhan
//  section 3.1 - whitespace        untuk memberikan kesan rapih
//  section 3.2 - Tabel             seperti namanya
//   section 3.2.1 - Tabel          fungsi utama ada di sini
//   section 3.2.2 - Total harga    untuk me-rekap total jual/beli
//  section 3.3 - Tombol Aksi       lokasi tombol sesuai kebutuhan
// section 4 - whitespace           untuk estetik
