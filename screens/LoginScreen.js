import * as React from "react";
import FormTextInput from "../components/FormTextInput";
import Logo from "../assets/images/pepe.png";
import Comma from "../assets/images/comma.png";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Button,
} from "react-native";
import { NavigationHelpersContext } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import AuthContext from "../hooks/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import axios from "axios";
import my_ip from "../ipconfig.json";

function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");

  const { signIn } = React.useContext(AuthContext);

  async function loginButtonPress() {
    const data = {
      email: email,
      pass: pass,
    };
    axios
      .post(`http://${my_ip.my_ip}:3000/api/sign`, { data })
      .then((res) => {
        if (res.data.loginresult == true) {
          signIn(email, pass);
        } else {
          alert("이메일과 비밀번호를 확인해주세요");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingBottom: 60 }}></View>
      <Image source={Comma} style={styles.logo} />
      <View style={styles.form}>
        <FormTextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
        />
        <FormTextInput
          secureTextEntry={true}
          placeholder="Password"
          value={pass}
          onChangeText={setPass}
        />
        <View style={styles.footer}>
          <Button color="white" title={"로그인"} onPress={loginButtonPress} />
        </View>
        <View style={styles.footer2}>
          <Button
            color="white"
            title={"회원가입"}
            onPress={() => navigation.navigate("SignUp")} //{() => this.props.navigation.navigate("Side")}
          />
        </View>
      </View>
      <View style={styles.container}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    flex: 1,
    width: "70%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "60%",
  },
  footer: {
    borderRadius: 10,
    marginBottom: 10,
    padding: 5,
    width: "100%",
    height: 40,
    backgroundColor: "#444",
  },
  footer2: {
    borderRadius: 10,
    padding: 5,
    width: "100%",
    height: 40,
    backgroundColor: "#023e73",
  },
});

export default LoginScreen;
