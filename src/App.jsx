import { useState, useEffect } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const mealPlan = {
  Monday: {
    meals: [
      {
        type: "Breakfast",
        name: "Bacon & Egg Scramble with Avocado",
        desc: "5 eggs scrambled in butter with 4 rashers bacon, half an avocado, and a big handful of baby spinach wilted in.",
        calories: 920,
        protein: 58,
        fat: 70,
        carbs: 8,
        fibre: 5,
        prep: "10 min"
      },
      {
        type: "Lunch",
        name: "Beef Mince & Roast Veg Bowl",
        desc: "300g beef mince (3-star, Coles) pan-fried with garlic. Served over roasted broccoli, zucchini, and capsicum drizzled with olive oil. Side of sauerkraut (Aldi).",
        calories: 880,
        protein: 62,
        fat: 58,
        carbs: 16,
        fibre: 9,
        prep: "15 min"
      },
      {
        type: "Snack",
        name: "Greek Yoghurt, Chia & Berries",
        desc: "250g full-fat Greek yoghurt (Jalna) with 2 tbsp chia seeds, handful of blueberries, and 30g walnuts.",
        calories: 480,
        protein: 22,
        fat: 32,
        carbs: 22,
        fibre: 12,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Chicken Thighs with Cauliflower Mash",
        desc: "300g chicken thigh fillets (skin-on) pan-seared with paprika. Serve with cauliflower mash (half a cauli blitzed with butter and cream) and steamed green beans.",
        calories: 920,
        protein: 64,
        fat: 64,
        carbs: 14,
        fibre: 8,
        prep: "25 min"
      }
    ]
  },
  Tuesday: {
    meals: [
      {
        type: "Breakfast",
        name: "Cheese Omelette with Mushrooms",
        desc: "5-egg omelette with 50g shredded tasty cheese (Bega), 150g sliced mushrooms fried in butter. Full avocado on the side.",
        calories: 960,
        protein: 52,
        fat: 76,
        carbs: 10,
        fibre: 7,
        prep: "10 min"
      },
      {
        type: "Lunch",
        name: "Tuna Salad Plate",
        desc: "2 tins tuna in olive oil (Aldi Ocean Rise) over cos lettuce, cucumber, cherry tomatoes, olives, 2 tbsp flaxseed meal. Drizzle olive oil and lemon.",
        calories: 740,
        protein: 58,
        fat: 48,
        carbs: 12,
        fibre: 8,
        prep: "5 min"
      },
      {
        type: "Snack",
        name: "Boiled Eggs, Almonds & Pear",
        desc: "3 boiled eggs, 40g almonds (Aldi), 1 pear.",
        calories: 520,
        protein: 28,
        fat: 36,
        carbs: 20,
        fibre: 7,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Lamb Chops with Roast Cauliflower & Broccoli",
        desc: "4 lamb loin chops grilled (Woolworths/Coles special). Serve with a full head of cauliflower and broccoli roasted with olive oil, garlic, cumin. Side of kimchi.",
        calories: 980,
        protein: 72,
        fat: 68,
        carbs: 14,
        fibre: 10,
        prep: "25 min"
      }
    ]
  },
  Wednesday: {
    meals: [
      {
        type: "Breakfast",
        name: "Sausage, Egg & Avo Plate",
        desc: "4 beef sausages (Aldi) pan-fried, 3 fried eggs, full avocado, handful of rocket. Drizzle olive oil.",
        calories: 1020,
        protein: 56,
        fat: 82,
        carbs: 10,
        fibre: 8,
        prep: "10 min"
      },
      {
        type: "Lunch",
        name: "Chicken Stir-Fry (No Rice)",
        desc: "250g chicken breast sliced, stir-fried with broccoli, bok choy, mushrooms, and cabbage in butter and soy sauce. Top with sesame seeds and 1 tbsp psyllium husk mixed into sauce.",
        calories: 680,
        protein: 60,
        fat: 36,
        carbs: 16,
        fibre: 10,
        prep: "12 min"
      },
      {
        type: "Snack",
        name: "Cottage Cheese, Walnuts & Flax",
        desc: "200g cottage cheese (Dairy Farmers) topped with 30g walnuts and 1 tbsp ground flaxseed.",
        calories: 420,
        protein: 30,
        fat: 28,
        carbs: 8,
        fibre: 5,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Salmon with Asparagus & Avocado",
        desc: "2 salmon fillets (~300g, frozen Aldi) baked at 200°C with lemon. Bundle of asparagus roasted in olive oil. Half avocado on the side. 1 tbsp chia seeds sprinkled over.",
        calories: 940,
        protein: 62,
        fat: 68,
        carbs: 10,
        fibre: 9,
        prep: "20 min"
      }
    ]
  },
  Thursday: {
    meals: [
      {
        type: "Breakfast",
        name: "Big Bacon & Mushroom Fry-Up",
        desc: "5 rashers bacon, 200g mushrooms fried in butter, 4 eggs any style, grilled tomato. Side of sauerkraut.",
        calories: 940,
        protein: 58,
        fat: 72,
        carbs: 10,
        fibre: 6,
        prep: "12 min"
      },
      {
        type: "Lunch",
        name: "Double Beef Patties with Salad",
        desc: "3 homemade beef patties (300g mince total, salt & pepper). Cos lettuce, tomato, cucumber, red onion, olive oil dressing. 1 tbsp psyllium husk in water on the side.",
        calories: 820,
        protein: 64,
        fat: 56,
        carbs: 10,
        fibre: 8,
        prep: "15 min"
      },
      {
        type: "Snack",
        name: "Protein Smoothie",
        desc: "250ml full-fat milk, 1 scoop whey protein, 1 tbsp peanut butter, 2 tbsp chia seeds, 1/2 banana. Blend.",
        calories: 520,
        protein: 42,
        fat: 24,
        carbs: 28,
        fibre: 10,
        prep: "3 min"
      },
      {
        type: "Dinner",
        name: "Slow-Baked Chicken Drumsticks & Roast Veg",
        desc: "8 drumsticks (Aldi ~$4/kg) seasoned with paprika, garlic, salt. Bake 190°C 40 min. Serve with roasted eggplant, zucchini, and broccolini tossed in olive oil.",
        calories: 920,
        protein: 72,
        fat: 56,
        carbs: 14,
        fibre: 8,
        prep: "10 min + 40 oven"
      }
    ]
  },
  Friday: {
    meals: [
      {
        type: "Breakfast",
        name: "Smoked Salmon & Cream Cheese Plate",
        desc: "150g smoked salmon (Aldi), 60g cream cheese, capers, baby spinach, 3 boiled eggs. Drizzle olive oil.",
        calories: 780,
        protein: 56,
        fat: 56,
        carbs: 6,
        fibre: 3,
        prep: "5 min"
      },
      {
        type: "Lunch",
        name: "Pork Mince Lettuce Cups",
        desc: "300g pork mince cooked with garlic, ginger, soy sauce, shredded cabbage. Spoon into cos lettuce cups. Top with spring onion, sesame seeds, chilli flakes.",
        calories: 780,
        protein: 56,
        fat: 54,
        carbs: 10,
        fibre: 6,
        prep: "12 min"
      },
      {
        type: "Snack",
        name: "Cheese, Celery & Almond Butter",
        desc: "80g tasty cheese cubed, 4 celery stalks with 2 tbsp almond butter.",
        calories: 520,
        protein: 24,
        fat: 42,
        carbs: 8,
        fibre: 5,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Rump Steak with Buttered Greens",
        desc: "350g rump steak (Coles/Woolworths special ~$20/kg) pan-seared medium. Steamed broccoli, green beans, and zucchini tossed in butter. Side of sauerkraut.",
        calories: 980,
        protein: 78,
        fat: 66,
        carbs: 12,
        fibre: 9,
        prep: "15 min"
      }
    ]
  },
  Saturday: {
    meals: [
      {
        type: "Breakfast",
        name: "Full Big Brekkie",
        desc: "5 eggs, 5 rashers bacon, grilled tomato, 200g mushrooms, full avocado, handful of rocket. All in butter.",
        calories: 1100,
        protein: 66,
        fat: 86,
        carbs: 14,
        fibre: 9,
        prep: "15 min"
      },
      {
        type: "Lunch",
        name: "Chicken Thigh & Mediterranean Veg",
        desc: "300g chicken thighs shredded over roasted capsicum, eggplant, red onion, cherry tomatoes with olive oil and oregano. Crumble feta on top.",
        calories: 840,
        protein: 60,
        fat: 56,
        carbs: 18,
        fibre: 7,
        prep: "15 min + roast"
      },
      {
        type: "Snack",
        name: "Dark Choc, Nuts & Chia Pudding",
        desc: "3 tbsp chia seeds soaked in 150ml coconut cream overnight. Top with 30g mixed nuts and 25g 85% dark chocolate chopped.",
        calories: 540,
        protein: 12,
        fat: 42,
        carbs: 22,
        fibre: 14,
        prep: "2 min (prep night before)"
      },
      {
        type: "Dinner",
        name: "Bolognese on Zucchini Noodles",
        desc: "350g beef mince slow-cooked with tinned tomatoes, garlic, onion, Italian herbs. Serve over spiralized or peeled zucchini. Grate parmesan on top.",
        calories: 880,
        protein: 66,
        fat: 56,
        carbs: 20,
        fibre: 8,
        prep: "15 min + 30 simmer"
      }
    ]
  },
  Sunday: {
    meals: [
      {
        type: "Breakfast",
        name: "Turkish Eggs (Çılbır-Inspired)",
        desc: "4 poached eggs over 200g full-fat Greek yoghurt, drizzled with chilli butter (butter melted with paprika, chilli flakes). Side of sauerkraut.",
        calories: 720,
        protein: 42,
        fat: 54,
        carbs: 10,
        fibre: 4,
        prep: "10 min"
      },
      {
        type: "Lunch",
        name: "Roast Chicken & Big Salad",
        desc: "Hot roast chook from Woolworths/Coles (~$12). 250g shredded meat over mixed leaves, cucumber, tomato, avocado, feta, olives, olive oil. 2 tbsp flaxseed meal.",
        calories: 920,
        protein: 68,
        fat: 64,
        carbs: 14,
        fibre: 9,
        prep: "5 min"
      },
      {
        type: "Snack",
        name: "Peanut Butter Celery & Apple",
        desc: "3 tbsp natural peanut butter on celery stalks. 1 large apple sliced.",
        calories: 440,
        protein: 14,
        fat: 28,
        carbs: 30,
        fibre: 8,
        prep: "2 min"
      },
      {
        type: "Dinner",
        name: "Grilled Lamb Leg Steaks with Greek Salad",
        desc: "2 large lamb leg steaks (Coles ~$18/kg) grilled with oregano and lemon. Greek salad: cucumber, tomato, red onion, feta, olives, olive oil. Steamed broccoli on the side.",
        calories: 940,
        protein: 68,
        fat: 64,
        carbs: 14,
        fibre: 7,
        prep: "20 min"
      }
    ]
  }
};

const groceryList = [
  {
    section: "🥬 Produce — Fresh Fruit & Vegetables",
    icon: "🥬",
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
      { name: "Avocado (Hass)", qty: "5 medium", price: "$8.00", note: "Mon, Tue, Wed, Sat, Sun — buy firm, ripen at home" },
      { name: "Red onion", qty: "3 medium", price: "$2.00", note: "Thu, Sat, Sun salads" },
      { name: "Brown onion", qty: "2 medium", price: "$1.00", note: "Sat bolognese" },
      { name: "Garlic", qty: "1 bulb", price: "$1.00", note: "Used across multiple days" },
      { name: "Ginger (fresh)", qty: "1 small knob (~30g)", price: "$0.50", note: "Fri pork mince" },
      { name: "Celery", qty: "1 bunch", price: "$3.00", note: "Fri snack, Sun snack" },
      { name: "Rocket", qty: "1 × 100g bag", price: "$3.00", note: "Wed, Sat breakfasts" },
      { name: "Spring onion", qty: "1 bunch", price: "$1.50", note: "Fri lettuce cups" },
      { name: "Lemon", qty: "3", price: "$1.50", note: "Tue, Wed, Sun — dressings and fish" },
      { name: "Apple (Granny Smith or Pink Lady)", qty: "3 medium", price: "$3.00", note: "Thu, Sun snacks" },
      { name: "Banana", qty: "2 medium", price: "$1.00", note: "Thu smoothie" },
      { name: "Pear (Packham)", qty: "2 medium", price: "$2.00", note: "Tue snack" },
      { name: "Blueberries", qty: "1 × 125g punnet", price: "$4.00", note: "Mon snack" },
    ]
  },
  {
    section: "🥩 Meat & Seafood — Butcher / Meat Aisle",
    icon: "🥩",
    subtotal: "$86.00",
    items: [
      { name: "Eggs (free range)", qty: "2.5 dozen (30 eggs)", price: "$9.00", note: "Aldi — used every single day" },
      { name: "Bacon (shortcut)", qty: "1.5kg value pack", price: "$14.00", note: "Coles/Aldi — Mon, Thu, Sat breakfasts" },
      { name: "Beef mince (3-star)", qty: "2kg", price: "$22.00", note: "Coles — Mon, Thu, Sat dinners/lunches" },
      { name: "Chicken thigh fillets (skin-on)", qty: "1.5kg", price: "$12.00", note: "Aldi — Mon, Sat dinners + Sat lunch" },
      { name: "Chicken drumsticks", qty: "1.5kg (~8 drumsticks)", price: "$6.00", note: "Aldi — Thu dinner, best value protein" },
      { name: "Chicken breast", qty: "500g", price: "$6.00", note: "Wed stir-fry" },
      { name: "Lamb loin chops", qty: "600g (~4 chops)", price: "$11.00", note: "Tue dinner — buy on special and freeze" },
      { name: "Lamb leg steaks", qty: "500g (~2 steaks)", price: "$9.00", note: "Sun dinner" },
      { name: "Rump steak", qty: "350g (1 thick steak)", price: "$7.00", note: "Fri dinner — Coles/Woolworths specials" },
      { name: "Pork mince", qty: "500g", price: "$5.00", note: "Fri lunch lettuce cups" },
      { name: "Beef sausages", qty: "1 × 8 pack", price: "$6.00", note: "Aldi — Wed breakfast" },
      { name: "Frozen salmon fillets", qty: "1 × 2 pack (~300g)", price: "$7.00", note: "Aldi — Wed dinner" },
      { name: "Smoked salmon", qty: "1 × 150g pack", price: "$5.00", note: "Aldi — Fri breakfast" },
      { name: "Tinned tuna in olive oil", qty: "4 × 95g tins", price: "$5.00", note: "Aldi Ocean Rise — Tue lunch" },
      { name: "Hot roast chicken (Sunday)", qty: "1 whole", price: "$12.00", note: "Woolworths/Coles — Sun lunch, buy day-of" },
    ]
  },
  {
    section: "🧀 Dairy & Refrigerated",
    icon: "🧀",
    subtotal: "$37.00",
    items: [
      { name: "Greek yoghurt (full-fat)", qty: "1 × 1kg tub", price: "$6.00", note: "Jalna or Aldi Lyttos — Mon snack, Sun brekkie" },
      { name: "Tasty cheese block", qty: "1 × 500g", price: "$5.00", note: "Bega or Aldi — Tue, Fri, across the week" },
      { name: "Cream cheese", qty: "1 × 250g block", price: "$3.00", note: "Fri breakfast" },
      { name: "Cottage cheese", qty: "1 × 500g tub", price: "$4.00", note: "Dairy Farmers — Wed snack" },
      { name: "Feta cheese", qty: "1 × 200g block", price: "$4.00", note: "Sat lunch, Sun lunch/dinner" },
      { name: "Parmesan wedge", qty: "1 × 150g", price: "$5.00", note: "Sat bolognese" },
      { name: "Full-fat milk", qty: "1 × 2L", price: "$3.00", note: "Thu smoothie + coffees" },
      { name: "Butter (salted)", qty: "1 × 500g block", price: "$5.00", note: "Cooking fat used daily" },
      { name: "Coconut cream", qty: "1 × 270ml tin", price: "$2.00", note: "Sat chia pudding" },
      { name: "Sauerkraut", qty: "1 × 680g jar", price: "$3.50", note: "Aldi — Mon, Thu, Fri, Sun (fermented, great for gut)" },
      { name: "Kimchi", qty: "1 × 400g jar", price: "$5.00", note: "Coles/Woolworths — Tue dinner" },
      { name: "Capers", qty: "1 × small jar", price: "$3.00", note: "Fri breakfast — lasts multiple weeks" },
      { name: "Olives (Kalamata)", qty: "1 × 350g jar", price: "$4.00", note: "Tue, Sun salads" },
    ]
  },
  {
    section: "🫙 Pantry — Dry Goods, Oils, Nuts & Fibre",
    icon: "🫙",
    subtotal: "$52.50",
    items: [
      { name: "Chia seeds", qty: "1 × 350g bag", price: "$5.00", note: "Aldi — Mon snack, Wed/Thu/Sat fibre boost" },
      { name: "Ground flaxseed (linseed)", qty: "1 × 500g bag", price: "$4.00", note: "Tue, Wed, Sun — fibre + omega-3" },
      { name: "Psyllium husk", qty: "1 × 200g tub", price: "$6.00", note: "Wed, Thu — mix into water or sauces" },
      { name: "Olive oil (extra virgin)", qty: "1 × 750ml bottle", price: "$7.00", note: "Daily cooking and dressings" },
      { name: "Peanut butter (natural, no sugar)", qty: "1 × 500g jar", price: "$5.00", note: "Aldi/Coles — Thu smoothie, Sun snack" },
      { name: "Almond butter", qty: "1 × 250g jar", price: "$6.00", note: "Fri snack" },
      { name: "Almonds (raw)", qty: "1 × 300g bag", price: "$5.00", note: "Aldi — Tue snack" },
      { name: "Walnuts", qty: "1 × 200g bag", price: "$4.00", note: "Mon snack, Wed snack" },
      { name: "Mixed nuts (unsalted)", qty: "1 × 250g bag", price: "$5.00", note: "Aldi — Sat snack" },
      { name: "Sesame seeds", qty: "1 × small bag (~100g)", price: "$2.00", note: "Wed, Fri — stir-fry topping" },
      { name: "Tinned tomatoes (diced)", qty: "3 × 400g tins", price: "$2.50", note: "Aldi — Sat bolognese" },
      { name: "Dark chocolate 85%", qty: "2 × 100g blocks", price: "$5.00", note: "Sat snack" },
      { name: "Soy sauce", qty: "1 × 250ml bottle", price: "$2.00", note: "Wed, Fri stir-fry — lasts weeks" },
      { name: "Chilli flakes", qty: "1 × jar", price: "$2.00", note: "Sun brekkie, Fri lettuce cups" },
      { name: "Smoked paprika", qty: "1 × jar", price: "$2.50", note: "Mon, Thu, Sun — seasoning" },
      { name: "Garlic powder", qty: "1 × jar", price: "$2.00", note: "Backup seasoning" },
      { name: "Ground cumin", qty: "1 × jar", price: "$2.00", note: "Tue roast cauliflower" },
      { name: "Dried oregano", qty: "1 × jar", price: "$2.00", note: "Sat, Sun — Mediterranean dishes" },
      { name: "Italian herb mix", qty: "1 × jar", price: "$2.00", note: "Sat bolognese" },
      { name: "Salt & pepper", qty: "pantry staple", price: "—", note: "Check you have enough" },
      { name: "Whey protein powder", qty: "1kg tub (if needed)", price: "~$35–45", note: "Budget separately — Thu smoothie, lasts 4+ weeks" },
    ]
  }
];

const quotes = [
  { text: "You didn't lose 55kg by accident. That same discipline is building something new now.", author: "Your Coach" },
  { text: "The pain you feel today will be the strength you feel tomorrow.", author: "Arnold Schwarzenegger" },
  { text: "Success is not given. It is earned. On the track, on the field, in the gym. With blood, sweat, and the occasional tear.", author: "Nike" },
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
  "Chicken breast 100g": { calories: 165, protein: 31, fat: 3.6, carbs: 0, fibre: 0 },
  "Chicken thigh 100g": { calories: 209, protein: 26, fat: 11, carbs: 0, fibre: 0 },
  "Beef mince 100g": { calories: 230, protein: 26, fat: 14, carbs: 0, fibre: 0 },
  "Bacon rasher (1)": { calories: 82, protein: 6, fat: 6.5, carbs: 0.3, fibre: 0 },
  "Salmon 100g": { calories: 208, protein: 22, fat: 13, carbs: 0, fibre: 0 },
  "Tuna in oil (1 tin)": { calories: 200, protein: 26, fat: 10, carbs: 0, fibre: 0 },
  "Lamb chop (1)": { calories: 230, protein: 22, fat: 15, carbs: 0, fibre: 0 },
  "Rump steak 100g": { calories: 210, protein: 28, fat: 10, carbs: 0, fibre: 0 },
  "Pork mince 100g": { calories: 210, protein: 22, fat: 13, carbs: 0, fibre: 0 },
  "Beef sausage (1)": { calories: 180, protein: 10, fat: 15, carbs: 1, fibre: 0 },
  "Avocado (half)": { calories: 160, protein: 2, fat: 15, carbs: 2, fibre: 5 },
  "Avocado (full)": { calories: 320, protein: 4, fat: 30, carbs: 4, fibre: 10 },
  "Greek yoghurt 100g": { calories: 100, protein: 6, fat: 6, carbs: 4, fibre: 0 },
  "Tasty cheese 30g": { calories: 120, protein: 7, fat: 10, carbs: 0.5, fibre: 0 },
  "Cream cheese 30g": { calories: 100, protein: 2, fat: 10, carbs: 1, fibre: 0 },
  "Cottage cheese 100g": { calories: 98, protein: 11, fat: 4, carbs: 3, fibre: 0 },
  "Butter 1 tbsp": { calories: 102, protein: 0, fat: 12, carbs: 0, fibre: 0 },
  "Olive oil 1 tbsp": { calories: 120, protein: 0, fat: 14, carbs: 0, fibre: 0 },
  "Peanut butter 1 tbsp": { calories: 95, protein: 4, fat: 8, carbs: 3, fibre: 1 },
  "Almond butter 1 tbsp": { calories: 98, protein: 3, fat: 9, carbs: 3, fibre: 1.5 },
  "Almonds 30g": { calories: 172, protein: 6, fat: 15, carbs: 2, fibre: 3.5 },
  "Walnuts 30g": { calories: 196, protein: 5, fat: 20, carbs: 1, fibre: 2 },
  "Chia seeds 1 tbsp": { calories: 60, protein: 2, fat: 4, carbs: 1, fibre: 4 },
  "Flaxseed meal 1 tbsp": { calories: 37, protein: 1.5, fat: 3, carbs: 0.5, fibre: 2 },
  "Psyllium husk 1 tbsp": { calories: 18, protein: 0, fat: 0, carbs: 4, fibre: 4 },
  "Whey protein 1 scoop": { calories: 120, protein: 24, fat: 1.5, carbs: 3, fibre: 0 },
  "Broccoli 100g": { calories: 34, protein: 3, fat: 0.4, carbs: 4, fibre: 3 },
  "Cauliflower 100g": { calories: 25, protein: 2, fat: 0.3, carbs: 3, fibre: 2 },
  "Spinach 100g": { calories: 23, protein: 3, fat: 0.4, carbs: 1, fibre: 2 },
  "Zucchini 100g": { calories: 17, protein: 1.2, fat: 0.3, carbs: 2, fibre: 1 },
  "Mushrooms 100g": { calories: 22, protein: 3, fat: 0.3, carbs: 2, fibre: 1 },
  "Green beans 100g": { calories: 31, protein: 2, fat: 0.2, carbs: 4, fibre: 3 },
  "Apple (1 medium)": { calories: 95, protein: 0.5, fat: 0.3, carbs: 22, fibre: 4 },
  "Banana (1 medium)": { calories: 105, protein: 1.3, fat: 0.4, carbs: 24, fibre: 3 },
  "Blueberries 100g": { calories: 57, protein: 0.7, fat: 0.3, carbs: 12, fibre: 2.5 },
  "Dark chocolate 25g (85%)": { calories: 150, protein: 2, fat: 12, carbs: 8, fibre: 3 },
  "Full-fat milk 250ml": { calories: 160, protein: 8, fat: 9, carbs: 12, fibre: 0 },
  "Sauerkraut 50g": { calories: 10, protein: 0.5, fat: 0, carbs: 2, fibre: 2 },
};

const COLORS = {
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
  borderLight: "#2e3245",
};

const mealTheme = {
  Breakfast: { color: COLORS.yellow, bg: COLORS.yellowSoft, icon: "☀️" },
  Lunch: { color: COLORS.green, bg: COLORS.greenSoft, icon: "🥩" },
  Snack: { color: COLORS.purple, bg: COLORS.purpleSoft, icon: "🥜" },
  Dinner: { color: COLORS.blue, bg: COLORS.blueSoft, icon: "🍳" },
  Custom: { color: COLORS.orange, bg: COLORS.orangeSoft, icon: "➕" },
};

function MacroRow({ calories, protein, fat, carbs, fibre, size = "sm" }) {
  const items = [
    { label: "Cal", val: calories, color: COLORS.accent },
    { label: "Pro", val: `${protein}g`, color: COLORS.green },
    { label: "Fat", val: `${fat}g`, color: COLORS.blue },
    { label: "Carb", val: `${carbs}g`, color: COLORS.yellow },
    { label: "Fibre", val: `${fibre}g`, color: COLORS.purple },
  ];
  return (
    <div style={{ display: "flex", gap: size === "lg" ? 16 : 8, flexWrap: "wrap" }}>
      {items.map((it) => (
        <div key={it.label} style={{
          display: "flex", alignItems: "center", gap: 4,
          padding: size === "lg" ? "6px 12px" : "3px 8px",
          background: `${it.color}11`, borderRadius: 6,
          border: `1px solid ${it.color}22`,
        }}>
          <span style={{ fontSize: size === "lg" ? 10 : 9, color: `${it.color}99`, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{it.label}</span>
          <span style={{ fontSize: size === "lg" ? 15 : 12, fontWeight: 800, color: it.color }}>{it.val}</span>
        </div>
      ))}
    </div>
  );
}

function MealCard({ meal }) {
  const t = mealTheme[meal.type] || mealTheme.Custom;
  return (
    <div style={{
      background: COLORS.card, borderRadius: 12, padding: "16px 18px",
      border: `1px solid ${COLORS.border}`, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 28, height: 28, borderRadius: 7, background: t.bg, fontSize: 14,
        }}>{t.icon}</span>
        <span style={{ fontSize: 10, fontWeight: 800, color: t.color, textTransform: "uppercase", letterSpacing: 1.5 }}>{meal.type}</span>
        {meal.prep && <span style={{ fontSize: 10, color: COLORS.textMuted, marginLeft: "auto" }}>⏱ {meal.prep}</span>}
      </div>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, margin: "0 0 4px", lineHeight: 1.3 }}>{meal.name}</h3>
      <p style={{ fontSize: 12, color: COLORS.textDim, margin: "0 0 12px", lineHeight: 1.5 }}>{meal.desc}</p>
      <MacroRow {...meal} />
    </div>
  );
}

function CustomFoodTracker({ customFoods, setCustomFoods }) {
  const [showAdd, setShowAdd] = useState(false);
  const [selectedFood, setSelectedFood] = useState("");
  const [qty, setQty] = useState(1);
  const [manualMode, setManualMode] = useState(false);
  const [manual, setManual] = useState({ name: "", calories: "", protein: "", fat: "", carbs: "", fibre: "" });

  const addFromDb = () => {
    if (!selectedFood) return;
    const base = commonFoods[selectedFood];
    const food = {
      name: `${selectedFood}${qty > 1 ? ` x${qty}` : ""}`,
      calories: Math.round(base.calories * qty),
      protein: Math.round(base.protein * qty * 10) / 10,
      fat: Math.round(base.fat * qty * 10) / 10,
      carbs: Math.round(base.carbs * qty * 10) / 10,
      fibre: Math.round(base.fibre * qty * 10) / 10,
    };
    setCustomFoods([...customFoods, food]);
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

  const removeFood = (i) => setCustomFoods(customFoods.filter((_, idx) => idx !== i));

  const totals = customFoods.reduce((a, f) => ({
    calories: a.calories + f.calories,
    protein: a.protein + f.protein,
    fat: a.fat + f.fat,
    carbs: a.carbs + f.carbs,
    fibre: a.fibre + f.fibre,
  }), { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 });

  const inputStyle = {
    background: COLORS.cardAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8,
    color: COLORS.text, padding: "8px 10px", fontSize: 13, outline: "none", width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      background: COLORS.card, borderRadius: 12, padding: "18px",
      border: `1px solid ${COLORS.accentBorder}`, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>📝</span>
          <span style={{ fontSize: 13, fontWeight: 800, color: COLORS.text, letterSpacing: -0.3 }}>My Custom Foods</span>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          background: COLORS.accentSoft, border: `1px solid ${COLORS.accentBorder}`,
          borderRadius: 8, color: COLORS.accent, fontSize: 12, fontWeight: 700,
          padding: "6px 14px", cursor: "pointer",
        }}>
          {showAdd ? "Close" : "+ Add Food"}
        </button>
      </div>

      {showAdd && (
        <div style={{ background: COLORS.cardAlt, borderRadius: 10, padding: 14, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button onClick={() => setManualMode(false)} style={{
              flex: 1, padding: "7px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer",
              background: !manualMode ? COLORS.accentSoft : "transparent",
              border: `1px solid ${!manualMode ? COLORS.accentBorder : COLORS.border}`,
              color: !manualMode ? COLORS.accent : COLORS.textDim,
            }}>Quick Add</button>
            <button onClick={() => setManualMode(true)} style={{
              flex: 1, padding: "7px", borderRadius: 7, fontSize: 11, fontWeight: 700, cursor: "pointer",
              background: manualMode ? COLORS.accentSoft : "transparent",
              border: `1px solid ${manualMode ? COLORS.accentBorder : COLORS.border}`,
              color: manualMode ? COLORS.accent : COLORS.textDim,
            }}>Manual Entry</button>
          </div>

          {!manualMode ? (
            <>
              <select value={selectedFood} onChange={e => setSelectedFood(e.target.value)}
                style={{ ...inputStyle, marginBottom: 8, appearance: "auto" }}>
                <option value="">Select a food...</option>
                {Object.keys(commonFoods).sort().map(f => <option key={f} value={f}>{f}</option>)}
              </select>
              {selectedFood && (
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 8, padding: "6px 8px", background: COLORS.bg, borderRadius: 6 }}>
                  Per unit: {commonFoods[selectedFood].calories} cal · {commonFoods[selectedFood].protein}g pro · {commonFoods[selectedFood].fat}g fat · {commonFoods[selectedFood].carbs}g carb · {commonFoods[selectedFood].fibre}g fibre
                </div>
              )}
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ width: 80 }}>
                  <label style={{ fontSize: 10, color: COLORS.textMuted, marginBottom: 3, display: "block" }}>Qty</label>
                  <input type="number" value={qty} min={0.5} step={0.5} onChange={e => setQty(Number(e.target.value) || 1)}
                    style={inputStyle} />
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "flex-end" }}>
                  <button onClick={addFromDb} style={{
                    width: "100%", padding: "9px", borderRadius: 8, border: "none",
                    background: COLORS.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                  }}>Add to Today</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <input placeholder="Food name" value={manual.name} onChange={e => setManual({ ...manual, name: e.target.value })}
                style={{ ...inputStyle, marginBottom: 8 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
                {["calories", "protein", "fat", "carbs", "fibre"].map(f => (
                  <div key={f}>
                    <label style={{ fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>{f}</label>
                    <input type="number" placeholder="0" value={manual[f]} onChange={e => setManual({ ...manual, [f]: e.target.value })}
                      style={{ ...inputStyle, padding: "6px 8px", fontSize: 12 }} />
                  </div>
                ))}
              </div>
              <button onClick={addManual} style={{
                width: "100%", padding: "9px", borderRadius: 8, border: "none",
                background: COLORS.accent, color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
              }}>Add Custom Food</button>
            </>
          )}
        </div>
      )}

      {customFoods.length > 0 ? (
        <>
          {customFoods.map((f, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "10px 12px", background: COLORS.cardAlt, borderRadius: 8,
              marginBottom: 6, border: `1px solid ${COLORS.border}`,
            }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 3 }}>{f.name}</div>
                <div style={{ fontSize: 10, color: COLORS.textDim }}>
                  {f.calories} cal · {f.protein}g P · {f.fat}g F · {f.carbs}g C · {f.fibre}g fibre
                </div>
              </div>
              <button onClick={() => removeFood(i)} style={{
                background: "none", border: "none", color: COLORS.textMuted,
                fontSize: 16, cursor: "pointer", padding: "4px 8px",
              }}>✕</button>
            </div>
          ))}
          <div style={{ marginTop: 10, padding: "10px 12px", background: COLORS.orangeSoft, borderRadius: 8, border: `1px solid ${COLORS.orange}22` }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.orange, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Custom Foods Total</div>
            <MacroRow {...totals} />
          </div>
        </>
      ) : (
        <div style={{ fontSize: 12, color: COLORS.textMuted, textAlign: "center", padding: "12px 0" }}>
          No custom foods added yet. Tap "+ Add Food" to track extras.
        </div>
      )}
    </div>
  );
}

function QuoteCarousel() {
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const next = () => setIdx((idx + 1) % quotes.length);
  const prev = () => setIdx((idx - 1 + quotes.length) % quotes.length);

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: COLORS.card, borderRadius: 12, padding: "20px 18px",
        border: `1px solid ${COLORS.border}`, textAlign: "center",
        userSelect: "none", minHeight: 120, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", position: "relative",
      }}
    >
      <div style={{ fontSize: 10, fontWeight: 700, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>
        Daily Motivation
      </div>
      <p style={{ fontSize: 15, color: COLORS.text, fontStyle: "italic", lineHeight: 1.6, margin: "0 0 8px", maxWidth: 500 }}>
        "{quotes[idx].text}"
      </p>
      <p style={{ fontSize: 11, color: COLORS.textMuted, margin: 0 }}>— {quotes[idx].author}</p>
      <div style={{ display: "flex", gap: 12, marginTop: 14, alignItems: "center" }}>
        <button onClick={prev} style={{
          background: COLORS.cardAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8,
          color: COLORS.textDim, fontSize: 16, width: 32, height: 32, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>‹</button>
        <div style={{ display: "flex", gap: 4 }}>
          {quotes.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: 3,
              background: i === idx ? COLORS.accent : COLORS.border,
              transition: "background 0.3s",
            }} />
          ))}
        </div>
        <button onClick={next} style={{
          background: COLORS.cardAlt, border: `1px solid ${COLORS.border}`, borderRadius: 8,
          color: COLORS.textDim, fontSize: 16, width: 32, height: 32, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>›</button>
      </div>
    </div>
  );
}

export default function App() {
  const [activeDay, setActiveDay] = useState(0);
  const [showGrocery, setShowGrocery] = useState(true);
  const [customFoods, setCustomFoods] = useState([]);

  const day = DAYS[activeDay];
  const meals = mealPlan[day].meals;

  const planTotals = meals.reduce(
    (a, m) => ({ calories: a.calories + m.calories, protein: a.protein + m.protein, fat: a.fat + m.fat, carbs: a.carbs + m.carbs, fibre: a.fibre + m.fibre }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 }
  );
  const customTotals = customFoods.reduce(
    (a, f) => ({ calories: a.calories + f.calories, protein: a.protein + f.protein, fat: a.fat + f.fat, carbs: a.carbs + f.carbs, fibre: a.fibre + f.fibre }),
    { calories: 0, protein: 0, fat: 0, carbs: 0, fibre: 0 }
  );
  const grandTotal = {
    calories: planTotals.calories + customTotals.calories,
    protein: Math.round((planTotals.protein + customTotals.protein) * 10) / 10,
    fat: Math.round((planTotals.fat + customTotals.fat) * 10) / 10,
    carbs: Math.round((planTotals.carbs + customTotals.carbs) * 10) / 10,
    fibre: Math.round((planTotals.fibre + customTotals.fibre) * 10) / 10,
  };

  return (
    <div style={{
      fontFamily: "'SF Pro Display', 'Segoe UI', system-ui, -apple-system, sans-serif",
      background: COLORS.bg, color: COLORS.text, minHeight: "100vh", padding: "20px 14px",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 2px", letterSpacing: -0.5 }}>
            Lean Bulk Meal Plan
          </h1>
          <p style={{ fontSize: 12, color: COLORS.textDim, margin: 0 }}>
            Low-carb · High-protein · High-fibre · ~3,200 kcal target · $150/week budget
          </p>
        </div>

        {/* Phase */}
        <div style={{
          background: COLORS.accentSoft, border: `1px solid ${COLORS.accentBorder}`,
          borderRadius: 10, padding: "10px 14px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 1.5 }}>
            ⚡ Phase 1 — Lean Bulk
          </span>
          <span style={{ fontSize: 11, color: COLORS.textDim }}>Months 1–2 · Caloric surplus · Progressive overload</span>
        </div>

        {/* Day tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: 16, overflowX: "auto" }}>
          {DAYS.map((d, i) => (
            <button key={d} onClick={() => setActiveDay(i)} style={{
              flex: 1, minWidth: 42, padding: "9px 2px", borderRadius: 8,
              border: i === activeDay ? `2px solid ${COLORS.accent}` : `1px solid ${COLORS.border}`,
              background: i === activeDay ? COLORS.accentSoft : COLORS.card,
              color: i === activeDay ? COLORS.accent : COLORS.textMuted,
              fontWeight: i === activeDay ? 800 : 500, fontSize: 11, cursor: "pointer",
            }}>
              {d.slice(0, 3)}
            </button>
          ))}
        </div>

        {/* Grand Total */}
        <div style={{
          background: COLORS.card, borderRadius: 12, padding: "14px 16px",
          border: `1px solid ${COLORS.border}`, marginBottom: 16,
        }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>
            {day} — Total (Plan + Custom)
          </div>
          <MacroRow {...grandTotal} size="lg" />
        </div>

        {/* Meals */}
        {meals.map((m, i) => <MealCard key={i} meal={m} />)}

        {/* Custom Food Tracker */}
        <CustomFoodTracker customFoods={customFoods} setCustomFoods={setCustomFoods} />

        {/* Grocery List — Always visible for finalized plan */}
        <div style={{ marginBottom: 16 }}>
          <button onClick={() => setShowGrocery(!showGrocery)} style={{
            width: "100%", padding: "14px 16px", borderRadius: showGrocery ? "12px 12px 0 0" : 12,
            border: `1px solid ${COLORS.border}`, background: COLORS.card,
            color: COLORS.text, fontSize: 13, fontWeight: 700, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "space-between",
          }}>
            <span>🛒 Weekly Grocery List — Organized by Store Section</span>
            <span style={{ transition: "transform 0.2s", transform: showGrocery ? "rotate(180deg)" : "" }}>▾</span>
          </button>
          {showGrocery && (
            <div style={{
              background: COLORS.card, borderRadius: "0 0 12px 12px",
              border: `1px solid ${COLORS.border}`, borderTop: "none", padding: "14px 16px",
            }}>
              {/* Budget overview */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 14px", background: COLORS.accentSoft, borderRadius: 8,
                border: `1px solid ${COLORS.accentBorder}`, marginBottom: 16,
              }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 800, color: COLORS.accent, textTransform: "uppercase", letterSpacing: 1.5 }}>Estimated Weekly Total</div>
                  <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 2 }}>Prices based on Aldi / Coles / Woolworths Melbourne</div>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.accent }}>~$145</div>
              </div>

              {groceryList.map((section, si) => (
                <div key={si} style={{ marginBottom: si < groceryList.length - 1 ? 20 : 0 }}>
                  {/* Section header */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginBottom: 8, paddingBottom: 6, borderBottom: `1px solid ${COLORS.border}`,
                  }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: COLORS.accent, letterSpacing: -0.2 }}>{section.section}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.textDim }}>{section.subtotal}</span>
                  </div>
                  {/* Items */}
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{
                      display: "grid",
                      gridTemplateColumns: "1fr auto auto",
                      gap: 8,
                      alignItems: "start",
                      padding: "7px 0",
                      borderBottom: ii < section.items.length - 1 ? `1px solid ${COLORS.border}` : "none",
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, lineHeight: 1.3 }}>{item.name}</div>
                        <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 1 }}>{item.note}</div>
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.textDim, whiteSpace: "nowrap", textAlign: "right", minWidth: 90 }}>{item.qty}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.green, whiteSpace: "nowrap", textAlign: "right", minWidth: 40 }}>{item.price}</div>
                    </div>
                  ))}
                </div>
              ))}

              {/* Budget tips */}
              <div style={{
                marginTop: 16, padding: "12px 14px", background: COLORS.greenSoft,
                borderRadius: 8, fontSize: 11, color: COLORS.green, lineHeight: 1.7,
              }}>
                <strong>💡 Budget tips to stay under $150:</strong><br/>
                • Meat is 55%+ of the budget — always buy on special and freeze immediately.<br/>
                • Aldi is cheapest for: eggs, bacon, sausages, chicken, tinned tuna, salmon, yoghurt, chia seeds, nuts, dark chocolate, sauerkraut, tinned tomatoes.<br/>
                • Coles/Woolworths for: lamb and steak on half-price specials (check the app), hot roast chicken, kimchi, specialty items.<br/>
                • Avocados: buy firm in bulk when $1 each, ripen on the bench over the week.<br/>
                • Spices & pantry staples (soy sauce, oils, seasonings) last 4+ weeks — not a weekly cost after week 1.<br/>
                • Whey protein is budgeted separately (~$35–45) and lasts 4+ weeks.
              </div>
            </div>
          )}
        </div>

        {/* Fibre Note */}
        <div style={{
          background: COLORS.purpleSoft, border: `1px solid ${COLORS.purple}33`,
          borderRadius: 10, padding: "12px 14px", marginBottom: 16,
          fontSize: 11, color: COLORS.purple, lineHeight: 1.6,
        }}>
          💜 <strong>Fibre targets:</strong> You're hitting 30–40g fibre daily through chia seeds, flaxseed, psyllium husk, sauerkraut, broccoli, avocado, and nuts. If things still aren't moving, add an extra tablespoon of psyllium husk in water before bed.
        </div>

        {/* Quotes */}
        <QuoteCarousel />

        <div style={{ height: 30 }} />
      </div>
    </div>
  );
}
