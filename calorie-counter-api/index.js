const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const foodDisplay = path.join(__dirname, 'data', 'Food_Display_Table.xlsx');
const foodsNeedingCondiments =  path.join(__dirname, 'data', 'Foods_Needing_Condiments_Table.xlsx');
const luCondimentFoodTable =  path.join(__dirname, 'data', 'lu_Condiment_Food_Table.xlsx');

const foodDisplayXLSX = XLSX.readFile(foodDisplay);
const foodsNeedingCondimentsXLSX = XLSX.readFile(foodsNeedingCondiments);
const luCondimentFoodTableXLSX = XLSX.readFile(luCondimentFoodTable);

const foodDisplayJSON = XLSX.utils.sheet_to_json(foodDisplayXLSX.Sheets[foodDisplayXLSX.SheetNames[0]]);
const foodsNeedingCondimentsJSON = XLSX.utils.sheet_to_json(foodsNeedingCondimentsXLSX.Sheets[foodsNeedingCondimentsXLSX.SheetNames[0]]);
const luCondimentFoodTableJSON = XLSX.utils.sheet_to_json(luCondimentFoodTableXLSX.Sheets[luCondimentFoodTableXLSX.SheetNames[0]]);

const exportDir = path.join(__dirname, 'exported');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir);
}

fs.writeFileSync(path.join(exportDir, 'foodDisplay.json'), JSON.stringify(foodDisplayJSON, null, 2));
fs.writeFileSync(path.join(exportDir, 'foodsNeedingCondiments.json'), JSON.stringify(foodsNeedingCondimentsJSON, null, 2));
fs.writeFileSync(path.join(exportDir, 'luCondimentFoodTable.json'), JSON.stringify(luCondimentFoodTableJSON, null, 2));

console.log('Arquivo convertido com sucesso para JSON.');
