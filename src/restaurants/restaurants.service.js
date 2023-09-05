const knex = require("../db/connection");

function averageRating() {
  try {
    return knex('restaurants')
      .avg({ avg: 'rating' })
      .first()
      .then((result) => {
        const averageRating = parseFloat(result.avg); // Convert to a number

        if (!isNaN(averageRating)) {
          return { data: { average_rating: averageRating } }; // Return as a number
        } else {
          throw new Error('Average rating is not a valid number');
        }
      });
  } catch (error) {
    throw new Error('Error calculating average rating');
  }
}

function count() {
  try {
    return knex('restaurants')
      .count('restaurant_id as count')
      .first()
      .then((result) => {
        return parseInt(result.count, 10);
      });
  } catch (error) {
    throw new Error('Error counting restaurants');
  }
}

function create(newRestaurant) {
  return knex("restaurants")
    .insert(newRestaurant, "*")
    .then((createdRecords) => createdRecords[0]);
}

function destroy(restaurant_id) {
  return knex("restaurants").where({ restaurant_id }).del();
}

function list() {
  return knex("restaurants").select("*");
}

function read(restaurant_id) {
  return knex("restaurants").select("*").where({ restaurant_id }).first();
}

function readHighestRating() {
  try {
    return knex('restaurants')
      .max({ max_rating: 'rating' })
      .first()
      .then((result) => {
        const maxRating = parseFloat(result.max_rating); // Convert to a number

        if (!isNaN(maxRating)) {
          return { data: { max_rating: maxRating.toFixed(2) } };
        } else {
          return { data: { max_rating: null } };
        }
      });
  } catch (error) {
    throw new Error('Error reading highest rating');
  }
}

function update(updatedRestaurant) {
  return knex("restaurants")
    .select("*")
    .where({ restaurant_id: updatedRestaurant.restaurant_id })
    .update(updatedRestaurant, "*");
}

module.exports = {
  averageRating,
  count,
  create,
  delete: destroy,
  list,
  read,
  readHighestRating,
  update,
};
