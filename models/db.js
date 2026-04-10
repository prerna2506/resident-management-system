// In-Memory Database Simulation
export const db = {
  announcements: [
    {
      id: 1,
      title: 'Clubhouse Renovation & Expansion',
      description: 'Starting next Monday, the main clubhouse will undergo a 3-week rejuvenation project.',
      timeAgo: 'JUST NOW',
      type: 'major',
      image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=400&h=250'
    },
    {
      id: 2,
      title: 'Scheduled Water Maintenance',
      description: 'Routine pipe cleaning for Wing A & B between 2 PM and 4 PM today.',
      timeAgo: '2 HOURS AGO',
      type: 'minor'
    },
    {
      id: 3,
      title: 'New Security Protocols',
      description: 'All guest entries will require a digital QR code generated via the app.',
      timeAgo: 'YESTERDAY',
      type: 'minor'
    }
  ],
  dues: {
    amount: 1420.50,
    invoiceNumber: 'SC-2024-108',
    dueDate: 'October 30, 2024'
  },
  complaints: [],
  payments: [
    { id: 1, date: 'Sept 01, 2024', reference: 'INV-88291', reason: 'Maintenance Sept', status: 'Completed', amount: 850.00 },
    { id: 2, date: 'Aug 03, 2024', reference: 'INV-88104', reason: 'Pool Repair Levy', status: 'Completed', amount: 215.00 },
    { id: 3, date: 'July 15, 2024', reference: 'INV-87955', reason: 'Gym Membership', status: 'Refunded', amount: 45.00 },
  ],
  facilities: [
    { id: 'pool', name: 'Swimming Pool', status: 'Open', description: 'Olympic-sized heated pool with dedicated lap lanes and children\'s splash zone.', hours: '06:00 - 22:00', max: 20 },
    { id: 'gym', name: 'Fitness Center', status: 'Open', description: 'State-of-the-art TechnoGym equipment and a dedicated yoga studio space.', hours: '24/7 Access', max: 12 },
    { id: 'clubhouse', name: 'Clubhouse', status: 'Available', description: 'Perfect for social gatherings, featuring a private bar and multimedia lounge.', hours: '10:00 - 23:00', max: 50 },
    { id: 'tennis', name: 'Tennis Courts', status: 'Available', description: 'Two championship-grade hard courts with night lighting capabilities.', hours: '07:00 - 21:00', max: 4 }
  ],
  bookings: [
    { id: 1, facility: 'Fitness Center', date: 'Today', time: '18:00 - 19:30', status: 'Confirmed', icon: '🏋️' },
    { id: 2, facility: 'Swimming Pool', date: 'Tomorrow', time: '08:00 - 09:00', status: 'Confirmed', icon: '🏊' }
  ]
};
