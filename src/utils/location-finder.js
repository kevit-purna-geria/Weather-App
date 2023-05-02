const request = require('request')

const geoCode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +address + ".json?access_token=pk.eyJ1IjoicHVybmE0MTkiLCJhIjoiY2xoMDY5Yjd0MHEyaTNvcDR4azZicXF1bCJ9.NakadZXWKZsCnmGUaBB2jQ&limit=1"

    request({url, json :true}, (error, {body})=>{
        if(error){
            callback("Unable to connect...!", undefined)
        }else if(body.features.length ===0){
            callback("Unable to find location...!", undefined)
        }else{
            const features = body.features
            // Co-ordinates
            const cord = features[0].center
                
            //Longitude
            const longitude = cord[0]
            
            // Latitude
            latitude = cord[1]
            callback(undefined, {
                latitude : latitude,
                longitude : longitude,
                location : features[0].place_name
            })
        }
    })
    // console.log(url)
    
}

module.exports = geoCode
