/**
 * Repper Mail Server
 */

// Dependencies
 
const express = require("express");

// Application setup

const app = express(),
    PORT = process.env.PORT || 3000;

// Routes

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello, world!" });
});

// Listen

app.listen(PORT, () => {
    console.log(`Repper Mail server running on port ${PORT}`);
});
