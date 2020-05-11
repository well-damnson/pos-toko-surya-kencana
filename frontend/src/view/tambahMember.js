import React, { Component, useState } from "react";
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
import Pastel from "../context/color";

import Hook from "@/wrapper";

let TambahMember = () => {
  let defaultState = {
    nama: "",
    alamat: "",
    hp: "",
    lahir: ["", "", ""],
    barcode: "",
    type: "member",
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

  let submit = async () => {
    if (
      state.nama.length &&
      state.alamat.length &&
      state.hp.length &&
      state.lahir[0].length &&
      state.lahir[1].length &&
      state.lahir[2].length &&
      state.barcode.length
    ) {
      try {
        let RegistrationServices = Client.service("register");
        let result = await RegistrationServices.create(state);
        console.log(result);
        setState({ ...defaultState });
      } catch (e) {
        console.log(e);
      }
    }
  };

  console.log(state);
  return (
    <Container>
      <Content
        contentContainerStyle={{
          flex: 1,
          backgroundColor: Pastel.lback,
          paddingLeft: 50,
        }}
      >
        <Grid>
          <Row size={10}>
            <Text
              style={{
                flex: 5,
                alignSelf: "center",
                fontSize: 36,
                fontWeight: "bold",
              }}
            >
              Tambah Member
            </Text>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>
          <Row size={10}>
            <Text style={{ flex: 1.5, alignSelf: "center" }}>Nama:</Text>
            <View style={{ flex: 0.2 }} />
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
              <Input
                style={{ height: "3vh" }}
                onChangeText={(text) => setter("nama", text)}
                value={state.nama}
              />
            </Item>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row size={10}>
            <Text style={{ flex: 1.5, alignSelf: "center" }}>
              Tanggal Lahir:{" "}
            </Text>
            <View style={{ flex: 0.2 }} />
            <View
              style={{
                flex: 2.5,
                alignSelf: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TextInput
                type="tel"
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
                onChangeText={(text) => setLahir(0, text)}
                value={state.lahir[0]}
              />
              <TextInput
                type="tel"
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
                onChangeText={(text) => setLahir(1, text)}
                value={state.lahir[1]}
              />
              <TextInput
                type="tel"
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
                onChangeText={(text) => setLahir(2, text)}
                value={state.lahir[2]}
              />
            </View>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row size={10}>
            <Text style={{ flex: 1.5, alignSelf: "center" }}>No HP:</Text>
            <View style={{ flex: 0.2 }} />
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
              <Input
                type="tel"
                style={{ height: "3vh" }}
                onChangeText={(text) => setter("hp", text)}
                value={state.hp}
              />
            </Item>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row size={25} style={{ justifyContent: "center" }}>
            <Text style={{ flex: 1.5, alignSelf: "center" }}>Alamat:</Text>
            <View style={{ flex: 0.2 }} />
            <Form
              style={{
                flex: 2,
                alignSelf: "center",
              }}
            >
              <Textarea
                style={{ backgroundColor: Pastel.white }}
                rowSpan={5}
                bordered
                placeholder="masukan alamat"
                onChangeText={(text) => setter("alamat", text)}
                value={state.alamat}
              />
            </Form>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row size={10}>
            <Text style={{ flex: 1.5, alignSelf: "center" }}>Barcode:</Text>
            <View style={{ flex: 0.2 }} />
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
              <Input
                type="tel"
                style={{ height: "3vh" }}
                onChangeText={(text) => setter("barcode", text)}
                value={state.barcode}
              />
            </Item>
            <View style={{ flex: 2, flexGrow: 10, flexBasis: 25 }} />
          </Row>

          <Row size={10}>
            <View style={{ flex: 3 }} />
            <Button
              rounded
              light
              style={{ backgroundColor: "#D9D9D9" }}
              onPress={submit}
            >
              <Text>Simpan</Text>
            </Button>
            <View style={{ flex: 1, flexGrow: 10, flexBasis: 25 }} />
          </Row>
          <Row size={30}></Row>
        </Grid>
      </Content>
    </Container>
  );
};

export default TambahMember;
