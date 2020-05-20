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

export default class ShelfScreen extends React.Component {
  state = {
    books: "",
    refreshing: false,
    shelf_num: this.props.route.params.shelf_num,
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    /*
    wait(1000).then(() => {
      this.setState({ refreshing: false });
    });
    */
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
      .get(`http://192.168.219.100:3000/api/book/1`, {
        params: {
          shelf_num: this.state.shelf_num,
        },
      })
      .then((response) => {
        return response.data;
      });
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
        {this.state.books ? (
          this.state.books.map((c) => {
            return (
              <Books
                key={c.id}
                id={c.id}
                title={c.title}
                author={c.author}
                price={c.price}
                image={c.image}
                publisher={c.publisher}
              />
            );
          })
        ) : (
          <View style={styles.container}>
            <Text style={styles.text}>책을 불러오고 있어요.</Text>
            <Text style={styles.text}>오래 걸리면 인터넷 확인해라</Text>
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
