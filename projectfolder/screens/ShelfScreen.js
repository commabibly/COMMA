//선택된 책장을 보여주는 화면
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Books from "../components/Books";
import axios from "axios";
import my_ip from "../ipconfig.json";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class ShelfScreen extends React.Component {
  state = {
    books: "",
    refreshing: false,
    shelf_num: this.props.route.params.shelf_num,
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.axiosCall().then((res) =>
      this.setState({ refreshing: false, books: res })
    );
  };

  componentDidMount() {
    this.axiosCall()
      .then((res) => this.setState({ books: res }))
      .catch((err) => console.log(err));
  }

  axiosCall = async () => {
    return axios
      .get(`http://${my_ip.my_ip}:3000/api/book/${this.state.shelf_num}`, {
        params: {
          shelf_num: this.state.shelf_num,
        },
      })
      .then((response) => {
        return response.data;
      });
  };

  onClick = () => {
    console.log("book button clicked");
    this.props.navigation.navigate("book");
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        {this.state.books[0] ? (
          this.state.books.map((c) => {
            return (
              <TouchableOpacity key={c.id} onPress={this.onClick}>
                <Books
                  key={c.id}
                  id={c.id}
                  title={c.title}
                  author={c.author}
                  price={c.price}
                  image={c.image}
                  publisher={c.publisher}
                  addButton={false}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>책장에 아직 책이 없어요</Text>
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
  },
});
