function createData1(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
  }

  function createData2(name, image, uri) {
    return { name, image, uri};
  }

  function createData3(id, name, description, price, stock, category, image, uri) {
    return { id, name, description, price, stock, category, image, uri};
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
    createData2('Utensils', 'utensils.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData2('Accessories', 'accessories.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData2('Groceries', 'groceries.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData2('Outfits', 'outfits.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData2('Toys', 'toys.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData2('Snacks', 'snacks.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
]

const prodData = [
    createData3(1,'Tumbler', 'for refilling drinks', 25000, 30, 'Utensils', 'tumbler.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData3(2,'Bracelet', 'for refilling drinks', 25000, 40, 'Accessories', 'tumbler.jpg','https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData3(3,'Cashew', 'for refilling drinks', 25000, 30, 'Groceries', 'cashew.jpg','https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData3(4,'Sandal', 'for refilling drinks', 150000, 30, 'Outfits', 'sandal.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData3(5,'Rubic', 'for refilling drinks', 25000, 30, 'Toys', 'rubic.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
    createData3(6,'Chicken Pickle', 'for refilling drinks', 90000, 400, 'Snacks', 'snacks.jpg', 'https://www.trzcacak.rs/myfile/detail/408-4082182_white-cream-tote-bag-png.png'),
]

export {Data, catData, prodData};