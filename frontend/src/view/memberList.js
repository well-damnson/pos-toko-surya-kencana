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
import { Text, View, TextInput } from "react-native";
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
                size={15}
                style={{ backgroundColor: "#d3ece1", justifyContent: "center" }}
              >
                <Grid>
                  <Col>
                    <Row
                      style={{
                        backgroundColor: "#d3ece1",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ alignSelf: "center" }}>Barcode: </Text>
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
                    </Row>
                    <Row
                      style={{
                        backgroundColor: "#d3ece1",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ alignSelf: "center", marginRight: 10 }}>
                        Nama:{" "}
                      </Text>
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
                    </Row>
                  </Col>
                  <Col>
                    <Row
                      style={{
                        backgroundColor: "#d3ece1",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ alignSelf: "center" }}>Tgl Lahir: </Text>
                      <TextInput
                        placeholder="DD"
                        style={{
                          textAlign: "center",
                          marginTop: 12,
                          marginRight: 5,
                          backgroundColor: "white",
                          borderColor: "grey",
                          height: "3vh",
                          borderWidth: 1,
                          width: "5vw"
                        }}
                      />
                      <TextInput
                        placeholder="MM"
                        style={{
                          textAlign: "center",
                          marginTop: 12,
                          marginRight: 5,
                          backgroundColor: "white",
                          borderColor: "grey",
                          height: "3vh",
                          borderWidth: 1,
                          width: "5vw"
                        }}
                      />
                      <TextInput
                        placeholder="YYYY"
                        style={{
                          textAlign: "center",
                          marginTop: 12,
                          marginRight: 5,
                          backgroundColor: "white",
                          borderColor: "grey",
                          height: "3vh",
                          borderWidth: 1,
                          width: "5vw"
                        }}
                      />
                    </Row>
                    <Row
                      style={{
                        backgroundColor: "#d3ece1",
                        justifyContent: "center"
                      }}
                    >
                      <Text style={{ alignSelf: "center", marginRight: 10 }}>
                        No. HP:{}
                      </Text>
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
                    </Row>
                  </Col>
                  <Col />
                </Grid>
              </Row>
              {/* section 3 - tabel penjualan */}
              <Row size={100} style={{ backgroundColor: "#f2e3c6" }}>
                <Grid>
                  {/* section 3.1 - whitespace */}
                  <Col size={2}></Col>
                  {/* section 3.2 - tabel */}
                  <Col size={75} style={{ backgroundColor: "#c2eec7" }}>
                    {/* section 3.2.1 - tabel isi */}
                    <Row size={95}>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Nomor
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Nama
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          No. Telefon
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Tanggal Lahir
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Alamat
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Poin
                        </Text>
                      </Col>
                      <Col
                        style={{ backgroundColor: "#f6dbdb", borderWidth: 1 }}
                      >
                        <Text style={{ alignSelf: "center", fontSize: 24 }}>
                          Tools
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
              <Row size={2} style={{ backgroundColor: "#FFF" }}></Row>
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
