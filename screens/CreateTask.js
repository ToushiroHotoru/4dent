import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput, Button, List } from "react-native-paper";
import { useState, useCallback } from "react";
import { Dimensions } from "react-native";
import { TimePickerModal, DatePickerModal } from "react-native-paper-dates";
import dateFormat, { masks } from "dateformat";
import { i18n } from "dateformat";
import "intl";
import "intl/locale-data/jsonp/eu";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function CreateTask({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [userName, setUserName] = useState("");
  const [tel, setTel] = useState("");
  const [desc, setDesc] = useState("");
  const [open, setOpen] = useState(false);

  i18n.monthNames = [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Нов",
    "Дек",
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const onPressHandler = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://server.dicom.team/create-task",
        data: {
          name: name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //* Datepicker

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params) => {
      setOpen(false);
      setDate(dateFormat(params.date, "longDate"));
    },
    [setOpen, setDate]
  );

  //* Timepicker

  const [visible, setVisible] = useState(false);
  const onDismiss = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const onConfirm = useCallback(
    ({ hours, minutes }) => {
      setVisible(false);
      setTime(`${hours}:${minutes}`);
    },
    [setVisible]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.btnGroup}>
            <Button
              style={styles.timeBtn}
              mode="contained"
              onPress={() => setVisible(true)}
            >
              Время
            </Button>
            <Button
              style={styles.dateBtn}
              mode="contained"
              onPress={() => setOpen(true)}
              // uppercase={false}
            >
              Дата
            </Button>
          </View>
          {date && (
            <List.Item
              title={date}
              description="Дата"
              left={(props) => <List.Icon {...props} icon="calendar-range" />}
            />
          )}

          {time && (
            <List.Item
              title={time}
              description="Время"
              left={(props) => <List.Icon {...props} icon="clock-outline" />}
            />
          )}

          <TextInput
            label="Название"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          {/* <TextInput
            label="Тип"
            value={type}
            onChangeText={(type) => setType(type)}
          /> */}
          <TimePickerModal
            visible={visible}
            onDismiss={onDismiss}
            onConfirm={onConfirm}
            hours={12} // default: current hours
            minutes={14} // default: current minutes
            label="Выберите время" // optional, default 'Select time'
            uppercase={false} // optional, default is true
            cancelLabel="Отмена" // optional, default: 'Cancel'
            confirmLabel="Ok" // optional, default: 'Ok'
            animationType="fade" // optional, default is 'none'
            locale="ru" // optional, default is automically detected by your system
          />

          <DatePickerModal
            locale="en"
            mode="single"
            visible={open}
            onDismiss={onDismissSingle}
            date={date}
            onConfirm={onConfirmSingle}
            // validRange={{
            //   startDate: new Date(2021, 1, 2),  // optional
            //   endDate: new Date(), // optional
            //   disabledDates: [new Date()] // optional
            // }}
            // onChange={} // same props as onConfirm but triggered without confirmed by user
            // saveLabel="Save" // optional
            // uppercase={false} // optional, default is true
            // label="Select date" // optional
            // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
          />
          <TextInput
            label="Пользователь"
            value={userName}
            onChangeText={(userName) => setUserName(userName)}
          />
          <TextInput
            label="Номер телефона"
            value={tel}
            onChangeText={(tel) => setTel(tel)}
          />
          <TextInput
            label="Описание"
            value={desc}
            onChangeText={(desc) => setDesc(desc)}
            multiline={true}
          />

          <Button
            mode="contained"
            // style={styles.btn}
            onPress={() => navigation.navigate("Home")}
          >
            Добавить
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    paddingTop: 10,
    flex: 1,
  },
  form: { width: windowWidth - 50 },
  textContainer: {
    margin: 15,
  },
  desc: {
    textAlign: "justify",
  },
  btnGroup: {
    alignItems: "center",
    flexDirection: "row",
    marginVertical: 2.5,
  },
  btn: {
    width: windowWidth - 10,
    marginTop: 5,
  },
  dateBtn: {
    flex: 1,
    marginLeft: 1,
  },
  timeBtn: {
    flex: 1,
    marginRight: 1,
  },
});
