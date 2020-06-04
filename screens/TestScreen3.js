import React from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import axios from "axios";
import my_ip from "../ipconfig.json";
import Draggable from "../components/Draggable";
import Toast, { DURATION } from "react-native-easy-toast";

const { width, height } = Dimensions.get("window");
const url = `http://${my_ip.my_ip}:3000/api/test/`;

export default class TestScreen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveMode: false,
      coords: null,
    };
  }

  buttonPress = () => {
    this.setState((prevState) => ({
      moveMode: !prevState.moveMode,
    }));
  };

  toastAppear = (val) => {
    if (val == "del") {
      this.refs.toast.show("안녕히 계세요 여러분!");
    } else this.refs.toast.show(`${val} shelf fixed.`);
  };

  async componentDidMount() {
    this.apiCall();
  }

  apiCall() {
    axios.get(url).then((res) => {
      this.setState({
        coords: res.data,
      });
    });
  }

  render() {
    return (
      <View style={{ width: width, height: height }}>
        <View style={styles.dropZone}>
          <Text style={styles.text}>Drop here to remove</Text>
        </View>
        <Button
          title={this.state.moveMode ? "FIX" : "MOVE"}
          onPress={this.buttonPress}
        />
        <Text>{this.state.moveMode ? "움직일 수 있다" : "고정된 상태"}</Text>
        {this.state.coords &&
          this.state.coords.map((c) => (
            <Draggable
              isMove={this.state.moveMode}
              key={c.id}
              name={c.id}
              pos={{ x: c.pos_x, y: c.pos_y }}
              nav={this.props.navigation}
              func={this.toastAppear}
            />
          ))}
        <Toast ref="toast" opacity={0.5} positionValue={200} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dropZone: {
    height: 100,
    backgroundColor: "#e74c3c",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
