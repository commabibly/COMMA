import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import my_ip from "../ipconfig.json";
import AuthContext from "../hooks/AuthContext";
import Draggable from "../components/Draggable";
import Books from "../components/Books";

function TestScreen() {
  _renderItem = ({ item }) => {
    <Text>{item}</Text>;
  };
  return (
    /*
    <View>
      <Draggable />
      <Draggable />
      <Draggable />
      <Draggable />
    </View>
    */
    <View>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
  button: {},
});

export default TestScreen;
