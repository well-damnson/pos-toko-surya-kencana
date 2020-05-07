import React, { Component } from "react";
import {
  Container,
  Item,
  Input,
  Content,
  Text,
  Button,
  Form,
  Textarea,
} from "native-base";
import { View, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ContentExample extends Component {
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
            <Row style={{ margin: 10, justifyContent: "center" }}>
              <Text style={{ fontSize: 24 }}>Ubah Data Member</Text>
            </Row>
            <Row style={{ margin: 10 }}>
              <Text style={{ alignSelf: "center", flex: 1.5 }}>Nama:</Text>
              <View style={{ flex: 0.05 }} />
              <Item
                style={{
                  flex: 2,
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw",
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
              </Item>
            </Row>

            <Row style={{ margin: 10, padding: "5" }}>
              <Text style={{ alignSelf: "center", flex: 1.5 }}>
                Tanggal Lahir:{" "}
              </Text>
              <View style={{ flex: 0.05 }} />
              <View
                style={{
                  padding: "20",
                  flex: 2.5,
                  alignSelf: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  placeholder="DD"
                  style={{
                    textAlign: "center",
                    marginRight: 5,
                    backgroundColor: "white",
                    borderColor: "grey",
                    height: "3vh",
                    borderWidth: 1,
                    width: "5vw",
                  }}
                />
                <TextInput
                  placeholder="MM"
                  style={{
                    textAlign: "center",
                    marginRight: 5,
                    backgroundColor: "white",
                    borderColor: "grey",
                    height: "3vh",
                    borderWidth: 1,
                    width: "5vw",
                  }}
                />
                <TextInput
                  placeholder="YYYY"
                  style={{
                    textAlign: "center",
                    marginRight: 5,
                    backgroundColor: "white",
                    borderColor: "grey",
                    height: "3vh",
                    borderWidth: 1,
                    width: "5vw",
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
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw",
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
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
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw",
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
              </Item>
            </Row>

            <Row style={{ margin: 10, justifyContent: "center" }}>
              <Button
                rounded
                light
                style={{ alignSelf: "center", backgroundColor: "#D9D9D9" }}
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
