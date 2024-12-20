import {
  createProduct,
  deleteProductId,
  getProduct,
  getProductList,
  getProductPagination,
  getProductReport,
  getProductReport1,
  updateProduct,
} from "../../../../serverless-side/models/product/controller.js";
// 1.endpoint : api/product/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal, 3.offsetVal
// return all product with searchval, limitVal, offsetVal
export const getLimitOffset = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const product = await getProduct(payLoad);
    return { status: true, response: product };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2.endpoint : api/product/pagination
// method : GET
// payload : 1.searchVal, 2.limitVal
// return pagination with searchval, limitVal
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getProductPagination(payLoad);
    return { status: true, response: pagination };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint : api/product/
// method : POST
// payload : 1.productName, 2.productPriceBuy, 3.productPriceSell, 4.productInfo, 5.productCategoryId, 6.productSupplierId, 7.productImg, 8.imgBase64
// return : message success create
export const addProduct = async (req) => {
  try {
    const payLoad = {
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productInfo: req.productInfo,
      productCategoryId: req.productCategoryId,
      productSupplierId: req.productSupplierId,
      productImg: req.productImg,
    };
    const created = await createProduct(payLoad);
    return { status: true, response: created };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/product/:productid
// method : PUT
// payload : 1.productId, 2.productName, 3.productPriceBuy, 4.productPriceSell, 5.productCategoryId, 6.productSupplierId, 7.productInfo, 8.productImgVal, 9.productCancelImg
// return : message success update
export const update = async (req) => {
  try {
    const payLoad = {
      productId: req.productId,
      productName: req.productName,
      productPriceBuy: req.productPriceBuy,
      productPriceSell: req.productPriceSell,
      productCategoryId: req.productCategoryId,
      productSupplierId: req.productSupplierId,
      productInfo: req.productInfo,
      productImgVal: req.productImgVal,
      productCancelImg: req.productCancelImg,
    };
    const updated = await updateProduct(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint : api/proudct/:productid
// method : DELETE
// payload : productid, productname
// return :  message success deleted
export const deletedById = async (req) => {
  try {
    const payLoad = {
      productid: req.productid,
      productName: req.productName,
    };
    const deleted = await deleteProductId(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.enpoint : api/product/report-pdf
// method : GET
// payload : ""
// return : get all product
export const getPDF = async () => {
  try {
    const products = await getProductReport();
    return { status: true, response: products };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6.enpoint : api/product/report-csv
// method : GET
// payload : ""
// return : get all product
export const getCSV = async () => {
  try {
    const products = await getProductReport1();
    return { status: true, response: products };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7.endpoint : api/product/list
// method : GET
// payload : 1.searchVal
// return : product list
export const getList = async (req) => {
  try {
    const list = await getProductList(req);
    return { status: true, response: list };
  } catch (error) {
    return { status: false, response: error };
  }
};
