import { useState, useEffect } from "react";
import { TextInput, Button } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Dimensions } from "react-native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { setup_name, setup_bx24Id } from "../redux/user";
import { useIsFocused } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default Auth = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [login, setLoign] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState();
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const onClickHandler = async () => {
    try {
      // const result = await axios({
      //   method: "POST",
      //   url: "http://server.dicom.team/login",
      //   data: { login: _.trim(login), password: _.trim(password) },
      // });

      // await SecureStore.setItemAsync("jwt", result.data.jwt);
      dispatch(setup_name("test"));
      dispatch(setup_bx24Id(21));

      setIsError(false);
      setMessage("SUCCESS");
      await new Promise((r) => setTimeout(r, 500));
      navigation.navigate("Tabs");
      setMessage(false);
      setPassword("");
      setLoign("");
    } catch (err) {
      console.log(err);
      setIsError(true);
      setMessage(_.toUpper(err.response.data.message));
    }
  };

  // const onLoadHandler = async () => {
  //   try {
  //     const result = await axios({
  //       method: "POST",
  //       url: "http://server.dicom.team/is-authenticated",
  //       headers: { jwt: await SecureStore.getItemAsync("jwt") },
  //     });

  //     if (result.data.isAuthenticated) {
  //       navigation.navigate("Tabs");
  //       dispatch(setup_name(result["data"]["data"]["result"]["name"]));
  //       dispatch(setup_bx24Id(result["data"]["data"]["result"]["bx24Id"]));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   if (isFocused) {
  //     onLoadHandler();
  //   }
  // }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          {message && (
            <View
              style={[
                styles.message,
                { backgroundColor: isError ? "red" : "#4ee44e" },
              ]}
            >
              <Text style={styles.messageText}>{message}</Text>
            </View>
          )}
          <TextInput
            label="Email"
            value={login}
            onChangeText={(login) => setLoign(login)}
          />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
          <Button
            mode="contained"
            onPress={() => {
              onClickHandler();
              // navigation.navigate("Tabs");
            }}
          >
            <Text>Войти</Text>
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "center",
    width: windowWidth - 50,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    width: windowWidth - 50,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
  messageText: {
    color: "white",
  },
});
