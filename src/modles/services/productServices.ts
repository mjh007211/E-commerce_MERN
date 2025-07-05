import { productModel } from "../productModel";

export const fetchAllProduct = async () => {
  return await productModel.find();
};

export const seedInitialPorducts = async () => {
  const products = [
    {
      title: "Lenovo idealpad gaming 3",
      image: "image",
      price: 3400,
      stock: 10,
    },
  ];

  const existingPorducts = await fetchAllProduct();

  if (existingPorducts.length === 0) {
    productModel.insertMany(products);
  }
};
