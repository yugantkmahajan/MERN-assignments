
//fs means file system
// var fs=require('fs')

// fs.writeFileSync('myinfo.txt','hello i am from india')//location and text used to write in file
/****************************** */
//os module
//   var os= require('os')

//   console.log("Total memory: "+os.totalmem())    //total memory
//   console.log(os.version())
//   console.log(os.uptime())      //when system is switch on
//   console.log(os.tmpdir())
//   console.log(os.platform())
//   console.log(os.arch())
//   console.log(os.hostname())
/*************************************** */

//http module

//list of port numbers freely available on sever
//   8080,8081,8082,8083,6300,6900,8400,3000,3001,3002,etc 27017 is used by mongodb

// var http= require('http')

// http.createServer((req,resp)=>{
//     resp.write('i am on web page')
//     resp.end()
// }).listen(8081)
/*********************************************************** */

// var chalk= require('chalk')
// //  import chalk from 'chalk';
// console.log('hello');
// console.log(chalk.red('hello'))
// console.log(chalk.green('hello'))
// console.log(chalk.bgBlue('hello'))
/******************************************************************************************************** */

//Starting Express
const myexpress= require('express')
//whole express dependancy is pointed to myexpress

const app = myexpress()
//using the myexpress we created a object called app

const mybodyparser= require('body-parser')

app.use(mybodyparser.urlencoded({extended:false}))
app.use(mybodyparser.json())
//this lines for parsing data like it convert pain text data into js

app.set('view engine','ejs')
//ejs is set as the template engine
//sonce we have used a view folder in the project directory itself.
//the template engine will directly look into the view folder

app.get('/',(req,resp)=>{
     
    resp.render('index')
})

app.post('/mydata',(req,res)=>{
    console.log(req.body.email)
    console.log(req.body.password)
})

app.get('/users',(req,res)=>{
    var abc=[
        {name:"yugant", age:22},
        {name:"abhishek", age:22},
        {name:"akshay", age:22}

    ]
    var def="hey i am a statement"
    res.render('myabc',{mydata: abc,mystring:def})
})

app.get('/albums',(req,res)=>{

    res.send("hello i am album details")
})






app.listen(3000)//this is for only once
