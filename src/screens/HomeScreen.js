import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { searchList } from "../redux/actions";
import ItemList from "../components/ItemList";
import SearchList from "../components/SearchList";

const HomeScreen = ({ navigation }) => {
  const theme = useSelector((state) => state.itemReducer.theme);
  const settings = useSelector((state) => state.itemReducer.settings);
  const dispatch = useDispatch();
  const searchItems = (data) => dispatch(searchList(data));
  const [searchText, setSearchText] = useState("");
  const [activeSearch, setActiveSearch] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.PRIMARY_BACKGROUND_COLOR },
      ]}
    >
      {/* STATUS BAR */}
      <StatusBar barStyle={theme.STATUS_BAR_STYLE} />
      {/* SEARCH BAR */}
      <View style={{ height: 60 }}>
        <View
          style={[styles.inputBar, { borderColor: theme.PRIMARY_BORDER_COLOR }]}
        >
          {activeSearch ? (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                setActiveSearch(false);
              }}
            >
              <Image
                source={
                  settings.darkMode
                    ? require("../assets/icons/dark/back.png")
                    : require("../assets/icons/light/back.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setActiveSearch(true)}>
              <Image
                source={
                  settings.darkMode
                    ? require("../assets/icons/dark/search.png")
                    : require("../assets/icons/light/search.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          <TextInput
            style={[styles.inputText, { color: theme.PRIMARY_TEXT_COLOR }]}
            placeholderTextColor={theme.PRIMARY_TEXT_COLOR}
            placeholder={"Search"}
            onFocus={() => setActiveSearch(true)}
            value={searchText}
            onChangeText={(text) => {
              setActiveSearch(true);
              setSearchText(text.toUpperCase());
              searchItems(text.toUpperCase());
            }}
          />
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
      {/* ITEMS AREA */}
      <View style={styles.itemsArea}>
        {activeSearch ? (
          /* SEARCH RESULTS */
          <SearchList navigation={navigation} />
        ) : (
          <>
            {/* ITEMS */}
            <ItemList navigation={navigation} />
            {/* ADD AN ITEM */}
            <TouchableOpacity onPress={() => navigation.navigate("Create")}>
              <View
                style={[
                  styles.inputBar,
                  { borderColor: theme.PRIMARY_BORDER_COLOR },
                ]}
              >
                <Image
                  source={
                    settings.darkMode
                      ? require("../assets/icons/dark/plus.png")
                      : require("../assets/icons/light/plus.png")
                  }
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.inputText,
                    { color: theme.PRIMARY_TEXT_COLOR },
                  ]}
                >
                  Add Item
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 45,
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});
