//book을 눌렀을 때 등장하는 세부 화면
import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Button } from "react-native-elements";
import Logo from "../assets/images/pepe.png";
import Modal from "react-native-modal";
import axios from "axios";
import my_ip from "../ipconfig.json";

const { width, height } = Dimensions.get("window");

export default function BookDetailScreen(props) {
  const [data, setData] = React.useState(props.route.params.data);
  const [isModalVisible, setModalVisible] = React.useState(false);

  //수정을 위해 필요한 변수
  const [isEdit, setIsEdit] = React.useState(false);
  const [title, setTitle] = React.useState(props.route.params.data.title);
  const [author, setAuthor] = React.useState(props.route.params.data.author);
  const [publisher, setPublisher] = React.useState(
    props.route.params.data.publisher
  );

  React.useEffect(() => {});

  toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onPressCommit = () => {
    //수정을 완료했을 때, api call해서 update한다.
    editCall();
    //수정 후 data의 값을 수정한 값으로 바꿔주는 과정
    setData({ ...data, title: title, author: author, publisher: publisher });
    setIsEdit(!isEdit);
  };

  const onPressDel = () => {
    toggleModal();
  };

  const onPressRealDel = () => {
    toggleModal();
    deleteCall();
    props.navigation.goBack();
  };

  const editCall = () => {
    const url = `http://${my_ip.my_ip}:3000/api/books/${data.id}`;
    const params = {
      id: data.id,
      title: title,
      author: author,
      publisher: publisher,
    };
    axios.post(url, params);
  };

  const deleteCall = () => {
    const url = `http://${my_ip.my_ip}:3000/api/books/${data.id}`;
    axios.delete(url, data.id);
  };

  const onPressEdit = () => {
    setIsEdit(!isEdit);
  };

  return (
    <View style={styles.main}>
      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.1}
        onBackdropPress={toggleModal}
      >
        <View style={{ backgroundColor: "white" }}>
          <Text
            style={{ fontSize: 20, alignSelf: "center", marginVertical: 5 }}
          >
            삭제할거야?
          </Text>
          <Button
            style={{ margin: 3 }}
            title={"진짜 삭제"}
            onPress={onPressRealDel}
          />
          <Button style={{ margin: 3 }} title={"취소"} onPress={toggleModal} />
        </View>
      </Modal>
      <View style={styles.optionbar}>
        <View style={styles.title}>
          {!isEdit ? (
            <Text>{data.title}</Text>
          ) : (
            <TextInput
              style={{ color: "grey" }}
              value={title}
              onChangeText={setTitle}
            />
          )}
        </View>
        <View style={styles.buttonContainer}>
          {isEdit ? (
            <View style={{ flexDirection: "row" }}>
              <Button
                style={styles.button}
                title={"완료"}
                onPress={onPressCommit}
              />
              <Button
                style={styles.button}
                title={"취소"}
                onPress={onPressEdit}
              />
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <Button
                style={styles.button}
                title={"수정"}
                onPress={onPressEdit}
              />
              <Button
                style={styles.button}
                title={"삭제"}
                onPress={onPressDel}
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          {data.image ? (
            <Image
              source={{ url: data.image }}
              style={{ flex: 1, width: undefined, height: undefined }}
            />
          ) : (
            <Image source={Logo} />
          )}
        </View>
        {!isEdit ? (
          <View style={styles.info}>
            <Text style={{ fontSize: 30 }}>저자: {data.author}</Text>
            <Text style={{ fontSize: 20 }}>출판사: {data.publisher}</Text>
          </View>
        ) : (
          <View style={styles.info}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 30 }}>저자: </Text>
              <TextInput
                style={{ fontSize: 30, color: "grey" }}
                value={author}
                onChangeText={setAuthor}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>출판사: </Text>
              <TextInput
                style={{ fontSize: 20, color: "grey" }}
                value={publisher}
                onChangeText={setPublisher}
              />
            </View>
          </View>
        )}
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
  optionbar: {
    height: 50,
    width: width,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    flexDirection: "row", // 혹은 'column'
  },
  container2: {
    flex: 3,
    flexDirection: "column", // 혹은 'column'
  },
  image: {
    flex: 1,
  },
  info: {
    margin: 5,
    flex: 3,
    backgroundColor: "#eeeeee",
  },
  item3: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonContainer: {
    flex: 2,
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 3,
    marginTop: 2,
  },
  title: {
    flex: 5,
    margin: 3,
  },
});
