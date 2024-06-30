export class PlaceDao {
  constructor(db) {
    this.db = db;
  }

  getAllPlaces = async () => {
    const data = await this.db.getAllAsync("SELECT * FROM places;");
    return data;
  };

  addPlace = async (place) => {
    await this.db.runAsync(
      `INSERT INTO places (id, title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?, ?);`,
      place.id,
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.long
    );
  };
}
