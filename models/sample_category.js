
db.categories.insertMany([
   // Level 1
   { _id: "Fashion", path: null },
   // Level 2
   { _id: "Woman", path: ",Fashion," },
   { _id: "Men", path: ",Fashion," },
   { _id: "Shoe bag", path: ",Fashion," },
   { _id: "Sports_wear & Shoes", path: ",Fashion," },
   { _id: "Outdoor Clothing & Shoes", path: ",Fashion," },
   { _id: "Kids & Baby", path: ",Fashion," },
   { _id: "Watch", path: ",Fashion," },
   { _id: "Sunglasses", path: ",Fashion," },
   { _id: "Jewelry & Gems", path: ",Fashion," },
   { _id: "Accessories", path: ",Fashion," },
   // Level 3
   { _id: "Clothing", path: ",Fashion,Woman," },
   { _id: "Beach Wear", path: ",Fashion,Woman," },
   { _id: "Underwear", path: ",Fashion,Woman," },
   { _id: "Pyjamas", path: ",Fashion,Woman," },
   { _id: "Sportswear", path: ",Fashion,Woman," },
   { _id: "Big size", path: ",Fashion,Woman," },
   { _id: "Hijab Clothing", path: ",Fashion,Woman," },
   { _id: "Shoe", path: ",Fashion,Woman," },
   { _id: "Accessory", path: ",Fashion,Woman," },

   { _id: "Clothing", path: ",Fashion,Men," },
   { _id: "Underwear", path: ",Fashion,Men," },
   { _id: "Sportswear", path: ",Fashion,Men," },
   { _id: "Shoe", path: ",Fashion,Men," },

   { _id: "Women shoes", path: ",Fashion,Shoe bag," },
   { _id: "Men's shoes", path: ",Fashion,Shoe bag," },
   { _id: "Sneakers", path: ",Fashion,Shoe bag," },
   { _id: "Women handbags", path: ",Fashion,Shoe bag," },
   { _id: "Men's Bag", path: ",Fashion,Shoe bag," },
   { _id: "Suitcase & Suitcase", path: ",Fashion,Shoe bag," },
   { _id: "Girls Shoes", path: ",Fashion,Shoe bag," },
   { _id: "Boys Shoes", path: ",Fashion,Shoe bag," },
   { _id: "Baby shoes", path: ",Fashion,Shoe bag," },

   { _id: "Child", path: ",Fashion,Kids & Baby," },
   { _id: "Baby", path: ",Fashion,Kids & Baby," },
   
   { _id: "Male", path: ",Fashion,Watch" },
   { _id: "Woman", path: ",Fashion,Watch" },
   { _id: "Unisex", path: ",Fashion,Watch" },
   { _id: "Child", path: ",Fashion,Watch" },

   { _id: "Male", path: ",Fashion,Sunglasses" },
   { _id: "Woman", path: ",Fashion,Sunglasses" },
   { _id: "Unisex", path: ",Fashion,Sunglasses" },
   { _id: "Child", path: ",Fashion,Sunglasses" },

   { _id: "Woman", path: ",Fashion,Jewelry & Gems" },
   { _id: "Male", path: ",Fashion,Jewelry & Gems" },
   { _id: "Personalized Jewelry", path: ",Fashion,Jewelry & Gems" },
   { _id: "Gift Sets", path: ",Fashion,Jewelry & Gems" },

   // Level 4

   { _id: "Dress", path: ",Fashion,Woman,Clothing," },
   { _id: "T-shirts", path: ",Fashion,Woman,Clothing," },
   { _id: "Trousers", path: ",Fashion,Woman,Clothing," },
   { _id: "Blouse", path: ",Fashion,Woman,Clothing," },
   { _id: "Shorts", path: ",Fashion,Woman,Clothing," },
   { _id: "Tights", path: ",Fashion,Woman,Clothing," },
   { _id: "Skirt", path: ",Fashion,Woman,Clothing," },
   { _id: "Sweatshirt", path: ",Fashion,Woman,Clothing," },
   { _id: "Overalls", path: ",Fashion,Woman,Clothing," },

   { _id: "Slipper", path: ",Fashion,Woman,Shoe," },
   { _id: "Sandals", path: ",Fashion,Woman,Shoe," },
   { _id: "Heeled shoes", path: ",Fashion,Woman,Shoe," },
   { _id: "Sneakers", path: ",Fashion,Woman,Shoe," },
   { _id: "Flat shoes", path: ",Fashion,Woman,Shoe," },

   { _id: "T-shirts", path: ",Fashion,Men,Clothing," },
   { _id: "Shirt", path: ",Fashion,Men,Clothing," },
   { _id: "Trousers", path: ",Fashion,Men,Clothing," },
   { _id: "Shorts", path: ",Fashion,Men,Clothing," },
   { _id: "Sweatshirt", path: ",Fashion,Men,Clothing," },
   { _id: "Swim Shorts", path: ",Fashion,Men,Clothing," },

   { _id: "Sports Shoes & Sneakers", path: ",Fashion,Men,Shoe," },
   { _id: "Slipper", path: ",Fashion,Men,Shoe," },
   { _id: "Classic Shoes", path: ",Fashion,Men,Shoe," },
   { _id: "Casual Shoes", path: ",Fashion,Men,Shoe," },

   { _id: "Girl Child", path: ",Fashion,Kids & Baby,Child," },
   { _id: "Boy", path: ",Fashion,Kids & Baby,Child," },

   { _id: "Baby Girl", path: ",Fashion,Kids & Baby,Baby," },
   { _id: "Baby boy", path: ",Fashion,Kids & Baby,Baby," },
   

])


/*db.categories.insertMany( [
    { _id: "Books", path: null },
    { _id: "Programming", path: ",Books," },
    { _id: "Databases", path: ",Books,Programming," },
    { _id: "Languages", path: ",Books,Programming," },
    { _id: "MongoDB", path: ",Books,Programming,Databases," },
    { _id: "dbm", path: ",Books,Programming,Databases," }
 ] )

 db.categories.insertMany( [
    { _id: "electronics", path: null },
    { _id: "computers", path: ",electronics," },
    { _id: "laptops", path: ",electronics,computers," }
 ] )*/
db.categories.find({ path: /,electronics,/ })


//You can query to retrieve the whole tree, sorting by the field path:
db.categories.find().sort({ path: 1 })

//You can use regular expressions on the path field to find the descendants of Programming:
db.categories.find({ path: /,Programming,/ })

