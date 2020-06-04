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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import a from "../vision-request.json";

import Modal from "react-native-modal";
import axios from "axios";
import my_ip from "../ipconfig.json";
import AuthContext from "../hooks/AuthContext";
import Draggable from "../components/Draggable";
import Books from "../components/Books";

const api_key = "AIzaSyD3ezySjxP8DEYnwep_kQZ2rvgxtIUMWsE";

function ImageSearchScreen() {
  const [image, setImage] = useState();
  const [reqObj, setReqObj] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const buttonPress = () => {
    console.log("button pressed");
    pickImage();
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
      if (!result.cancelled) {
        setImage(result.base64);
        setReqObj({
          requests: [
            {
              features: [
                {
                  type: "TEXT_DETECTION",
                  maxResults: 10,
                },
              ],
              image: { content: result.base64 },
            },
          ],
        });
      }
      //console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  const visionApiCall = async () => {
    if (reqObj == null) {
      Alert.alert("", "choose image first!");
    } else {
      const url = `https://vision.googleapis.com/v1/images:annotate?key=${api_key}`;
      await axios.post(url, reqObj).then((res) => {
        setText(res.data.responses[0].fullTextAnnotation.text);
      });
    }
  };

  return (
    <ScrollView>
      <Button title={"pick image"} onPress={buttonPress} />
      {image && (
        <View>
          <Image
            source={{ uri: `data:image/jpg;base64,${image}` }}
            style={{
              alignSelf: "center",
              width: 300,
              height: 300,
              resizeMode: "contain",
            }}
          />
          <Text style={{ alignSelf: "center" }}>{text}</Text>
        </View>
      )}
      <Button title={"test"} onPress={visionApiCall} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
  button: {},
});

export default ImageSearchScreen;
