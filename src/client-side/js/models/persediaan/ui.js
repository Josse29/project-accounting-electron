import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";
// ui tr inventory from db
export const uiTbody = (el) => {
  // qty
  const persediaanQty = el.PersediaanQty;
  const qtyTxt =
    persediaanQty >= 1 ? `+ ${persediaanQty}` : `- ${Math.abs(persediaanQty)}`;
  // rupiah
  const persediaanRp = el.ProductPriceBeli * persediaanQty;
  const rpTxt =
    persediaanRp >= 1
      ? `+ ${formatRupiah2(persediaanRp)}`
      : `- ${formatRupiah2(Math.abs(persediaanRp))}`;
  const tr = `<tr>
                  <td class="align-content-center text-center pe-3 text-truncate">${
                    el.PersediaanId
                  } </td>
                  <td class="align-content-center pe-3 text-truncate">${formatWaktuIndo(
                    el.PersediaanDDMY
                  )}</td>
                  <td class="align-content-center pe-3 text-truncate">${
                    el.PersediaanHMS
                  }</td>
                  <td class="align-content-center text-truncate text-capitalize pe-3">${
                    el.ProductName
                  }</td>
                  <td class="align-content-center text-truncate text-capitalize pe-3">${
                    el.CategoryName === null ? "-" : el.CategoryName
                  } </td>
                  <td class="align-content-center text-truncate text-capitalize pe-3">
                    ${el.SupplierName === null ? "-" : el.SupplierName}
                  </td>
                  <td class="text-truncate align-content-center text-center">
                    <span class="badge fs-6 text-truncate ${
                      persediaanQty >= 1 ? "text-bg-success" : "text-bg-danger"
                    }" style="max-width:100%">${qtyTxt}</span>
                  </td>
                  <td class="text-truncate align-content-center text-center">
                    <span class="badge fs-6 text-truncate ${
                      persediaanQty >= 1 ? "text-bg-success" : "text-bg-danger"
                    }"" style="max-width: 100%">${rpTxt}</span>
                  </td>
                  <td class="align-content-center">
                    <div class="d-flex w-100 justify-content-center gap-2">
                      <button id="persediaanDetail"
                        class="btn btn-success text-white"                      
                        data-bs-toggle="modal" 
                        data-bs-target="#persediaanDetailModal"
                        data-productname="${el.ProductName}"
                        data-productpricebuy=${el.ProductPriceBeli} 
                        data-persediaanddmy="${el.PersediaanDDMY}" 
                        data-persediaanHMS="${el.PersediaanHMS}"
                        data-persediaanrp=${el.PersediaanRp}
                        data-persediaanqty=${el.PersediaanQty}
                        data-persediaaninfo="${el.PersediaanInfo}">
                          <i class="fa-solid fa-eye"
                            data-bs-toggle="tooltip" 
                            data-bs-html="true"
                            data-bs-title="<span>See-${el.ProductName}</span>" 
                            data-bs-placement="bottom">
                          </i>
                      </button>
                      <button id="persediaan-update-btn"
                              class="btn btn-primary text-white"
                              data-bs-toggle="modal"
                              data-bs-target="#persediaanUpdateModal"
                              data-persediaanid=${el.PersediaanId}
                              data-persediaanddmy="${el.PersediaanDDMY}" 
                              data-persediaanHMS="${el.PersediaanHMS}"
                              data-persediaanqty=${el.PersediaanQty}
                              data-persediaaninfo="${el.PersediaanInfo}"
                              data-productid=${el.ProductId} 
                              data-productpricebuy=${el.ProductPriceBeli} 
                              data-productname="${el.ProductName}">
                          <i class="fa-solid fa-pencil"
                              data-bs-toggle="tooltip" 
                              data-bs-html="true"
                              data-bs-title="<span>Update-${
                                el.ProductName
                              }</span>" 
                              data-bs-placement="bottom">
                          </i>
                      </button>
                      <button id="persediaan-delete-btn"
                              class="btn btn-danger text-white"
                              data-bs-toggle="modal"
                              data-bs-target="#persediaanDeleteModal"
                              data-persediaanid=${el.PersediaanId}
                              data-persediaanddmy="${el.PersediaanDDMY}" 
                              data-persediaanHMS="${el.PersediaanHMS}"
                              data-persediaanqty=${el.PersediaanQty}
                              data-productid=${el.ProductId}
                              data-productname="${el.ProductName}">
                          <i class="fa-solid fa-trash-can"
                            data-bs-toggle="tooltip" 
                            data-bs-html="true"
                            data-bs-title="<span>Delete-${
                              el.ProductName
                            }</span>" 
                            data-bs-placement="bottom"></i>
                      </button>
                    </div>
                  </td>
              </tr>`;
  return tr;
};
// make alert success after action crud
export const uiAlertSuccess = (res) => {
  const alertSuccess = `<div class="alert alert-success alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#section-alert").html(alertSuccess);
};
export const uiAlertFail = (res) => {
  const alertFailedMe = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#section-alert").html(alertFailedMe);
};
export const uiAlertFailCreate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
  $("#sectionFailedActionPersediaan").html(alertFailed);
};
export const uiAlertFailUpdate = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start my-2" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-update-failed").html(alertFailed);
};
export const uiAlertFailDelete = (res) => {
  const alertFailed = `<div class="alert alert-danger alert-dismissible fade show text-start" role="alert">
                            <strong class="text-capitalize">${res}</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
  $("#persediaan-delete-failed").html(alertFailed);
};
// button pagination
export const uiBtnPage = (i) => {
  return `<button type = "button" 
                  class="persediaan-btn-page ${
                    i === 1 ? "persediaan-active-page" : ""
                  }" >
                    ${i}
          </button>`;
};
// Function to update active page button
export const uiBtnPageActive = (activePage) => {
  const btnPage = $("button.persediaan-btn-page");
  $(btnPage).removeClass("persediaan-active-page");
  $(btnPage)
    .eq(activePage - 1)
    .addClass("persediaan-active-page");
};
// when total row 0 being seaching
export const uiTbodyEmpty = (searchVal) => {
  let search = `Product Empty...`;
  if (searchVal !== "") {
    search = `${searchVal} Not Found ....`;
  }
  const html = `<tr>
              <td colspan="10" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">${search}</td>
            </tr>`;
  return html;
};
// blank value after submit action
export const uiBlankValue = () => {
  $("input#persediaan-refproduct-search-name").val("");
  $("input#persediaan-refproduct-create-id").val("");
  $("input#persediaan-refproduct-create-name").val("");
  $("input#persediaan-create-qty").val(0);
  $("textarea#persediaan-create-info").val("");
};
export const uiSumPersediaanDate = () => {
  $("#persediaanLimitSearch").addClass("d-none");
  $("#persediaanList").addClass("d-none");
};
export const uiInit = () => {
  $("input#persediaan-search").val("");
  $("#persediaanLimitSearch").removeClass("d-none");
  // reset all select
  $("select#persediaan-refproduct-search").val("Choose One Of Products");
  $("select#persediaan-refsupplier-search").val("Choose One Of Suppliers");
  $("select#persediaan-refcategory-search").val("Choose One Of Categories");
  $("#persediaanList").removeClass("d-none");
  //remove mode date
  $("div#persediaan-date-all-search").html(``);
  // remove mode summary
  $("div#persediaan-sum-section").html("");
};
// for - report
export const uiTrPDF = (rows, no) => {
  const totalQty = rows.PersediaanQty;
  const totalRp = rows.PersediaanRp;
  const totalQtyTxt =
    totalQty >= 1 ? `+ ${totalQty}` : `- ${Math.abs(totalQty)}`;
  const totalRpTxt =
    totalRp >= 1
      ? `+ ${formatRupiah2(totalRp)}`
      : `- ${formatRupiah2(Math.abs(totalRp))}`;
  const tr = `<tr>
                  <td class="text-center text-nowrap align-content-center">${no}</td>
                  <td class="text-nowrap align-content-center">${formatWaktuIndo(
                    rows.PersediaanDDMY
                  )}</td>
                  <td class="text-nowrap align-content-center">${
                    rows.PersediaanHMS
                  }</td>
                  <td class="text-nowrap align-content-center">${
                    rows.ProductName
                  }</td>
                  <td class="text-nowrap align-content-center">${formatRupiah2(
                    rows.HargaBeli
                  )}</td>
                  <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
                  <td class="text-nowrap align-content-center">${totalRpTxt}</td>
                </tr>`;
  return tr;
};
export const uiTrProductSum = (rows, no) => {
  const totalQty = rows.TotalQty;
  let totalQtyTxt = ``;
  if (totalQty === 0) {
    totalQtyTxt = `${totalQty}`;
  }
  if (totalQty >= 1) {
    totalQtyTxt = `+ ${totalQty}`;
  }
  if (totalQty < 0) {
    totalQtyTxt = `- ${Math.abs(totalQty)}`;
  }
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${
              rows.ProductName
            }</td>
            <td class="text-nowrap align-content-center">${formatRupiah2(
              rows.ProductPriceBeli
            )}</td>
            <td class="text-nowrap align-content-center">${totalQtyTxt}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrSupplierSum = (rows, no) => {
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  return `<tr>
            <td class="text-center text-nowrap align-content-center">${no}</td>
            <td class="text-nowrap align-content-center">${rows.SupplierName}</td>
            <td class="text-nowrap align-content-center">${totalRpTxt}</td>
          </tr>`;
};
export const uiTrCategorySum = (rows, no) => {
  // category name
  const categoryName = rows.CategoryName;
  // total rupiah
  const totalRp = rows.TotalRp;
  let totalRpTxt = ``;
  if (totalRp === 0) {
    totalRpTxt = `${formatRupiah2(totalRp)}`;
  }
  if (totalRp >= 1) {
    totalRpTxt = `+ ${formatRupiah2(totalRp)}`;
  }
  if (totalRp < 0) {
    totalRpTxt = `- ${formatRupiah2(Math.abs(totalRp))}`;
  }
  const html = `<tr>
                  <td class="text-center text-nowrap align-content-center">${no}</td>
                  <td class="text-nowrap align-content-center">${categoryName}</td>
                  <td class="text-nowrap align-content-center">${totalRpTxt}</td>
                </tr>`;
  return html;
};
