import { formatRupiah2 } from "../../utils/formatPrice.js";
import { timeIndonesian } from "../../utils/formatTime.js";
// UI tr Product from dbsqlite
export const uiTbody = (response) => {
  let tr = "";
  response.forEach((el) => {
    const productId = parseInt(el.ProductId);
    const productName = el.ProductName;
    const productBuy = parseFloat(el.ProductPriceBeli);
    const productSell = parseFloat(el.ProductPriceJual);
    const productInfo = el.ProductInfo;
    const productImg = el.ProductImage;
    const categoryId = el.CategoryId;
    const categoryName = el.CategoryName;
    const supplierId = parseInt(el.SupplierId);
    const supplierName = el.SupplierName;
    const priceBuy = formatRupiah2(productBuy);
    const priceSell = formatRupiah2(productSell);
    const supplierNameTxt = supplierName === null ? " - " : supplierName;
    const categoryNameTxt = categoryName === null ? " - " : categoryName;
    tr += `
    <tr
      data-productid="${productId}"
      data-productname="${productName}"
      data-productpricebeli=${productBuy}
      data-productpricejual=${productSell}
      data-productketerangan="${productInfo}"
      data-productimage="${productImg}"
      data-productcategoryid=${categoryId}
      data-productcategoryname="${categoryName}"
      data-productsupplierid=${supplierId}
      data-productsuppliername="${supplierName}"
    >
      <td class="text-center align-content-center text-truncate pe-2">
        ${productId}
      </td>
      <td class="align-content-center text-capitalize text-truncate pe-3">
        ${productName}
      </td>
      <td class="align-content-center text-truncate pe-3">${priceBuy}</td>
      <td class="align-content-center text-truncate pe-3">${priceSell}</td>
      <td class="align-content-center text-capitalize text-truncate pe-3">
        ${categoryNameTxt}
      </td>
      <td class="align-content-center text-capitalize text-truncate pe-3">
        ${supplierNameTxt}
      </td>
      <td class="align-content-center">
        <div class="d-flex justify-content-center gap-2">
          <button
            id="productDetailBtn"
            class="btn btn-success text-white"
            data-bs-toggle="modal"
            data-bs-target="#productDetailModal"
          >
            <i
              class="fa-solid fa-eye"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>See-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            id="editProduct"
            class="btn btn-primary text-white"
            data-bs-toggle="modal"
            data-bs-target="#editProductModal"
          >
            <i
              class="fa-solid fa-pencil"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Update-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
          <button
            id="deleteProduct"
            class="btn btn-danger text-white"
            data-bs-toggle="modal"
            data-bs-target="#confirmDeleteProductModal"
          >
            <i
              class="fa-solid fa-trash-can"
              data-bs-toggle="tooltip"
              data-bs-html="true"
              data-bs-title="<span>Delete-${productName}</span>"
              data-bs-placement="bottom"
            ></i>
          </button>
        </div>
      </td>
    </tr>`;
  });
  $("#product-table").html(tr);
};
// when total product row 0 being seaching
export const uiTBodyEmpty = (searchVal) => {
  let search = `Product Empty....`;
  if (searchVal !== "") {
    search = `Product - ${searchVal} Not found...`;
  }
  const tr = `<tr>
                <td colspan="7" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
              </tr>`;
  $("#product-table").html(tr);
  $("#product-pagination").addClass("d-none");
};
export const uiTBodyLoad = () => {
  const tr = `<tr>
                <td colspan="7" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Loading....</td>
              </tr>`;
  $("#product-table").html(tr);
  $("#product-pagination").addClass("d-none");
};
// blank value after submit action
export const uiBlankVal = () => {
  $("#product-name").val("");
  $("#product-refcategory-create").val("");
  $("#product-refsupplier-create").val("");
  $("#product-keterangan").val("");
  $("#create-image-product").val("");
  $("#section-image").addClass("d-none");
  $("#product-price-beli").val("");
  $("#product-price-jual").val("");
};
// button pagination
export const uiBtnPage = (totalPage) => {
  let btn = "";
  for (let i = 1; i <= totalPage; i++) {
    const actived = i === 1 ? "product-active-page" : "";
    btn += `<button 
            type="button"
            class="product-btn-page ${actived}">
              ${i}
            </button>`;
  }
  $("#product-number-page").html(btn);
  $("#product-pagination").removeClass("d-none");
};
// Function to update active page button
export const uiBtnPageActive = (numberPage) => {
  const btnPage = $("button.product-btn-page");
  btnPage.removeClass("product-active-page");
  btnPage.eq(numberPage - 1).addClass("product-active-page");
};
// make alert success after action crud
export const uiAlertSuccess = (res) => {
  const alertSuccessMe = `
    <div
      class="alert alert-success alert-dismissible fade show text-start"
      role="alert"
    >
      <strong class="text-capitalize">${res}</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
      ></button>
    </div>
  `;
  $("#sectionSuccessActionProduct").html(alertSuccessMe);
};
export const uiAlertFail = (res) => {
  const alert = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                    <strong class="text-capitalize">${res}</strong> 
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                 </div>`;
  $("#sectionSuccessActionProduct").html(alert);
};
export const uiAlertFailCreate = (res) => {
  const alert = `<div class="alert alert-danger" role="alert">
                  <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                </div>`;
  $("div#productCreateFailed").html(alert);
};
export const uiAlertFailUpdate = (res) => {
  const alertFail = `<div class="alert alert-danger fs-6" role="alert">
                      <i class="fa-solid fa-triangle-exclamation me-1"></i> ${res}
                    </div>`;
  $("#product-update-failed").html(alertFail);
};
export const uiPDF = (response) => {
  let tr = ``;
  let no = 1;
  response.forEach((row) => {
    const productName = row.ProductName;
    const productImg = row.ProductImage;
    const productPriceBuy = formatRupiah2(row.ProductPriceBeli);
    const productPriceSell = formatRupiah2(row.ProductPriceJual);
    // const productInfo = row.ProductInfo !== "" ? row.ProductInfo : "-"; || if needed
    tr += `
      <tr>
        <td class="text-center text-nowrap align-content-center">${no++}</td>
        <td class="text-nowrap align-content-center">${productName}</td>
        <td class="text-nowrap align-content-center">${productPriceBuy}</td>
        <td class="text-nowrap align-content-center">${productPriceSell}</td>
        <td class="d-flex justify-content-center">
          ${
            productImg !== "null"
              ? `<img src="${productImg}" style="width: 200px" />`
              : `<p class="text-nowrap text-muted fst-italic mb-0">no img displayed....</p>`
          }
        </td>
      </tr>  
    `;
  });
  const { indonesiaDDMY, indonesiaHour, indonesiaMinute, indonesiaSecond } =
    timeIndonesian();
  const html = `
  <div class="mb-3">
    <h3>Table Product</h3>
    <h6>${indonesiaDDMY}</h6>
    <div class="d-flex gap-1">
      <h6>${indonesiaHour} :</h6>
      <h6>${indonesiaMinute} :</h6>
      <h6>${indonesiaSecond}</h6>
    </div>
  </div>
  `;
  const html1 = `
  <div class="mb-3">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No</th>
          <th>Date</th>
          <th>Name</th>
          <th>Price</th>
          <th class="text-center">Image</th>
        </tr>
      </thead>
      <tbody>
        ${tr}
      </tbody>
    </table>
  </div>
  `;
  const html2 = `          
  <div class="d-flex justify-content-center">
    <div class="card my-2 w-100">
      <!--  cardheader -->
      <div
        class="card-header text-center text-white fs-3"
        style="background-color: #273eec">
        PT. ABC, T.bk
      </div>
      <!--  cardBody -->
      <div class="card-body">
        ${html}
        ${html1}
      </div>
    </div>
  </div>`;
  return html2;
};
