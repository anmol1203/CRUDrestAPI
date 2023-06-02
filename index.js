const express = require("express")
const db = require("./connection")
const app = express()

require("./connection")

app.use(express.json()) 

//if we want to add our data.
app.post("/employee",(req,res)=>{
    const user = {name:req.body.fullName,email:req.body.email,phone:req.body.phone,city:req.body.city}
    let sql = "INSERT INTO `user` SET ?"
    db.query(sql,user,(err,result)=>{
        if(err)console.log(err)
        res.status(200).json(result)
    })
})

//if we want particular data.
app.get("/employee/:id",(req,res)=>{
    console.log("ID",req.params.id)
    let sql = "SELECT * FROM `user` WHERE id = "+req.params.id
    db.query(sql,(err,result)=>{
        if (err)console.log(err)
        res.status(200).json(result)
    })
})

//if we want complete data.
app.get("/employee",(req,res)=>{
    let sql = "SELECT * FROM `user`"
    db.query(sql,(err,result)=>{
        if(err)console.log(err)
        res.status(200).json(result)
    })
})

//if we want to delete
app.delete("/employee/:id",(req,res)=> {
    let sql = "DELETE FROM `user` WHERE id ="+req.params.id
    db.query(sql,(err,result)=>{
        if(err)console.log(err)
        res.status(200).json({msg:"User Deleted",result})
    })
})

//
app.put("/employee/:email",(req,res)=>{
let sql = `UPDATE user SET name = '${req.body.name}' Where email = '${req.params.email}'`
db.query(sql,(err,result)=>{
    if(err)console.log(err)
    else
res.status(200).json({msg:"Member Updated",result})
})
})

app.listen(3000,()=> console.log('server is running'))