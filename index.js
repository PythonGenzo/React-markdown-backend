// const express = require("express");
import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();

const PORT = process.env.PORT  || 5001;

const Data = [
    {
      "h1": " # h1",
      "h2":  " ## h2",
       "h3": " ## h3"
    }
];

app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("mongo is connected");
    return client;
}

const client = await createConnection();

app.get("/", function(req,res) {
    res.send(Data);
});

app.post("/" ,async function (req,res) {
    const Data = req.body;
    const result = await client.db("capstone").collection("Data").insertMany(Data);
    res.send(result);
});



app.listen(PORT, ()=> console.log(`App started in ${PORT}`));