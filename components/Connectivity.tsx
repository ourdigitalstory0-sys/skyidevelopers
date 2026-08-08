'use client';

import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, GraduationCap, Hospital, ShoppingBag, Landmark } from 'lucide-react';
import './Connectivity.css';

const LANDMARKS = [
  {
    name: 'Chandani Chowk Flyover',
    category: 'Transit',
    distance: '3.5 km',
    time: '6 mins',
    icon: <Navigation size={20} />,
    description: 'Major arterial interchange connecting Mumbai-Bengaluru Highway & Kothrud.',
  },
  {
    name: 'Hinjawadi IT Park Phase 1',
    category: 'Tech Parks',
    distance: '14.0 km',
    time: '20 mins',
    icon: <Car size={20} />,
    description: 'Direct signal-free connectivity via Ring Road & Paud Road.',
  },
  {
    name: 'Kothrud Metro Station',
    category: 'Transit',
    distance: '6.0 km',
    time: '10 mins',
    icon: <Navigation size={20} />,
    description: 'Connects effortlessly to Central Pune, Shivajinagar & Pune Station.',
  },
  {
    name: 'Flame University',
    category: 'Education',
    distance: '4.2 km',
    time: '8 mins',
    icon: <GraduationCap size={20} />,
    description: 'Premier liberal education university situated in Lavasa Road enclave.',
  },
  {
    name: 'Sahyadri Super Speciality Hospital',
    category: 'Healthcare',
    distance: '7.5 km',
    time: '12 mins',
    icon: <Hospital size={20} />,
    description: '24/7 emergency & advanced cardiac care facility.',
  },
  {
    name: 'Pavilion Mall & Westend Mall',
    category: 'Shopping',
    distance: '10.5 km',
    time: '18 mins',
    icon: <ShoppingBag size={20} />,
    description: 'Luxury shopping, multiplexes, and fine dining hotspots.',
  },
  {
    name: 'Savitribai Phule Pune University',
    category: 'Education',
    distance: '11.0 km',
    time: '20 mins',
    icon: <Landmark size={20} />,
    description: 'Historic educational campus & research hub.',
  },
  {
    name: 'Pune International Airport',
    category: 'Transit',
    distance: '24.0 km',
    time: '45 mins',
    icon: <Navigation size={20} />,
    description: 'Direct arterial transit via outer ring road & airport express route.',
  },
];

const CATEGORIES = ['All', 'Tech Parks', 'Transit', 'Education', 'Healthcare', 'Shopping'];

function ConnectivityComp() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredLandmarks = activeTab === 'All'
    ? LANDMARKS
    : LANDMARKS.filter((item) => item.category === activeTab);

  return (
    <section className="connectivity-section" id="connectivity">
      <div className="container">
        <motion.div
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="section-badge">Strategic Location</span>
          <h2>Seamless Connectivity & Proximity</h2>
          <p>
            Positioned in West Pune's prime growth corridor near Kothrud & Bavdhan, overlooking NDA Forest.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div className="connectivity-tabs">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-tab ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div className="connectivity-grid" layout>
          {filteredLandmarks.map((item, idx) => (
            <motion.div
              key={item.name}
              className="landmark-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.5 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-top">
                <div className="landmark-icon">{item.icon}</div>
                <div className="time-badge">
                  <Car size={12} /> {item.time} drive
                </div>
              </div>

              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="card-footer">
                <span className="distance-text">
                  <MapPin size={14} /> {item.distance}
                </span>
                <span className="cat-tag">{item.category}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ConnectivityComp);
