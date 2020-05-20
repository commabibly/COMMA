import * as React from "react";
import Button from "../components/Button";
import FormTextInput from "../components/FormTextInput";
import Logo from "../assets/images/pepe.png";
import { Text, View, StyleSheet, Image, TextInput, Alert } from "react-native";
import { NavigationHelpersContext } from "@react-navigation/native";
import { AsyncStorage } from "react-native";
import AuthContext from "../hooks/AuthContext";

function LoginScreen() {
  const [email, setEmail] = React.useState();
  const [pass, setPass] = React.useState();

  const { signIn } = React.useContext(AuthContext);

  async function loginButtonPress() {
    if (email == "woodeng" && pass == "1234") {
      signIn({ email, pass });
    } else {
      Alert.alert("ㅄ", "존재하지 않는 아이디이거나,\n 비밀번호가 틀렸습니다");
    }
  }

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
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
        <Button label="Log In" onPress={loginButtonPress} />
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
    width: "50%",
    resizeMode: "contain",
    alignSelf: "center",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    width: "50%",
  },
});

export default LoginScreen;
