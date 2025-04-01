
export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  category: string;
  carbonRating: number; // 1-5 rating (5 is most eco-friendly)
  carbonEmission: string; // e.g. "12g CO2/unit"
  description?: string;
}

export const allProducts: Product[] = [
  // Health and Medicines
  {
    id: 101,
    name: "Organic Multivitamin Complex",
    price: 0.042,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
    category: "Health & Medicines",
    carbonRating: 4,
    carbonEmission: "45g CO2/unit",
    description: "Plant-based multivitamin with sustainably sourced ingredients"
  },
  {
    id: 102,
    name: "Eco-Friendly First Aid Kit",
    price: 0.031,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1631815585553-944c66f7984e",
    category: "Health & Medicines",
    carbonRating: 5,
    carbonEmission: "30g CO2/unit",
    description: "Biodegradable first aid supplies in a recyclable case"
  },
  {
    id: 103,
    name: "Smart Blood Pressure Monitor",
    price: 0.087,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67",
    category: "Health & Medicines",
    carbonRating: 3,
    carbonEmission: "110g CO2/unit",
    description: "Energy-efficient blood pressure monitor with blockchain data storage"
  },
  {
    id: 104,
    name: "Sustainable Wellness Tracker",
    price: 0.095,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1557825835-70d97c4aa567",
    category: "Health & Medicines",
    carbonRating: 4,
    carbonEmission: "95g CO2/unit",
    description: "Health tracker made from recycled materials with long battery life"
  },
  {
    id: 105,
    name: "Plant-Based Pain Relief",
    price: 0.022,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1626197031507-c17099753f9c",
    category: "Health & Medicines",
    carbonRating: 5,
    carbonEmission: "18g CO2/unit",
    description: "Natural pain relief formula with minimal environmental impact"
  },
  
  // Tech Software
  {
    id: 201,
    name: "Green Cloud Storage (1TB)",
    price: 0.018,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8",
    category: "Tech Software",
    carbonRating: 5,
    carbonEmission: "5g CO2/GB/month",
    description: "Carbon-neutral cloud storage powered by renewable energy"
  },
  {
    id: 202,
    name: "Sustainable Project Management Suite",
    price: 0.075,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12",
    category: "Tech Software",
    carbonRating: 4,
    carbonEmission: "3g CO2/user/month",
    description: "Climate-conscious project management software with carbon tracking"
  },
  {
    id: 203,
    name: "Eco Productivity Bundle",
    price: 0.049,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "Tech Software",
    carbonRating: 5,
    carbonEmission: "2g CO2/user/month",
    description: "Energy-efficient office software suite optimized for minimal server usage"
  },
  {
    id: 204,
    name: "Low-Carbon Video Editing Software",
    price: 0.12,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    category: "Tech Software",
    carbonRating: 3,
    carbonEmission: "8g CO2/hour of use",
    description: "Video editing solution optimized for energy efficiency"
  },
  {
    id: 205,
    name: "Sustainable Design Tools",
    price: 0.089,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d",
    category: "Tech Software",
    carbonRating: 4,
    carbonEmission: "6g CO2/hour of use",
    description: "Design software with built-in sustainability metrics and low-power mode"
  },
  
  // Machinery and Tools
  {
    id: 301,
    name: "Solar-Powered Drill",
    price: 0.15,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1572981779307-41ede344ec2d",
    category: "Machinery & Tools",
    carbonRating: 5,
    carbonEmission: "25g CO2/unit",
    description: "Cordless drill powered by built-in solar panels"
  },
  {
    id: 302,
    name: "CNC Machine with Energy Recovery",
    price: 1.25,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1581093458791-9d02febcb9a3",
    category: "Machinery & Tools",
    carbonRating: 3,
    carbonEmission: "350g CO2/hour of use",
    description: "Advanced CNC machine with energy recovery system"
  },
  {
    id: 303,
    name: "Biodegradable Garden Tool Set",
    price: 0.078,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1589554198878-4367a41494b2",
    category: "Machinery & Tools",
    carbonRating: 5,
    carbonEmission: "18g CO2/unit",
    description: "Garden tools with handles made from biodegradable materials"
  },
  {
    id: 304,
    name: "Reconditioned Power Generator",
    price: 0.35,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd",
    category: "Machinery & Tools",
    carbonRating: 2,
    carbonEmission: "420g CO2/hour of use",
    description: "Reconditioned generator with improved efficiency"
  },
  {
    id: 305,
    name: "Smart Workshop Toolbox",
    price: 0.22,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189",
    category: "Machinery & Tools",
    carbonRating: 4,
    carbonEmission: "75g CO2/unit",
    description: "IoT-connected toolbox made from recycled materials"
  },
  
  // Fashion
  {
    id: 401,
    name: "Recycled Ocean Plastic Sneakers",
    price: 0.063,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    category: "Fashion",
    carbonRating: 5,
    carbonEmission: "15g CO2/unit",
    description: "Stylish sneakers made from recycled ocean plastic"
  },
  {
    id: 402,
    name: "Organic Cotton T-Shirt Collection",
    price: 0.035,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
    category: "Fashion",
    carbonRating: 4,
    carbonEmission: "25g CO2/unit",
    description: "Sustainably farmed organic cotton t-shirts with natural dyes"
  },
  {
    id: 403,
    name: "Hemp Denim Jeans",
    price: 0.058,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1565084888279-aca607ecce0c",
    category: "Fashion",
    carbonRating: 5,
    carbonEmission: "20g CO2/unit",
    description: "Eco-friendly jeans made from sustainable hemp fiber"
  },
  {
    id: 404,
    name: "Upcycled Designer Bag",
    price: 0.12,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1614179924047-e1ab49a0a0cf",
    category: "Fashion",
    carbonRating: 5,
    carbonEmission: "10g CO2/unit",
    description: "One-of-a-kind bags made from upcycled luxury materials"
  },
  {
    id: 405,
    name: "Bamboo Fiber Hoodie",
    price: 0.072,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
    category: "Fashion",
    carbonRating: 4,
    carbonEmission: "28g CO2/unit",
    description: "Comfortable hoodie made from fast-growing bamboo fiber"
  },
  
  // Food and Groceries
  {
    id: 501,
    name: "Local Organic Produce Box",
    price: 0.025,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c",
    category: "Food & Groceries",
    carbonRating: 5,
    carbonEmission: "2g CO2/kg",
    description: "Weekly subscription box of seasonal local organic produce"
  },
  {
    id: 502,
    name: "Plant-Based Protein Sampler",
    price: 0.032,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1540914124281-342587941389",
    category: "Food & Groceries",
    carbonRating: 5,
    carbonEmission: "3g CO2/100g",
    description: "Assortment of sustainable plant-based protein alternatives"
  },
  {
    id: 503,
    name: "Zero-Waste Pantry Starter Kit",
    price: 0.045,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1584385002340-d886f3a0f097",
    category: "Food & Groceries",
    carbonRating: 5,
    carbonEmission: "5g CO2/unit",
    description: "Essential pantry items in reusable packaging"
  },
  {
    id: 504,
    name: "Sustainable Coffee Subscription",
    price: 0.018,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe",
    category: "Food & Groceries",
    carbonRating: 4,
    carbonEmission: "4g CO2/100g",
    description: "Shade-grown, fair trade coffee delivered in compostable packaging"
  },
  {
    id: 505,
    name: "Artisanal Vegan Cheese Set",
    price: 0.029,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d",
    category: "Food & Groceries",
    carbonRating: 4,
    carbonEmission: "6g CO2/100g",
    description: "Handcrafted plant-based cheeses with traditional methods"
  },
  
  // Gaming
  {
    id: 601,
    name: "Energy-Efficient Gaming Console",
    price: 0.28,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42",
    category: "Gaming",
    carbonRating: 3,
    carbonEmission: "85g CO2/unit",
    description: "Gaming console optimized for lower energy consumption"
  },
  {
    id: 602,
    name: "Sustainable Board Game Collection",
    price: 0.056,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1632501641765-e568d28b0015",
    category: "Gaming",
    carbonRating: 5,
    carbonEmission: "12g CO2/unit",
    description: "Board games made from sustainable forestry and recycled components"
  },
  {
    id: 603,
    name: "NFT Game with Carbon Offsets",
    price: 0.02,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
    category: "Gaming",
    carbonRating: 4,
    carbonEmission: "Virtual item - offsets included",
    description: "Blockchain game that includes carbon offsets for all transactions"
  },
  {
    id: 604,
    name: "Reclaimed Wood Chess Set",
    price: 0.075,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461",
    category: "Gaming",
    carbonRating: 5,
    carbonEmission: "8g CO2/unit",
    description: "Handcrafted chess set made from reclaimed wood"
  },
  {
    id: 605,
    name: "Low-Power Gaming Headset",
    price: 0.047,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1624913503273-5f9c4e980dba",
    category: "Gaming",
    carbonRating: 4,
    carbonEmission: "35g CO2/unit",
    description: "Energy-efficient gaming headset with long battery life"
  },
  
  // Books and Stationery
  {
    id: 701,
    name: "Recycled Paper Notebook Set",
    price: 0.012,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
    category: "Books & Stationery",
    carbonRating: 5,
    carbonEmission: "5g CO2/unit",
    description: "Notebooks made from 100% post-consumer recycled paper"
  },
  {
    id: 702,
    name: "Plant-Based Ink Pen Collection",
    price: 0.015,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd",
    category: "Books & Stationery",
    carbonRating: 5,
    carbonEmission: "3g CO2/unit",
    description: "Refillable pens with biodegradable barrels and plant-based ink"
  },
  {
    id: 703,
    name: "Digital E-Reader (Refurbished)",
    price: 0.085,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1511108690759-009324a90311",
    category: "Books & Stationery",
    carbonRating: 4,
    carbonEmission: "45g CO2/unit",
    description: "Certified refurbished e-reader with extended lifecycle support"
  },
  {
    id: 704,
    name: "Sustainable Publishing Book Subscription",
    price: 0.022,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353",
    category: "Books & Stationery",
    carbonRating: 4,
    carbonEmission: "15g CO2/book",
    description: "Monthly book from publishers committed to sustainable practices"
  },
  {
    id: 705,
    name: "Bamboo Desktop Organizer",
    price: 0.036,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f",
    category: "Books & Stationery",
    carbonRating: 5,
    carbonEmission: "10g CO2/unit",
    description: "Desk organizer made from sustainable bamboo"
  },
  
  // Automotive
  {
    id: 801,
    name: "Electric Vehicle Charging Station",
    price: 0.48,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1638248307433-1e68b4c884c6",
    category: "Automotive",
    carbonRating: 5,
    carbonEmission: "15g CO2/kWh delivered",
    description: "Smart home EV charger with solar integration capability"
  },
  {
    id: 802,
    name: "Eco-Friendly Car Care Kit",
    price: 0.039,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1606193477689-5b1ef0ebe9e7",
    category: "Automotive",
    carbonRating: 4,
    carbonEmission: "25g CO2/unit",
    description: "Biodegradable car cleaning products in reusable containers"
  },
  {
    id: 803,
    name: "Reconditioned EV Battery",
    price: 0.75,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1593941707882-a56bbc8df48c",
    category: "Automotive",
    carbonRating: 4,
    carbonEmission: "120g CO2/unit",
    description: "Certified reconditioned electric vehicle battery with extended warranty"
  },
  {
    id: 804,
    name: "Tire Pressure Optimization System",
    price: 0.062,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1597595735637-05a66b81079c",
    category: "Automotive",
    carbonRating: 5,
    carbonEmission: "Saves 30g CO2/100km",
    description: "Smart system that ensures optimal tire pressure for fuel efficiency"
  },
  {
    id: 805,
    name: "Sustainable Bike Rack",
    price: 0.055,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1605020164361-61446e4db99b",
    category: "Automotive",
    carbonRating: 5,
    carbonEmission: "12g CO2/unit",
    description: "Car bike rack made from recycled materials"
  },
  
  // Baby and Kids
  {
    id: 901,
    name: "Organic Cotton Baby Clothes Set",
    price: 0.032,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1577701122197-f6ed5283c80a",
    category: "Baby & Kids",
    carbonRating: 5,
    carbonEmission: "8g CO2/unit",
    description: "Soft, natural baby clothes made from organic cotton"
  },
  {
    id: 902,
    name: "Sustainable Wooden Toy Collection",
    price: 0.055,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1595348020949-87cdfbb44174",
    category: "Baby & Kids",
    carbonRating: 5,
    carbonEmission: "5g CO2/unit",
    description: "Educational toys made from FSC-certified wood and non-toxic paints"
  },
  {
    id: 903,
    name: "Eco-Friendly Diaper Subscription",
    price: 0.048,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1594917911478-4b69a8275063",
    category: "Baby & Kids",
    carbonRating: 4,
    carbonEmission: "12g CO2/diaper",
    description: "Biodegradable diapers delivered in plastic-free packaging"
  },
  {
    id: 904,
    name: "Children's Bamboo Dinnerware",
    price: 0.029,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1584473457493-17c462415daf",
    category: "Baby & Kids",
    carbonRating: 5,
    carbonEmission: "7g CO2/unit",
    description: "Durable, non-toxic dinnerware made from bamboo fiber"
  },
  {
    id: 905,
    name: "Natural Baby Care Bundle",
    price: 0.037,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1642334208208-79d1a169e911",
    category: "Baby & Kids",
    carbonRating: 4,
    carbonEmission: "15g CO2/unit",
    description: "Plant-based baby skincare products in recyclable packaging"
  },
  
  // Sports and Fitness
  {
    id: 1001,
    name: "Recycled Yoga Mat",
    price: 0.028,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1599447421416-3414500d18a5",
    category: "Sports & Fitness",
    carbonRating: 5,
    carbonEmission: "12g CO2/unit",
    description: "Yoga mat made from recycled rubber and plastics"
  },
  {
    id: 1002,
    name: "Solar-Powered Fitness Tracker",
    price: 0.079,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1510771463146-e89e6e86560e",
    category: "Sports & Fitness",
    carbonRating: 4,
    carbonEmission: "20g CO2/unit",
    description: "Fitness tracker with solar charging capability"
  },
  {
    id: 1003,
    name: "Sustainable Gym Equipment Set",
    price: 0.32,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1584380931214-dbb5b72e7fd0",
    category: "Sports & Fitness",
    carbonRating: 4,
    carbonEmission: "85g CO2/unit",
    description: "Home gym equipment made from eco-friendly materials"
  },
  {
    id: 1004,
    name: "Biodegradable Tennis Balls",
    price: 0.015,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0",
    category: "Sports & Fitness",
    carbonRating: 5,
    carbonEmission: "3g CO2/unit",
    description: "Tennis balls made from natural rubber with biodegradable felt"
  },
  {
    id: 1005,
    name: "Eco-Friendly Hiking Gear",
    price: 0.095,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1577317630006-5f9a7f0d2b1a",
    category: "Sports & Fitness",
    carbonRating: 4,
    carbonEmission: "35g CO2/unit",
    description: "Hiking essentials made from recycled and sustainable materials"
  },
  
  // Beauty and Personal Care
  {
    id: 1101,
    name: "Zero-Waste Skincare Set",
    price: 0.055,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160beba3",
    category: "Beauty & Personal Care",
    carbonRating: 5,
    carbonEmission: "5g CO2/unit",
    description: "Plastic-free skincare products with refillable containers"
  },
  {
    id: 1102,
    name: "Sustainable Bamboo Razor",
    price: 0.018,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1626972242823-88acae18709d",
    category: "Beauty & Personal Care",
    carbonRating: 5,
    carbonEmission: "3g CO2/unit",
    description: "Plastic-free razor with replaceable blades and bamboo handle"
  },
  {
    id: 1103,
    name: "Organic Hair Care Bundle",
    price: 0.042,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1594125311687-3b1704307565",
    category: "Beauty & Personal Care",
    carbonRating: 4,
    carbonEmission: "18g CO2/unit",
    description: "Natural hair care products in biodegradable packaging"
  },
  {
    id: 1104,
    name: "Biodegradable Dental Care Set",
    price: 0.025,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1559591937-c9d397c789d8",
    category: "Beauty & Personal Care",
    carbonRating: 5,
    carbonEmission: "4g CO2/unit",
    description: "Eco-friendly dental care essentials with compostable components"
  },
  {
    id: 1105,
    name: "Ethical Makeup Collection",
    price: 0.065,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796",
    category: "Beauty & Personal Care",
    carbonRating: 4,
    carbonEmission: "15g CO2/unit",
    description: "Cruelty-free, vegan makeup with sustainable packaging"
  },
  
  // Pets
  {
    id: 1201,
    name: "Sustainable Pet Bed",
    price: 0.045,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55",
    category: "Pets",
    carbonRating: 4,
    carbonEmission: "28g CO2/unit",
    description: "Pet bed made from recycled materials and organic cotton"
  },
  {
    id: 1202,
    name: "Eco-Friendly Pet Toys Bundle",
    price: 0.025,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    category: "Pets",
    carbonRating: 5,
    carbonEmission: "6g CO2/unit",
    description: "Durable pet toys made from natural rubber and recycled fabrics"
  },
  {
    id: 1203,
    name: "Biodegradable Pet Waste Bags",
    price: 0.01,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80",
    category: "Pets",
    carbonRating: 5,
    carbonEmission: "2g CO2/bag",
    description: "Compostable waste bags made from cornstarch"
  },
  {
    id: 1204,
    name: "Organic Pet Food Subscription",
    price: 0.035,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1534361960057-19889db9621e",
    category: "Pets",
    carbonRating: 4,
    carbonEmission: "12g CO2/kg",
    description: "Locally sourced, organic pet food delivered in eco-friendly packaging"
  },
  {
    id: 1205,
    name: "Sustainable Pet Grooming Kit",
    price: 0.032,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7",
    category: "Pets",
    carbonRating: 4,
    carbonEmission: "15g CO2/unit",
    description: "Pet grooming essentials with biodegradable components"
  },
  
  // Electronics (existing)
  {
    id: 1,
    name: "Premium Headphones",
    price: 0.032,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "Electronics",
    carbonRating: 3,
    carbonEmission: "120g CO2/unit"
  },
  
  // Home (existing)
  {
    id: 2,
    name: "Modern Furniture Set",
    price: 0.089,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
    category: "Home",
    carbonRating: 4,
    carbonEmission: "85g CO2/unit"
  },
  
  // Art (existing)
  {
    id: 3,
    name: "Limited Edition Print",
    price: 0.015,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
    category: "Art",
    carbonRating: 5,
    carbonEmission: "10g CO2/unit"
  },
  
  // Machinery (existing)
  {
    id: 4,
    name: "Industrial Machinery",
    price: 0.245,
    currency: "ETH",
    image: "https://images.unsplash.com/photo-1664889994704-90c6aba60631",
    category: "Machinery",
    carbonRating: 2,
    carbonEmission: "420g CO2/unit"
  }
];

export const categories = [
  { id: "electronics", name: "Electronics", carbonRating: 3, image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12" },
  { id: "home", name: "Home", carbonRating: 4, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15" },
  { id: "art", name: "Art", carbonRating: 5, image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119" },
  { id: "machinery", name: "Machinery", carbonRating: 2, image: "https://images.unsplash.com/photo-1581093458791-9d02febcb9a3" },
  { id: "health-medicines", name: "Health & Medicines", carbonRating: 4, image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae" },
  { id: "tech-software", name: "Tech Software", carbonRating: 5, image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334" },
  { id: "machinery-tools", name: "Machinery & Tools", carbonRating: 3, image: "https://images.unsplash.com/photo-1621972751917-afd91432b832" },
  { id: "fashion", name: "Fashion", carbonRating: 4, image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d" },
  { id: "food-groceries", name: "Food & Groceries", carbonRating: 5, image: "https://images.unsplash.com/photo-1579113800032-c38bd7635818" },
  { id: "gaming", name: "Gaming", carbonRating: 3, image: "https://images.unsplash.com/photo-1586182987320-4f17e36a0ee5" },
  { id: "books-stationery", name: "Books & Stationery", carbonRating: 5, image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0" },
  { id: "automotive", name: "Automotive", carbonRating: 2, image: "https://images.unsplash.com/photo-1610647752706-3bb12232b3ab" },
  { id: "baby-kids", name: "Baby & Kids", carbonRating: 4, image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4" },
  { id: "sports-fitness", name: "Sports & Fitness", carbonRating: 4, image: "https://images.unsplash.com/photo-1579722820903-01d3499a992e" },
  { id: "beauty-personal-care", name: "Beauty & Personal Care", carbonRating: 4, image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881" },
  { id: "pets", name: "Pets", carbonRating: 4, image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee" }
];

export const getProductsByCategory = (categoryName: string) => {
  return allProducts.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase() ||
    product.category.toLowerCase().includes(categoryName.toLowerCase()) ||
    categoryName.toLowerCase().includes(product.category.toLowerCase())
  );
};
