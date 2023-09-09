//jshint esversion:6


const exp=require("express");
const request=require("request");
const app=exp();
const bp=require("body-parser");
const https=require("https");

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.get("/",function (req,res){
   res.sendFile(__dirname+"/signup.html")
});
app.post("/",function (req,res){
const first=req.body.first;
const second=req.body.second;
const email=req.body.email;
console.log(first,second,email);
const data ={
    members:[{
        email_address:email,
        status:"subscribed",
        merge_fields:{
            FNAME:first,
            LNAME:second
        }
    }]
};
const jsonData=JSON.stringify(data);
const url=" https://us21.api.mailchimp.com/3.0/lists/20541f5f8a";

const API = process.env.API_KEY

const options={
    method:"POST",
    auth:"Titan:"+ API
}
const request=https.request(url,options, function(response){
    if(response.statusCode===200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }
response.on("data", function(data) {
console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});
 app.post("/failure",function (req,res){
    res.redirect("/");
 });
app.listen(3000,function (){
    console.log("server is running on port 3000");
});
//key:946c7901e6ac3473a6f8e6518e8dc23c-us21
//id:20541f5f8a