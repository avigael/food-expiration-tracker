import React from "react";
import { StyleSheet, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Item from "./Item";

const SearchList = ({ navigation }) => {
  const items = useSelector((state) => state.itemReducer.itemList);
  return (
    <>
      <Text style={styles.areaTitle}>Search Results</Text>
      <FlatList
        style={styles.container}
        data={items}
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
    backgroundColor: "red",
  },
  areaTitle: {
    fontSize: 19,
    fontFamily: "MenloBold",
  },
});

export default SearchList;
