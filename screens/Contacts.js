import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { Button, List } from "react-native-paper";
import * as Linking from "expo-linking";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";

export default function Contacts() {
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.contacts);

  const _handlePress = (tel) => {
    Linking.openURL(`tel:${tel}`);
  };

  const onLoadHandler = async () => {
    try {
      // const result = await axios({
      //   method: "GET",
      //   url: "http://server.dicom.team/contacts",
      //   headers: {
      //     jwt: await SecureStore.getItemAsync("jwt"),
      //   },
      // });

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
        <FlatList
          data={contacts}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                _handlePress(item.tel);
              }}
            >
              <List.Item
                title={item.name}
                description={item.tel}
                left={(props) => <List.Icon {...props} icon="account-circle" />}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
