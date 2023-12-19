const fs = require("fs");
const path = require("path");
const { parse } = require("fast-csv");

let rows = [];

const locales = ["en-us", "zh-hk", "zh-cn", "ja-jp", "es-es", "de-de"];

fs.createReadStream(path.resolve(__dirname, "input/csv", "i18n.csv"))
  .pipe(parse({ headers: true }))
  .on("error", (error) => console.error(error))
  .on("data", (row) => {
    console.log(row);
    rows.push(row);
  })
  .on("end", (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
    writeJson();
  });

function writeJson() {
  for (let locale of locales) {
    try {
      const result = rows
        .map((row) => {
          return {
            path: row.path,
            value: row[locale],
          };
        })
        .reduce((acc, cur) => {
          const paths = cur.path.split("/");
          console.log(paths, cur.value);
          setObject(acc, paths, cur.value);
          // paths.forEach((path) => {});

          return acc;
        }, {});
      console.log(result);
      fs.writeFileSync(
        `output/json/${locale}.json`,
        JSON.stringify(result, null, 2)
      );
    } catch (error) {
      console.error(error);
    }
  }
}

function setObject(object, paths, value) {
  let prevObj = object;

  for (let i = 0; i < paths.length; i++) {
    if (i !== paths.length - 1) {
      if (!prevObj.hasOwnProperty(paths[i])) {
        prevObj[paths[i]] = {};
      }
      prevObj = prevObj[paths[i]];
    } else {
      prevObj[paths[i]] = value;
    }
  }
}
