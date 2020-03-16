import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class AnatomyExample extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: "#DCDCDC",
          width: "18vw",
          height: "24vh",
          justifyContent: "center",
          alignItem: "center",
          borderWidth: 1,
          borderRadius: 15,
          padding: 15
        }}
      >
        <Text style={{ alignSelf: "center", marginVertical: "10" }}>
          Anda Yakin untuk Menghapus?
        </Text>
        <View style={{ flex: 0.1 }} />
        <Button title="ya" />
        <View style={{ flex: 0.1 }} />
        <Button title="tidak" />
      </View>
    );
  }
}
