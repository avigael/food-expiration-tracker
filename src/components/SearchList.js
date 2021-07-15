import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import Item from "./Item";

const SearchList = ({ navigation }) => {
  const searchItems = useSelector((state) => state.itemReducer.searchList);
  const theme = useSelector((state) => state.itemReducer.theme);
  return (
    <>
      <Text style={[styles.areaTitle, { color: theme.PRIMARY_TEXT_COLOR }]}>
        Search Results
      </Text>
      <FlatList
        style={styles.container}
        data={searchItems}
        keyExtractor={(item, index) => item.key.toString()}
        renderItem={(data) => (
          <Item
            name={data.item.name}
            date={data.item.date}
            expires={data.item.expires}
            daysLeft={data.item.daysLeft}
            onPress={() => navigation.navigate("Edit", data.item)}
          />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaTitle: {
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});

export default SearchList;
