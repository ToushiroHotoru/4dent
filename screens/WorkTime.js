import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WorkTime() {
  const [workdayIsActive, setWorkdayIsActive] = useState(false);
  return (
    <View style={styles.container}>
      {workdayIsActive ? (
        <Button
          contentStyle={{
            // <--- HERE-----
            paddingVertical: 10,
          }}
          color="#cc1f1f"
          style={styles.btn}
          mode="contained"
          icon="clock-remove"
          onPress={() => {
            setWorkdayIsActive(false);
          }}
        >
          Закончить рабочий день
        </Button>
      ) : (
        <Button
          contentStyle={{
            // <--- HERE-----
            paddingVertical: 10,
          }}
          style={styles.btn}
          mode="contained"
          icon="clock-plus-outline"
          onPress={() => {
            setWorkdayIsActive(true);
          }}
        >
          Начать рабочий день
        </Button>
      )}

      <Button
        contentStyle={{
          // <--- HERE-----
          paddingVertical: 10,
        }}
        color="#0acfc1"
        style={styles.btn}
        mode="contained"
        icon="map"
        onPress={() => console.log("Pressed")}
      >
        Отправить геолокацию
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btn: {
    width: windowWidth - 20,
    marginTop: 10,
  },
});
