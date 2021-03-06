import React, { Component } from "react";
import {
  Container,
  Content,
  Thumbnail,
  List,
  ListItem,
  Text,
  StyleProvider,
} from "native-base";
import { Image } from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import getTheme from "../native-base-theme/components";
import custom from "../native-base-theme/variables/custom";
import Pastel from "../context/color";
import image from "../context/logo.jpeg";

import Hook from "@/wrapper";

let Menu = () => {
  const uri = "https://unsplash.it/400/400";
  let [nav, setNav] = Hook.useNav();
  return (
    <Container>
      <Content contentContainerStyle={{ backgroundColor: "#000" }}>
        <Grid>
          <Col size={20} style={{}}>
            <Row
              size={30}
              style={{
                backgroundColor: Pastel.back,
                justifyContent: "center",
              }}
            >
              <Thumbnail
                style={{
                  padding: 1,
                  height: 200,
                  width: 200,
                  alignSelf: "center",
                  borderRadius: 25,
                  resizeMode: "contain",
                }}
                source={{ uri: image }}
              ></Thumbnail>
            </Row>
            <Row size={80} style={{ backgroundColor: Pastel.cell }}>
              <Col>
                <ListItem itemDivider>
                  <Text style={{ fontSize: 24 }}>Transaksi</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("TrxJual")}>
                  <Text>Jual</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("TrxBeli")}>
                  <Text>Beli</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("TrxTukar")}>
                  <Text>Tukar Tambah</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text style={{ fontSize: 24 }}>Member</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("TambahMember")}>
                  <Text>Tambah Member</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("MemberList")}>
                  <Text>List Member</Text>
                </ListItem>
                <ListItem itemDivider>
                  <Text style={{ fontSize: 24 }}>Barang</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("TambahItem")}>
                  <Text>Tambah Barang</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("ItemList")}>
                  <Text>List Barang</Text>
                </ListItem>
                <ListItem itemDivider button>
                  <Text style={{ fontSize: 24 }}> News Feed </Text>
                </ListItem>
                <ListItem button onPress={() => setNav("NewsBirthday")}>
                  <Text>Member Ber-ulang tahun</Text>
                </ListItem>
                <ListItem button onPress={() => setNav("NewsPoin")}>
                  <Text>Member > 25 Poin </Text>
                </ListItem>
                <ListItem itemDivider button onPress={() => setNav("Laporan")}>
                  <Text style={{ fontSize: 24 }}> Laporan </Text>
                </ListItem>
                <ListItem itemDivider button onPress={() => setNav("Barcode")}>
                  <Text style={{ fontSize: 24 }}> Print Barcode </Text>
                </ListItem>
                <ListItem itemDivider button onPress={() => setNav("Admin")}>
                  <Text style={{ fontSize: 24 }}> Administrasi </Text>
                </ListItem>
              </Col>
            </Row>
          </Col>
        </Grid>
      </Content>
    </Container>
  );
};

export default Menu;
