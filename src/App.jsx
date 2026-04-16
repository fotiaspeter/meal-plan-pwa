import { useState, useEffect, useRef } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// 3,500 kcal lean bulk — 250g+ protein, ~150-170g fat, ~60-80g carbs (low-carb maintained)
// Strategy: bigger portions of existing foods — more meat, eggs, cheese, nuts, olive oil. NO grains/starches.
const mealPlan = {
  Monday: {
    meals: [
      {
        type: "Breakfast",
        name: "Big Protein Scramble with Spinach",
        desc: "4 whole eggs + 4 egg whites scrambled in 1 tbsp butter with 4 rashers bacon (trimmed), baby spinach, and 50g tasty cheese. Side of sauerkraut + 1/4 avocado.",
        calories: 820,
        protein: 72,
        fat: 56,
        carbs: 6,
        fibre: 5,
        prep: "12 min"
      },
      {
        type: "Lunch",
        name: "Lean Beef Mince & Roast Veg Bowl",
        desc: "400g lean beef mince (5-star, Coles) pan-fried with garlic. Served over roasted broccoli, zucchini, and capsicum with 2 tbsp olive oil. Top with 40g feta. Side of sauerkraut.",
        calories: 1020,
        protein: 88,
        fat: 62,
        carbs: 16,
        fibre: 9,
        prep: "18 min"
      },
      {
        type: "Snack",
        name: "Greek Yoghurt, Whey, Berries & Walnuts",
        desc: "300g low-fat Greek yoghurt (Jalna) with 1 scoop whey stirred in, 1 tbsp chia seeds, handful of blueberries, 30g walnuts.",
        calories: 620,
        protein: 54,
        fat: 30,
        carbs: 30,
        fibre: 10,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Chicken Breast with Cauliflower Mash",
        desc: "450g chicken breast pan-seared with paprika. Cauliflower mash (half a cauli blitzed with 40g butter and splash of milk), steamed green beans tossed in 2 tbsp olive oil. 30g almonds on side.",
        calories: 1080,
        protein: 108,
        fat: 58,
        carbs: 20,
        fibre: 11,
        prep: "25 min"
      }
    ]
  },
  Tuesday: {
    meals: [
      {
        type: "Breakfast",
        name: "Big Cheese Omelette with Mushrooms & Avocado",
        desc: "4 whole eggs + 4 egg whites omelette with 60g tasty cheese, 150g mushrooms cooked in 1 tbsp butter. Half avocado on the side. Side of rocket with lemon and olive oil.",
        calories: 840,
        protein: 62,
        fat: 60,
        carbs: 10,
        fibre: 8,
        prep: "12 min"
      },
      {
        type: "Lunch",
        name: "Triple Tuna Salad Plate",
        desc: "3 tins tuna in olive oil (Aldi Ocean Rise), drained, over cos lettuce, cucumber, cherry tomatoes, 1/2 avocado, 30g olives, 1 tbsp olive oil and lemon. Add 1 tbsp flaxseed.",
        calories: 820,
        protein: 72,
        fat: 52,
        carbs: 14,
        fibre: 10,
        prep: "5 min"
      },
      {
        type: "Snack",
        name: "Boiled Eggs, Cottage Cheese, Nuts & Pear",
        desc: "4 boiled eggs, 200g low-fat cottage cheese, 30g almonds, 1 pear.",
        calories: 680,
        protein: 58,
        fat: 36,
        carbs: 28,
        fibre: 8,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Lamb Chops with Roast Veg & Feta",
        desc: "4 lamb loin chops grilled (trim visible fat). Full head of cauliflower and broccoli roasted with 2 tbsp olive oil, garlic, cumin. Top with 40g crumbled feta. Side of kimchi.",
        calories: 1180,
        protein: 82,
        fat: 84,
        carbs: 18,
        fibre: 12,
        prep: "25 min"
      }
    ]
  },
  Wednesday: {
    meals: [
      {
        type: "Breakfast",
        name: "Sausage, Egg & Avocado Plate",
        desc: "3 beef sausages (Aldi) pan-fried, 3 whole eggs + 3 egg whites scrambled in 1 tbsp butter, full avocado, rocket tossed in olive oil.",
        calories: 980,
        protein: 66,
        fat: 76,
        carbs: 10,
        fibre: 9,
        prep: "12 min"
      },
      {
        type: "Lunch",
        name: "Chicken Breast Stir-Fry",
        desc: "400g chicken breast sliced, stir-fried with broccoli, bok choy, mushrooms, and cabbage in 2 tbsp sesame oil and soy sauce. Top with 15g sesame seeds and 30g cashews. Psyllium husk in water on side.",
        calories: 820,
        protein: 92,
        fat: 42,
        carbs: 20,
        fibre: 10,
        prep: "15 min"
      },
      {
        type: "Snack",
        name: "Cottage Cheese, Walnuts & Flaxseed",
        desc: "300g low-fat cottage cheese topped with 1 tbsp ground flaxseed, 30g walnuts, cinnamon. Side of 30g dark chocolate 85%.",
        calories: 580,
        protein: 40,
        fat: 38,
        carbs: 18,
        fibre: 6,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Salmon with Asparagus & Avocado",
        desc: "2 salmon fillets (~350g, frozen Aldi) baked at 200°C with lemon. Bundle of asparagus roasted in 1 tbsp olive oil. Half avocado on the side. Steamed broccoli with 1 tbsp butter. 1 tbsp chia.",
        calories: 1080,
        protein: 78,
        fat: 78,
        carbs: 14,
        fibre: 12,
        prep: "22 min"
      }
    ]
  },
  Thursday: {
    meals: [
      {
        type: "Breakfast",
        name: "Bacon & Mushroom Fry-Up",
        desc: "4 rashers bacon, 200g mushrooms cooked in 1 tbsp butter, 3 whole eggs + 3 egg whites, grilled tomato. 1/4 avocado and sauerkraut on the side.",
        calories: 820,
        protein: 64,
        fat: 56,
        carbs: 12,
        fibre: 8,
        prep: "14 min"
      },
      {
        type: "Lunch",
        name: "Beef Patties with Salad & Avocado",
        desc: "3 homemade patties from 400g lean beef mince (5-star), 40g cheese melted on top. Cos lettuce, tomato, cucumber, red onion, 1/2 avocado, 1 tbsp olive oil. Psyllium husk in water.",
        calories: 1020,
        protein: 82,
        fat: 64,
        carbs: 16,
        fibre: 9,
        prep: "18 min"
      },
      {
        type: "Snack",
        name: "Loaded Protein Smoothie",
        desc: "300ml full-fat milk, 2 scoops whey, 1 tbsp peanut butter, 2 tbsp chia seeds, 1/2 banana, 20g almonds, ice. Blend.",
        calories: 680,
        protein: 60,
        fat: 28,
        carbs: 40,
        fibre: 10,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Slow-Baked Chicken Breast & Roast Veg",
        desc: "500g chicken breast (seasoned with paprika, garlic, salt) baked at 180°C 25 min. Roasted eggplant, zucchini, and broccolini with 2 tbsp olive oil. Crumbled 30g feta on top.",
        calories: 920,
        protein: 114,
        fat: 40,
        carbs: 16,
        fibre: 9,
        prep: "10 min + 25 oven"
      }
    ]
  },
  Friday: {
    meals: [
      {
        type: "Breakfast",
        name: "Smoked Salmon & Egg Plate",
        desc: "150g smoked salmon (Aldi), 3 whole eggs + 4 egg whites scrambled in 1 tbsp butter, baby spinach, capers. 40g cream cheese, 1/4 avocado.",
        calories: 780,
        protein: 68,
        fat: 52,
        carbs: 6,
        fibre: 3,
        prep: "10 min"
      },
      {
        type: "Lunch",
        name: "Lean Pork Mince Lettuce Cups",
        desc: "400g lean pork mince cooked with garlic, ginger, soy sauce, shredded cabbage in 1 tbsp sesame oil. Spoon into cos lettuce cups. Top with spring onion, 15g sesame seeds, 30g cashews.",
        calories: 820,
        protein: 80,
        fat: 44,
        carbs: 14,
        fibre: 7,
        prep: "15 min"
      },
      {
        type: "Snack",
        name: "Greek Yoghurt, Whey, Apple, Almond Butter & Cheese",
        desc: "250g low-fat Greek yoghurt with 1 scoop whey stirred in. 1 medium apple sliced with 2 tbsp almond butter. 40g tasty cheese cubes on the side.",
        calories: 820,
        protein: 56,
        fat: 42,
        carbs: 50,
        fibre: 8,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Rump Steak with Buttered Greens",
        desc: "400g rump steak (Coles/Woolies special), trim fat. Steamed broccoli, green beans, zucchini tossed with 2 tbsp butter. 1/2 avocado on the side. Side of sauerkraut.",
        calories: 1100,
        protein: 100,
        fat: 66,
        carbs: 18,
        fibre: 12,
        prep: "15 min"
      }
    ]
  },
  Saturday: {
    meals: [
      {
        type: "Breakfast",
        name: "Full Big Brekkie",
        desc: "4 whole eggs + 3 egg whites, 4 rashers bacon (trimmed), grilled tomato, 200g mushrooms in 1 tbsp butter, 1/2 avocado, rocket with olive oil. 30g cheese.",
        calories: 920,
        protein: 64,
        fat: 64,
        carbs: 12,
        fibre: 9,
        prep: "15 min"
      },
      {
        type: "Lunch",
        name: "Chicken Thighs & Mediterranean Veg",
        desc: "400g chicken thigh fillets grilled, sliced over roasted capsicum, eggplant, red onion, cherry tomatoes with 2 tbsp olive oil and oregano. 50g feta crumbled on top. 30g olives.",
        calories: 1040,
        protein: 82,
        fat: 68,
        carbs: 20,
        fibre: 8,
        prep: "20 min + roast"
      },
      {
        type: "Snack",
        name: "Chia Pudding with Nuts & Chocolate",
        desc: "3 tbsp chia seeds soaked overnight in 200ml coconut cream. Top with 1 scoop whey stirred in, 30g mixed nuts, 25g 85% dark chocolate chopped.",
        calories: 680,
        protein: 38,
        fat: 48,
        carbs: 26,
        fibre: 16,
        prep: "3 min (prep night before)"
      },
      {
        type: "Dinner",
        name: "Bolognese on Zucchini Noodles",
        desc: "450g lean beef mince slow-cooked with tinned tomatoes, garlic, onion, Italian herbs, 1 tbsp olive oil. Serve over spiralized zucchini. 40g grated parmesan. 30g pine nuts sprinkled.",
        calories: 920,
        protein: 88,
        fat: 52,
        carbs: 24,
        fibre: 10,
        prep: "15 min + 30 simmer"
      }
    ]
  },
  Sunday: {
    meals: [
      {
        type: "Breakfast",
        name: "Turkish Eggs (Çılbır) with Cheese",
        desc: "4 whole eggs + 3 egg whites poached over 250g full-fat Greek yoghurt, drizzled with 1 tbsp butter melted with paprika and chilli. 40g crumbled feta, side of sauerkraut.",
        calories: 780,
        protein: 62,
        fat: 48,
        carbs: 12,
        fibre: 4,
        prep: "12 min"
      },
      {
        type: "Lunch",
        name: "Roast Chicken & Big Loaded Salad",
        desc: "Hot roast chook (~$12). 350g meat (mixed breast + thigh) over mixed leaves, cucumber, tomato, 1/2 avocado, 40g feta, 30g olives, 2 tbsp olive oil, 1 tbsp flaxseed.",
        calories: 1020,
        protein: 92,
        fat: 64,
        carbs: 14,
        fibre: 10,
        prep: "5 min"
      },
      {
        type: "Snack",
        name: "Double Protein Smoothie",
        desc: "300ml full-fat milk, 2 scoops whey, 2 tbsp peanut butter, 1 banana, ice. Blend. 30g dark chocolate 85% on the side.",
        calories: 720,
        protein: 58,
        fat: 32,
        carbs: 52,
        fibre: 8,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Grilled Lamb Leg Steaks with Greek Salad",
        desc: "2 large lamb leg steaks (~350g total, trimmed) grilled with oregano and lemon. Greek salad: cucumber, tomato, red onion, 40g feta, 30g olives, 2 tbsp olive oil. Steamed broccoli with 1 tbsp butter.",
        calories: 980,
        protein: 82,
        fat: 64,
        carbs: 18,
        fibre: 8,
        prep: "20 min"
      }
    ]
  }
};

const groceryList = [
  {
    section: "🥬 Produce — Fresh Fruit & Vegetables",
    subtotal: "$78.50",
    items: [
      { name: "Broccoli", qty: "3 heads (~900g)", price: "$7.00", note: "Used Mon, Tue, Wed, Fri, Sun" },
      { name: "Cauliflower", qty: "2 heads (~1.2kg)", price: "$7.00", note: "Mon cauliflower mash, Tue roasted" },
      { name: "Zucchini", qty: "6 medium (~1kg)", price: "$5.00", note: "Mon, Thu, Sat roast veg + Sat zoodles" },
      { name: "Baby spinach", qty: "1 × 200g bag", price: "$3.50", note: "Mon, Fri breakfasts" },
      { name: "Mushrooms", qty: "1 × 500g punnet", price: "$5.00", note: "Tue, Thu, Sat breakfasts + Wed stir-fry" },
      { name: "Capsicum (mixed)", qty: "3 medium", price: "$4.50", note: "Mon roast veg, Sat Mediterranean" },
      { name: "Asparagus", qty: "1 bunch (~180g)", price: "$3.50", note: "Wed dinner" },
      { name: "Green beans", qty: "1 × 400g bag", price: "$4.00", note: "Mon dinner, Fri dinner" },
      { name: "Cos lettuce", qty: "2 heads", price: "$4.00", note: "Thu patties, Fri lettuce cups, Tue salad" },
      { name: "Cabbage (green)", qty: "½ head (~400g)", price: "$2.00", note: "Wed stir-fry, Fri lettuce cups" },
      { name: "Bok choy", qty: "2 bunches", price: "$3.00", note: "Wed stir-fry" },
      { name: "Broccolini", qty: "1 bunch (~200g)", price: "$3.50", note: "Thu dinner" },
      { name: "Eggplant", qty: "2 medium", price: "$4.00", note: "Thu, Sat roast veg" },
      { name: "Cherry tomatoes", qty: "2 × 250g punnets", price: "$5.00", note: "Tue, Sat lunches" },
      { name: "Tomatoes (full-size)", qty: "4 medium", price: "$3.00", note: "Thu salad, Sat brekkie, Sun Greek salad" },
      { name: "Cucumber (continental)", qty: "3 medium", price: "$4.00", note: "Tue, Thu, Sun salads" },
      { name: "Avocado (Hass)", qty: "3 medium", price: "$5.00", note: "Used sparingly — quarters only, not halves" },
      { name: "Red onion", qty: "3 medium", price: "$2.00", note: "Thu, Sat, Sun salads" },
      { name: "Brown onion", qty: "2 medium", price: "$1.00", note: "Sat bolognese" },
      { name: "Garlic", qty: "1 bulb", price: "$1.00", note: "Used across multiple days" },
      { name: "Ginger (fresh)", qty: "1 small knob (~30g)", price: "$0.50", note: "Fri pork mince" },
      { name: "Rocket", qty: "1 × 100g bag", price: "$3.00", note: "Tue, Sat breakfasts" },
      { name: "Spring onion", qty: "1 bunch", price: "$1.50", note: "Fri lettuce cups" },
      { name: "Lemon", qty: "3", price: "$1.50", note: "Tue, Wed, Sun — dressings and fish" },
      { name: "Apple (Granny Smith or Pink Lady)", qty: "3 medium", price: "$3.00", note: "Fri, Sun snacks" },
      { name: "Pear (Packham)", qty: "2 medium", price: "$2.00", note: "Tue snack" },
      { name: "Banana", qty: "2 medium", price: "$1.00", note: "Thu smoothie" },
      { name: "Blueberries", qty: "1 × 125g punnet", price: "$4.00", note: "Mon, Wed snacks" },
    ]
  },
  {
    section: "🥩 Meat & Seafood",
    subtotal: "$92.00",
    items: [
      { name: "Eggs (free range)", qty: "3 dozen (36 eggs)", price: "$11.00", note: "Aldi — higher usage with whole + whites" },
      { name: "Egg whites (carton)", qty: "1 × 500ml (optional)", price: "$6.00", note: "Aldi/Coles — saves cracking eggs daily" },
      { name: "Bacon (shortcut, lean)", qty: "1kg value pack", price: "$10.00", note: "Trim fat before cooking — less used now" },
      { name: "Lean beef mince (5-star)", qty: "2kg", price: "$26.00", note: "Coles — Mon, Thu, Sat — leaner cut" },
      { name: "Chicken breast fillets", qty: "2kg", price: "$22.00", note: "Coles/Aldi — the new hero protein, used daily" },
      { name: "Lamb loin chops", qty: "500g (~3 chops)", price: "$9.00", note: "Tue dinner — trim fat" },
      { name: "Lamb leg steak", qty: "250g (1 steak)", price: "$5.00", note: "Sun dinner" },
      { name: "Rump steak", qty: "300g", price: "$6.00", note: "Fri dinner — trim fat" },
      { name: "Lean pork mince", qty: "500g", price: "$5.00", note: "Fri lunch" },
      { name: "Frozen salmon fillets", qty: "1 × 2 pack (~300g)", price: "$7.00", note: "Aldi — Wed dinner" },
      { name: "Smoked salmon", qty: "1 × 150g pack", price: "$5.00", note: "Aldi — Fri breakfast" },
      { name: "Tinned tuna in spring water", qty: "5 × 95g tins", price: "$6.00", note: "Aldi Ocean Rise — switched from oil for lower fat" },
      { name: "Hot roast chicken (Sunday)", qty: "1 whole", price: "$12.00", note: "Woolies/Coles — remove skin for Sun lunch" },
    ]
  },
  {
    section: "🧀 Dairy & Refrigerated",
    subtotal: "$32.00",
    items: [
      { name: "Low-fat Greek yoghurt", qty: "1 × 1kg tub", price: "$6.00", note: "Jalna low-fat — swap from full fat" },
      { name: "Tasty cheese block", qty: "1 × 500g", price: "$5.00", note: "Bega/Aldi — portions reduced" },
      { name: "Low-fat cottage cheese", qty: "2 × 500g tubs", price: "$7.00", note: "High protein snack, used 3× this week" },
      { name: "Feta cheese", qty: "1 × 200g block", price: "$4.00", note: "Sat lunch, Sun lunch/dinner — smaller crumbles" },
      { name: "Parmesan wedge", qty: "1 × 150g", price: "$5.00", note: "Sat bolognese" },
      { name: "Skim milk", qty: "1 × 2L", price: "$3.00", note: "Thu, Sun smoothies + coffee" },
      { name: "Butter (salted)", qty: "1 × 250g block", price: "$3.00", note: "Used sparingly — 1 tsp amounts only" },
      { name: "Cream cheese (light)", qty: "1 × 250g", price: "$3.00", note: "Fri breakfast only — scraped, not loaded" },
      { name: "Sauerkraut", qty: "1 × 680g jar", price: "$3.50", note: "Aldi — Mon, Thu, Fri, Sun" },
      { name: "Kimchi", qty: "1 × 400g jar", price: "$5.00", note: "Tue dinner" },
      { name: "Capers", qty: "1 × small jar", price: "$3.00", note: "Fri breakfast — lasts weeks" },
      { name: "Olives (Kalamata)", qty: "1 × 350g jar", price: "$4.00", note: "Tue, Sun salads" },
    ]
  },
  {
    section: "🫙 Pantry & Supplements",
    subtotal: "$40.00",
    items: [
      { name: "Whey protein (isolate)", qty: "1kg tub", price: "$35.00", note: "Core hero — used 5-7 scoops/week, lasts ~4 wks" },
      { name: "Chia seeds", qty: "1 × 350g bag", price: "$5.00", note: "Aldi — daily fibre boost" },
      { name: "Ground flaxseed (linseed)", qty: "1 × 500g bag", price: "$4.00", note: "Salad topping + fibre" },
      { name: "Psyllium husk", qty: "1 × 200g tub", price: "$6.00", note: "Mixed into water daily" },
      { name: "Olive oil (extra virgin)", qty: "1 × 500ml bottle", price: "$6.00", note: "Used in tbsp amounts now, not free-pour" },
      { name: "Sesame oil", qty: "1 × 250ml", price: "$4.00", note: "Stir-fries" },
      { name: "Peanut butter (natural)", qty: "1 × 375g jar", price: "$4.00", note: "Sun snack — small serves" },
      { name: "Walnuts", qty: "1 × 200g bag", price: "$4.00", note: "Small portions for crunch" },
      { name: "Almond meal", qty: "1 × 250g", price: "$5.00", note: "Wed protein pancakes" },
      { name: "Tinned tomatoes (diced)", qty: "3 × 400g tins", price: "$2.50", note: "Sat bolognese" },
      { name: "Soy sauce / spices", qty: "pantry", price: "staples", note: "Check stock" },
    ]
  }
];

const quotes = [
  { text: "You didn't lose 55kg by accident. That same discipline is building something new now.", author: "Your Coach" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Success is not given. It is earned. With blood, sweat, and the occasional tear.", author: "Nike" },
  { text: "The only bad workout is the one that didn't happen.", author: "Unknown" },
  { text: "Your body can stand almost anything. It's your mind that you have to convince.", author: "Unknown" },
  { text: "Discipline is choosing between what you want now and what you want most.", author: "Abraham Lincoln" },
  { text: "The last three or four reps is what makes the muscle grow.", author: "Arnold Schwarzenegger" },
  { text: "You are one workout away from a good mood.", author: "Unknown" },
  { text: "Don't count the days. Make the days count.", author: "Muhammad Ali" },
  { text: "The difference between who you are and who you want to be is what you do.", author: "Unknown" },
];

const commonFoods = {
  "Egg (1 large)": { calories: 72, protein: 6, fat: 5, carbs: 0.5, fibre: 0 },
  "Egg white (1 large)": { calories: 17, protein: 3.6, fat: 0, carbs: 0.2, fibre: 0 },
  "Chicken breast 100g": { calories: 165, protein: 31, fat: 3.6, carbs: 0, fibre: 0 },
  "Chicken thigh 100g": { calories: 209, protein: 26, fat: 11, carbs: 0, fibre: 0 },
  "Lean beef mince 100g": { calories: 175, protein: 27, fat: 7, carbs: 0, fibre: 0 },
  "Bacon rasher (1, trimmed)": { calories: 55, protein: 7, fat: 3, carbs: 0.3, fibre: 0 },
  "Salmon 100g": { calories: 208, protein: 22, fat: 13, carbs: 0, fibre: 0 },
  "Tuna in water (1 tin)": { calories: 110, protein: 26, fat: 1, carbs: 0, fibre: 0 },
  "Lamb chop (1, lean)": { calories: 175, protein: 23, fat: 9, carbs: 0, fibre: 0 },
  "Rump steak 100g (lean)": { calories: 180, protein: 29, fat: 7, carbs: 0, fibre: 0 },
  "Pork mince 100g (lean)": { calories: 170, protein: 24, fat: 8, carbs: 0, fibre: 0 },
  "Whey protein (1 scoop)": { calories: 120, protein: 24, fat: 1.5, carbs: 3, fibre: 0 },
  "Avocado (quarter)": { calories: 80, protein: 1, fat: 7.5, carbs: 1, fibre: 2.5 },
  "Low-fat Greek yoghurt 100g": { calories: 60, protein: 10, fat: 0.5, carbs: 4, fibre: 0 },
  "Tasty cheese 30g": { calories: 120, protein: 7, fat: 10, carbs: 0.5, fibre: 0 },
  "Low-fat cottage cheese 100g": { calories: 72, protein: 12, fat: 1, carbs: 3, fibre: 0 },
  "Butter 1 tsp": { calories: 34, protein: 0, fat: 4, carbs: 0, fibre: 0 },
  "Olive oil 1 tbsp": { calories: 120, protein: 0, fat: 14, carbs: 0, fibre: 0 },
  "Peanut butter 1 tbsp": { calories: 95, protein: 4, fat: 8, carbs: 3, fibre: 1 },
  "Almonds 30g": { calories: 172, protein: 6, fat: 15, carbs: 2, fibre: 3.5 },
  "Walnuts 30g": { calories: 196, protein: 5, fat: 20, carbs: 1, fibre: 2 },
  "Chia seeds 1 tbsp": { calories: 60, protein: 2, fat: 4, carbs: 1, fibre: 4 },
  "Flaxseed meal 1 tbsp": { calories: 37, protein: 1.5, fat: 3, carbs: 0.5, fibre: 2 },
  "Psyllium husk 1 tbsp": { calories: 18, protein: 0, fat: 0, carbs: 4, fibre: 4 },
  "Broccoli 100g": { calories: 34, protein: 3, fat: 0.4, carbs: 4, fibre: 3 },
  "Cauliflower 100g": { calories: 25, protein: 2, fat: 0.3, carbs: 3, fibre: 2 },
  "Spinach 100g": { calories: 23, protein: 3, fat: 0.4, carbs: 1, fibre: 2 },
  "Zucchini 100g": { calories: 17, protein: 1.2, fat: 0.3, carbs: 2, fibre: 1 },
  "Mushrooms 100g": { calories: 22, protein: 3, fat: 0.3, carbs: 2, fibre: 1 },
  "Green beans 100g": { calories: 31, protein: 2, fat: 0.2, carbs: 4, fibre: 3 },
  "Apple (1 medium)": { calories: 95, protein: 0.5, fat: 0.3, carbs: 22, fibre: 4 },
  "Banana (1 medium)": { calories: 105, protein: 1.3, fat: 0.4, carbs: 24, fibre: 3 },
  "Blueberries 100g": { calories: 57, protein: 0.7, fat: 0.3, carbs: 12, fibre: 2.5 },
  "Skim milk 250ml": { calories: 90, protein: 9, fat: 0.5, carbs: 13, fibre: 0 },
  "Sauerkraut 50g": { calories: 10, protein: 0.5, fat: 0, carbs: 2, fibre: 2 },
};

const C = {
  bg: "#0c0e14",
  card: "#14171f",
  cardAlt: "#191d28",
  accent: "#c4421a",
  accentSoft: "rgba(196, 66, 26, 0.12)",
  accentBorder: "rgba(196, 66, 26, 0.35)",
  green: "#34d399",
  greenSoft: "rgba(52, 211, 153, 0.10)",
  blue: "#38bdf8",
  blueSoft: "rgba(56, 189, 248, 0.10)",
  yellow: "#fbbf24",
  yellowSoft: "rgba(251, 191, 36, 0.08)",
  purple: "#a78bfa",
  purpleSoft: "rgba(167, 139, 250, 0.10)",
  orange: "#fb923c",
  orangeSoft: "rgba(251, 146, 60, 0.10)",
  text: "#e8e8ec",
  textDim: "#9ca3af",
  textMuted: "#5b6275",
  border: "#252836",
};

const mealTheme = {
  Breakfast: { color: C.yellow, bg: C.yellowSoft, icon: "☀️" },
  Lunch: { color: C.green, bg: C.greenSoft, icon: "🥩" },
  Snack: { color: C.purple, bg: C.purpleSoft, icon: "🥜" },
  Dinner: { color: C.blue, bg: C.blueSoft, icon: "🍳" },
};

function MacroRow({ calories, protein, fat, carbs, fibre, size = "sm" }) {
  const items = [
    { label: "Cal", val: calories, color: C.accent },
    { label: "Pro", val: `${protein}g`, color: C.green },
    { label: "Fat", val: `${fat}g`, color: C.blue },
    { label: "Carb", val: `${carbs}g`, color: C.yellow },
    { label: "Fibre", val: `${fibre}g`, color: C.purple },
  ];
  return (
    <div style={{ display: "flex", gap: size === "lg" ? 12 : 6, flexWrap: "wrap" }}>
      {items.map(it => (
        <div key={it.label} style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: size === "lg" ? "6px 10px" : "3px 7px",
          background: `${it.color}11`, borderRadius: 6, border: `1px solid ${it.color}22`,
        }}>
          <span style={{ fontSize: size === "lg" ? 10 : 9, color: `${it.color}99`, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{it.label}</span>
          <span style={{ fontSize: size === "lg" ? 14 : 12, fontWeight: 800, color: it.color }}>{it.val}</span>
        </div>
      ))}
    </div>
  );
}

// CSS keyframes for meal checkoff animations
const animationStyles = `
@keyframes mealCardPop {
  0% { transform: scale(1); }
  30% { transform: scale(0.96); }
  60% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
@keyframes mealRipple {
  0% { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(3); opacity: 0; }
}
@keyframes particleBurst {
  0% { transform: translate(0, 0) scale(1); opacity: 1; }
  100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
}
@keyframes checkDraw {
  0% { stroke-dashoffset: 30; transform: scale(0); }
  50% { transform: scale(1.3); }
  100% { stroke-dashoffset: 0; transform: scale(1); }
}
@keyframes iconFade {
  0% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.3) rotate(180deg); }
}
@keyframes macroShake {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(-3px); }
  75% { transform: translateY(2px); }
}
@keyframes slashStrike {
  0% { width: 0; }
  100% { width: 100%; }
}
@keyframes glowPulse {
  0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5); }
  100% { box-shadow: 0 0 0 20px rgba(52, 211, 153, 0); }
}
@keyframes streakBadgePop {
  0% { transform: scale(0) rotate(-20deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(5deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
`;

// Inject styles once
if (typeof document !== "undefined" && !document.getElementById("meal-anim-styles")) {
  const s = document.createElement("style");
  s.id = "meal-anim-styles";
  s.textContent = animationStyles;
  document.head.appendChild(s);
}

// ==========================================================================
// HAPTIC FEEDBACK — iOS-compatible workaround
// ==========================================================================
// iOS Safari does NOT support navigator.vibrate() at all — it returns true
// but does nothing. The workaround: iOS Safari fires a genuine native haptic
// tap when you programmatically click a <label> connected to a hidden
// <input type="checkbox" switch>. This works from iOS 17.4+.
//
// On Android / Chrome / Firefox we use the standard navigator.vibrate() API.
// ==========================================================================

let _hapticInput = null;
let _hapticLabel = null;

function setupHapticElements() {
  if (typeof document === "undefined" || _hapticInput) return;
  // Hidden container
  const container = document.createElement("div");
  container.setAttribute("aria-hidden", "true");
  container.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;opacity:0;";

  // Switch-style checkbox — iOS treats this specially and emits native haptic
  _hapticInput = document.createElement("input");
  _hapticInput.type = "checkbox";
  _hapticInput.setAttribute("switch", "");
  _hapticInput.id = "haptic-switch-el";
  _hapticInput.tabIndex = -1;

  _hapticLabel = document.createElement("label");
  _hapticLabel.setAttribute("for", "haptic-switch-el");

  container.appendChild(_hapticInput);
  container.appendChild(_hapticLabel);
  document.body.appendChild(container);
}

function isIOS() {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
}

function triggerHaptic(strength = "medium") {
  if (typeof window === "undefined") return;

  // iOS: use the <label>+<input switch> trick for genuine native haptics
  if (isIOS()) {
    setupHapticElements();
    if (_hapticLabel) {
      try {
        // Click it multiple times for stronger pulse patterns
        const pulses = strength === "heavy" ? 3 : strength === "medium" ? 2 : 1;
        for (let i = 0; i < pulses; i++) {
          setTimeout(() => _hapticLabel.click(), i * 80);
        }
      } catch (e) { /* ignore */ }
    }
    return;
  }

  // Android / other: use standard vibration API
  if (navigator.vibrate) {
    try {
      const patterns = {
        light: 25,
        medium: [40, 40, 40],
        heavy: [40, 60, 80, 60, 40],
      };
      navigator.vibrate(patterns[strength] || 50);
    } catch (e) { /* ignore */ }
  }
}

function MealCard({ meal, checked, onToggle }) {
  const t = mealTheme[meal.type];
  const [bursting, setBursting] = useState(false);
  const [showStreak, setShowStreak] = useState(false);
  const cardRef = useRef(null);

  const handleToggle = () => {
    // Trigger burst animation only when checking ON
    if (!checked) {
      setBursting(true);
      setShowStreak(true);
      triggerHaptic("heavy");
      setTimeout(() => setBursting(false), 1000);
      setTimeout(() => setShowStreak(false), 1600);
    } else {
      triggerHaptic("light");
    }
    onToggle();
  };

  // Generate 12 particles radiating out at different angles
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const colors = [C.green, "#60e6a6", C.accent, C.yellow, "#ffffff"];
    const color = colors[i % colors.length];
    const size = 4 + Math.random() * 4;
    return { tx, ty, color, size, delay: i * 15 };
  });

  return (
    <div
      ref={cardRef}
      style={{
        background: C.card,
        borderRadius: 12,
        padding: "16px 18px",
        border: `1px solid ${checked ? C.green : C.border}`,
        marginBottom: 10,
        opacity: checked ? 0.7 : 1,
        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        position: "relative",
        overflow: "visible",
        animation: bursting ? "mealCardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)" : "none",
        transform: checked ? "scale(0.98)" : "scale(1)",
      }}
    >
      {/* Streak badge that pops in when completed */}
      {showStreak && (
        <div style={{
          position: "absolute", top: -12, right: 12,
          background: `linear-gradient(135deg, ${C.green}, #10b981)`,
          color: "#fff", fontSize: 11, fontWeight: 800,
          padding: "5px 10px", borderRadius: 20,
          letterSpacing: 0.5, boxShadow: "0 4px 12px rgba(52, 211, 153, 0.4)",
          animation: "streakBadgePop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
          zIndex: 10, textTransform: "uppercase",
        }}>
          ✓ Crushed it
        </div>
      )}

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        {/* Animated toggle button */}
        <button
          onClick={handleToggle}
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 32, height: 32, borderRadius: 9,
            background: checked ? C.green : t.bg,
            border: "none", cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative", flexShrink: 0,
            animation: bursting ? "glowPulse 0.8s ease-out" : "none",
          }}
        >
          {/* Ripple effect */}
          {bursting && (
            <span style={{
              position: "absolute", top: "50%", left: "50%",
              width: 32, height: 32, marginTop: -16, marginLeft: -16,
              borderRadius: "50%", background: C.green,
              animation: "mealRipple 0.8s ease-out",
              pointerEvents: "none",
            }}/>
          )}

          {/* Particle burst */}
          {bursting && particles.map((p, i) => (
            <span
              key={i}
              style={{
                position: "absolute", top: "50%", left: "50%",
                width: p.size, height: p.size, borderRadius: "50%",
                background: p.color,
                marginTop: -p.size / 2, marginLeft: -p.size / 2,
                "--tx": `${p.tx}px`, "--ty": `${p.ty}px`,
                animation: `particleBurst 0.9s cubic-bezier(0.17, 0.67, 0.35, 1) ${p.delay}ms forwards`,
                pointerEvents: "none", zIndex: 2,
              }}
            />
          ))}

          {/* Icon that fades out / animated check that draws in */}
          {checked ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ zIndex: 3 }}>
              <path
                d="M5 12l5 5L20 7"
                stroke="#fff"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="30"
                style={{
                  animation: bursting ? "checkDraw 0.5s cubic-bezier(0.65, 0, 0.35, 1) forwards" : "none",
                  strokeDashoffset: bursting ? 30 : 0,
                }}
              />
            </svg>
          ) : (
            <span style={{ fontSize: 15 }}>{t.icon}</span>
          )}
        </button>

        <span style={{
          fontSize: 10, fontWeight: 800,
          color: checked ? C.green : t.color,
          textTransform: "uppercase", letterSpacing: 1.5,
          transition: "color 0.3s",
        }}>
          {meal.type}{checked && " · EATEN"}
        </span>
        {meal.prep && <span style={{ fontSize: 10, color: C.textMuted, marginLeft: "auto" }}>⏱ {meal.prep}</span>}
      </div>

      {/* Title with animated strikethrough */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: 4 }}>
        <h3 style={{
          fontSize: 15, fontWeight: 700, color: C.text, margin: 0,
          lineHeight: 1.3, transition: "color 0.3s",
        }}>{meal.name}</h3>
        {checked && (
          <div style={{
            position: "absolute", top: "50%", left: 0,
            height: 2, background: C.green, borderRadius: 1,
            width: "100%",
            animation: bursting ? "slashStrike 0.4s 0.2s cubic-bezier(0.65, 0, 0.35, 1) forwards" : "none",
            transformOrigin: "left",
          }}/>
        )}
      </div>

      <p style={{
        fontSize: 12, color: C.textDim, margin: "0 0 12px",
        lineHeight: 1.5, transition: "opacity 0.3s",
        opacity: checked ? 0.6 : 1,
      }}>{meal.desc}</p>

      <div style={{
        animation: bursting ? "macroShake 0.5s 0.15s cubic-bezier(0.36, 0, 0.66, -0.56)" : "none",
      }}>
        <MacroRow {...meal} />
      </div>
    </div>
  );
}

// ========== TAB: MEAL PLAN ==========
function MealPlanTab({ activeDay, setActiveDay, customFoods, checkedMeals, toggleMeal, setCheckedMeals }) {
  const day = DAYS[activeDay];
  const meals = mealPlan[day].meals;
  const dayChecks = checkedMeals[day] || {};

  // All meals planned
  const planTotals = meals.reduce(
    (a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein, fat: a.fat + m.fat, carbs: a.carbs + m.carbs, fibre: a.fibre + m.fibre }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 }
  );

  // Only eaten meals
  const eatenTotals = meals.reduce((a, m, i) => {
    if (!dayChecks[i]) return a;
    return {
      calories: a.calories + m.calories, protein: a.protein + m.protein,
      fat: a.fat + m.fat, carbs: a.carbs + m.carbs, fibre: a.fibre + m.fibre
    };
  }, { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 });

  const customTotals = customFoods.reduce(
    (a, f) => ({ calories: a.calories + f.calories, protein: a.protein + f.protein, fat: a.fat + f.fat, carbs: a.carbs + f.carbs, fibre: a.fibre + f.fibre }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 }
  );

  const consumed = {
    calories: eatenTotals.calories + customTotals.calories,
    protein: Math.round((eatenTotals.protein + customTotals.protein) * 10) / 10,
    fat: Math.round((eatenTotals.fat + customTotals.fat) * 10) / 10,
    carbs: Math.round((eatenTotals.carbs + customTotals.carbs) * 10) / 10,
    fibre: Math.round((eatenTotals.fibre + customTotals.fibre) * 10) / 10,
  };

  const targets = { calories: 3500, protein: 250, fat: 160, carbs: 80, fibre: 35 };
  const eatenCount = meals.filter((_, i) => dayChecks[i]).length;

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>Lean Bulk — Meal Plan</h1>
        <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>High-protein · Low-carb · ~3,500 kcal · 250g+ protein target</p>
      </div>

      <div style={{
        background: C.accentSoft, border: `1px solid ${C.accentBorder}`,
        borderRadius: 10, padding: "10px 14px", marginBottom: 14,
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <span style={{ fontSize: 10, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: 1.5 }}>
          ⚡ Phase 1 — Lean Bulk
        </span>
        <span style={{ fontSize: 11, color: C.textDim }}>Months 1–2 · Protein-focused</span>
      </div>

      {/* Day tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 14, overflowX: "auto" }}>
        {DAYS.map((d, i) => {
          const dayEaten = Object.values(checkedMeals[d] || {}).filter(Boolean).length;
          return (
            <button key={d} onClick={() => setActiveDay(i)} style={{
              flex: 1, minWidth: 42, padding: "9px 2px", borderRadius: 8,
              border: i === activeDay ? `2px solid ${C.accent}` : `1px solid ${C.border}`,
              background: i === activeDay ? C.accentSoft : C.card,
              color: i === activeDay ? C.accent : C.textMuted,
              fontWeight: i === activeDay ? 800 : 500, fontSize: 11, cursor: "pointer",
              position: "relative",
            }}>
              {d.slice(0, 3)}
              {dayEaten > 0 && (
                <div style={{
                  position: "absolute", top: 3, right: 3, width: 6, height: 6,
                  borderRadius: 3, background: C.green,
                }}/>
              )}
            </button>
          );
        })}
      </div>

      {/* Progress card — consumed vs target */}
      <div style={{ background: C.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}`, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1.5 }}>
            {day} — Consumed So Far
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: eatenCount === meals.length ? C.green : C.textDim }}>
              {eatenCount}/{meals.length} meals
            </span>
            {eatenCount > 0 && (
              <button
                onClick={() => setCheckedMeals(prev => ({ ...prev, [day]: {} }))}
                style={{
                  background: "none", border: `1px solid ${C.border}`, borderRadius: 6,
                  color: C.textMuted, fontSize: 9, fontWeight: 700, padding: "3px 8px",
                  cursor: "pointer", textTransform: "uppercase", letterSpacing: 0.5,
                }}
              >Reset</button>
            )}
          </div>
        </div>
        <MacroRow {...consumed} size="lg" />
        <div style={{ marginTop: 12 }}>
          {[
            { label: "Protein", val: consumed.protein, target: targets.protein, color: C.green },
            { label: "Calories", val: consumed.calories, target: targets.calories, color: C.accent },
            { label: "Fat", val: consumed.fat, target: targets.fat, color: C.blue },
          ].map(m => {
            const pct = Math.min((m.val / m.target) * 100, 100);
            return (
              <div key={m.label} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: C.textDim, marginBottom: 3 }}>
                  <span>{m.label}</span>
                  <span>{m.val} / {m.target}{m.label === "Protein" || m.label === "Fat" ? "g" : ""}</span>
                </div>
                <div style={{ height: 5, background: C.cardAlt, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: m.color, transition: "width 0.4s" }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {meals.map((m, i) => (
        <MealCard key={i} meal={m} checked={!!dayChecks[i]} onToggle={() => toggleMeal(day, i)}/>
      ))}
    </>
  );
}

// ========== TAB: GROCERY LIST ==========
function GroceryTab() {
  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>Grocery List</h1>
        <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>Organised by store section · ~$145 AUD</p>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 14px", background: C.accentSoft, borderRadius: 10,
        border: `1px solid ${C.accentBorder}`, marginBottom: 16,
      }}>
        <div>
          <div style={{ fontSize: 10, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: 1.5 }}>Weekly Total</div>
          <div style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>Aldi / Coles / Woolworths Melbourne</div>
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.accent }}>~$145</div>
      </div>

      {groceryList.map((section, si) => (
        <div key={si} style={{ background: C.card, borderRadius: 12, padding: "14px 16px", border: `1px solid ${C.border}`, marginBottom: 12 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 10, paddingBottom: 8, borderBottom: `1px solid ${C.border}`,
          }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: C.accent }}>{section.section}</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.textDim }}>{section.subtotal}</span>
          </div>
          {section.items.map((item, ii) => (
            <div key={ii} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto", gap: 8,
              alignItems: "start", padding: "7px 0",
              borderBottom: ii < section.items.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text, lineHeight: 1.3 }}>{item.name}</div>
                <div style={{ fontSize: 10, color: C.textMuted, marginTop: 1 }}>{item.note}</div>
              </div>
              <div style={{ fontSize: 11, color: C.textDim, textAlign: "right", minWidth: 90 }}>{item.qty}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.green, textAlign: "right", minWidth: 40 }}>{item.price}</div>
            </div>
          ))}
        </div>
      ))}

      <div style={{
        padding: "12px 14px", background: C.greenSoft, borderRadius: 10,
        fontSize: 11, color: C.green, lineHeight: 1.7,
      }}>
        <strong>💡 Budget tips:</strong><br/>
        • Chicken breast + lean mince are your two biggest purchases — buy on special and freeze.<br/>
        • Aldi: eggs, egg whites, bacon, chicken, tinned fish, yoghurt, chia seeds, nuts.<br/>
        • Coles/Woolies: half-price lamb and steak specials (check the app).<br/>
        • Whey protein: buy 1kg tub at Chemist Warehouse or MyProtein — usually cheapest.
      </div>
    </>
  );
}

// ========== TAB: CUSTOM FOODS ==========
function CustomFoodsTab({ customFoods, setCustomFoods }) {
  const [selectedFood, setSelectedFood] = useState("");
  const [qty, setQty] = useState(1);
  const [manualMode, setManualMode] = useState(false);
  const [manual, setManual] = useState({ name: "", calories: "", protein: "", fat: "", carbs: "", fibre: "" });

  const addFromDb = () => {
    if (!selectedFood) return;
    const base = commonFoods[selectedFood];
    setCustomFoods([...customFoods, {
      name: `${selectedFood}${qty > 1 ? ` x${qty}` : ""}`,
      calories: Math.round(base.calories * qty),
      protein: Math.round(base.protein * qty * 10) / 10,
      fat: Math.round(base.fat * qty * 10) / 10,
      carbs: Math.round(base.carbs * qty * 10) / 10,
      fibre: Math.round(base.fibre * qty * 10) / 10,
    }]);
    setSelectedFood("");
    setQty(1);
  };

  const addManual = () => {
    if (!manual.name) return;
    setCustomFoods([...customFoods, {
      name: manual.name,
      calories: Number(manual.calories) || 0,
      protein: Number(manual.protein) || 0,
      fat: Number(manual.fat) || 0,
      carbs: Number(manual.carbs) || 0,
      fibre: Number(manual.fibre) || 0,
    }]);
    setManual({ name: "", calories: "", protein: "", fat: "", carbs: "", fibre: "" });
  };

  const removeFood = i => setCustomFoods(customFoods.filter((_, idx) => idx !== i));
  const clearAll = () => setCustomFoods([]);

  const totals = customFoods.reduce((a, f) => ({
    calories: a.calories + f.calories, protein: a.protein + f.protein,
    fat: a.fat + f.fat, carbs: a.carbs + f.carbs, fibre: a.fibre + f.fibre,
  }), { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 });

  const inputStyle = {
    background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 8,
    color: C.text, padding: "9px 11px", fontSize: 13, outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>Custom Foods</h1>
        <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>Extra foods you've eaten today — rolled into daily total</p>
      </div>

      <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button onClick={() => setManualMode(false)} style={{
            flex: 1, padding: "9px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: !manualMode ? C.accentSoft : "transparent",
            border: `1px solid ${!manualMode ? C.accentBorder : C.border}`,
            color: !manualMode ? C.accent : C.textDim,
          }}>Quick Add</button>
          <button onClick={() => setManualMode(true)} style={{
            flex: 1, padding: "9px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer",
            background: manualMode ? C.accentSoft : "transparent",
            border: `1px solid ${manualMode ? C.accentBorder : C.border}`,
            color: manualMode ? C.accent : C.textDim,
          }}>Manual Entry</button>
        </div>

        {!manualMode ? (
          <>
            <select value={selectedFood} onChange={e => setSelectedFood(e.target.value)}
              style={{ ...inputStyle, marginBottom: 8 }}>
              <option value="">Select a food...</option>
              {Object.keys(commonFoods).sort().map(f => <option key={f} value={f}>{f}</option>)}
            </select>
            {selectedFood && (
              <div style={{ fontSize: 11, color: C.textDim, marginBottom: 10, padding: "8px 10px", background: C.bg, borderRadius: 6 }}>
                Per unit: {commonFoods[selectedFood].calories} cal · {commonFoods[selectedFood].protein}g pro · {commonFoods[selectedFood].fat}g fat · {commonFoods[selectedFood].carbs}g carb · {commonFoods[selectedFood].fibre}g fibre
              </div>
            )}
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 90 }}>
                <label style={{ fontSize: 10, color: C.textMuted, marginBottom: 3, display: "block" }}>Qty</label>
                <input type="number" value={qty} min={0.5} step={0.5} onChange={e => setQty(Number(e.target.value) || 1)} style={inputStyle}/>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                <button onClick={addFromDb} style={{
                  width: "100%", padding: "10px", borderRadius: 8, border: "none",
                  background: C.accent, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                }}>Add Food</button>
              </div>
            </div>
          </>
        ) : (
          <>
            <input placeholder="Food name" value={manual.name} onChange={e => setManual({ ...manual, name: e.target.value })}
              style={{ ...inputStyle, marginBottom: 8 }}/>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 10 }}>
              {["calories", "protein", "fat", "carbs", "fibre"].map(f => (
                <div key={f}>
                  <label style={{ fontSize: 9, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{f}</label>
                  <input type="number" placeholder="0" value={manual[f]} onChange={e => setManual({ ...manual, [f]: e.target.value })}
                    style={{ ...inputStyle, padding: "7px 9px", fontSize: 12 }}/>
                </div>
              ))}
            </div>
            <button onClick={addManual} style={{
              width: "100%", padding: "10px", borderRadius: 8, border: "none",
              background: C.accent, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            }}>Add Custom Food</button>
          </>
        )}
      </div>

      {customFoods.length > 0 ? (
        <>
          <div style={{ background: C.card, borderRadius: 12, padding: 14, border: `1px solid ${C.border}`, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.textDim, textTransform: "uppercase", letterSpacing: 1 }}>Added Foods ({customFoods.length})</span>
              <button onClick={clearAll} style={{
                background: "none", border: `1px solid ${C.border}`, borderRadius: 6,
                color: C.textMuted, fontSize: 10, fontWeight: 700, padding: "4px 10px", cursor: "pointer",
              }}>Clear All</button>
            </div>
            {customFoods.map((f, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", background: C.cardAlt, borderRadius: 8,
                marginBottom: 6, border: `1px solid ${C.border}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 3 }}>{f.name}</div>
                  <div style={{ fontSize: 10, color: C.textDim }}>
                    {f.calories} cal · {f.protein}g P · {f.fat}g F · {f.carbs}g C · {f.fibre}g fibre
                  </div>
                </div>
                <button onClick={() => removeFood(i)} style={{
                  background: "none", border: "none", color: C.textMuted,
                  fontSize: 16, cursor: "pointer", padding: "4px 8px",
                }}>✕</button>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 14px", background: C.orangeSoft, borderRadius: 10, border: `1px solid ${C.orange}33` }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: C.orange, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Custom Total</div>
            <MacroRow {...totals}/>
          </div>
        </>
      ) : (
        <div style={{ background: C.card, borderRadius: 12, padding: "30px 20px", border: `1px dashed ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
          <div style={{ fontSize: 13, color: C.textDim, marginBottom: 4 }}>No custom foods added yet</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>Use Quick Add or Manual Entry above</div>
        </div>
      )}
    </>
  );
}

// ========== TAB: WATER ==========
const WATER_GOAL = 4000; // 4L target
const WATER_PRESETS = [
  { label: "Cup", ml: 250, icon: "🥃" },
  { label: "Bottle", ml: 500, icon: "💧" },
  { label: "Large", ml: 750, icon: "🫙" },
  { label: "Litre", ml: 1000, icon: "🪣" },
];

function WaterTab({ waterIntake, setWaterIntake }) {
  const [customMl, setCustomMl] = useState("");
  const total = waterIntake.reduce((sum, entry) => sum + entry.ml, 0);
  const pct = Math.min((total / WATER_GOAL) * 100, 100);
  const remaining = Math.max(WATER_GOAL - total, 0);

  const addWater = (ml) => {
    const entry = {
      ml,
      time: new Date().toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: false }),
      id: Date.now() + Math.random(),
    };
    setWaterIntake([...waterIntake, entry]);
    // Light haptic tap for water logging
    triggerHaptic("light");
    // Celebrate extra hard when goal is crossed
    const newTotal = waterIntake.reduce((s, e) => s + e.ml, 0) + ml;
    if (newTotal >= WATER_GOAL && (newTotal - ml) < WATER_GOAL) {
      setTimeout(() => triggerHaptic("heavy"), 200);
    }
  };

  const addCustom = () => {
    const ml = Number(customMl);
    if (!ml || ml <= 0) return;
    addWater(ml);
    setCustomMl("");
  };

  const removeEntry = (id) => setWaterIntake(waterIntake.filter(e => e.id !== id));
  const clearAll = () => setWaterIntake([]);

  const inputStyle = {
    background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 8,
    color: C.text, padding: "10px 12px", fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>Water Intake</h1>
        <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>Daily target: 4L (4,000ml)</p>
      </div>

      {/* Big progress display with glass visual */}
      <div style={{
        background: C.card, borderRadius: 14, padding: "24px 20px",
        border: `1px solid ${C.border}`, marginBottom: 14, textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Water fill background */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: `${pct}%`,
          background: "linear-gradient(180deg, rgba(56, 189, 248, 0.08) 0%, rgba(56, 189, 248, 0.22) 100%)",
          transition: "height 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          zIndex: 0,
        }}/>
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 800, color: C.blue, textTransform: "uppercase", letterSpacing: 2, marginBottom: 8 }}>
            Today's Total
          </div>
          <div style={{ fontSize: 54, fontWeight: 900, color: C.text, letterSpacing: -2, lineHeight: 1 }}>
            {(total / 1000).toFixed(total >= 1000 ? 2 : 3).replace(/\.?0+$/, "")}
            <span style={{ fontSize: 24, color: C.textDim, marginLeft: 6, fontWeight: 700 }}>L</span>
          </div>
          <div style={{ fontSize: 13, color: C.textDim, marginTop: 6 }}>
            {total}ml of {WATER_GOAL}ml · {Math.round(pct)}% complete
          </div>
          {remaining > 0 ? (
            <div style={{ fontSize: 12, color: C.blue, marginTop: 8, fontWeight: 600 }}>
              💧 {remaining}ml to go
            </div>
          ) : (
            <div style={{ fontSize: 12, color: C.green, marginTop: 8, fontWeight: 700 }}>
              ✓ Daily goal hit — keep going!
            </div>
          )}

          {/* Progress bar */}
          <div style={{ marginTop: 16, height: 8, background: C.cardAlt, borderRadius: 4, overflow: "hidden" }}>
            <div style={{
              width: `${pct}%`, height: "100%",
              background: pct >= 100
                ? `linear-gradient(90deg, ${C.green}, #60e6a6)`
                : `linear-gradient(90deg, ${C.blue}, #7dd3fc)`,
              transition: "width 0.4s", borderRadius: 4,
            }}/>
          </div>
        </div>
      </div>

      {/* Quick add preset buttons */}
      <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}`, marginBottom: 12 }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
          Quick Add
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {WATER_PRESETS.map(preset => (
            <button key={preset.label} onClick={() => addWater(preset.ml)} style={{
              background: C.blueSoft, border: `1px solid ${C.blue}33`,
              borderRadius: 10, padding: "14px 10px", cursor: "pointer",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 26 }}>{preset.icon}</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: C.text }}>{preset.label}</span>
              <span style={{ fontSize: 11, color: C.blue, fontWeight: 700 }}>+{preset.ml}ml</span>
            </button>
          ))}
        </div>

        {/* Custom import */}
        <div style={{ fontSize: 10, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>
          Or enter custom amount
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="number"
            placeholder="Enter ml"
            value={customMl}
            onChange={e => setCustomMl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addCustom()}
            style={inputStyle}
          />
          <button onClick={addCustom} style={{
            padding: "10px 18px", borderRadius: 8, border: "none",
            background: C.blue, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
            whiteSpace: "nowrap",
          }}>+ Add</button>
        </div>
      </div>

      {/* History log */}
      {waterIntake.length > 0 ? (
        <div style={{ background: C.card, borderRadius: 12, padding: 16, border: `1px solid ${C.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>
              Today's Log ({waterIntake.length} {waterIntake.length === 1 ? "entry" : "entries"})
            </span>
            <button onClick={clearAll} style={{
              background: "none", border: `1px solid ${C.border}`, borderRadius: 6,
              color: C.textMuted, fontSize: 10, fontWeight: 700, padding: "4px 10px", cursor: "pointer",
            }}>Reset Day</button>
          </div>
          {[...waterIntake].reverse().map(entry => (
            <div key={entry.id} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", background: C.cardAlt, borderRadius: 8,
              marginBottom: 6, border: `1px solid ${C.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>💧</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.blue }}>+{entry.ml}ml</div>
                  <div style={{ fontSize: 10, color: C.textMuted }}>at {entry.time}</div>
                </div>
              </div>
              <button onClick={() => removeEntry(entry.id)} style={{
                background: "none", border: "none", color: C.textMuted,
                fontSize: 16, cursor: "pointer", padding: "4px 8px",
              }}>✕</button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background: C.card, borderRadius: 12, padding: "30px 20px", border: `1px dashed ${C.border}`, textAlign: "center" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💧</div>
          <div style={{ fontSize: 13, color: C.textDim, marginBottom: 4 }}>No water logged yet today</div>
          <div style={{ fontSize: 11, color: C.textMuted }}>Tap a quick add button above to start</div>
        </div>
      )}

      <div style={{
        marginTop: 16, padding: "12px 14px", background: C.blueSoft,
        border: `1px solid ${C.blue}33`, borderRadius: 10,
        fontSize: 11, color: C.blue, lineHeight: 1.6,
      }}>
        💡 <strong>Hydration tip:</strong> On a high-protein, high-fibre diet you need more water than average. Aim to finish 1L before breakfast, 1L before lunch, 1L before dinner, 1L spread across training.
      </div>
    </>
  );
}

// ========== TAB: MOTIVATION ==========
function MotivationTab() {
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const next = () => setIdx((idx + 1) % quotes.length);
  const prev = () => setIdx((idx - 1 + quotes.length) % quotes.length);
  const handleTouchStart = e => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = e => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>Motivation</h1>
        <p style={{ fontSize: 12, color: C.textDim, margin: 0 }}>Swipe through for a mental boost</p>
      </div>

      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{
        background: C.card, borderRadius: 14, padding: "32px 22px",
        border: `1px solid ${C.border}`, textAlign: "center", userSelect: "none",
        minHeight: 240, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ fontSize: 10, fontWeight: 800, color: C.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
          Quote #{idx + 1} of {quotes.length}
        </div>
        <p style={{ fontSize: 18, color: C.text, fontStyle: "italic", lineHeight: 1.5, margin: "0 0 14px", maxWidth: 500, fontWeight: 500 }}>
          "{quotes[idx].text}"
        </p>
        <p style={{ fontSize: 12, color: C.textMuted, margin: 0 }}>— {quotes[idx].author}</p>
        <div style={{ display: "flex", gap: 14, marginTop: 22, alignItems: "center" }}>
          <button onClick={prev} style={{
            background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 10,
            color: C.text, fontSize: 20, width: 40, height: 40, cursor: "pointer",
          }}>‹</button>
          <div style={{ display: "flex", gap: 5 }}>
            {quotes.map((_, i) => (
              <div key={i} style={{
                width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
                background: i === idx ? C.accent : C.border, transition: "all 0.3s",
              }}/>
            ))}
          </div>
          <button onClick={next} style={{
            background: C.cardAlt, border: `1px solid ${C.border}`, borderRadius: 10,
            color: C.text, fontSize: 20, width: 40, height: 40, cursor: "pointer",
          }}>›</button>
        </div>
      </div>

      <div style={{
        marginTop: 16, padding: "14px 16px", background: C.purpleSoft,
        border: `1px solid ${C.purple}33`, borderRadius: 10,
        fontSize: 12, color: C.purple, lineHeight: 1.6,
      }}>
        💜 <strong>Remember:</strong> You went from 165kg to 110kg. That's not luck, that's character. This phase is about building on top of that foundation, not starting from zero.
      </div>
    </>
  );
}

// ========== LOCALSTORAGE HOOKS ==========
// Persists any state to localStorage under a given key. Survives app reloads.
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Storage full or disabled — fail silently
    }
  }, [key, state]);

  return [state, setState];
}

// Returns today's date string as YYYY-MM-DD so we can reset daily data at midnight.
function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Persists daily state + auto-resets when the date changes (new day = fresh slate).
function useDailyPersistedState(key, defaultValue) {
  const [wrapped, setWrapped] = usePersistedState(key, { date: getTodayKey(), value: defaultValue });

  const today = getTodayKey();
  const value = wrapped.date === today ? wrapped.value : defaultValue;

  const setValue = (updater) => {
    setWrapped((prev) => {
      const currentValue = prev.date === today ? prev.value : defaultValue;
      const newValue = typeof updater === "function" ? updater(currentValue) : updater;
      return { date: today, value: newValue };
    });
  };

  return [value, setValue];
}

// ========== MAIN APP WITH BOTTOM NAV ==========
const tabs = [
  { id: "meals", label: "Meals", icon: "🍽️" },
  { id: "water", label: "Water", icon: "💧" },
  { id: "grocery", label: "Grocery", icon: "🛒" },
  { id: "custom", label: "Custom", icon: "➕" },
  { id: "motivation", label: "Motivate", icon: "💪" },
];

export default function App() {
  const [activeTab, setActiveTab] = usePersistedState("mp_activeTab", "meals");
  const [activeDay, setActiveDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  // Custom foods persist across sessions but reset daily (new day = clean slate)
  const [customFoods, setCustomFoods] = useDailyPersistedState("mp_customFoods", []);
  // Water intake resets daily automatically
  const [waterIntake, setWaterIntake] = useDailyPersistedState("mp_waterIntake", []);
  // Meal checkoffs persist per day of week — checkoffs survive but you can uncheck for next week
  const [checkedMeals, setCheckedMeals] = usePersistedState("mp_checkedMeals", {});

  const toggleMeal = (day, mealIndex) => {
    setCheckedMeals(prev => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [mealIndex]: !(prev[day]?.[mealIndex])
      }
    }));
  };

  return (
    <div style={{
      fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif",
      background: C.bg, color: C.text, minHeight: "100vh",
      paddingBottom: 90,
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 14px" }}>
        {activeTab === "meals" && (
          <MealPlanTab
            activeDay={activeDay}
            setActiveDay={setActiveDay}
            customFoods={customFoods}
            checkedMeals={checkedMeals}
            toggleMeal={toggleMeal}
            setCheckedMeals={setCheckedMeals}
          />
        )}
        {activeTab === "water" && <WaterTab waterIntake={waterIntake} setWaterIntake={setWaterIntake}/>}
        {activeTab === "grocery" && <GroceryTab/>}
        {activeTab === "custom" && <CustomFoodsTab customFoods={customFoods} setCustomFoods={setCustomFoods}/>}
        {activeTab === "motivation" && <MotivationTab/>}
      </div>

      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "rgba(12, 14, 20, 0.95)", backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`, padding: "8px 0 calc(8px + env(safe-area-inset-bottom))",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        zIndex: 100,
      }}>
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, background: "none", border: "none", cursor: "pointer",
            padding: "6px 2px", display: "flex", flexDirection: "column",
            alignItems: "center", gap: 2, transition: "all 0.2s",
          }}>
            <span style={{ fontSize: 20, opacity: activeTab === tab.id ? 1 : 0.5, transition: "opacity 0.2s" }}>
              {tab.icon}
            </span>
            <span style={{
              fontSize: 9, fontWeight: 700,
              color: activeTab === tab.id ? C.accent : C.textMuted,
              letterSpacing: 0.3, transition: "color 0.2s",
            }}>{tab.label}</span>
            {activeTab === tab.id && (
              <div style={{ width: 18, height: 2, borderRadius: 1, background: C.accent, marginTop: 1 }}/>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
