import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import CameraScreen from "../screens/CameraScreen";
import ShelfScrren from "../screens/ShelfScreen";
import CameraSelect from "../screens/CameraSelect";
import BookShelfScreen from "../screens/BookShelfScreen";
import TestScreen from "../screens/TestScreen";
import { createStackNavigator } from "@react-navigation/stack";
import BookSearchScreen from "../screens/BookSearchScreen";
import BookDetailScreen from "../screens/BookDetailScreen";
import ShopScreen from "../screens/ShopScreen";
import { Text } from "react-native";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

const SelectStack = createStackNavigator();
const ShelfStack = createStackNavigator();

function ShelfStackScreen({ navigation }) {
  return (
    <ShelfStack.Navigator screenOptions={{ headerShown: false }}>
      <ShelfStack.Screen name="shelves" component={BookShelfScreen} />
      <ShelfStack.Screen name="shelf" component={ShelfScrren} />
      <ShelfStack.Screen name="book" component={BookDetailScreen} />
    </ShelfStack.Navigator>
  );
}

function SelectStackScreen() {
  return (
    <SelectStack.Navigator screenOptions={{ headerShown: false }}>
      <SelectStack.Screen name="choose" component={CameraSelect} />
      <SelectStack.Screen name="scan" component={CameraScreen} />
      <SelectStack.Screen name="search" component={BookSearchScreen} />
    </SelectStack.Navigator>
  );
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="BookShelfScreen"
        component={ShelfStackScreen}
        options={{
          title: "BookShelf",
          /*
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 13 }}>sex</Text>
          ),
          */
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-albums" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Camera"
        component={SelectStackScreen}
        options={{
          title: "Add",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-add" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Shop"
        component={ShopScreen}
        options={{
          title: "Shop",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-basket" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-settings" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Test"
        component={TestScreen}
        options={{
          title: "Test",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-nuclear" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case "Home":
      return "How to get started";
    case "Links":
      return "환경설정";
    case "Camera":
      return "책 추가";
    case "BookShelf":
      return "책장";
    case "BookShelfScreen":
      return "책장들";
    case "Test":
      return "실험실";
    case "Shop":
      return "거래";
  }
}
