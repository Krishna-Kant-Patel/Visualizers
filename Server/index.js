const mongoose = require('mongoose');
const express = require("express");
const cors = require("cors")

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());
connection()
async function connection()  {
    try {
        const connectionParams = {
            useNewUrlParser: true
        };
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/Visualization",
            connectionParams
        );
        console.log("connected to database.");
    } catch (error) {
        console.log("Not connected to database.", error);

    }
};


const schemas = new mongoose.Schema( {
    name: String
   
})

const Krishna = mongoose.model('VisualizationData', schemas);


app.get('/api/data', async (req, res) => {
    try {
        // Fetch data from MongoDB
        const data = await Krishna.find();
        
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});