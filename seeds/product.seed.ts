import mongoose from 'mongoose';

import { dbConnection } from '../src/config/database-connection';
import { env } from '../src/config/env';
import { Product } from '../src/models/product.model';

const productsData = [
  {
    name: 'Smartphone',
    price: 150,
    quantity: 10,
    category: 'Electronics',
  },
  {
    name: 'Laptop',
    quantity: 100,
    price: 900,
    category: 'Electronics',
  },
  {
    name: 'Headphones',
    quantity: 95,
    price: 80,
    category: 'Electronics',
  },
  {
    name: 'Desk Chair',
    quantity: 100,
    price: 120,
    category: 'Furniture',
  },
  {
    name: 'Bookshelf',
    quantity: 500,
    price: 75,
    category: 'Furniture',
  },
  {
    name: 'Blender',
    quantity: 900,
    price: 60,
    category: 'Home Appliances',
  },
  {
    name: 'Air Conditioner',
    quantity: 100,
    price: 200,
    category: 'Home Appliances',
  },
  {
    name: 'Microwave',
    quantity: 100,
    price: 140,
    category: 'Home Appliances',
  },
  {
    name: 'Tablet',
    quantity: 1000,
    price: 180,
    category: 'Electronics',
  },
  {
    name: 'Gaming Mouse',
    quantity: 800,
    price: 50,
    category: 'Electronics',
  },
];

async function productRoles() {
  try {
    await dbConnection(env.mongoDb.uri);
    
    const products = await Product.find();

    if (products.length > 0) {
      return console.log('products already seeded');
    }

    await Product.insertMany(productsData);

    console.log('product seed done');
  } catch (error) {
    console.error('Error seeding products:', error);
  } finally {
    await mongoose.disconnect();
  }
}

productRoles();
