import React from "react";
import Swipeout from "react-native-swipeout";
import Home from "./Home";
import { StyleSheet, Text, View, Alert, Image } from "react-native";

export default class Navbar extends React.Component {
  render() {
    let { changePage } = this.props;
    var swipeoutBtns = [
      {
        text: "Home",
        backgroundColor: "#8B0000",
        onPress: () => changePage("Home")
      },
      {
        text: "my favorites",
        backgroundColor: "#cc0044",
        onPress: () => changePage("favoritMovies")
        //onPress: () => this._geteData()
      }
    ];

    return (
      <Swipeout style={{ backgroundColor: "#ffe6e6" }} right={swipeoutBtns}>
        <View
          style={{
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ padding: 30 }}>Swipe me left</Text>
        </View>
      </Swipeout>
    );
  }
}
