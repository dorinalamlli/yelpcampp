const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', true);

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63c692febef692e1ad951cb7',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et leo eu ligula egestas vulputate pretium quis nunc. Nulla ac interdum ipsum. Maecenas vitae dignissim ligula.',
            price,
            geometry: {	
                type: "Point",	
                coordinates: [	
                    cities[random1000].longitude,	
                    cities[random1000].latitude,	
                ]	
            },
            images: [
                    {
                        url: 'https://res.cloudinary.com/ddaoxtb2e/image/upload/v1674042721/YelpCamp/oatijb50wx6v0dumgaqn.jpg',
                        filename: 'YelpCamp/oatijb50wx6v0dumgaqn',
                    },
                    {
                        url: 'https://res.cloudinary.com/ddaoxtb2e/image/upload/v1674042721/YelpCamp/auv5ogrmbooj6hy602pk.png',
                        filename: 'YelpCamp/auv5ogrmbooj6hy602pk',
                    }
            ]
        })

        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})