import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, List } from "react-native-paper";
import * as Linking from "expo-linking";

export default function Contacts() {
  const [contacts, setContacts] = useState([
    { name: "Zero", tel: "+79063874717" },
    { name: "One", tel: "+79063874717" },
    { name: "Two", tel: "+79063874717" },
    { name: "Three", tel: "+79063874717" },
    { name: "Four", tel: "+79063874717" },
  ]);

  _handlePress = (tel) => {
    Linking.openURL(`tel:${tel}`);
  };

  return (
    <View>
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
    </View>
  );
}
