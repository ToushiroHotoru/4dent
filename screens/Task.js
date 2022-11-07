import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, List } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState } from "react";
import dateFormat from "dateformat";
import * as Linking from "expo-linking";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Task({ route, navigation }) {
  const { id, name, date, desc, contact, tel } = route.params;
  const [formatedDate, setFormatedDate] = useState(
    dateFormat(date, "dd-mm-yyyy, HH:MM")
  );
  const [showMessage, setShowMessage] = useState(false);

  const _handlePress = (tel) => {
    Linking.openURL(`tel:${tel}`);
  };

  const onPressDeleteHandler = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://server.dicom.team/delete-task",
        data: { id: id },
        headers: { jwt: await SecureStore.getItemAsync("jwt") },
      });

      setShowMessage(true);
      await new Promise((r) => setTimeout(r, 500));
      navigation.dispatch(CommonActions.goBack());
    } catch (err) {
      console.log(err);
    }
  };

  // const onPressHandler = () => {
  //   setDesc(elden.plot(20));
  // };

  return (
    <View style={styles.container}>
      {showMessage && (
        <View style={styles.delete}>
          <Text style={styles.deleteText}>Event was deleted</Text>
        </View>
      )}
      <List.Item
        title={name}
        description="Название"
        left={(props) => <List.Icon {...props} icon="ballot" />}
      />
      {/* <List.Item
        title={type}
        description="Тип"
        left={(props) => (
          <List.Icon {...props} icon="comment-text-multiple-outline" />
        )}
      /> */}
      <List.Item
        title={formatedDate}
        description="Дата"
        left={(props) => <List.Icon {...props} icon="calendar-range" />}
      />

      <List.Item
        title={contact}
        description="ФИО"
        left={(props) => <List.Icon {...props} icon="account" />}
      />
      <TouchableOpacity
        onPress={() => {
          _handlePress(tel);
        }}
      >
        <List.Item
          title={tel}
          description="Номер телефона"
          left={(props) => <List.Icon {...props} icon="phone" />}
        />
      </TouchableOpacity>
      <List.Item
        title="Описание"
        left={(props) => <List.Icon {...props} icon="text" />}
      />

      <View style={styles.textContainer}>
        <Text style={styles.desc}>{"Нет описания"}</Text>
      </View>
      {/* <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
      ></ScrollView> */}

      <View style={styles.btnGroup}>
        <Button
          color="#0acfc1"
          mode="contained"
          style={styles.btn}
          onPress={() => _handlePress(tel)}
        >
          Позвонить
        </Button>
        <Button
          color="#cc1f1f"
          mode="contained"
          style={styles.btn}
          onPress={() => onPressDeleteHandler()}
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
  delete: {
    backgroundColor: "red",
    width: windowWidth,
    paddingVertical: 10,
    justifyContent: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
