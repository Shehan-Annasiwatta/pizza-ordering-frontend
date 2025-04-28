export type Category = 'Supreme' | 'Regular' | 'Classic';


export type CrustType = 'Thin' | 'Normal' | 'Deep Dish';


export interface Topping {
  id: string;           // Unique identifier
  name: string;         // Display name (e.g. "Extra Cheese")
  price: number;        // Additional cost for this topping
}


export interface PizzaItem {
  id: string;           // Unique pizza instance ID (e.g. menuId + customization hash)
  name: string;         // Pizza name
  category: Category;   // Price tier/category
  imageUrl: string;     // Thumbnail or full image URL
  description: string;  // Short description of key toppings
  basePrice: number;    // Price before crust & toppings
  crust: CrustType;     // Selected crust
  toppings: Topping[];  // List of selected toppings
  quantity: number;     // Number of this configured pizza in cart
}

// Optionally compute total price
export const getLineTotal = (item: PizzaItem): number => {
  const toppingsTotal = item.toppings.reduce((sum, t) => sum + t.price, 0);
  const unitPrice = item.basePrice + toppingsTotal;
  return unitPrice * item.quantity;
};
