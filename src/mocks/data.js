function createData1(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  function createData2(name, image) {
    return { name, image};
  }

  function createData3(name, description, price, stock, category, image) {
    return { name, description, price, stock, category, image};
  }
  
const Data = [
    createData1('India', 'IN', 1324171354, 3287263),
    createData1('China', 'CN', 1403500365, 9596961),
    createData1('Italy', 'IT', 60483973, 301340),
    createData1('United States', 'US', 327167434, 9833520),
    createData1('Canada', 'CA', 37602103, 9984670),
    createData1('Australia', 'AU', 25475400, 7692024),
    createData1('Germany', 'DE', 83019200, 357578),
    createData1('Ireland', 'IE', 4857000, 70273),
    createData1('Mexico', 'MX', 126577691, 1972550),
    createData1('Japan', 'JP', 126317000, 377973),
    createData1('France', 'FR', 67022000, 640679),
    createData1('United Kingdom', 'GB', 67545757, 242495),
    createData1('Russia', 'RU', 146793744, 17098246),
    createData1('Nigeria', 'NG', 200962417, 923768),
    createData1('Brazil', 'BR', 210147125, 8515767),
];

const catData = [
    createData2('Utensils', 'utensils.jpg'),
    createData2('Accessories', 'accessories.jpg'),
    createData2('Groceries', 'groceries.jpg'),
    createData2('Outfits', 'outfits.jpg'),
    createData2('Toys', 'toys.jpg'),
    createData2('Snacks', 'snacks.jpg'),
]

const prodData = [
    createData3('Tumbler', 'for refilling drinks', 25000, 30, 'Utensils', 'tumbler.jpg'),
    createData3('Bracelet', 'for refilling drinks', 25000, 40, 'Accessories', 'tumbler.jpg'),
    createData3('Cashew', 'for refilling drinks', 25000, 30, 'Groceries', 'cashew.jpg'),
    createData3('Sandal', 'for refilling drinks', 150000, 30, 'Outfits', 'sandal.jpg'),
    createData3('Rubic', 'for refilling drinks', 25000, 30, 'Toys', 'rubic.jpg'),
    createData3('Chicken Pickle', 'for refilling drinks', 90000, 400, 'Snacks', 'snacks.jpg'),
]

export {Data, catData, prodData};