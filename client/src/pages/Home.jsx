import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Search, Globe, Users, Award, Clock, Star, Shield, Heart, Compass, Target, Coffee } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

function Home() {
  const [startDate, setStartDate] = useState(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Unique Design */}
      <section className="relative min-h-[85vh] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-indigo-900 opacity-50"></div>
          <div className="absolute inset-0 bg-grid-white/[0.2] bg-[size:20px_20px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full">
          <div className="flex flex-col md:flex-row items-center justify-between h-full py-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 text-white mb-12 md:mb-0"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Adventure Awaits
                <span className="block text-emerald-400">Beyond Horizons</span>
              </h1>
              <p className="text-xl mb-8 text-gray-300">
                Embark on extraordinary journeys with expert guides and fellow adventurers. 
                Create memories that last a lifetime.
              </p>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 max-w-md">
                <div className="flex items-center space-x-4">
                  <div className="relative flex-grow">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-emerald-400" />
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      placeholderText="When would you like to travel?"
                      className="w-full bg-transparent text-white placeholder-gray-300 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="bg-emerald-500 text-white p-3 rounded-xl hover:bg-emerald-600 transition-colors">
                    <Search className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 flex justify-center"
            >
              <img 
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1794&q=80" 
                alt="Tokyo cityscape" 
                className="max-w-md w-full h-auto object-cover rounded-3xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* New Company Overview Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About TravelEase</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Since 2018, we've been crafting unforgettable travel experiences that combine adventure, 
              culture, and comfort. Our mission is to make extraordinary travel accessible to everyone.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To inspire and enable people to explore the world safely, 
                sustainably, and with authentic cultural experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Values</h3>
              <p className="text-gray-600">
                We believe in responsible tourism, cultural respect, 
                and creating positive impact in the communities we visit.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center p-6 bg-gray-50 rounded-xl"
            >
              <div className="inline-block p-4 bg-purple-100 rounded-full mb-4">
                <Compass className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Approach</h3>
              <p className="text-gray-600">
                Personalized itineraries, expert local guides, and 
                carefully curated experiences for unforgettable journeys.
              </p>
            </motion.div>
          </div>

          {/* Company Achievements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-gray-200">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
              <p className="text-gray-600">Countries Covered</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">10K+</div>
              <p className="text-gray-600">Happy Travelers</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-gray-600">Local Partners</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-purple-600 mb-2">4.9/5</div>
              <p className="text-gray-600">Customer Rating</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose TravelEase</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We go above and beyond to ensure your travel experience is seamless, 
              memorable, and exactly what you're looking for.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Safe Travel Promise</h3>
              <p className="text-gray-600">
                Your safety is our top priority. We maintain strict safety protocols 
                and provide 24/7 support during your journey.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <Coffee className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local Experiences</h3>
              <p className="text-gray-600">
                Immerse yourself in authentic local cultures with our carefully 
                curated experiences and expert local guides.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <Award className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Value</h3>
              <p className="text-gray-600">
                Get the best value for your money with our transparent pricing 
                and carefully selected accommodations and activities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <span className="p-3 rounded-full bg-emerald-100">
                    {stat.icon}
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover adventures that match your travel style. From relaxing beaches to thrilling mountain expeditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80">{category.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Travelers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real experiences from real adventurers who've explored with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.trip}</p>
                  </div>
                </div>
                <p className="text-gray-700">{testimonial.comment}</p>
                <div className="flex items-center mt-4 text-emerald-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join our community of travelers and experience the world in a new way.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-emerald-600 transition-colors"
          >
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}

// Sample data (unchanged)
const stats = [
  {
    icon: <Globe className="w-6 h-6 text-emerald-600" />,
    value: "50+",
    label: "Destinations"
  },
  {
    icon: <Users className="w-6 h-6 text-emerald-600" />,
    value: "10K+",
    label: "Happy Travelers"
  },
  {
    icon: <Award className="w-6 h-6 text-emerald-600" />,
    value: "200+",
    label: "Expert Guides"
  },
  {
    icon: <Clock className="w-6 h-6 text-emerald-600" />,
    value: "5+ Years",
    label: "Experience"
  }
];

const categories = [
  {
    name: "Mountain Expeditions",
    description: "Conquer peaks and discover breathtaking views",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b"
  },
  {
    name: "Cultural Immersion",
    description: "Experience local traditions and customs",
    image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd"
  },
  {
    name: "Island Getaways",
    description: "Relax on pristine beaches and crystal-clear waters",
    image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    trip: "Mountain Expedition",
    comment: "An incredible experience that pushed my boundaries. The guides were knowledgeable and supportive throughout the journey."
  },
  {
    name: "Michael Chen",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    trip: "Cultural Tour",
    comment: "The local insights and authentic experiences made this trip unforgettable. Highly recommend to anyone seeking genuine cultural immersion."
  },
  {
    name: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    trip: "Island Adventure",
    comment: "Perfect blend of relaxation and adventure. The itinerary was well-planned and the accommodations were fantastic."
  }
];

export default Home;

