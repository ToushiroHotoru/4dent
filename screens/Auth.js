import { useState } from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default Auth = ({ navigation }) => {
  const [login, setLoign] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
        <Button mode="contained" onPress={() => navigation.navigate("Tabs")}>
          <Text>Войти</Text>
        </Button>
      </View>
    </View>
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
});
