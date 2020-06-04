import * as React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function Shelves(props) {
  console.log(props);
  return (
    <TouchableOpacity>
      <View style={styles.background}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Shelves;

const styles = StyleSheet.create({
  background: {
    backgroundColor: "white",
    flexDirection: "row",
    borderBottomColor: "#bbb",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  name: {
    textAlign: "left",
    margin: 5,
    fontSize: 40,
  },
});
