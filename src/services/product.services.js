const productModel = require("../model/products.model");

const getAllproducts = async () => {
  let products = await productModel.find();
  return products;
};

const createproduct = async (productBody) => {
  return productModel.create(productBody);
};

const getproductByIdSrv = async (userId) => {
  try {
    const product = await productModel.find({ _id: userId });

    return product;
  } catch (error) {
    console.log(
      "🚀 ~ file: product.service.js:18 ~ getproductById ~ error:",
      error
    );
  }
};

module.exports = {
  getAllproducts,
  createproduct,
  getproductByIdSrv,
};