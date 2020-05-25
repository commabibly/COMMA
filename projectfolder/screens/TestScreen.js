import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import axios from "axios";
import my_ip from "../ipconfig.json";
import AuthContext from "../hooks/AuthContext";
import Draggable from "../components/Draggable";

function TestScreen() {
  return (
    <View>
      <Draggable />
      <Draggable />
      <Draggable />
      <Draggable />
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
