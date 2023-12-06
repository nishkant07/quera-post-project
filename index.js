const express=require("express");
const path=require("path");
const {v4:uuidv4}=require("uuid");
const methodeOverride=require("method-override");/////////////////
const app=express();
let port=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());////////gltiiiiiiiiiiiiwithout()()()()()()()()()()()()()
app.use(methodeOverride("_method"));//////////////////

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("server running");
});

let posts=[
    {
        id:uuidv4(),
        username: "@apanacollage",
        content:"this is my first constent"
    },
    {
        id:uuidv4(),
        username: "@nishkant",
        content:"learning practice is good for heath"
    },
    {
        id:uuidv4(),
        username: "@Ram",
        content:"all universe is god"
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("newpost.ejs");
});

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // let postt="";
    // for(post of posts){
    //     if(post.id==id){
    //        postt=post;
    //     }
    // }
    //2nd way to find post

    let post=posts.find((p)=>id==p.id);
    if(post){
    
    res.render("show.ejs",{post});
    }else{
        res.render("error.ejs");
    }
    

});


app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    let newcontent=req.body.content;
    post.content=newcontent;
    res.redirect("/posts");
    
});


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("edit.ejs",{post});
    
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.render("index.ejs",{posts});
})