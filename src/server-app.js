const path = require('path')
const express = require('express')
//Parsers
const hbs = require('hbs')

// Utils
const geoCode = require('./utils/location-finder')
const forecast = require('./utils/forecast')

const app = express()

//Go a folder Up
const publicDirectory = path.join(__dirname , "../public")
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set("view engine", "hbs")
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Creates homepage from index.html in public
app.use(express.static(publicDirectory))


app.get("",(req,res)=>{
    res.render('index',{
        title :"weather App",
        name :"Purna"
    })
})

// help page
app.get("/about",(req,res)=>{
    res.render('about',{
        title :"weather App about",
        name :"Purna S."
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide the address!"
        })
    }

    geoCode(req.query.address, (error,{latitude, longitude,location}={})=>{
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error, forecastData)=>{
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast:forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"Please provide a search term"
        })
    }
    console.log(req.query.search)

    res.send({
        products :[]
    })
})

app.get('/about/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Purna',
        errormessage : "About Data Not Found"
    })
})

app.get('*',(req,res)=>{ 
    res.render('404',{
        title : '404',
        name : 'Purna',
        errormessage : "404 Page Not Found"
    })
})

// Assigning Port
app.listen(3000, ()=>{
    console.log("Server in up on port 3000")
})