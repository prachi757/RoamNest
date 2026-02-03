const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const axios=require("axios");


const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust"

main().then(()=>{
    console.log("connected to DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB= async ()=>{
    await Listing.deleteMany({});
    const updatedData = [];
    for (let obj of initData.data) {
    const geoResponse = await axios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: obj.location,   
          format: "json",
          limit: 1
        },
        headers: {
          "User-Agent": "WanderLust-App"
        }
      }
    );

    if (!geoResponse.data.length) continue;

    const lat = parseFloat(geoResponse.data[0].lat);
    const lon = parseFloat(geoResponse.data[0].lon);

    updatedData.push({
      ...obj,
      owner: "696a2ad0f7c47b3b24b2609d",
      geometry: {
        type: "Point",
        coordinates: [lon, lat] 
      }
    });
  }

  await Listing.insertMany(updatedData);
    console.log("data was initialized");
}

initDB();