import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable, Checkbox, Button } from "react-native-paper";
import dateFormat from "dateformat";
import _ from "lodash";

export default function CheckListItem({ data, func }) {
  const [checked, setChecked] = useState(false);

  function spliceText(text) {
    if (text.length > 20) {
      return _.dropRight(text, text.length - 20).join("") + "...";
    }
    return text;
  }

  return (
    <DataTable.Row>
      <DataTable.Cell style={styles.item}>
        <View style={styles.test}>
          {/* <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
              func((item) => {
                return item.id != data.id;
              });
            }}
          /> */}
          <Text style={styles.text}>{spliceText(data.name)}</Text>
        </View>
        {/* <View>
          <Text>{data.name}</Text>
        </View> */}
      </DataTable.Cell>

      <DataTable.Cell numeric>
        <Text>{data.contact}</Text>
      </DataTable.Cell>
      <DataTable.Cell numeric>
        <Text>{data.date && dateFormat(data.date, "dd-mm-yyyy")}</Text>
      </DataTable.Cell>
    </DataTable.Row>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  item: {
    flex: 2,
    alignItems: "center",
    flexDirection: "row",
    // borderWidth: 1,
  },
  test: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    justifyContent: "center",
    textAlignVertical: "center",
  },
});
