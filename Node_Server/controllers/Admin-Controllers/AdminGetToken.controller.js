const express = require("express");
const Admin = require("../../models/admin.model");
const jwt = require("jsonwebtoken");

async function getToken(req, res) {
  jwt.verify(req.token, process.env.TOKEN1, async (err, authdata) => {
    if (err) {
      res.status(401).send({ result: "invalid token" });
    } else {
      try {
        const token = req.token;

        const admin = await Admin.findOne({
          tokens: req.token,
        });

        res.json({ cusername: admin.name });
      } catch (error) {
        res.json({ message: "Error" });
      }
    }
  });
}

module.exports = getToken;
