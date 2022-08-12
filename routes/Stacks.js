import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Auth from "../screens/Auth";
import Tabs from "./Tabs";
import Task from "../screens/Task";
import CreateTask from "../screens/CreateTask";

const Stack = createNativeStackNavigator();

export default function MyStack() {
  return (
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
          title: "4-dent",
        }}
      />
      <Stack.Screen
        name="Task"
        component={Task}
        options={{
          title: "Задача",
        }}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{
          title: "Новая задача",
        }}
      />
    </Stack.Navigator>
  );
}
