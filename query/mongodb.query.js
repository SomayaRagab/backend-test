/* eslint-disable no-undef */
db.products
  .find({ category: "Electronics" })
  .sort({ price: -1 }) // Sort by price descending
  .skip(5 * (1 - 1)) // Skip documents for pagination note: skip(limit * (page -1))
  .limit(5); // Limit to 5 products per page


//Optimization

// 1- indexing
db.products.createIndex({ category: 1, price: -1 });


// 2- Sharding

sh.shardCollection("products", { category: 1 });


