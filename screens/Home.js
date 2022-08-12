import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { DataTable, Checkbox, Button } from "react-native-paper";
import CheckListItem from "../components/CheckListItem";
import { Dimensions } from "react-native";
import NewTask from "./CreateTask";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({ navigation }) {
  const [page, setPage] = useState(0);
  const [data, setData] = useState([
    {
      id: 1,
      name: "Задача1",
      type: "Встреча",
      date: "07-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "49123784923874",
    },
    {
      id: 2,
      name: "Задача2",
      type: "Встреча",
      date: "08-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "97987429423",
    },
    {
      id: 3,
      name: "Задача3",
      type: "Встреча",
      date: "09-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "63123586238",
    },
    {
      id: 4,
      name: "Задача3",
      type: "Встреча",
      date: "09-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "63123586238",
    },
    {
      id: 5,
      name: "Задача3",
      type: "Встреча",
      date: "09-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "63123586238",
    },
    {
      id: 6,
      name: "Задача3",
      type: "Встреча",
      date: "09-03-2022",
      userName: "Иванов Иван Иванович",
      tel: "63123586238",
    },
    // {
    //   id: 7,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 8,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 9,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 10,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 11,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 12,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 13,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 14,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
    // {
    //   id: 15,
    //   name: "Задача3",
    //   type: "Встреча",
    //   date: "09-03-2022",
    //   userName: "Иванов Иван Иванович",
    //   tel: "63123586238",
    // },
  ]);

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Task", item)}>
            <CheckListItem
              data={item}
              func={async (condition) => {
                await new Promise((r) => setTimeout(r, 600));
                setData((prevData) => {
                  return prevData.filter(condition);
                });
              }}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button
        mode="contained"
        style={styles.btn}
        onPress={() => navigation.navigate("CreateTask")}
      >
        Добавить задачу
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  table: {
    height: windowHeight - 50,
  },
});
