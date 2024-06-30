import React, { useContext } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { DbContext } from "../store/db-context";

const PlaceDetails = ({ navigation, route }) => {
  const { place } = route.params;
  const dbContext = useContext(DbContext);

  const deletePlaceHandler = async () => {
    await dbContext.placeDao.deletePlace(place.id);
    navigation.goBack();
  };

  const editPlaceHandler = () => {
    navigation.navigate("EditPlace", { prevPlace: place });
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: place.imageUri }} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
      <View style={[styles.card, styles.buttonCard]}>
        <Button title="Edit" onPress={editPlaceHandler} />
        <Button title="Delete" onPress={deletePlaceHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  image: { width: "100%", height: "25%", borderRadius: 10 },
  card: {
    backgroundColor: "#ccc",
    marginTop: 26,
    borderRadius: 10,
    padding: 24,
  },
  title: { fontSize: 24, marginBottom: 16, fontWeight: "bold" },
  address: { fontSize: 18 },
  buttonCard: { flexDirection: "row", justifyContent: "space-around" },
});

export default PlaceDetails;
