import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
export const uiTr = (rows) => {
  const YMD = formatWaktuIndo(rows.SalesYMD);
  const rupiahProduct = formatRupiah2(rows.ProductPriceJual);
  const rupiahTotal = formatRupiah2(rows.SalesProductRp);
  const tr = `<tr>
                    <td class="text-center text-truncate pe-3 align-content-center">
                      ${rows.SalesId}
                    </td>
                    <td class="text-truncate pe-3 align-content-center">
                      ${YMD}
                    </td>
                    <td class="text-truncate pe-3 align-content-center">${rows.SalesHMS}</td>
                    <td class="text-truncate pe-3 align-content-center text-capitalize">${rows.SalesPersonName}</td>
                    <td class="text-truncate pe-3 align-content-center text-capitalize">
                      ${rows.ProductName}
                    </td>
                    <td class="text-truncate pe-3 align-content-center">${rupiahProduct}</td>
                    <td class="text-truncate pe-3 align-content-center text-center">${rows.SalesProductQty}</td>
                    <td class="text-truncate pe-3 align-content-center">${rupiahTotal}</td>
                    <td class="text-truncate pe-3 align-content-center text-capitalize">
                      ${rows.SalesCustomerName}
                    </td>
                    <td class="text-truncate pe-3 align-content-center text-center">${rows.SalesStatus}</td>
                    <td class="text-truncate pe-3 align-content-center" style="width: 220px">
                      <div class="d-flex gap-1 justify-content-center align-items-center w-100 h-100">
                        <button class="btn btn-success">
                          <i class="fa-solid fa-eye fs-6"></i>
                        </button>
                        <button class="btn btn-primary">
                          <i class="fa-solid fa-pencil fs-6"></i>
                        </button>
                        <button class="btn btn-danger">
                          <i class="fa-solid fa-trash fs-6"></i>
                        </button>
                    </div>
                    </td>
                  </tr>`;
  return tr;
};
export const uiTrEmpty = (searchVal) => {
  let search = `sales empty....`;
  if (searchVal !== "") {
    search = `${searchVal} - not found`;
  }
  const tr = `<tr>
                  <td class="text-center fst-italic" colspan="11">${search}</td>
                </tr>`;
  return tr;
};
export const uiBtnPage = (i) => {
  const btn = `<button
                      type="button"
                      class="btn sales-page border border-2 fs-5 ${
                        i === 1 ? "sales-active-page" : ""
                      }">
                        ${i}
                   </button>`;
  return btn;
};
export const uiBtnPageActive = (pageNumber) => {
  const btnPage = $("button.sales-page");
  btnPage.removeClass("sales-active-page");
  btnPage.eq(pageNumber - 1).addClass("sales-active-page");
};
export const uiSuccess = (res) => {
  let alert = `<div class="alert alert-success" role="alert">${res}</div>`;
  $("div#sales-success-container").html(alert);
  setInterval(() => {
    $("div#sales-success-container").html(``);
  }, 20000);
};
export const uiReset = () => {
  // summary
  $("div#summary").html(``);
  // limit-search
  $("div#sales-limit-search").removeClass("d-none");
  // input date
  $("div#sales-date").removeClass("d-none");
  // select option
  $("select#sales-read-productid").val("Choose One Of Products");
  $("select#sales-read-personid").val("Choose One Of Sales");
  $("select#sales-read-customerid").val("Choose One Of Customers");
  $("div#sales-select").removeClass("d-none");
  // select with date
  $("div#sales-select-date").addClass("d-none");
};
