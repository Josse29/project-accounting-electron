import {
  createPersediaan,
  createPersediaan1,
  deletePersediaan,
  deletePersediaanAll,
  deletePersediaanProductId,
  getPersediaan,
  getPersediaanCategoryId,
  getPersediaanDate,
  getPersediaanDateCategoryId,
  getPersediaanDateProductId,
  getPersediaanDateSupplierId,
  getPersediaanGroupCategory,
  getPersediaanGroupProduct,
  getPersediaanGroupProduct1,
  getPersediaanGroupSupplier,
  getPersediaanPagination,
  getPersediaanPagination1,
  getPersediaanProductId,
  getPersediaanProductId1,
  getPersediaanReport,
  getPersediaanReport1,
  getPersediaanSumPrice,
  getPersediaanSumPriceCategory,
  getPersediaanSumPriceCategoryId,
  getPersediaanSumPriceDate,
  getPersediaanSumPriceDateCategoryId,
  getPersediaanSumPriceDateSupplierId,
  getPersediaanSumPriceSupplier,
  getPersediaanSumPriceSupplierId,
  getPersediaanSumQty,
  getPersediaanSumQtyDateProductId,
  getPersediaanSupplierId,
  updatePersediaan,
} from "../../../../serverless-side/models/persediaan/controller.js";

// 1. endpoint : api/persediaan/group-product
// methode = GET
// payload = 1.searchVal, 2.limitVal, 3.offsetVal
// return = array persediaan by group product with search, limit, offset
export const getGroupProduct = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const response = await getPersediaanGroupProduct(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint : api/persediaan/group-product-pagination
// methode = GET
// payload = 1.searchVal, 2.limitVal
// return = only row and page by persediaan by group product
export const getRowPage1 = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const response = await getPersediaanPagination1(req1);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3.endpoint : api/persediaan/v-2
// methode : POST
// payload = 1.PersediaanYMDVal, 2.PersediaanHMSVal, 3.PersediaanQtyVal, 4.PersediaanTotalVal, 5. PersediaanInfoVal, 6.PersediaanProductIdVal, 7.PersediaanPersonIdVal
// return = success message after create sales
export const addStock1 = async (req) => {
  try {
    const payLoad = {
      PersediaanYMDVal: req.formattedDDMY,
      PersediaanHMSVal: req.formattedHMS,
      PersediaanQtyVal: req.PersediaanQtyVal,
      PersediaanTotalVal: req.PersediaanTotalVal,
      PersediaanInfoVal: req.PersediaanInfoVal,
      PersediaanProductIdVal: req.PersediaanProductIdVal,
      PersediaanPersonIdVal: req.PersediaanPersonIdVal,
    };
    const response = await createPersediaan1(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint : api/persediaan/summary-price
// method : GET
// payload : ""
// return : summary price
export const getSumPrice = async () => {
  try {
    const sumPrice = await getPersediaanSumPrice();
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint : api/persediaan/:search/:limit/:offset
// method : GET
// payload : 1.searchVal, 2.limitVal,
// return : get all persediaan with search, limit, offset
export const getAll = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const stock = await getPersediaan(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. endpoint : api/persediaan/pagination
//  method : GET
// payload : 1.searchVal, 2.limitVal,
// return : get pagination
export const getPagination = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const pagination = await getPersediaanPagination(payLoad);
    return { status: true, response: pagination };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7. endpoint : api/persediaan/sum-qty/:productid:
// method : GET
//  payload : 1.productId
// return : sum qty by productid
export const getSumQty = async (productId) => {
  try {
    const sumQty = await getPersediaanSumQty(productId);
    return { status: true, response: sumQty };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8. endpoint : api/persediaan/:productid
// method : GET
// payload : 1.productId
// return : get all stock based on productid
export const getByProductId2 = async (productId) => {
  try {
    const stock = await getPersediaanProductId1(productId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 9. endpoint : api/persediaan/sum-price/:supplierid
// method :GET
// payload : 1.supplierId
//  return : sum price based supplierid
export const getSumPriceSupplierId = async (supplierId) => {
  try {
    const price = await getPersediaanSumPriceSupplierId(supplierId);
    return { status: true, response: price };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 10. endpoint : api/persediaan/:supplierid
// method : GET
// payload : 1.supplierid
// return : all persediaan by supplierid
export const getBySupplierId = async (supplierId) => {
  try {
    const stock = await getPersediaanSupplierId(supplierId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 11. endpoint : api/persediaan/sum-price/:categoryid
// method : GET
// payload : 1.categoryid
// return : sum price based categoryid
export const getSumPriceCategoryId = async (categoryId) => {
  try {
    const price = await getPersediaanSumPriceCategoryId(categoryId);
    return { status: true, response: price };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 12. endpoint : api/persediaan/:categoryid
// method : GET
// payload : 1.categoryid
// return all persediaan based categoryid
export const getByCategoryId = async (categoryId) => {
  try {
    const stock = await getPersediaanCategoryId(categoryId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 13. endpoint : api/persediaan/sum-price/:stard-date/:end-date
// method : GET
// payload : 1.startdate, 2.endate,
// return : summary of stock by date
export const getSumPriceDate = async (req) => {
  try {
    const payLoad = {
      startDate: req.startDate,
      endDate: req.endDate,
    };
    const summary = await getPersediaanSumPriceDate(payLoad);
    return { status: true, response: summary };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 14. endpoint : api/persediaan/:start-date/:end-date
// method : GET
// payload : 1.startdate, 2.enddate
// return : all of stock by date
export const getByDate = async (req) => {
  try {
    const payLoad = {
      startDate: req.startDate,
      endDate: req.endDate,
    };
    const stock = await getPersediaanDate(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 15. endpoint : api/persediaan/sum-qty/:start-date/:end-date/:product-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.productid
// return : summary of price from product id
export const getSumQtyDateProduct = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      productId: req.productId,
    };
    const stock = await getPersediaanSumQtyDateProductId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 16. endpoint : api/persediaan/:start-date/:end-date/:product-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.productId
//  return : get with date and productid
export const getByDateProductId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      productId: req.productId,
    };
    const stock = await getPersediaanDateProductId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 17. endpoint : api/persediaan/sum-price/:start-date/:end-date/:supplier-id
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.supplierId
// return : get summary with date and supplierId
export const getSumPriceDateSupplier = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      supplierId: req.supplierId,
    };
    const sumPrice = await getPersediaanSumPriceDateSupplierId(payLoad);
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 18 .endpoint : api/persediaan/:start-date/:end-date/:supplierid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.supplierId
// return : get with date and supplierId
export const getByDateSupplierId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      supplierId: req.supplierId,
    };
    const stock = await getPersediaanDateSupplierId(payLoad);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 19 .endpoint : api/persediaan/sum-price/:start-date/:end-date/:categoryid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.categoryid
// return : get with date and categoryid
export const getSumPriceDateCategory = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      categoryId: req.categoryId,
    };
    const sumPrice = await getPersediaanSumPriceDateCategoryId(payLoad);
    return { status: true, response: sumPrice };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 20 .endpoint : api/persediaan/:start-date/:end-date/:categoryid
// method : GET
// payload : 1.startdateVal, 2.endDateVal, 3.categoryid
// return : get with date and categoryid
export const getByDateCategoryId = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      categoryId: req.categoryId,
    };
    const sale = await getPersediaanDateCategoryId(payLoad);
    return { status: true, response: sale };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 21. endpoint : api/persediaan/
// method : POST
// payload : 1.valProductName, 2.valPersediaanDDMY, 3.valPersediaanHMS, 4.valPersediaanProductId, 5.valPersediaanQty, 6.valPersediaanTotalRp, 7.valPersediaanInfo,
// return : message succes after create
export const addStock = async (req) => {
  try {
    const payload = {
      valProductName: req.valProductName,
      valPersediaanDDMY: req.valPersediaanDDMY,
      valPersediaanHMS: req.valPersediaanHMS,
      valPersediaanProductId: req.valPersediaanProductId,
      valPersediaanQty: req.valPersediaanQty,
      valPersediaanTotalRp: req.valPersediaanTotalRp,
      valPersediaanInfo: req.valPersediaanInfo,
    };
    const msgCreate = await createPersediaan(payload);
    return { status: true, response: msgCreate };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 22. endpoint : api/persediaan/report-csv
// method : GET
// payload : ""
// return all stock
export const getCSV = async () => {
  try {
    const stock = await getPersediaanReport();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 23. endpoint : api/persediaan/group-category
// method : GET
// payload : ""
// return all stock with group category
export const getByGroupCategory = async () => {
  try {
    const stock = await getPersediaanGroupCategory();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 24. endpoint : api/persediaan/sum-price/category
// method : GET
// payload : ""
// return : summary of category
export const getSumPriceCategory = async () => {
  try {
    const summary = await getPersediaanSumPriceCategory();
    return { status: true, response: summary };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 25. endpoint : api/persediaan/group-product
// method : GET
// payload : ""
// return :  all stock with group product
export const getByGroupProduct1 = async () => {
  try {
    const stock = await getPersediaanGroupProduct1();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 26.endpoint : api/persediaan/report-pdf
// method : GET
// payload : ""
// return : all stock as pdf report
export const getPDF = async () => {
  try {
    const stock = await getPersediaanReport1();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 27. endpoint : api/persediaan/group-supplier
// method : GET
// payload : ""
// return : all stock with group supplier
export const getByGroupSupplier = async () => {
  try {
    const stock = await getPersediaanGroupSupplier();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};

// 28. endpoint : api/persediaan/sum=price/supplier
// method : GET
// payLoad : ""
// return : summary of supplier
export const getSumPriceSupplier = async () => {
  try {
    const stock = await getPersediaanSumPriceSupplier();
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 29. endpoint : api/persediaan/:persediaanid
// method : DELETE
// payload : 1.valPersediaanId, 2.valProductName, 3.valPersediaanQty, 4.valPersediaanProductId
// return : message with delete by id
export const deleteById = async (req) => {
  try {
    const payLoad = {
      valPersediaanId: req.valPersediaanId,
      valProductName: req.valProductName,
      valPersediaanQty: req.valPersediaanQty,
      valPersediaanProductId: req.valPersediaanProductId,
    };
    const deleted = await deletePersediaan(payLoad);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 30. endpoint : api/persediaan/
// method : DELETE
// payload : ""
// return : message with delete all
export const deleteAll = async () => {
  try {
    const deleted = await deletePersediaanAll();
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 31. endpoint : api/persediaan/:persediaanid
// method : PATCH
// payload : 1.valPersediaanId, 2.valPersediaanDDMY, 3.valPersediaanHMS, 4.valPersediaanProductId, 5.valPersediaanQty, 6.valPersediaanTotalRp, 7.valPersediaanInfo, 8.valProductName
// return : message with update all
export const updateId = async (req) => {
  try {
    const payLoad = {
      valPersediaanId: req.valPersediaanId,
      valPersediaanDDMY: req.valPersediaanDDMY,
      valPersediaanHMS: req.valPersediaanHMS,
      valPersediaanProductId: req.valPersediaanProductId,
      valPersediaanQty: req.valPersediaanQty,
      valPersediaanTotalRp: req.valPersediaanTotalRp,
      valPersediaanInfo: req.valPersediaanInfo,
      valProductName: req.valProductName,
    };
    const updated = await updatePersediaan(payLoad);
    return { status: true, response: updated };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 32. endpoint : api/persediaan/:productid
// method : DELETE
// payload : product id
// return : message with delete all
export const deleteByProductId = async (productId) => {
  try {
    const deleted = await deletePersediaanProductId(productId);
    return { status: true, response: deleted };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 33. endpoint : api/persediaan/:productid/v-1
// method : GET
// payload productid
// return :  all stock with productid
export const getByProductId1 = async (productId) => {
  try {
    const stock = await getPersediaanProductId(productId);
    return { status: true, response: stock };
  } catch (error) {
    return { status: false, response: error };
  }
};
