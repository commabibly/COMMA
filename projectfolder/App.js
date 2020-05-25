import * as React from "react";
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
  AsyncStorage,
} from "react-native";
import { SplashScreen } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";
import LoginScreen from "./screens/LoginScreen";
import AuthContext from "./hooks/AuthContext";
import IDContext from "./hooks/IDContext";
import SignUpScreen from "./screens/SignUpScreen.js";

const Stack = createStackNavigator();
const Home = createStackNavigator();

function HomeStack() {
  return (
    <Home.Navigator screenOptions={{ headerShown: false }}>
      <Home.Screen name="Login" component={LoginScreen} />
      <Home.Screen name="SignUp" component={SignUpScreen} />
    </Home.Navigator>
  );
}

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          //로그인 하면 토큰을 준다.
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
          "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    async function asyncLoad() {
      try {
        //asyncstorage에서 token 불러온다
        const value = await AsyncStorage.getItem("token");
        const parsedValue = JSON.parse(value);
        console.log(parsedValue);
        state.userToken = parsedValue;
      } catch (err) {
        console.log(err);
      }
    }
    loadResourcesAndDataAsync();
    asyncLoad();
  }, []);
  //const check = false;
  const authContext = React.useMemo(
    () => ({
      signIn: async (email, pass) => {
        //const new_token = data;
        await AsyncStorage.setItem("token", JSON.stringify({ email, pass }));
        dispatch({ type: "SIGN_IN", token: { email: email, pass: pass } });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
      signUp: async (data) => {
        dispatch({ type: "SIGN_UP", token: "dummy-auth-token" });
      },
    }),
    []
  );

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <AuthContext.Provider value={authContext}>
        <IDContext.Provider value={{ state }}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}
            <NavigationContainer
              ref={containerRef}
              initialState={initialNavigationState}
            >
              <Stack.Navigator>
                {state.userToken == null ? (
                  <Stack.Screen name="Login" component={HomeStack} />
                ) : (
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                )}
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </IDContext.Provider>
      </AuthContext.Provider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
