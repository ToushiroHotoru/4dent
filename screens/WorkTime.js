import { Text, View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Dimensions } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import * as Location from "expo-location";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WorkTime() {
  const [workdayIsActive, setWorkdayIsActive] = useState(false);
  const [location, setLocation] = useState(null);
  const { bx24Id } = useSelector((state) => state.user);
  const [isDisabledGPS, setIsDisabledGPS] = useState(false);
  const [isDisabledWorkTime, setIsDisabledWorkTime] = useState(false);
  const [gpsData, setGpsData] = useState();
  const isFocused = useIsFocused();

  const gpsButtonHandler = async () => {
    try {
      setIsDisabledGPS(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address = await Location.reverseGeocodeAsync(location.coords);
      // setGpsData(address);
      console.log(address);
      setLocation(JSON.stringify(address));
      setIsDisabledGPS(false);
    } catch (err) {
      console.log(err);
    }
  };

  const workdayButtonHandler = async () => {
    try {
      setIsDisabledWorkTime(true);
      await axios({
        method: "POST",
        url: workdayIsActive
          ? "http://server.dicom.team/finish-workday"
          : "http://server.dicom.team/start-workday",
        headers: { jwt: await SecureStore.getItemAsync("jwt") },
      });
      setIsDisabledWorkTime(false);
    } catch (err) {
      console.log(err);
    }
  };

  const onLoadHandler = async () => {
    try {
      const result = await axios({
        method: "GET",
        url: "http://server.dicom.team/status-workday",
        headers: { jwt: await SecureStore.getItemAsync("jwt") },
      });

      if (result.data.status == "CLOSED") {
        setWorkdayIsActive(false);
      } else if (result.data.status == "OPENED") {
        setWorkdayIsActive(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isFocused) {
      onLoadHandler();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Button
        contentStyle={{
          // <--- HERE-----
          paddingVertical: 10,
        }}
        color={workdayIsActive ? "#cc1f1f" : "purple"}
        style={styles.btn}
        mode="contained"
        icon={workdayIsActive ? "clock-remove" : "clock-plus-outline"}
        onPress={() => {
          setWorkdayIsActive(!workdayIsActive);
          workdayButtonHandler();
        }}
        disabled={isDisabledWorkTime}
      >
        {workdayIsActive ? "Закончить рабочий день" : "Начать рабочий день"}
      </Button>

      <Button
        contentStyle={{
          // <--- HERE-----
          paddingVertical: 10,
        }}
        color="#0acfc1"
        style={styles.btn}
        mode="contained"
        icon="map"
        onPress={() => gpsButtonHandler()}
        disabled={isDisabledGPS}
      >
        Отправить геолокацию
      </Button>
      <View>
        <Text>{location ? location : "no data"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btn: {
    width: windowWidth - 20,
    marginTop: 10,
  },
});
