const port = 8080;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const newspapers = [
  {
    name: "The Guardian",
    url: "https://www.theguardian.com/environment/climate-crisis",
  },
  {
    name: "The Times",
    url: "https://www.thetimes.co.uk/environment/climate-change",
  },
    {
      name: "The Telegraph",
      url: "https://www.telegraph.co.uk/environment/climate-change",
    },
];

const articles = [];

newspapers.forEach((newspaper) => {
  axios.get(newspaper.url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    $('a:contains("climate")', html).each(function () {
      const title = $(this).text();
      const url = $(this).attr("href");
      articles.push({
        title,
        url,
        source: newspaper.name,
      });
    });
  });
});

app.get("/", (req, res) => {
  res.json("welcome to the homepage");
});

app.get("/news", (req, res) => {
  res.json(articles);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
