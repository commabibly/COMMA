import * as React from "react";
import { Text, StyleSheet, View, Image, Dimensions, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Logo from "../assets/images/pepe.png";
import { Ionicons } from "@expo/vector-icons";
const { width, height } = Dimensions.get("window");
import IDContext from "../hooks/IDContext";
import Modal from "react-native-modal";
import my_ip from "../ipconfig.json";
import axios from "axios";

//선택된 책장의 값을 불러와야함(context를 쓸까 싶다)

export default function Books(props) {
  const { state } = React.useContext(IDContext);

  function apiPost() {
    const url = `http://${my_ip.my_ip}:3000/api/book`;
    const body = {
      title: props.title,
      author: props.author,
      price: props.price,
      publisher: props.publisher,
      image: props.image,
      user_id: state.userToken.email,
      shelf_num: props.shelfNum,
    };
    console.log(body);
    return axios.post(url, body);
  }

  function onPressAdd() {
    apiPost();
    Alert.alert(
      "",
      `[${props.title}]책이 [${props.shelfName}]에 추가되었습니다.`
    );
  }
  return (
    <View style={styles.background}>
      <View style={styles.image}>
        {props.image ? (
          <Image
            source={{ url: props.image }}
            style={{
              width: 70,
              height: 90,
            }}
          />
        ) : (
          <Image source={Logo} style={{ width: 70, height: 90 }} />
        )}
      </View>
      {!props.addButton ? (
        <View style={styles.textContainerWithoutB}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.text}>{props.author}</Text>
          <Text style={styles.text}>{props.publisher}</Text>
          <Text style={styles.text}>{props.price}₩</Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row" }}>
          <View style={styles.textContainerWithB}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.text}>{props.author}</Text>
            <Text style={styles.text}>{props.publisher}</Text>
            <Text style={styles.text}>{props.price}₩</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPressAdd}>
              <Ionicons name="md-add-circle-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {},
  textContainerWithB: {
    width: width - 100,
    flexDirection: "column",
  },
  textContainerWithoutB: {
    width: width - 70,
    flexDirection: "column",
  },
  title: {
    textAlign: "left",
    margin: 2,
    marginBottom: 2,
    fontSize: 13,
  },
  text: {
    margin: 1,
    fontSize: 12,
  },
  buttonContainer: {
    justifyContent: "center",
    width: 20,
  },
});
