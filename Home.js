import React from "react";
import { StyleSheet, Text, View, Alert, Image } from "react-native";
//import Swipeout from "react-native-swipeout";
import { SearchBar } from "react-native-elements";
import { AsyncStorage } from "react-native";

// Buttons

export default class Home extends React.Component {
  state = {
    title: "",
    movies: [],
    movie: {}
  };

  componentDidMount() {}

  // Saving data
  _saveData = async movie => {
    try {
      let movies = await this._geteData();
      if (!movies) {
        movies = [];
      }
      movies.push(movie);
      await AsyncStorage.setItem(
        "FavMovies",
        JSON.stringify(movies.slice(-10))
      );
      //console.log("fav movies =====", movies);
    } catch (error) {
      // Error saving data
    }
    //console.log("last 10 movies===>>", movies);
  };
  // fetching data
  _geteData = async () => {
    try {
      const movies = await AsyncStorage.getItem("FavMovies");
      this.setState({ movies }, () => {
        //console.log("******************", this.state.movies);
      });
      // console.log("they are my favorit", JSON.parse(movies));
      return JSON.parse(movies);
    } catch (error) {
      // Error retrieving data
    }
  };

  getMovie = title => {
    //let { movies } = this.state;
    fetch(`https://omdbapi.com?t=${title}&apikey=thewdb`).then(movie => {
      movie.json().then(mov => {
        this.setState({ movie: mov }, () => {});
        // movies.push({
        //   Title: mov["Title"],
        //   Year: mov["Year"],
        //   Poster: mov["Poster"],
        //   Description: mov["Plot"]
        // });

        this._saveData({
          Title: mov["Title"],
          Year: mov["Year"],
          Poster: mov["Poster"],
          Description: mov["Plot"],
          imdbID: mov["imdbID"]
        });
        // this.setState({ movies: movies }, () => {
        //   // console.log(movies);
        // });
      });
    });
  };

  render() {
    // var swipeoutBtns = [
    //   {
    //     text: "my favorites",
    //     backgroundColor: "#cc0044",
    //     //onPress: () => Alert.alert("update button")
    //     onPress: () => this._geteData()
    //   }
    // ];
    let { movies, movie } = this.state;
    return (
      <View style={styles.wrapper1}>
        {/* <Swipeout style={{ backgroundColor: "#ffe6e6" }} right={swipeoutBtns}>
          <View
            style={{
              marginTop: 40,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ padding: 30 }}>Swipe me left</Text>
          </View>
        </Swipeout> */}
        <View style={styles.search}>
          <SearchBar
            containerStyle={{ width: "80%", backgroundColor: "#F0F8FF" }}
            onChangeText={title => {
              this.setState({ title });
            }}
            platform="ios"
            cancelButtonTitle="Cancel"
            placeholder="Search"
            onSubmitEditing={() => {
              this.getMovie(this.state.title);
            }}
            returnKeyType="search"
          />
        </View>
        <View>
          <View style={styles.container}>
            {movie["Title"] !== undefined ? (
              <View style={styles.card}>
                <Image
                  source={{ uri: movie.Poster }}
                  style={styles.cardImage}
                />
                <View>
                  <Text style={styles.textLeft}>{movie["Title"]}</Text>
                  <Text style={styles.textRight}>{movie["Year"]}</Text>
                </View>
                <Text style={styles.textDescription}>{movie["Plot"]}</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  wrapper1: {
    backgroundColor: "#A52A2A",
    flex: 1
  },
  search: {
    alignItems: "center",
    flex: 0.2,
    backgroundColor: "#F0F8FF",
    justifyContent: "center"
  },
  container: {
    flex: 0.6,
    alignItems: "center",
    marginTop: 10
  },
  card: {
    borderWidth: 3,
    borderRadius: 3,
    borderColor: "#000",
    width: 300,
    height: 300,
    padding: 10,
    marginTop: 20,
    backgroundColor: "#F0F8FF"
  },
  cardImage: {
    height: 150
  },
  textLeft: {
    position: "absolute",
    left: 0,
    top: 7,
    fontSize: 20
  },
  textRight: {
    position: "absolute",
    right: 0,
    top: 7,
    fontSize: 20
  },
  textDescription: {
    paddingTop: 40
  }
};
