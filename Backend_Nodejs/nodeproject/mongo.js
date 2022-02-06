//Starting Express
const myexpress= require('express')

//whole express dependancy is pointed to myexpress

const app = myexpress()
//using the myexpress we created a object called app

const mybodyparser= require('body-parser')

app.use(mybodyparser.urlencoded({extended:false}))
app.use(mybodyparser.json())

//if we use diff servers in one project like 3000 and 3002 then it gives cross policy then we use cors to activate it.
const cors = require('cors')

app.use(cors({
    origin: '*'    //'http://localhost:' or any website , now anyone can get the data
    //method: get   //we can restrict it also now we can only access the get methods 
}))

app.set('view engine','ejs')

const mongodriver = require('mongodb').MongoClient

const myserverlocation='mongodb://127.0.0.1:27017/'
const mydbname='tcs'
const mycollname='mytab'

//creating a connection with the mongodb database using the mongodb driver

mongodriver.connect(myserverlocation,{useNewUrlParser: true},(err, database)=>{
        
    if(err){
        console.log(err)
    }
    db=database.db(mydbname)//this is the database name store in db
    app.listen(3002)

})

app.get('/',(req,res)=>{
    res.send("succesfull connection")
})

//fetch the data from the mongodb server and dispay that in the browser
app.get('/getdata',cors(),(req,res)=>{

    db.collection(mycollname).find().toArray((err,result)=>{

        if(err) throw err
        res.send(result)
    })

})


//the user will pass the trainer name and we should get only the data from the database and 
//display it to the user in the browser
//using to rest methods
//1. using uri params

app.get('/getdata/:trainer',(req,res)=>{//you are receiving the data 
    //from the user as a URI parameter called as trainer

    const mytrainer= req.params['trainer']   
    //the value inside the uri parameter called trainer is stored inside
    //the local variable called mytrainer
    db.collection(mycollname).find({"trainer":mytrainer}).toArray((err,result)=>{

        if(err) throw err
        res.send(result)
    })

})
//2. using query parameters

app.get('/getit',(req,res)=>{//you are receiving the data 
    //from the user as a query parameter called as trainer

    const mytrainer= req.query.trainer   
    //the keyvalue inside the query parameter called trainer is stored inside
    //the local variable called mytrainer
    db.collection(mycollname).find({"trainer":mytrainer}).toArray((err,result)=>{

        if(err) throw err
        res.send(result)
    })

})

//post method - insert the data into the database

app.post('/postdata',(req,res)=>{
    // const mydata={
        
    //         "company": "trueElements",
    //         "location": "pune",
    //         "trainer": "akshay",
    //         "skillset": [
    //             "html",
    //             "css",
    //             "js"
    //         ],
    //         "salary": 30000,
    //         "age": 24
    // }

    db.collection(mycollname).insertOne(req.body,(err,result)=>{//we use req.body to post the user data
        if(err){
            // console.log(err)
            res.send(err)
        }
        else{
            res.send("data inserted successfully")
        }

    })
})
//3.update query
    
// app.put('/updatedata',(req,res)=>{

//     db.collection(mycollname).findOneAndUpdate(
//         {"trainer":"akshay"},
//         {$set: {"age":26}},
//         {upsert:true},
//         (err,result)=>{
//             if(err){
//                 console.log(err)
//             } 
//             else{
//                 res.send("data updated succefully")
//             }
//         }
//     )
// })
////////////////////////
app.put('/updatedata',(req,res)=>{

    db.collection(mycollname).findOneAndUpdate(
        {"trainer":req.body.trainer},
        {$set: {"age":req.body.age}},
        {upsert:true},//update function
        (err,result)=>{
            if(err){
                console.log(err)
            } 
            else{
                res.send("data updated succefully")
            }
        }
    )
})

//delete query

app.delete('/deletedata',(req,res)=>{
    db.collection(mycollname).findOneAndDelete({"trainer":req.body.trainer},(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.send("data deleted successfully")
        }
    })

})

/************************************** */
//pagination using limit method

app.get('/getdata2',cors(),(req,res)=>{

    db.collection(mycollname).find().limit(1).toArray((err,result)=>{//we can also use sort method like limit method sort(1 or -1)

        if(err) throw err
        res.send(result)
    })

})
//request body
app.post('/getdatareq',cors(),(req,res)=>{
    

    const mytrainer= req.body.trainer   
   
    db.collection(mycollname).find({"trainer":mytrainer}).toArray((err,result)=>{

        if(err) throw err
        res.send(result)
    })

})

//Data transfered to EJS
app.get('/mongotoejs',(req,res)=>{
db.collection(mycollname).find().toArray((err,result)=>{
    if(err) throw err
    //return result
    res.render('m2e',{data:JSON.stringify(result)})
})
//this json data and we are reading it in js
//so we have to use json.parse or json.stringify methode to convert
//console.log(myabc)
 //res.render('m2e',JSON.stringify({data:myabc}))
})