import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { RectButton, ScrollView } from "react-native-gesture-handler";
import IDContext from "../hooks/IDContext";

export default function CameraSelect({ navigation }) {
  const { state } = React.useContext(IDContext);
  const user_id = state.userToken;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <OptionButton
        icon="ios-camera"
        label="책장 이미지 검색 (beta)"
        onPress={() =>
          navigation.navigate("image_search", { user_id: user_id.email })
        }
      />

      <OptionButton
        icon="ios-qr-scanner"
        label="issn/isbn 스캔"
        onPress={() => navigation.navigate("scan", { user_id: user_id.email })}
      />

      <OptionButton
        icon="md-search"
        label="책 제목 검색해서 추가"
        onPress={() =>
          navigation.navigate("search", { user_id: user_id.email })
        }
      />
      <OptionButton
        icon="md-create"
        label="직접 추가"
        onPress={() => console.log("직접 추가 버튼 누름")}
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
