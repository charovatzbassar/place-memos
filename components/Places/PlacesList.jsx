import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../utils/Colors";
import { useNavigation } from "@react-navigation/native";

const PlacesList = ({ places }) => {
  const navigation = useNavigation();
  return (
    <>
      {!places || places.length === 0 ? (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>
            No places found. Maybe start adding some!
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={places}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <PlaceItem
              place={item}
              onSelect={() =>
                navigation.navigate("PlaceDetails", { place: item })
              }
            />
          )}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
  list: {
    margin: 24,
  },
});

export default PlacesList;
