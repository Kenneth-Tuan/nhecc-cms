const fs = require("fs/promises");

const originFs = require("fs");
const { format } = require("@fast-csv/format");
const fileName = "output/csv/i18n.csv";
const csvFile = originFs.createWriteStream(fileName);

let obj = {};
let mergedObj = {};

const locales = ["en-us", "zh-hk", "zh-cn", "ja-jp", "es-es", "de-de"];

async function parseJson() {
  return new Promise(async (resolve, reject) => {
    for (let locale of locales) {
      try {
        const data = await fs.readFile(`./input/json/${locale}.json`, {
          encoding: "utf8",
        });
        obj = JSON.parse(data);
        retrive(obj, locale);
      } catch (err) {
        console.log(err);
      }
    }

    resolve();
  });
}

let keys = [];
function retrive(obj, locale) {
  for (const [key, value] of Object.entries(obj)) {
    keys.push(key);
    if (typeof value === "object") {
      retrive(value, locale);
    } else {
      const target = keys.join("/");
      console.log(`${key} is not a obj`, target);
      if (mergedObj[target]) {
        mergedObj[target][locale] = value;
      } else {
        mergedObj[target] = {};
        mergedObj[target][locale] = value;
      }
    }
    keys.pop();
  }
}

function writeCsv() {
  const stream = format({ headers: true });
  stream.pipe(csvFile);
  let output = {};
  for (let key in mergedObj) {
    const value = mergedObj[key];
    output["path"] = key;
    for (let _key in value) {
      output = {
        ...output,
        [_key]: value[_key],
      };
      console.log(output);
    }
    stream.write(output);
  }
  stream.end();
}

async function main() {
  await parseJson();
  writeCsv();
}

main();
