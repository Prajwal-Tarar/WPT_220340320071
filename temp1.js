const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

let userdata={
    host:"localhost",
    user:"root",
    password:"cdac",
    database:"node1",
    port:3306,
}
const mysql=require('mysql2');
const con=mysql.createConnection(userdata);



const bodyParser = require('body-parser');
app.use(express.static('abc'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
//whether you want nested objects support  or not

app.get("/getbook",(req,resp)=>{
    let input=req.query.x;
    let output={bookfound:false,bookinfo:{bookid:4,bookname:"",price:000}}
    con.query('select * from book where bookid=?',[input],(error,res)=>{
        if(res.length>0){
            output.bookfound=true;
            output.bookinfo=res[0];
        }
        resp.send(output);
    });


    app.get("/getupdate",(req,resp)=>{
        let output=false;
        let input={bookid:req.query.bookid,bookname:req.query.bookname,price:req.query.price};
     con.query('update book set bookname=?,price=? where bookid=?',
     [input.bookname,input.price,input.bookid],(error,res1)=>{
            if(error){
                console.log("Error come");
            }
            else if(res1.affectedRows>0){
                output=true;
            }
            resp.send(output);
    });
});
app.listen(9090);
});

