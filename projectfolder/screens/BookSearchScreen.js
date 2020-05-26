import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
} from "react-native";
import { SearchBar, CheckBox } from "react-native-elements";
import axios from "axios";
import Books from "../components/Books";
import Modal from "react-native-modal";
import { Button } from "react-native-elements";
import my_ip from "../ipconfig.json";

const ID = "WVwSPjCxzQ4ncQ_j53Z5";
const SECRET = "nDJRHH_aHP";
const { width, height } = Dimensions.get("window");

export default function BookSearchScreen(props) {
  const [searchVal, setSearchVal] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [data, setData] = useState(null);
  const [shelfData, setShelfData] = useState(false);
  const [userId, setUserId] = useState();
  const [shelfNum, setShelfNum] = useState(null);
  const [shelfName, setShelfName] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  //submit 하면 책 검색 api에 해당 검색 값 검색, 그 후 결과들 보여줌
  function searchSubmit() {
    setIsSearch(true);
    setSearchVal("");
    searchApiCall();
  }

  function parse(val) {
    val = val.replace(/<b>/g, "");
    val = val.replace(/<\/b>/g, "");
    //console.log(val);
    return val;
  }

  function searchApiCall() {
    axios
      .get(
        `https://openapi.naver.com/v1/search/book_adv?d_titl=${searchVal}&display=10`,
        {
          headers: {
            "X-Naver-Client-Id": ID,
            "X-Naver-Client-Secret": SECRET,
          },
        }
      )
      .then((res) => {
        setData(res.data.items);
      });
  }

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  useEffect(() => {
    //console.log(props.route.params.user_id);
    getShelfData();
    //책장 DB불러와서 Modal에서 나타나게 만들어주자.
  }, []);

  function getShelfData() {
    axios({
      method: "get",
      url: `http://${my_ip.my_ip}:3000/api/shelf/${props.route.params.user_id}`,
      params: {
        user_id: props.route.params.user_id,
      },
    }).then((response) => {
      setShelfData(response.data);
    });
  }

  function selectShelfButtonPress(a, b) {
    //console.log(a, b);
    setShelfName(a);
    setShelfNum(b);
    toggleModal();
  }

  return (
    <View>
      <SearchBar
        containerStyle={{ height: 40 }}
        inputContainerStyle={{ height: 10 }}
        platform="ios"
        placeholder={"책 제목을 입력하세요"}
        value={searchVal}
        onChangeText={setSearchVal}
        lightTheme={true}
        round={true}
        onSubmitEditing={searchSubmit}
      />
      <View style={{ flexDirection: "row", backgroundColor: "white" }}>
        <Button
          title={"책장선택"}
          buttonStyle={{ width: width * 0.2, margin: 5 }}
          titleStyle={{ fontSize: 15 }}
          onPress={toggleModal}
        />
        <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.1}
          onBackdropPress={toggleModal}
        >
          <View style={styles.modal}>
            {shelfData ? (
              shelfData.map((c, i) => {
                return (
                  <Button
                    type={"clear"}
                    titleStyle={{ color: "#2c3e50" }}
                    key={i}
                    user_id={c.user_id}
                    title={c.shelf_name}
                    id={c.shelf_num}
                    onPress={() =>
                      selectShelfButtonPress(c.shelf_name, c.shelf_num)
                    }
                  />
                );
              })
            ) : (
              <View>
                <Text>책장이 없다</Text>
              </View>
            )}
          </View>
        </Modal>
        <View style={{ justifyContent: "center", marginLeft: 10 }}>
          <Text>현재 선택된 책장 : {shelfName}</Text>
        </View>
      </View>
      <View style={{ height: height - 200 }}>
        {!data ? (
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text>검색해보세요</Text>
          </View>
        ) : (
          /*
          data.map((c, i) => {
            return (
              <Books
                key={i}
                title={parse(c.title)}
                author={parse(c.author)}
                price={c.price}
                image={c.image}
                publisher={c.publisher}
                shelfName={shelfName}
                shelfNum={shelfNum}
                addButton={true}
              />
            );
          })
          */
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <Books
                title={parse(item.title)}
                author={parse(item.author)}
                price={item.price}
                image={item.image}
                publisher={item.publisher}
                shelfName={shelfName}
                shelfNum={shelfNum}
                addButton={true}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
  },
});
