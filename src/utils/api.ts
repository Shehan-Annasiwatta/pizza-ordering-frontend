import { PizzaItem, Topping } from "@/types";

// Data type for pizzas before customization
export type PizzaProduct = Omit<PizzaItem, 'crust' | 'toppings' | 'quantity'>;

// Mock pizza data
const pizzas: PizzaProduct[] = [
  {
    id: 'margherita',
    name: 'Margherita',
    category: 'Classic',
    imageUrl: '/assets/margherita.jpg',
    description: 'Tomato sauce, mozzarella, basil',
    basePrice: 400,
  },
  {
    id: 'pepperoni',
    name: 'Pepperoni Feast',
    category: 'Regular',
    imageUrl: '/assets/pepperoni.jpg',
    description: 'Pepperoni, mozzarella, tomato sauce',
    basePrice: 650,
  },
  {
    id: 'supreme',
    name: 'Supreme',
    category: 'Supreme',
    imageUrl: '/assets/supreme.jpg',
    description: 'Pepperoni, sausage, veggies, olives',
    basePrice: 900,
  },
];

// Mock toppings data
const toppingsOptions: Topping[] = [
  { id: 'extra_cheese', name: 'Extra Cheese', price: 50 },
  { id: 'sausage',     name: 'Sausage',       price: 70 },
  { id: 'mushrooms',   name: 'Mushrooms',     price: 40 },
  { id: 'peppers',     name: 'Peppers',       price: 35 },
];

export function getPizzas(): PizzaProduct[] {
  return pizzas;
}

export function getToppings(): Topping[] {
  return toppingsOptions;
}