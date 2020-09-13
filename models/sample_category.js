db.categories.insertMany( [
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
 ] )
 db.categories.find( { path: /,electronics,/ } )


//You can query to retrieve the whole tree, sorting by the field path:
db.categories.find().sort( { path: 1 } )

//You can use regular expressions on the path field to find the descendants of Programming:
db.categories.find( { path: /,Programming,/ } )

