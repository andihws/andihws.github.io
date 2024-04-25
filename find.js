const { MongoClient } = require('mongodb');

connURL = "mongodb+srv://yimingzhang2:12345@stocks.b0l1ehj.mongodb.net/?retryWrites=true&w=majority&appName=Stocks";

async function find(query, isTicker) {
    const client = new MongoClient(connURL);
    await client.connect();
    console.log('Connected to the database');
    const database = client.db("Stock");
    const collection = database.collection("PublicCompanies");
    if (isTicker) {
        const docs = collection.find({Ticker: query});

        if ((await collection.countDocuments({Ticker: query})) === 0) {
            console.log("No Companies Found");
        } else {
            for await (const doc of docs) {
                console.log('Company: ' + doc.Company);
                console.log('Ticker: ' + doc.Ticker);
                console.log('Price: ' + doc.Price);
            }
        }
    } else {
        const doc = await collection.findOne({Company: query});

        if ((await collection.countDocuments({Company: query})) === 0) {
            console.log("No Companies Found");
        } else {
            console.log('Company: ' + doc.Company);
            console.log('Ticker: ' + doc.Ticker);
            console.log('Price: ' + doc.Price);
        }
    }


    await client.close();

}

module.exports = {
    find,
};
