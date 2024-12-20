import { getList } from "./services.js";

const categoryList = async () => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option selected disabled>Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        option += `<option value=${el.CategoryId}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
const categoryList1 = async (selected) => {
  const { status, response } = await getList("");
  if (status) {
    const existed = response.length >= 1;
    let option = `<option value="null">Choose One Of Categories</option>`;
    if (existed) {
      response.forEach((el) => {
        const isSelected =
          selected === parseInt(el.CategoryId) ? "selected" : "";
        option += `<option value=${el.CategoryId} ${isSelected}>${el.CategoryName}</option>`;
      });
    }
    if (!existed) {
      option += `<option disabled class="fst-italic text-center">Category Empty........</option>`;
    }
    return option;
  }
  if (!status) {
    console.error(response);
    throw new Error(response);
  }
};
// function to update when create list product ref categories
export const listCategoryRefProductCreate = async () => {
  const list = await categoryList();
  $("select#product-refcategory-create").html(list);
};
// function to update when update list product ref categories
export const listCategoryRefProductUpdate = async (selected) => {
  const list = await categoryList1(selected);
  $("select#product-refcategory-update").html(list);
};
export const listCategoryRefPersediaanRead = async () => {
  const list = await categoryList();
  $("select#persediaan-refcategory-search").html(list);
};
export const listCategoryRefPersediaanReadDate = async () => {
  const list = await categoryList();
  const option = `
  <select class="form-control w-auto mb-3" id="persediaan-date-category">
    ${list}
  </select>`;
  return option;
};
