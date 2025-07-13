import { productModel } from "../models/productModel";

export const fetchAllProduct = async () => {
  return await productModel.find();
};

export const seedInitialPorducts = async () => {
  try {
    const products = [
      {
        title: "Lenovo idealpad gaming 3",
        image:
          "https://cdn.supercommerce.io/etisal-store/uploads/lenovo-ideapad-gaming-3-intel-core-i5-11300h-8gb-ssd-256gb-rtx3050-4gb-156-fhd-120hz-win-11-shadow-black-etisal-1.jpg",
        price: 3400,
        stock: 10,
      },
    ];

    const existingPorducts = await fetchAllProduct();

    if (existingPorducts.length === 0) {
      productModel.insertMany(products);
    }
  } catch (err) {
    console.error("can't seed from database", err);
  }
};
