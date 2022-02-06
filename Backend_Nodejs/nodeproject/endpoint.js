//getting the from a endpoint and displaying that data in ejs 
//for this we use request library

const myexpress= require('express')

const app = myexpress()

app.set('view engine','ejs')

const myrequest = require('request')
//importing request dependancy

const mybodyparser= require('body-parser')

app.use(mybodyparser.urlencoded({extended:false}))
app.use(mybodyparser.json())

app.get('/',(req,res)=>{
    myrequest('https://jsonplaceholder.typicode.com/albums',
    (error,response,body)=>{
         if(error) throw error
        //  console.log(response.statusCode)
        //  console.log(body)
          //res.send(body)
          res.render('m2e',{data:JSON.parse(body)})
    })

})

app.listen(3001)