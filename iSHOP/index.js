var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var app = express();
app.use(cors()); //cors() is used for handling blocking by browser machanism

app.use(express.urlencoded({ //this isused to gate the data from client side
    extended:true
}));

app.use(express.json());  //use to convert json format to put in database

var conStr = "mongodb://127.0.0.1:27017";

//CRUD API methods

app.get("/products",(req,res)=>{
    mongoClient.connect(conStr,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("amazon");
            database.collection("products").find({}).toArray((err,documents)=>{
                if(!err){
                    res.send(documents);
                    res.end();
                }
            })
        }
    })
});

app.post("/addproducts",(req,res)=>{
    var product = {
        "ProductId":parseInt(req.body.ProductId),
        "Name":req.body.Name,
        "Price":parseFloat(req.body.price),
        "Stock":(req.body.Stock=="true")?true:false,
        "Category":req.body.Category
    };
    mongoClient.connect(conStr,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("amazon");
            database.collection("products").insertOne(product,(err,result)=>{
               if(!err){
                console.log("Record Inserted");
                res.redirect("/products");
               } 
            })
        }
    })
});

app.put("/updateproduct/:id",(req,res)=>{
var id = parseInt(req.params.id);
var newProductDetails = {
    "Name": req.body.Name,
    "Price": parseFloat(req.body.Price),
    "Stock": (req.body.Stock=="true")?true:false,
    "Category": req.body.Category
};
mongoClient.connect(conStr,(err,clientObject)=>{
    if(!err){
        var database = clientObject.db("amazon");
        database.collection("products").updateOne({ProductId:id},{$set:{Name:newProductDetails.Name,Price:newProductDetails.Price,Stock:newProductDetails.Stock,Category:newProductDetails.Category}},(err,result)=>{
            if(!err){
                console.log("Record Updated..");
                res.redirect("/products");
            }
        })
    }
})
});

app.delete("/deleteproduct/:id",(req,res)=>{
    var id = parseInt(req.params.id);
    mongoClient.connect(conStr,(err,clientObject)=>{
        if(!err){
            var database = clientObject.db("amazon");
            database.collection("products").deleteOne({ProductId:id},(err,result)=>{
                if(!err){
                    console.log("Record Delete");
                    res.redirect("/products");
                }
            })
        }
    })
});

app.listen(5000);
console.log(`Server started : http://localhost:5000`);