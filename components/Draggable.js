import React, { useRef, useEffect, useState } from "react";
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Alert,
} from "react-native";
import { Button } from "react-native-elements";
import my_ip from "../ipconfig.json";
import axios from "axios";

//처음에 책장화면에서 DB에서 좌표값들을 데려온 뒤, setValue를 해줌.
//좌표를 이동한 후 변경완료를 했을 때 좌표의 변화가 있다면 DB에 있는 값을 변경해줌.

const url = `http://${my_ip.my_ip}:3000/api/test/`;

export default function Draggable(props) {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = props.isMove
    ? useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value,
            });
          },
          onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
          onPanResponderRelease: (e, gesture) => {
            if (isDropArea(gesture) == true) {
              Alert.alert("삭제", "삭제하면 책장 안의 책도 삭제됨");
            }
            pan.flattenOffset();
          },
        })
      ).current
    : useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value,
            });
          },
          onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
          onPanResponderRelease: (e, gesture) => {
            if (isDropArea(gesture) == true) {
              Alert.alert("삭제", "삭제하면 책장 안의 책도 삭제됨");
            }
            pan.flattenOffset();
          },
        })
      );

  /*
  
  const panResponder = props.isMove
    ? useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: (evt, gestureState) => {
            const { dx, dy } = gestureState;
            return dx > 5 || dx < -5 || dy > 5 || dy < -5;
          },
          onPanResponderGrant: () => {
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value,
            });
          },
          onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
          onPanResponderRelease: () => {
            pan.flattenOffset();
          },
        })
      ).current
    : useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            pan.setOffset({
              x: pan.x._value,
              y: pan.y._value,
            });
          },
          onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
          onPanResponderRelease: () => {
            pan.flattenOffset();
          },
        })
      ).current;
      */

  useEffect(() => {
    pan.setValue({ x: props.pos.x, y: props.pos.y });
  }, []);

  function postCoord() {
    axios
      .post(url, { params: { id: props.name, x: pan.x, y: pan.y } })
      .then((res) => {});
  }

  const pressFix = () => {
    postCoord();
    console.log(`${props.name} shelf fixed`);
  };

  const pressEnter = () => {
    props.nav.navigate("test2");
    //console.log("enter pressed");
  };

  function isDropArea(gesture) {
    //console.log(gesture.moveY);
    return gesture.moveY < 100;
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }],
        width: 100,
        height: 100,
        position: "absolute",
        backgroundColor: "#aaa69d",
        borderRadius: 5,
      }}
      {...panResponder.panHandlers}
    >
      <Text style={{ margin: 10, textAlign: "center", color: "white" }}>
        {props.name}
      </Text>
      {props.isMove ? (
        <Button title={"fix me"} onPressIn={pressFix} />
      ) : (
        <Button
          title={"enter"}
          onLongPress={pressEnter}
          onPress={() => Alert.alert("sex")}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "brown",
    borderRadius: 5,
  },
});
