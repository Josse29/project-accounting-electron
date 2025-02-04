import {
  queryDeleteCategory,
  queryGetCategory,
  queryGetListCategory,
  queryInsertCategory,
  queryTotalRowCategory,
  queryUpdateCategory,
} from "./querysql.js";
import { validateCategoryName } from "../../utils/validation.js";

// 1.CREATE
const createCategory = async (req) => {
  const { categoryName, categoryInfo } = req;
  // 1.validate name
  validateCategoryName(categoryName);
  // execute
  const query = queryInsertCategory(categoryName, categoryInfo);
  const msg = `Category <b class='text-capitalize'>${categoryName}</b> has been added`;
  const created = await window.electronAPI.sqliteApi.run(query, msg);
  return created;
};
// 2.READ
const getCategory = async (req) => {
  const { searchVal, limitVal, offsetVal } = req;
  const startOffsetVal = (offsetVal - 1) * limitVal;
  const query = queryGetCategory(searchVal, limitVal, startOffsetVal);
  const category = await window.electronAPI.sqliteApi.all(query);
  return category;
};
const getCategoryList = async (categorySearch) => {
  const query = queryGetListCategory(categorySearch);
  const category = await window.electronAPI.sqliteApi.all(query);
  return category;
};
const getCategoryInit = async (req) => {
  const { searchVal, limitVal } = req;
  const query = queryTotalRowCategory(searchVal);
  const totalPageRow = await window.electronAPI.sqliteApi.each(query, limitVal);
  return totalPageRow;
};
// 3.UPDATE
const updateCategory = async (req) => {
  const { categoryId, categoryName, categoryInfo } = req;
  // category name required
  validateCategoryName(categoryName);
  // execute
  const query = queryUpdateCategory(categoryId, categoryName, categoryInfo);
  const msg = `Category <b>${categoryName}</b> has been updated`;
  const updated = await window.electronAPI.sqliteApi.run(query, msg);
  return updated;
};
// 4.DELETE
const deleteCategory = async (req) => {
  const { categoryId, categoryName } = req;
  const query = queryDeleteCategory(categoryId);
  const msg = `Category <b class='text-capitalize'>${categoryName}</b> has been deleted`;
  const deleted = await window.electronAPI.sqliteApi.run(query, msg);
  return deleted;
};
export {
  createCategory,
  deleteCategory,
  getCategory,
  getCategoryInit,
  getCategoryList,
  updateCategory,
};
