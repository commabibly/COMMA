//로그인 된 user의 책장을 모두 불러와서 보여주는 화면
import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";
import axios from "axios";
import Shelves from "../components/Shelves";
import { ScrollView } from "react-native-gesture-handler";

export default function BookShelfScreen({ navigation }) {
  const [shelves, setShelves] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://192.168.219.100:3000/api/shelf",
    }).then(function (response) {
      setShelves(response.data);
    });
  }, []);

  return (
    <ScrollView>
      {shelves ? (
        shelves.map((c, i) => {
          return (
            <Button
              key={i}
              title={c.shelf_name}
              id={c.shelf_num}
              onPress={() =>
                navigation.navigate("shelf", { shelf_num: c.shelf_num })
              }
            />
          );
          //return <Shelves key={i} name={c.shelf_name} />;
        })
      ) : (
        <View></View>
      )}
    </ScrollView>
  );
}
