import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import Modal from "react-native-modal";
import axios from "axios";
import my_ip from "../ipconfig.json";
import AuthContext from "../hooks/AuthContext";
import Draggable from "../components/Draggable";
import Draggable2 from "../components/Draggable2";
import Books from "../components/Books";

const { width, height } = Dimensions.get("window");
const url = `http://${my_ip.my_ip}:3000/api/test/`;

function TestScreen({ navigation }) {
  const [moveMode, setMoveMode] = useState(false);
  const [coords, setCoords] = useState(null);

  const buttonPress = () => {
    setMoveMode(!moveMode);
    //apiCall();
  };

  useEffect(() => {
    apiCall();
  }, []);

  function apiCall() {
    axios.get(url).then((res) => {
      //console.log(res.data);
      setCoords(res.data);
    });
  }

  return (
    <View style={{ width: width, height: height }}>
      <View style={styles.dropZone}>
        <Text style={styles.text}>Drop Here</Text>
      </View>
      <Button title={moveMode ? "FIX" : "MOVE"} onPress={buttonPress} />
      <Text>{moveMode ? "움직일 수 있다" : "고정된 상태"}</Text>
      {coords &&
        coords.map((c) => (
          <Draggable
            isMove={moveMode}
            key={c.id}
            name={c.id}
            pos={{ x: c.pos_x, y: c.pos_y }}
            nav={navigation}
          />
        ))}
    </View>
  );
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

export default TestScreen;
