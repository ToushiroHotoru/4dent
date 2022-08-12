import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Ionicons from "@expo/vector-icons/Ionicons";
import WorkTime from "../screens/WorkTime";
import Contacts from "../screens/Contacts";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Stacks") {
            iconName = "menu";
          } else if (route.name === "Home") {
            iconName = "archive";
          } else if (route.name === "Time") {
            iconName = "time";
          } else if (route.name === "Contacts") {
            iconName = "people-circle";
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          title: "Задачи",
        }}
      />
      <Tab.Screen
        name="Time"
        component={WorkTime}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
