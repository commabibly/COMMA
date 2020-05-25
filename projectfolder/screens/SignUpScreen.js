import * as React from "react";
import { Button, View, Text, StyleSheet, Image, TextInput } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import my_ip from "../ipconfig.json";

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      email2: "",
      password2: "",
      check: false,
    };
  }

  signIn(e) {
    e.preventDefault();
    const chkEmail = function (str) {
      var regExp = /^[A-Za-z0-9]{1,10}$/;
      //var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return regExp.test(str) ? true : false;
    };

    const chkPassword = function (str) {
      var regex = /^[A-Za-z0-9]{1,10}$/;
      return regex.test(str) ? true : false;
    };

    if (chkEmail(this.state.email2) === false) {
      alert("이메일 형식이 유효하지 않습니다.");
    } else if (chkPassword(this.state.password2) === false) {
      alert("비밀번호 형식이 유효하지 않습니다.");
    } else {
      axios
        .post(`http://${my_ip.my_ip}:3000/api/register`, {
          email2: this.state.email2,
          password2: this.state.password2,
        })
        .then((response) => {
          alert("회원가입이 완료되었습니다.");
          this.setState({ check: true });
          console.log(this.state.check);
          this.props.navigation.goBack();
        })
        .catch(function (error) {
          console.log(error);
          alert("이메일 중복입니다");
        });
      //if (this.state.check) this.props.navigation.goBack();
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 10,
        backgroundColor: "white",
      },
      header: {
        width: "100%",
        height: "8%",
        //backgroundColor: '#ff9a9a',
      },
      title: {
        width: "100%",
        height: "12%",
        justifyContent: "center",
        //backgroundColor: '#9aa9ff',
      },
      content: {
        flex: 0.9,
        justifyContent: "center",
        //alignItems: 'center',
        paddingBottom: 30,
        //backgroundColor: '#d6ca1a',
      },
      footer: {
        borderRadius: 10,
        marginBottom: 10,
        padding: 5,
        width: "100%",
        height: "6.5%",
        backgroundColor: "#444",
      },
      footer2: {
        borderRadius: 10,
        padding: 5,
        width: "100%",
        height: "6.5%",
        backgroundColor: "#023e73",
      },
    });
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <View style={styles.title}>
          <Text style={{ fontSize: 35, paddingBottom: 20 }}>회원가입</Text>
          <View
            style={{
              width: "100%",
              borderBottomWidth: 0.5,
              borderColor: "#444",
            }}
          />
        </View>
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                justifyContent: "space-between",
              }}
            >
              아이디{" "}
            </Text>
            <TextInput
              style={{
                borderColor: "#aaa",
                width: "70%",
                height: 35,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              onChangeText={(email2) => {
                this.setState({ email2 });
              }}
              type="email2"
              placeholder="Email address"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
            }}
          >
            <Text style={{ fontSize: 15 }}>비밀번호</Text>
            <TextInput
              style={{
                borderColor: "#aaa",
                width: "70%",
                height: 35,
                borderWidth: 1,
                borderRadius: 5,
                padding: 5,
              }}
              onChangeText={(password2) => {
                this.setState({ password2 });
              }}
              type="password2"
              placeholder="숫자와 문자 포함 형태의 6~12자리 이내"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <Button
            color="white"
            title={"취소"}
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        <View style={styles.footer2}>
          <Button
            color="white"
            title={"회원가입"}
            onPress={(e) => this.signIn(e)} //{() => this.props.navigation.navigate("Side")}
          />
        </View>
      </View>
    );
  }
}
