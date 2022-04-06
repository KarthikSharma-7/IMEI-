const express = require("express");
const app = express();
const port = process.env.PORT || 7000;
app.use(express.json());
require("dotenv").config();

app.get("/", (req, res) => {
  res.send(200, "Welcome user...");
});

app.post("/", (req, res) => {
  const imei = req.body.imei;
  const n = imei.length;
  if (n > 16 || n < 14) {
    res.status(400).send("Invalid IMEI");
  }
  let s = 0;
  let i = n - 2;
  while (i >= 0) {
    let tNum = 2 * imei[i];
    if (tNum > 9) {
      while (tNum > 0) {
        let r = tNum % 10;
        s += r;
        tNum = tNum / 10;
      }
    } else {
      s += tNum;
    }
    i = i - 2;
  }
  if (s % 10 === 0) {
    res.status(400).send("Invalid IMEI number.....Kindly recheck it");
  } else {
    res.status(200).send("Valid IMEI");
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
