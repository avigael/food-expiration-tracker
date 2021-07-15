import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../redux/actions";

// CHECK IF DATE IS VALID AND IN CORRECT FORMAT (MM/DD/YYYY)
function validateDate(date) {
  var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(2)\d{3}$/;
  if (date === "DOES NOT EXPIRE") {
    return true;
  }
  return date_regex.test(date);
}

// GETS THE CURRENT DATE TO CALCULATE DAYSLEFT
function getCurrentDate() {
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
  var year = new Date().getFullYear();
  // FORMAT: MM/DD/YYYY
  if (month > 9) {
    return month + "/" + date + "/" + year;
  }
  return "0" + month + "/" + date + "/" + year;
}

// SETS THE DAYS LEFTS UNTIL ITEM EXPIRES
function getDaysLeft(date) {
  var currentDate = new Date(getCurrentDate());
  var expirationDate = new Date(date);
  var time = currentDate.getTime() - expirationDate.getTime();
  if (time > 0) {
    return 0;
  } else {
    time = Math.abs(time);
  }
  var days = Math.ceil(time / (1000 * 3600 * 24));
  return days;
}

function CreateScreen({ navigation }) {
  // REDUX
  const dispatch = useDispatch();
  const submitItem = (item) => dispatch(addItem(item));
  const theme = useSelector((state) => state.itemReducer.theme);
  const settings = useSelector((state) => state.itemReducer.settings);
  // ITEM DETAILS
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [expires, setExpires] = useState(true);
  const [daysLeft, setDaysLeft] = useState(0);
  const [dateValid, setDateValid] = useState(true);
  const [nameValid, setNameValid] = useState(true);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
      ]}
    >
      {/* TOP NAV BAR */}
      <View style={{ height: 60 }}>
        <View
          style={[styles.inputBar, { borderColor: theme.PRIMARY_BORDER_COLOR }]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={
                settings.darkMode
                  ? require("../assets/icons/dark/back.png")
                  : require("../assets/icons/light/back.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}>
            Add Item
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
            <Image
              source={
                settings.darkMode
                  ? require("../assets/icons/dark/menu.png")
                  : require("../assets/icons/light/menu.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* CREATE SECTION */}
      <View style={styles.itemsArea}>
        <Text style={[styles.areaTitle, { color: theme.PRIMARY_TEXT_COLOR }]}>
          Preview
        </Text>
        {/* PREVIEW */}
        <View style={styles.itemBox}>
          <View style={styles.nameArea}>
            <Text style={styles.itemName}>{name}</Text>
          </View>
          <View style={styles.infoArea}>
            <Text style={styles.itemInfo}>{date}</Text>
            {expires ? (
              <Text style={styles.itemInfo}>
                {daysLeft} DAY{daysLeft == 1 ? "" : "S"} LEFT
              </Text>
            ) : (
              <></>
            )}
          </View>
        </View>
        {/* NAME INPUT */}
        <Text style={[styles.areaTitle, { color: theme.PRIMARY_TEXT_COLOR }]}>
          Details
        </Text>
        <View
          style={
            nameValid
              ? [
                  styles.inputBar,
                  {
                    borderColor: theme.PRIMARY_BORDER_COLOR,
                    marginVertical: 5,
                  },
                ]
              : [
                  styles.inputBar,
                  {
                    borderColor: "red",
                    marginVertical: 5,
                  },
                ]
          }
        >
          <Image
            source={
              settings.darkMode
                ? require("../assets/icons/dark/food.png")
                : require("../assets/icons/light/food.png")
            }
            style={styles.icon}
          />
          <TextInput
            style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}
            placeholderTextColor={theme.PRIMARY_TEXT_COLOR}
            placeholder={"ITEM NAME"}
            value={name}
            onChangeText={(name) => {
              setNameValid(true);
              setName(name.toUpperCase());
            }}
          />
        </View>
        {/* DATE INPUT */}
        <View
          style={
            dateValid
              ? [
                  styles.inputBar,
                  { borderColor: theme.PRIMARY_TEXT_COLOR, marginVertical: 5 },
                ]
              : [styles.inputBar, { borderColor: "red", marginVertical: 5 }]
          }
        >
          <Image
            source={
              settings.darkMode
                ? require("../assets/icons/dark/date.png")
                : require("../assets/icons/light/date.png")
            }
            style={styles.icon}
          />
          <TextInput
            style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}
            placeholderTextColor={theme.PRIMARY_TEXT_COLOR}
            placeholder={"MM/DD/YYYY"}
            value={date}
            onChangeText={(date) => {
              setDate(date);
              setExpires(true);
              if (validateDate(date)) {
                setDateValid(true);
                setDaysLeft(getDaysLeft(date));
                if (date === "DOES NOT EXPIRE") {
                  setExpires(false);
                }
              } else {
                setDateValid(false);
              }
            }}
          />
        </View>
        {/* NEVER EXPIRES BUTTON */}
        <TouchableOpacity
          style={[
            styles.inputBar,
            { borderColor: theme.PRIMARY_BORDER_COLOR, marginVertical: 5 },
          ]}
          onPress={() => {
            setExpires(!expires);
            if (expires) {
              setDate("DOES NOT EXPIRE");
              setDateValid(true);
            } else {
              setDate("");
            }
          }}
        >
          {expires ? (
            <View
              style={[
                styles.checkBox,
                { borderColor: theme.PRIMARY_BORDER_COLOR },
              ]}
            ></View>
          ) : (
            <View
              style={[
                styles.checkBox,
                {
                  borderColor: theme.PRIMARY_BORDER_COLOR,
                  backgroundColor: "lime",
                },
              ]}
            ></View>
          )}
          <Text style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}>
            Never Expires?
          </Text>
        </TouchableOpacity>
        {/* BUTTONS */}
        <View style={styles.buttonArea}>
          {/* CANCEL BUTTON */}
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: theme.PRIMARY_BORDER_COLOR, marginRight: 5 },
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text
              style={[styles.buttonText, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              CANCEL
            </Text>
          </TouchableOpacity>
          {/* CREATE BUTTON */}
          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: theme.PRIMARY_BORDER_COLOR, marginLeft: 5 },
            ]}
            onPress={() => {
              if (name !== "" && validateDate(date)) {
                submitItem({ name, date, expires, daysLeft });
                navigation.goBack();
              } else {
                if (name === "") {
                  setNameValid(false);
                }
                if (!validateDate(date)) {
                  setDateValid(false);
                }
              }
            }}
          >
            <Text
              style={[styles.buttonText, { color: theme.PRIMARY_TEXT_COLOR }]}
            >
              CREATE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 45,
  },
  inputBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 3,
    height: 50,
    paddingHorizontal: 15,
  },
  icon: {
    height: 20,
    width: 20,
    marginRight: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 19,
    fontFamily: "MenloBold",
  },
  itemsArea: {
    flex: 1,
    flexDirection: "column",
  },
  areaTitle: {
    fontFamily: "MenloBold",
    fontSize: 20,
  },
  itemBox: {
    height: 60,
    borderRadius: 15,
    borderColor: "#B6B6B6",
    borderWidth: 3,
    marginVertical: 5,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  nameArea: {
    flex: 1,
    overflow: "hidden",
  },
  itemName: {
    fontFamily: "MenloBold",
    color: "#B6B6B6",
    fontSize: 16,
  },
  infoArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  itemInfo: {
    fontFamily: "MenloBold",
    color: "#B6B6B6",
    fontSize: 14,
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 3,
    marginRight: 15,
  },
  buttonArea: {
    flexDirection: "row",
    marginTop: 5,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    borderRadius: 15,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});
