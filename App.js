import React from "react";
import Navbar from "./Navbar";
import Home from "./Home";
import FavoriteMovies from "./FavoriteMovies";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
//import Swipeout from "react-native-swipeout";
//import { SearchBar } from "react-native-elements";
//import { AsyncStorage } from "react-native";

//import About from "./About";
//import ContactUs from "./ContactUs";

export default class App extends React.Component {
  state = {
    page: "Home"
  };
  changePage = page => {
    this.setState({ page });
  };
  render() {
    let { page } = this.state;
    let shown;
    if (page == "Home") {
      shown = <Home />;
    } else if (page == "favoritMovies") {
      shown = <FavoriteMovies />;

      // } else if (page == "Contact") {
      //   <Text>contact</Text>;
      //   //shown = <ContactUs phone={phone} />;
    }
    return (
      <View style={styles.wrapper}>
        <Navbar changePage={this.changePage} />
        {shown}
      </View>
    );
  }
}

const styles = {
  wrapper: {
    backgroundColor: "#A52A2A",
    flex: 1
  }
};
