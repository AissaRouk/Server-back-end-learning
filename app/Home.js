import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };

  const renderTable = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.text}>{item.UserID}</Text>
        <Text style={styles.text}>{item.UserEmail}</Text>
        <Text style={styles.text}>{item.UserPw}</Text>
        <Button title="Edit" style={styles.button} />
        <Button title="Delete" style={styles.delete} color="red" />
        <Button title="View" style={styles.button} color="grey" />
      </View>
    );
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
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
  },
  text: {
    flex: 1,
    fontSize: 16,
  },
});
