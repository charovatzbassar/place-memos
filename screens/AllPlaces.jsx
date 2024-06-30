import React, { useContext, useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

import { DbContext } from "../store/db-context";

const AllPlaces = ({ route }) => {
  const [places, setPlaces] = useState([]);
  const isFocused = useIsFocused();

  const dbContext = useContext(DbContext);

  useEffect(() => {
    const getAllPlaces = async () => {
      const places = await dbContext.placeDao.getAllPlaces();

      setPlaces(places);
    };
    getAllPlaces();
    if (isFocused && route.params?.place) {
      setPlaces((prevPlaces) => [...prevPlaces, route.params.place]);
    }
  }, [isFocused, route]);

  return <PlacesList places={places} />;
};

export default AllPlaces;
