const normalizeString = str => str.toLowerCase().replace(/[^a-z0-9]/g, ' ').replace(/\s+/g, ' ').trim();

export const unhealthySweeteners = [
  'High-Fructose Corn Syrup',
  'Corn Syrup',
  'Fructose Sweetener',
  'Liquid Fructose',
  'Crystaline Fructose',
  'Agave Nectar',
  'Refined Sugar',
  'White Sugar',
  'Brown Sugar',
  'Raw Sugar',
  'Confectioner’s Sugar',
  'Glucose Syrup',
  'Dextrose',
  'Maltose',
  'Sucrose',
  'Honey',
  'Maple Syrup',
  'Molasses',
  'Anhydrous Dextrose',
  'Corn Syrup Solids',
  'Dextrin',
  'Maltodextrin',
  'Evaporated Cane Juice',
  'Fruit Juice Concentrate',
  'Caramel',
  'Carob Syrup',
  'Golden Syrup',
  'Invert Sugar',
  'Muscovado',
  'Treacle',
  'Turbinado',
  'Yellow Sugar'
].map(normalizeString);  // Normalize all sweetener names

// Function to check if an ingredient is an unhealthy sweetener
export function isUnhealthySweetener(ingredient) {
  return unhealthySweeteners.includes(normalizeString(ingredient));
}

export default isUnhealthySweetener;
