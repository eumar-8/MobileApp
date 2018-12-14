import React from "react";
import { Text, View, Alert, Image } from "react-native";
import {
  TouchableOpacity,
  AppRegistry,
  FlatList,
  StyleSheet
} from "react-native";
import { AsyncStorage } from "react-native";
import Modal from "react-native-modal";

// Buttons

export default class FavoriteMovies extends React.Component {
  state = {
    movies: [],
    movie: {},
    isModalVisible: false
  };

  componentDidMount() {
    this._geteData();
  }
  _toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible }, () => {
      console.log("***************", this.state.isModalVisible);
    });
  };

  _geteData = async () => {
    try {
      const movies = await AsyncStorage.getItem("FavMovies");
      let moviesParse = JSON.parse(movies);
      this.setState({ movies: moviesParse }, () => {});

      return moviesParse;
    } catch (error) {}
  };
  handleOnpress = item => {
    let { movies } = this.state;
    var result = movies.filter(obj => {
      return obj["Title"] === item["key"];
    });
    let movie = result[0];
    this.setState({ movie: movie }, () => {
      console.log("===============>", this.state.movie);
    });

    // return Alert.alert();
  };
  //imdbID
  render() {
    let { movies, movie } = this.state;
    let obj = [];
    movies.map(el => {
      obj.push({ ["key"]: el["Title"] });
    });
    //console.log("========HOLA========>", obj);
    return (
      <View style={styles.container}>
        <FlatList
          data={obj}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.handleOnpress(item);
                  this._toggleModal();
                }}
              >
                <Text style={styles.item}>{item.key}</Text>
              </TouchableOpacity>
              <Modal
                style={{ flex: 1, alignItems: "center" }}
                backdropOpacity="0.60"
                animationType="fade"
                isVisible={this.state.isModalVisible}
              >
                <View
                  style={{
                    // flex: 1,
                    width: 300,
                    height: 300,
                    backgroundColor: "white"
                  }}
                >
                  <Image
                    source={{ uri: movie["Poster"] }}
                    style={styles.cardImage}
                  />
                  <Text>{movie["Title"]}</Text>
                  <Text>{movie["Year"]}</Text>
                  <Text>{movie["Description"]}</Text>
                  <TouchableOpacity onPress={this._toggleModal}>
                    <Text>Hide me!</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    backgroundColor: "#ffe6e6",
    margin: 2
  },
  cardImage: {
    height: 150
  }
};
