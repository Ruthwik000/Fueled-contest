export const celebrities = [
  {
    id: 1,
    name: "RIHANNA",
    image: "/images/celebrities/rihanna.jpg",
    vibe_tags: ["Bold", "Statement", "Edgy"],
    description: "Rihanna's jewelry style is fearless and bold. She loves statement pieces that command attention and aren't afraid to make a statement.",
    match_percentage: 88
  },
  {
    id: 2,
    name: "BLAKE LIVELY",
    image: "/images/celebrities/blake.jpg",
    vibe_tags: ["Romantic", "Vintage", "Sophisticated"],
    description: "Blake Lively embodies romantic sophistication with vintage-inspired pieces that tell a story and add elegance to any look.",
    match_percentage: 92
  },
  {
    id: 3,
    name: "ZENDAYA",
    image: "/images/celebrities/zendaya.jpg",
    vibe_tags: ["Classic", "Elegant", "Timeless"],
    description: "Zendaya's style is all about classic elegance with a modern twist. Think delicate necklaces, timeless earrings, and rings that add a touch of sparkle.",
    match_percentage: 95
  }
];

export const categories = [
  {
    id: 1,
    name: "NECKLACES",
    image: "/images/categories/necklaces.jpg",
    description: "Elegant necklaces for every occasion"
  },
  {
    id: 2,
    name: "EARRINGS",
    image: "/images/categories/earrings.jpg",
    description: "Stunning earrings to frame your face"
  },
  {
    id: 3,
    name: "RINGS",
    image: "/images/categories/rings.jpg",
    description: "Beautiful rings for every finger"
  },
  {
    id: 4,
    name: "BRACELETS",
    image: "/images/categories/bracelets.jpg",
    description: "Delicate bracelets for your wrist"
  },
  {
    id: 5,
    name: "PENDANTS",
    image: "/images/categories/pendants.jpg",
    description: "Meaningful pendants close to your heart"
  }
];

export const products = [
  {
    id: 1,
    name: "Star-Crossed Lovers Diamond Necklace",
    price: 68963,
    originalPrice: 68963,
    image: "/images/products/necklace2.jpg",
    category: "NECKLACES",
    celebrityId: 1,
    vibe_tags: ["Bold", "Statement"],
    purity: "18kt",
    color: "Yellow Gold",
    description: "An exquisite cross-shaped diamond necklace that makes a bold statement while maintaining elegant sophistication.",
    deliveryTime: "15-17 DAYS"
  },
  {
    id: 2,
    name: "Wanderlust Mix Diamond Necklace",
    price: 814282,
    originalPrice: 814282,
    image: "/images/products/necklace3.jpg",
    category: "NECKLACES",
    celebrityId: 2,
    vibe_tags: ["Bohemian", "Eclectic"],
    purity: "18kt",
    color: "Yellow Gold",
    description: "A unique mixed-design necklace perfect for the free-spirited woman who loves to make a statement.",
    deliveryTime: "15-17 DAYS"
  },
  {
    id: 3,
    name: "Serene Solitaire Necklace",
    price: 12500,
    originalPrice: 12500,
    image: "/images/products/necklace1.jpg",
    category: "NECKLACES",
    celebrityId: 1,
    vibe_tags: ["Classic", "Elegant"],
    purity: "14kt",
    color: "Yellow Gold",
    description: "A timeless solitaire necklace featuring a brilliant cut diamond in a classic yellow gold setting. Perfect for everyday elegance or special occasions.",
    deliveryTime: "15-17 DAYS"
  },
  {
    id: 4,
    name: "Elegant Drop Earrings",
    price: 45000,
    originalPrice: 45000,
    image: "/images/products/earrings1.jpg",
    category: "EARRINGS",
    celebrityId: 3,
    vibe_tags: ["Romantic", "Elegant"],
    purity: "14kt",
    color: "Rose Gold",
    description: "Delicate drop earrings that add a touch of romance to any outfit.",
    deliveryTime: "15-17 DAYS"
  }
];

export const surveyQuestions = [
  {
    id: 1,
    question: "What's the occasion? Let's find the perfect piece to celebrate.",
    type: "single",
    options: [
      "Everyday elegance",
      "Special celebration",
      "A gift for a special birthday",
      "Professional occasions",
      "Date night"
    ]
  },
  {
    id: 2,
    question: "How would you describe your personal style?",
    type: "multiple",
    options: [
      "Classic & Timeless",
      "Modern & Minimalist",
      "Bohemian & Eclectic",
      "Bold & Statement"
    ]
  },
  {
    id: 3,
    question: "Which precious metal calls to you?",
    type: "single",
    options: [
      "Gold",
      "Silver",
      "Platinum",
      "Rose Gold"
    ]
  },
  {
    id: 4,
    question: "Are you drawn to any particular gemstones?",
    type: "single",
    options: [
      "Diamonds and Sapphires, please.",
      "Emeralds and Rubies",
      "Pearls and Opals",
      "I prefer simple metals"
    ]
  },
  {
    id: 5,
    question: "What is your desired budget for this special piece?",
    type: "single",
    options: [
      "Under 50,000 INR",
      "50,000 - 150,000 INR",
      "150,000 - 500,000 INR",
      "500,000+ INR"
    ]
  }
];