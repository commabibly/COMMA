//현재 환경설정 화면으로 사용되고 있음. 이름의 변경 필요
import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import useContext from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import { AsyncStorage } from "react-native";
import AuthContext from "../hooks/AuthContext";

export default function LinksScreen() {
  const { signOut } = React.useContext(AuthContext);

  async function pressLogOut() {
    await AsyncStorage.setItem("token", JSON.stringify(null));
    console.log("logout");
    signOut();
  }

  async function pressTokenCheck() {
    const value = await AsyncStorage.getItem("token");
    const parsedValue = JSON.parse(value);
    console.log(parsedValue);
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OptionButton icon="md-power" label="로그아웃" onPress={pressLogOut} />
      <OptionButton
        icon="md-checkmark"
        label="토큰 값 불러오기"
        onPress={pressTokenCheck}
      />
      <OptionButton
        icon="md-compass"
        label="Read the React Navigation documentation"
        onPress={() =>
          WebBrowser.openBrowserAsync("https://reactnavigation.org")
        }
      />

      <OptionButton
        icon="ios-chatboxes"
        label="Ask a question on the forums"
        onPress={() => WebBrowser.openBrowserAsync("https://forums.expo.io")}
        isLastOption
      />
    </ScrollView>
  );
}

function OptionButton({ icon, label, onPress, isLastOption }) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.optionIconContainer}>
          <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
        </View>
        <View style={styles.optionTextContainer}>
          <Text style={styles.optionText}>{label}</Text>
        </View>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: "#fdfdfd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: "#ededed",
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 1,
  },
});
