export class PlaceDao {
  constructor(db) {
    this.db = db;
  }

  async getAllPlaces() {
    const data = await this.db.getAllAsync("SELECT * FROM places;");
    return data;
  }

  async getPlace(id) {
    const data = await this.db.runAsync(
      "SELECT * FROM places WHERE id = ?",
      id
    );

    return data;
  }

  async addPlace(place) {
    await this.db.runAsync(
      `INSERT INTO places (id, title, imageUri, address, lat, long) VALUES (?, ?, ?, ?, ?, ?);`,
      place.id,
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.long
    );
  }

  async editPlace(place) {
    console.log(place);
    const data = await this.db.runAsync(
      "UPDATE places SET title = ?, imageUri = ?, address = ?, lat = ?, long = ? WHERE id = ?",
      place.title,
      place.imageUri,
      place.address,
      place.lat,
      place.long,
      place.id
    );
    return data;
  }

  async deletePlace(id) {
    await this.db.runAsync("DELETE FROM places WHERE id = ?", id);
  }
}
