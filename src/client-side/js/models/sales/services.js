import { getSaleCustomerIdDate } from "../../../../serverless-side/functions/sales.js";
import {
  createSales,
  getSale,
  getSaleCustomerId,
  getSaleDate,
  getSaleDateProductId,
  getSalePersonId,
  getSalePersonIdDate,
  getSaleProductId,
  getSaleRowPage,
  getSaleSum,
  getSaleSumCustomerId,
  getSaleSumCustomerIdDate,
  getSaleSumDate,
  getSaleSumDateProductId,
  getSaleSumPersonId,
  getSaleSumPersonIdDate,
  getSaleSumProductId,
} from "../../../../serverless-side/models/sales/function.js";
// 1. endpoint = /api/sale/
// method : POST
// payload  : 1.SalesYMDVal, 2.SalesHMSVal, 3.SalesProductIdVal, 4.SalesProductQtyVal, 5.SalesProductRpVal, 6.SalesPersonIdVal, 7.SalesCustomerIdVal, 8.SalesStatusVal,
// return : message success create sales
export const addSale = async (req) => {
  try {
    const payLoad = {
      SalesYMDVal: req.formattedDDMY,
      SalesHMSVal: req.formattedHMS,
      SalesProductIdVal: req.ProductId,
      SalesProductQtyVal: req.ProductQty,
      SalesProductRpVal: req.SalesProductRpVal,
      SalesPersonIdVal: req.SalesPersonIdVal,
      SalesCustomerIdVal: req.SalesCustomerIdVal,
      SalesStatusVal: "PAID",
    };
    const response = await createSales(payLoad);
    return { status: true, response };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 2. endpoint = /api/sale/sum
// method : GET
// payload  : ""
// return : summary of sales
export const getSum = async () => {
  try {
    const sum = await getSaleSum();
    return { status: true, response: sum };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 3. endpoint = /api/sale/pagination
// method : GET
// payload  : 1.searchVal, 2.limitVal
// return : total page and row
export const getRowPage = async (req) => {
  try {
    const payLoad = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
    };
    const rowPage = await getSaleRowPage(payLoad);
    return { status: true, response: rowPage };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 4. endpoint = /api/sale/:search/:limit/:offset
// method : GET
// payload  : 1.searchVal, 2.limitVal, 3.offsetVal
// return : total page and row
export const getLimitOffset = async (req) => {
  try {
    const req1 = {
      searchVal: req.searchVal,
      limitVal: req.limitVal,
      offsetVal: req.offsetVal,
    };
    const sales = await getSale(req1);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 5. endpoint = /api/sale/sum/:productid
// method : GET
// payload  : 1.productid
// return :  summary of sales by selected productid
export const getSumProductId = async (producId) => {
  try {
    const sum = await getSaleSumProductId(producId);
    return { status: true, response: sum };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 6. endpoint = /api/sale/:productid
// method : GET
// payload  : 1.productid
// return :  summary of sales by selected productid
export const getByProductId = async (productId) => {
  try {
    const sales = await getSaleProductId(productId);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 7. endpoint = /api/sale/sum/:personid
// method : GET
// payload  : 1.personid
// return :  summary of sales by selected salesperson
export const getSumPersonId = async (personId) => {
  try {
    const sum = await getSaleSumPersonId(personId);
    return { status: true, response: sum };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 8. endpoint = /api/sale/:personid
// method : GET
// payload  : 1.personid
// return :  sales by selected personid
export const getByPersonId = async (personId) => {
  try {
    const sales = await getSalePersonId(personId);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 9. endpoint = /api/sale/sum/:customerid
// method : GET
// payload  : 1.customerid
// return :  summary of sales by selected customerid
export const getSumCustomerId = async (customerId) => {
  try {
    const sum = await getSaleSumCustomerId(customerId);
    return { status: true, response: sum };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 10. endpoint = /api/sale/:customerid
// method : GET
// payload  : 1.customerid
// return :  sales by selected customerid
export const getByCustomerId = async (customerId) => {
  try {
    const sales = await getSaleCustomerId(customerId);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 11. endpoint = /api/sale/sum/:start-date/:end-date
// method : GET
// payload : 1.startDate, 2.endDate
// return summary sale with date
export const getSumDate = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const sales = await getSaleSumDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 12. endpoint : /api/sale/:start-date/:end-date
// method : GET
// payLoad = 1.startdate, 2.endate
// return : all sale with date
export const getByDate = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
    };
    const sales = await getSaleDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 13. endpoint : /api/sale/sum/:start-date/:end-date/:productid
// method : GET
// payLoad : 1.startdate, 2.endate, 3.producId
// return : summary-sales by productid and date
export const getSumByDateProduct = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedProductId: req.selectedProductId,
    };
    const sales = await getSaleSumDateProductId(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 14.endpoint : /api/sale/:start-date/:end-date/:productid
// method : GET
// payLoad : 1.startdate, 2.endate, 3.productId
// return : sales by productid and date
export const getByDateProduct = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedProductId: req.selectedProductId,
    };
    const sales = await getSaleDateProductId(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 15. endpoint : /api/sale/sum/:start-date/:end-date/:personid
// method : GET
// payLoad : 1.startdate, 2.endate, 3.personId
// return : sales summary by productid and date
export const getSumByDatePerson = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedPersonId: req.selectedPersonId,
    };
    const sales = await getSaleSumPersonIdDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 16.endpoint : /api/sale/:start-date/:end-date/:personid
// method : GET
// payLoad : 1.startdate, 2.endate, 3.personId
// return : sales by productid and date
export const getByDatePerson = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedPersonId: req.selectedPersonId,
    };
    const sales = await getSalePersonIdDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 17. endpoint : /api/sale/sum/:start-date/:end-ate/:customerid
//  method : GET
//  payload : 1.startdate, 2.endate, 3.customerid
//  return : sales summary by date and personid
export const getSumByDateCustomer = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedPersonId: req.selectedPersonId,
    };
    const sales = await getSaleSumCustomerIdDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
// 18. endpoint : /api/sale/:start-date/:end-date/:customerid
// method : GET
// payload : 1.startdate, 2.endate, 3.customerid
//  return : sales by date and personid
export const getByDateCustomer = async (req) => {
  try {
    const payLoad = {
      startDateVal: req.startDateVal,
      endDateVal: req.endDateVal,
      selectedPersonId: req.selectedPersonId,
    };
    const sales = await getSaleCustomerIdDate(payLoad);
    return { status: true, response: sales };
  } catch (error) {
    return { status: false, response: error };
  }
};
