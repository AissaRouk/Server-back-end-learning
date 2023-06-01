import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

export default function AddEdit({ navigation, route }) {
  const [UserEmail, setUserEmail] = useState("");
  const [UserPw, setUserPw] = useState("");

  var { item, edit } = route.params;
  useEffect(() => {
    if (item !== null) {
      setUserEmail(item.UserEmail);
      setUserPw(item.UserPw);
    }
  }, [route.params]);

  const handleSubmit = () => {
    if (
      (!UserEmail || !UserPw) &&
      UserEmail !== item.UserEmail &&
      UserPw !== item.UserPw
    )
      alert("All fields must be filled");
    else {
      axios
        .post("http://localhost:3001/api/post", {
          UserEmail: UserEmail,
          UserPw: UserPw,
        })
        .catch((err) => {
          if (err)
            alert("Error in Submitting the query: " + JSON.stringify(err));
          else alert("Successfull query");
        });
      alert("Added Succesfully");
      setTimeout(() => navigation.goBack(), 500);
    }
  };

  const handleEdit = () => {
    if (item.UserEmail !== UserEmail || item.UserPw !== UserPw) {
      axios
        .put("http://localhost:3001/api/update/" + item.UserID, {
          UserEmail: UserEmail,
          UserPw: UserPw,
        })
        .then((res) => {
          console.log(JSON.stringify(res));
          navigation.goBack();
        })
        .catch((err) => alert(JSON.stringify(err)));
    }
  };

  const editOrView = () => {
    if (item !== null)
      if (edit) {
        return (
          <View style={styles.view}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>UserID</Text>
              <Text>{item.UserID}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>Email</Text>
              <TextInput
                placeholder="Email"
                value={UserEmail}
                style={{ borderWidth: 1, borderColor: "grey" }}
                onChangeText={setUserEmail}
              />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text>Pw</Text>
              <TextInput
                placeholder="Pw"
                style={{ borderWidth: 1, borderColor: "grey" }}
                value={UserPw}
                onChangeText={setUserPw}
              />
            </View>

            <Button title="Update" onPress={handleEdit} />
          </View>
        );
      } else {
        console.log(JSON.stringify(item));
        return (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ marginHorizontal: 10 }}>UserId: {item.UserID}</Text>
            <Text style={{ marginHorizontal: 10 }}>
              UserEmail: {item.UserEmail}
            </Text>
            <Text style={{ marginHorizontal: 10 }}>UserPwd: {item.UserPw}</Text>
          </View>
        );
      }
    else {
      return (
        <View style={styles.view}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text>Email</Text>
            <TextInput
              placeholder="Email"
              style={{ borderWidth: 1, borderColor: "grey" }}
              onChangeText={setUserEmail}
            />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text>Pw</Text>
            <TextInput
              placeholder="Pw"
              style={{ borderWidth: 1, borderColor: "grey" }}
              onChangeText={setUserPw}
            />
          </View>

          <Button title="Submitt" onPress={handleSubmit} />
        </View>
      );
    }
  };

  return editOrView();
}

const styles = StyleSheet.create({
  view: { flex: 1, justifyContent: "center", alignItems: "center" },
});
