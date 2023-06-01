import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddEdit from "./AddEdit";

function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [isDataChanged, setIsDataChanged] = useState([]);

  useEffect(() => {
    loadData();
    setIsDataChanged(!isDataChanged);
  }, []);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/delete/` + id).catch((err) => {
      if (err) alert("Error when deleting: " + JSON.stringify(err));
    });
    alert("Deleted succesfully");
    setTimeout(() => loadData());
  };

  const renderTable = ({ item, isDataChanged }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{item.UserID}</Text>
        <Text style={styles.text}>{item.UserEmail}</Text>
        <Text style={styles.text}>{item.UserPw}</Text>
        <Button
          title="Edit"
          style={styles.button}
          onPress={() => {
            navigation.navigate("Add", { edit: true, item: item });
          }}
        />
        <Button
          title="Delete"
          style={styles.delete}
          color="red"
          onPress={() => handleDelete(item.UserID)}
        />
        <Button
          title="View"
          style={styles.button}
          color="grey"
          onPress={() => {
            navigation.navigate("Add", { edit: false, item: item });
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <FlatList
        data={data}
        renderItem={renderTable}
        keyExtractor={(item) => item.UserID}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.headerText}>ID</Text>
            <Text style={styles.headerText}>Email</Text>
            <Text style={styles.headerText}>Pwd</Text>
            <View></View>
            <View></View>
            <View></View>
          </View>
        )}
      />
      <Button
        title="Add"
        onPress={() => {
          navigation.navigate("Add", { item: null });
        }}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Add" component={AddEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#ccc",
    padding: 10,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  row: {
    marginHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "scroll",
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
