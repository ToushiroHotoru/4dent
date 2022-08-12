import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Button, List } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import { Elden } from "../components/Elden";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Task({ route }) {
  const elden = new Elden();
  const { name, type, date, userName, tel } = route.params;
  const [desc, setDesc] = useState(elden.plot(20));

  const onPressHandler = () => {
    setDesc(elden.plot(20));
  };

  return (
    <View style={styles.container}>
      <List.Item
        title={name}
        description="Название"
        left={(props) => <List.Icon {...props} icon="ballot" />}
      />
      <List.Item
        title={type}
        description="Тип"
        left={(props) => (
          <List.Icon {...props} icon="comment-text-multiple-outline" />
        )}
      />
      <List.Item
        title={date}
        description="Дата"
        left={(props) => <List.Icon {...props} icon="calendar-range" />}
      />

      <List.Item
        title={userName}
        description="ФИО"
        left={(props) => <List.Icon {...props} icon="account" />}
      />

      <List.Item
        title={tel}
        description="Номер телефона"
        left={(props) => <List.Icon {...props} icon="phone" />}
      />
      <List.Item
        title="Описание"
        left={(props) => <List.Icon {...props} icon="text" />}
      />

      <View style={styles.textContainer}>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      ></ScrollView> */}

      <View style={styles.btnGroup}>
        <Button
          color="#0acfc1"
          mode="contained"
          style={styles.btn}
          onPress={() => onPressHandler()}
        >
          Выполнить
        </Button>
        <Button
          color="#cc1f1f"
          mode="contained"
          style={styles.btn}
          onPress={() => console.log("Pressed")}
        >
          Удалить
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  textContainer: {
    margin: 15,
  },
  desc: {
    textAlign: "justify",
  },
  btnGroup: {
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    width: windowWidth - 10,
    marginTop: 5,
  },
});
