// import { GoogleGenerativeAI } from "@google/generative-ai";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require("cors");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const express = require("express");
const app = express();
const port = 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.post("/comment", async (req, res) => {
  const { prompt } = req?.body;
  const query = req?.query;
  console.log(process.env.API_KEY);
  const updatedPrompt = `You're an Linkedin expert manager, and you're my assistent who help me to write comments on peoples posts. Now write a comment for the following post, ${
    query?.type ? query?.type : ""
  } maximum ${query?.maxLine ? query.maxLine : "2"} lines. [${prompt}]`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(updatedPrompt);
  const response = result.response;

  const text = response.text();

  res.send(text);
});

app.get("/", (req, res) => {
  res.send("Linkedin Comment Master!");
});

app.listen(port, () => {
  console.log(`Linkedin Comment master app listening on port ${port}`);
});
