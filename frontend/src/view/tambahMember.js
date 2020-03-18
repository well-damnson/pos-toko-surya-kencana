import React, { Component } from "react";
import {
  Container,
  Item,
  Input,
  Content,
  Text,
  Button,
  Form,
  Textarea
} from "native-base";
import { View, TextInput } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";

export default class ContentExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      selected2: undefined
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }
  render() {
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
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw"
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
              </Item>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Tanggal Lahir: </Text>
              <View style={{ flex: 0.2 }} />
              {/* <Item
                style={{
                  flex: 4,
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw"
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
                <Input style={{ height: "3vh" }} />
                <Input style={{ height: "3vh" }} />
              </Item> */}
              <View
                style={{
                  flex: 2.5,
                  alignSelf: "center",
                  justifyContent: "center",
                  flexDirection: "row"
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
                    width: "5vw"
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
                    width: "5vw"
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
                    width: "5vw"
                  }}
                />
              </View>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>No HP:</Text>
              <View style={{ flex: 0.2 }} />
              <Item
                style={{
                  flex: 2,
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw"
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
              </Item>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row size={3} style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Alamat:</Text>
              <View style={{ flex: 0.2 }} />
              <Form style={{ flex: 2 }}>
                <Textarea rowSpan={5} bordered placeholder="masukan alamat" />
              </Form>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <Text style={{ flex: 1.5 }}>Barcode:</Text>
              <View style={{ flex: 0.2 }} />
              <Item
                style={{
                  flex: 2,
                  alignSelf: "center",
                  height: "3vh",
                  backgroundColor: "#FFF",
                  width: "20vw"
                }}
                regular
              >
                <Input style={{ height: "3vh" }} />
              </Item>
              <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
            </Row>

            <Row style={{ margin: 10 }}>
              <View style={{ flex: 3 }} />
              <Button rounded light style={{ backgroundColor: "#D9D9D9" }}>
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
