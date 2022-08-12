import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { DataTable, Checkbox, Button } from "react-native-paper";

export default function CheckListItem({ data, func }) {
  const [checked, setChecked] = useState(false);

  return (
    <DataTable.Row>
      <DataTable.Cell>
        <View style={styles.item}>
          <View>
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
                func((item) => {
                  return item.id != data.id;
                });
              }}
            />
          </View>
          <View>
            <Text>{data.name}</Text>
          </View>
        </View>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{data.type}</Text>
      </DataTable.Cell>
      <DataTable.Cell>
        <Text>{data.date}</Text>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
