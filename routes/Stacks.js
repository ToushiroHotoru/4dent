import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import Tabs from "./Tabs";
import Task from "../screens/Task";
import CreateTask from "../screens/CreateTask";
import { Button } from "react-native";
import { createNavigationContainerRef } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

const navigationRef = createNavigationContainerRef();

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export default function MyStack() {
  const { name } = useSelector((state) => state.user);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{
            title: "4-dent",
          }}
        />
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{
            // headerShown: false,
            headerBackVisible: false,
            title: name,
            headerRight: () => (
              <Button
                onPress={async () => {
                  await SecureStore.deleteItemAsync("jwt");
                  navigate("Auth");
                }}
                title="logout"
                color="red"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Task"
          component={Task}
          options={{
            title: "Задача",
          }}
        />
        {/* <Stack.Screen
          name="CreateTask"
          component={CreateTask}
          options={{
            title: "Новая задача",
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
