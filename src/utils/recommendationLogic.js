import { celebrities, products } from '../mock/data.js';

export const generateRecommendations = (answers) => {
  // Simple recommendation logic based on survey answers
  const stylePreferences = answers[1] || [];
  const metalPreference = answers[2];
  const budgetRange = answers[4];
  
  // Filter celebrities based on style preferences
  const recommendedCelebrities = celebrities.filter(celebrity => {
    return celebrity.vibe_tags.some(tag => 
      stylePreferences.includes(tag) || 
      stylePreferences.includes(`${tag} & Timeless`) ||
      stylePreferences.includes(`${tag} & Statement`)
    );
  });
  
  // Filter products based on preferences
  const recommendedProducts = products.filter(product => {
    let matches = 0;
    
    // Style match
    if (product.vibe_tags.some(tag => stylePreferences.includes(tag))) {
      matches++;
    }
    
    // Metal preference match
    if (metalPreference && product.color.toLowerCase().includes(metalPreference.toLowerCase())) {
      matches++;
    }
    
    // Budget match
    if (budgetRange) {
      const price = product.price;
      switch (budgetRange) {
        case "Under 50,000 INR":
          if (price < 50000) matches++;
          break;
        case "50,000 - 150,000 INR":
          if (price >= 50000 && price <= 150000) matches++;
          break;
        case "150,000 - 500,000 INR":
          if (price >= 150000 && price <= 500000) matches++;
          break;
        case "500,000+ INR":
          if (price >= 500000) matches++;
          break;
      }
    }
    
    return matches > 0;
  });
  
  return {
    celebrities: recommendedCelebrities.length > 0 ? recommendedCelebrities : celebrities,
    products: recommendedProducts.length > 0 ? recommendedProducts : products
  };
};

export const filterProductsByCategory = (products, category) => {
  if (!category) return products;
  return products.filter(product => product.category === category);
};

export const filterProductsByCelebrity = (products, celebrityId) => {
  if (!celebrityId) return products;
  return products.filter(product => product.celebrityId === celebrityId);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};