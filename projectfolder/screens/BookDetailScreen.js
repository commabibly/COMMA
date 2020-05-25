//book을 눌렀을 때 등장하는 세부 화면
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function BookDetailScreen() {
  return (
    <View style={styles.main}>
      <View style={styles.container1}>
        <View style={styles.item1}>
          <Text style={{ fontSize: 30 }}>image</Text>
        </View>
        <View style={styles.item2}>
          <Text style={{ fontSize: 30 }}>책 정보</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.item3}>
          <Text style={{ fontSize: 30 }}>메모 등 부가 기능을 넣자</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container1: {
    flex: 1,
    flexDirection: "row", // 혹은 'column'
  },
  container2: {
    flex: 2,
    flexDirection: "column", // 혹은 'column'
  },
  item1: {
    flex: 1,
    backgroundColor: "#2ecc71",
  },
  item2: {
    flex: 2,
    backgroundColor: "#f1c40f",
  },
  item3: {
    flex: 1,
    backgroundColor: "#bdc3c7",
  },
});
