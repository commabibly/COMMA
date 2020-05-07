import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as WebBrowser from "expo-web-browser";
import axios from "axios";

const ID = "WVwSPjCxzQ4ncQ_j53Z5";
const SECRET = "nDJRHH_aHP";

export default class CameraScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      scanned: false,
      title: "",
      author: "",
      price: "",
      publisher: "",
      image: "",
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    //this.handleFileChange = this.handleFileChange.bind(this); //파일 직접 업로드 할때 필요, 아직 작성 안함
    this.handleValueChange = this.handleValueChange.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }

  handleFormSubmit() {
    //e.preventDefault();
    this.addCustomer();
  }

  handleValueChange(e) {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer() {
    const url = "http://172.30.1.38:3000/api/book";
    const body = {
      title: this.state.title,
      author: this.state.author,
      price: this.state.price,
      publisher: this.state.publisher,
      image: this.state.image,
    };
    return axios.post(url, body);
  }

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>카메라 승인 대기중</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>카메라 권한이 없습니다</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    axios
      .get(`https://openapi.naver.com/v1/search/book_adv?d_isbn=${data}`, {
        headers: {
          "X-Naver-Client-Id": ID,
          "X-Naver-Client-Secret": SECRET,
        },
      })
      .then((res) => {
        console.log(res.data.items);
        if (res.data.items.length == 0) {
          alert("유효하지 않은 issn/isbn 바코드 입니다");
        } else {
          this.state.title = res.data.items[0].title;
          this.state.author = res.data.items[0].author;
          this.state.price = res.data.items[0].price;
          this.state.publisher = res.data.items[0].publisher;
          this.state.image = res.data.items[0].image;
          this.handleFormSubmit();
          alert(`'${res.data.items[0].title}'\n 책장에 추가되었습니다.`);
        }
      });
  };
}
