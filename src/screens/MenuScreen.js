import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings, changeTheme } from "../redux/actions";
import { lightTheme, darkTheme } from "../assets/theme";

function MenuScreen({ navigation }) {
  const settings = useSelector((state) => state.itemReducer.settings);
  const theme = useSelector((state) => state.itemReducer.theme);
  const dispatch = useDispatch();
  const changeSettings = (data) => dispatch(updateSettings(data));
  const switchTheme = (data) => dispatch(changeTheme(data));

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
      ]}
    >
      {/* STATUS BAR */}
      <StatusBar barStyle={theme.STATUS_BAR_STYLE} />
      {/* NAV BAR */}
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
            Menu
          </Text>
        </View>
      </View>
      {/* OPTIONS AREA */}
      <View style={styles.itemsArea}>
        <Text style={[styles.areaTitle, { color: theme.PRIMARY_TEXT_COLOR }]}>
          Settings
        </Text>
        {/* DARK MODE */}
        <TouchableOpacity
          style={[
            styles.inputBar,
            { borderColor: theme.PRIMARY_BORDER_COLOR, marginVertical: 5 },
          ]}
          onPress={() => {
            if (settings.darkMode) {
              switchTheme(lightTheme);
            } else {
              switchTheme(darkTheme);
            }
            changeSettings({
              darkMode: !settings.darkMode,
              notification: settings.notification,
              threshold: settings.threshold,
            });
          }}
        >
          {settings.darkMode ? (
            <View
              style={[
                styles.checkBox,
                {
                  borderColor: theme.PRIMARY_BORDER_COLOR,
                  backgroundColor: "lime",
                },
              ]}
            ></View>
          ) : (
            <View
              style={[
                styles.checkBox,
                { borderColor: theme.PRIMARY_BORDER_COLOR },
              ]}
            ></View>
          )}
          <Text style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}>
            Dark Mode
          </Text>
        </TouchableOpacity>
        {/* THRESHOLD */}
        <Text
          style={[styles.thresholdText, { color: theme.PRIMARY_TEXT_COLOR }]}
        >
          Expiring Soon Threshold
        </Text>
        <View
          style={[
            styles.inputBar,
            { borderColor: theme.PRIMARY_BORDER_COLOR, marginVertical: 5 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              if (settings.threshold > 1) {
                changeSettings({
                  darkMode: settings.darkMode,
                  notification: settings.notification,
                  threshold: settings.threshold - 1,
                });
              }
            }}
          >
            <Image
              source={
                settings.darkMode
                  ? require("../assets/icons/dark/minus.png")
                  : require("../assets/icons/light/minus.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text
            style={[styles.thresholdText, { color: theme.PRIMARY_TEXT_COLOR }]}
          >
            {settings.threshold} Day(s)
          </Text>
          <TouchableOpacity
            onPress={() =>
              changeSettings({
                darkMode: settings.darkMode,
                notification: settings.notification,
                threshold: settings.threshold + 1,
              })
            }
          >
            <Image
              source={
                settings.darkMode
                  ? require("../assets/icons/dark/plus.png")
                  : require("../assets/icons/light/plus.png")
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default MenuScreen;

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
  },
  icon: {
    height: 20,
    width: 20,
    marginHorizontal: 15,
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
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 3,
    marginHorizontal: 15,
  },
  thresholdText: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});
