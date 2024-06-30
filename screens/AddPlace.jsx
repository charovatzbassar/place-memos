import React, { useContext } from "react";
import PlaceForm from "../components/Places/PlaceForm";
import { Place } from "../models/Place";
import { DbContext } from "../store/db-context";

const AddPlace = ({ navigation }) => {
  const dbContext = useContext(DbContext);

  const createPlace = async (values) => {
    const place = new Place(
      values.title,
      values.image.assets[0].uri,
      values.location
    );

    await dbContext.placeDao.addPlace(place);

    navigation.navigate("AllPlaces", { place });
  };
  return <PlaceForm createPlace={createPlace} />;
};

export default AddPlace;
