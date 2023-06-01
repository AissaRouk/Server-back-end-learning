const cheerio = require("cheerio");
const request = require("request");
const axios = require("axios");
const fs = require("fs");
const puppeteer = require("puppeteer");
const { join } = require("path");

const link = "https://eparduotuve.iki.lt/chain/l/CvKfTzV4TN5U8BTMF1Hl";
// Array that'll save all the data in this ored
//  name: "Product 1", quantityType: "kg", quantity: 2.5, price: 10.99, discounted: true },
const products = [];

async function run() {
  try {
    let index = 0;
    const browser = await puppeteer.launch({
      headless: true,
    });
    let page = await browser.newPage();
    await page.goto(link);
    await page.waitForSelector("div.css-jpvoog");

    const sections = await page.$$("div.css-jpvoog");

    let listProduct = [];

    for (const section of sections) {
      const productInfo = await section.$eval(
        "p.css-lrnbrk",
        (p) => p.innerText
      );
      // console.log(productInfo);

      const regex = /^(.*), (\d+) (kg|g|ml|l|vnt)\.?$/i;

      const match = productInfo.match(regex);

      let product, name, quantity, quantityType;

      if (match) {
        name = match[1];
        quantity = parseInt(match[2]);
        quantityType = match[3];

        product = {
          name: name,
          quantity: quantity,
          quantityType: quantityType,
        };

        // output: "Kiaulienos faršas riebumas ne didesnis kaip 35%, PAGAMINTA IKI" 1 "kg"
      } else {
        name = productInfo;
        product = {
          name: name,
        };
      }

      //get the price from another component
      const price = await section.$eval(
        "span.chakra-text.css-0",
        (p) => p.innerText
      );
      product.price = price;

      console.log(JSON.stringify(product));

      listProduct.push(product);

      index++;
    }

    fs.writeFile("data.text", JSON.stringify(listProduct), () =>
      console.log("done")
    );

    await page.close();
    browser.close();
  } catch (e) {
    console.log("Error in run function: " + e);
  }
}

run();
