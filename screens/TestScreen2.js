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
import Books from "../components/Books";

const { width, height } = Dimensions.get("window");
const url = `http://${my_ip.my_ip}:3000/api/test/`;

class TestScreen2 extends React.Component {
  render() {
    return (
      <View>
        <Text style={{ alignSelf: "center", fontSize: 30 }}>
          {"뭘봐 씹련아"}
        </Text>
      </View>
    );
  }
}

export default TestScreen2;
