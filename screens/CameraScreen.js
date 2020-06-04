import * as React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";
import Modal from "react-native-modal";
import my_ip from "../ipconfig.json";
import Toast, { Duration } from "react-native-easy-toast";

const ID = "WVwSPjCxzQ4ncQ_j53Z5";
const SECRET = "nDJRHH_aHP";

//무얼 할 것인가: 책장 선택을 누르면 저장할 책장을 선택할 수 있음

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
      shelf_num: "",
      shelf_name: "",
      user_id: this.props.route.params.user_id,
      isModalVisible: false,
      shelfData: "",
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
    const url = `http://${my_ip.my_ip}:3000/api/book`;
    const body = {
      title: this.state.title,
      author: this.state.author,
      price: this.state.price,
      publisher: this.state.publisher,
      image: this.state.image,
      user_id: this.state.user_id,
      shelf_num: this.state.shelf_num,
    };
    console.log(body);
    return axios.post(url, body).then((res) => console.log(res));
  }

  async componentDidMount() {
    this.getPermissionsAsync();
    this.getShelfData();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  getShelfData = () => {
    axios({
      method: "get",
      url: `http://${my_ip.my_ip}:3000/api/shelf/${this.state.user_id}`,
      params: {
        user_id: this.state.user_id,
      },
    }).then((response) => {
      this.setState({ shelfData: response.data });
    });
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
        <View style={styles.barcode}>
          <Modal
            isVisible={this.state.isModalVisible}
            backdropOpacity={0.1}
            onBackdropPress={this.toggleModal}
          >
            <View style={styles.modal}>
              {this.state.shelfData ? (
                this.state.shelfData.map((c, i) => {
                  return (
                    <Button
                      color="#2c3e50"
                      key={i}
                      user_id={c.user_id}
                      title={c.shelf_name}
                      id={c.shelf_num}
                      onPress={() => {
                        this.setState({
                          user_id: c.user_id,
                          shelf_num: c.shelf_num,
                          shelf_name: c.shelf_name,
                          isModalVisible: !this.state.isModalVisible,
                        });
                      }}
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
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <Text style={styles.text}>
            현재 선택된 책장 : {this.state.shelf_name}
          </Text>
          <Button title={"책장 선택"} onPress={this.toggleModal} />
          {scanned && (
            <Button
              title={"Tap to Scan Again"}
              onPress={() => this.setState({ scanned: false })}
            />
          )}
        </View>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={200}
          opacity={0.5}
        />
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
        //console.log(res.data.items);
        if (res.data.items.length == 0) {
          alert("유효하지 않은 issn/isbn 바코드 입니다");
        } else if (this.state.shelf_num != null) {
          this.state.title = res.data.items[0].title;
          this.state.author = res.data.items[0].author;
          this.state.price = res.data.items[0].price;
          this.state.publisher = res.data.items[0].publisher;
          this.state.image = res.data.items[0].image;
          this.handleFormSubmit();
          this.refs.toast.show(
            `'${res.data.items[0].title}'\n 책장에 추가되었습니다.`
          );
        } else {
          alert("책장 고르세요");
        }
      });
  };

  handleShelfButton = () => {
    this.toggleModal();
  };

  chooseShelf = () => {
    console.log("책장 선택 버튼 누름");
  };

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
  };
}

const styles = StyleSheet.create({
  barcode: {
    flex: 10,
  },
  modal: {
    backgroundColor: "white",
  },
  text: {
    //backgroundColor: "black",
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    fontSize: 15,
    color: "white",
  },
});
