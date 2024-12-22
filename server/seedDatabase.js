import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Trip from './models/Trip.js';
import User from './models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.log(err));

const sampleTrips = [
  {
    name: 'Paris Getaway',
    description: 'Experience the magic of Paris in this 5-day trip.',
    startDate: new Date('2023-07-01'),
    endDate: new Date('2023-07-05'),
    price: 1200,
    availableSlots: 20,
    cancellationPolicy: 'Full refund if cancelled 7 days before the trip.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Tokyo Adventure',
    description: 'Explore the vibrant city of Tokyo in this week-long trip.',
    startDate: new Date('2023-08-15'),
    endDate: new Date('2023-08-22'),
    price: 1800,
    availableSlots: 15,
    cancellationPolicy: 'Full refund if cancelled 14 days before the trip.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'New York City Exploration',
    description: 'Discover the Big Apple in this exciting 6-day trip.',
    startDate: new Date('2023-09-10'),
    endDate: new Date('2023-09-16'),
    price: 1500,
    availableSlots: 25,
    cancellationPolicy: 'Full refund if cancelled 10 days before the trip.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Bali Beach Retreat',
    description: 'Relax on the beautiful beaches of Bali in this 7-day tropical getaway.',
    startDate: new Date('2023-10-05'),
    endDate: new Date('2023-10-12'),
    price: 1600,
    availableSlots: 18,
    cancellationPolicy: 'Full refund if cancelled 21 days before the trip.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Rome Historical Tour',
    description: 'Step back in time with this 5-day tour of Rome\'s ancient wonders.',
    startDate: new Date('2023-11-01'),
    endDate: new Date('2023-11-06'),
    price: 1300,
    availableSlots: 22,
    cancellationPolicy: 'Full refund if cancelled 14 days before the trip.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Machu Picchu Expedition',
    description: 'Embark on a 9-day adventure to explore the ancient Incan citadel.',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2023-12-10'),
    price: 2200,
    availableSlots: 12,
    cancellationPolicy: 'Full refund if cancelled 30 days before the trip.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Safari in Serengeti',
    description: 'Experience the wildlife of Tanzania in this 8-day safari adventure.',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-23'),
    price: 3000,
    availableSlots: 10,
    cancellationPolicy: 'Full refund if cancelled 45 days before the trip.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80',
  },
];

async function createDefaultUser() {
  const defaultUser = new User({
    username: 'default_organizer',
    email: 'organizer@example.com',
    password: 'password123',
    role: 'organizer'
  });
  await defaultUser.save();
  return defaultUser._id;
}

const seedDatabase = async () => {
  try {
    await Trip.deleteMany({});
    console.log('Deleted existing trips');

    const defaultOrganizerId = await createDefaultUser();
    console.log('Created default organizer');

    const tripsWithOrganizer = sampleTrips.map(trip => ({
      ...trip,
      organizer: defaultOrganizerId
    }));

    await Trip.insertMany(tripsWithOrganizer);
    console.log('Sample trips inserted successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.connection.close();
  }
};

seedDatabase();

