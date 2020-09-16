
db.categories.insertMany([
   { _id: "Fashion", path: null },
   { _id: "Woman", path: ",fashion," },
   { _id: "Men", path: ",fashion," },
   { _id: "Shoe Bag", path: ",fashion," },
   { _id: "ShoeBag", path: ",fashion," },
   { _id: "Sports Wear & Shoes", path: ",fashion," },
   { _id: "Outdoor Clothing & Shoes", path: ",fashion," },
   { _id: "Kids & Baby", path: ",fashion," },
   { _id: "Watch", path: ",fashion," },
   { _id: "Sunglasses", path: ",fashion," },
   { _id: "Jewelry & Gems", path: ",fashion," },
   { _id: "Accessories", path: ",fashion," }
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

