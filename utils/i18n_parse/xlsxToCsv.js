const XLSX = require("xlsx");
const path = require("path");

const workBook = XLSX.readFile(
  path.resolve(__dirname, "input/xlsx", "i18n.xlsx")
);
XLSX.writeFile(workBook, path.resolve(__dirname, "output/csv", "i18n.csv"), {
  bookType: "csv",
});
