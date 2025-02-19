import {
  queryDeleteProductId,
  queryGetProductCSV,
  queryGetProduct,
  queryGetProductListRefPersediaan,
  queryGetProductListRefSale,
  queryGetProductPDF,
  queryGetProductRefPersediaan,
  queryGetProductTotalRow,
  queryGetProductTotalRow1,
  queryInsertProduct,
  queryUpdateProduct,
} from "./querysql.js";

import {
  validateLoadImg,
  validatePrice,
  validateProductName,
} from "../../utils/validation.js";

// 1.CREATE
const createProduct = async (req) => {
  const {
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    productImg,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation and load image base64
  const imgBase64 = await validateLoadImg(productImg);
  // execute
  const query = queryInsertProduct(
    productName,
    productPriceBuy,
    productPriceSell,
    productInfo,
    productCategoryId,
    productSupplierId,
    imgBase64
  );
  const msg = `Product <b class='text-capitalize'>${productName}</b> has been added `;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
const getProductPagination = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetProductTotalRow(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getProductPagination1 = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryGetProductTotalRow1(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
const getProduct = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryGetProduct(searchVal, limitVal, startOffset);
  const products = await window.electronAPI.sqliteApi.all(query);
  return products;
};
const getProductRefPersediaan = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffset = (offsetVal - 1) * limitVal;
  const query = queryGetProductRefPersediaan(searchVal, limitVal, startOffset);
  const products = await window.electronAPI.sqliteApi.all(query);
  return products;
};
const getProductListRefPersediaan = async () => {
  const query = queryGetProductListRefPersediaan();
  const product = await window.electronAPI.sqliteApi.all(query);
  return product;
};
const getProductListRefSale = async () => {
  const query = queryGetProductListRefSale();
  const product = await window.electronAPI.sqliteApi.all(query);
  return product;
};
const getProductReport = async () => {
  const query = queryGetProductPDF();
  const product = await window.electronAPI.sqliteApi.all(query);
  return product;
};
const getProductReport1 = async () => {
  const query = queryGetProductCSV();
  const product = await window.electronAPI.sqliteApi.all(query);
  return product;
};
// 3.UPDATE
const updateProduct = async (req) => {
  const {
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productCategoryId,
    productSupplierId,
    productInfo,
    productImgVal,
    productCancelImg,
  } = req;
  // 1.validate name
  validateProductName(productName);
  // 2.validate price
  validatePrice(productPriceBuy, productPriceSell);
  // 3.Validation image
  const imgBase64 = await validateLoadImg(productImgVal);
  // execute
  const query = queryUpdateProduct(
    productId,
    productName,
    productPriceBuy,
    productPriceSell,
    productCategoryId,
    productSupplierId,
    productInfo,
    imgBase64,
    productCancelImg
  );
  const msg = `Product <b class='text-capitalize'>${productName}</b> has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
// 4.DELETE
const deleteProductId = async (req) => {
  const { productid, productName } = req;
  const query = queryDeleteProductId(productid);
  const msg = `Product <b class='text-capitalize'>${productName}</b> has been deleted`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};

export {
  createProduct,
  deleteProductId,
  getProduct,
  getProductListRefPersediaan,
  getProductListRefSale,
  getProductRefPersediaan,
  getProductPagination,
  getProductPagination1,
  getProductReport,
  getProductReport1,
  updateProduct,
};
