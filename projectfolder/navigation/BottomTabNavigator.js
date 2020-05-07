import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import LinksScreen from "../screens/LinksScreen";
import CameraScreen from "../screens/CameraScreen";
import ShelfScrren from "../screens/ShelfScreen";
import CameraSelect from "../screens/CameraSelect";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="BookShelf"
        component={ShelfScrren}
        options={{
          title: "BookShelf",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-albums" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Camera"
        component={CameraScreen}
        options={{
          title: "Camera",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-camera" />
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
      return "Links to learn more";
    case "Camera":
      return "책 추가";
    case "BookShelf":
      return "내 책장";
  }
}
