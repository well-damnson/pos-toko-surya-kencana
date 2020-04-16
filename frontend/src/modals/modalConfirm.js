import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class ConfirmModal extends Component {
  render() {
    console.log(this.props);
    return (
      <View
        style={{
          backgroundColor: "#DCDCDC",
          width: "18vw",
          height: "24vh",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderRadius: 15,
          padding: 15,
        }}
      >
        <Text style={{ alignSelf: "center", marginVertical: "10" }}>
          Anda Yakin untuk Menghapus?
        </Text>
        <View style={{ flex: 0.1 }} />
        <Button
          title="ya"
          onPress={() => {
            this.props.function();
            this.props.close();
          }}
        />
        <View style={{ flex: 0.1 }} />
        <Button title="tidak" onPress={this.props.close} />
      </View>
    );
  }
}
