import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  BackHandler,
} from "react-native";
import { Button, DataTable } from "react-native-paper";
import CheckListItem from "../components/CheckListItem";
import { Dimensions } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setup_tasks } from "../redux/tasks";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home({ navigation }) {
  const isFocused = useIsFocused();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  // BackHandler.addEventListener("hardwareBackPress", function () {
  //   const routes = navigation.getState()?.routes;
  //   const prevRoute = routes[routes.length - 1];
  //   console.log(routes);
  //   if (prevRoute.name === "Auth") {
  //     return true;
  //   }
  // });

  const testData = [{ name: "zero", contact: "test", date: new Date(), id: 1 }];

  const onLoadHandler = async () => {
    try {
      // const result = await axios({
      //   method: "GET",
      //   url: "http://server.dicom.team/tasks",
      //   headers: { jwt: await SecureStore.getItemAsync("jwt") },
      // });

      // dispatch(setup_tasks(result.data));
      setData(testData);
      await new Promise((r) => setTimeout(r, 1000));
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // setIsLoading(true);
      onLoadHandler();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <DataTable.Header>
            <DataTable.Title style={styles.title}>Название</DataTable.Title>
            <DataTable.Title numeric>Контакт</DataTable.Title>
            <DataTable.Title numeric>Дата</DataTable.Title>
          </DataTable.Header>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Task", item)}
              >
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
          {/* <Button
            mode="contained"
            style={styles.btn}
            onPress={() => navigation.navigate("CreateTask")}
          >
            Добавить задачу
          </Button> */}
        </>
      )}
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
  animContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 2,
    // justifyContent: "center",
  },
});
