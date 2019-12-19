export const sampleColumns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
      id: 'population',
      label: 'Population',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'size',
      label: 'Size\u00a0(km\u00b2)',
      minWidth: 170,
      align: 'right',
      format: value => value.toLocaleString(),
    },
    {
      id: 'density',
      label: 'Density',
      minWidth: 170,
      align: 'right',
      format: value => value.toFixed(2),
    },
    { id: 'action', label: 'Action', minWidth: 170, align: 'center', },
  ];

  export const productColumns = [
    { id: 'name', label: 'Product', minWidth: 150 },
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'center',
    },
    {
      id: 'price',
      label: 'Price (Rupiah)',
      minWidth: 150,
      align: 'center',
      format: value => value.toLocaleString(),
    },
    {
      id: 'stock',
      label: 'Stock',
      minWidth: 150,
      align: 'center',
      format: value => value.toLocaleString(),
    },
    { id: 'category_name', label: 'Category', minWidth: 170, align: 'center' },
    { id: 'image', label: 'Image', minWidth: 170, align: 'center' },
    { id: 'action', label: 'Action', minWidth: 150, align: 'center' },
  ];

export const categoryColumns = [
    { id: 'category', label: 'Name', minWidth: 170 },
    { id: 'image', label: 'Image', minWidth: 360},
    { id: 'action', label: 'Action', minWidth: 170, align: 'center', },
];