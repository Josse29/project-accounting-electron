import { addSpace } from "../../utils/formatSpace.js";
import { formatWaktuIndo } from "../../utils/formatWaktu.js";

// ui tr inventory from db
export const uiTrPersediaan = (el) => {
  let PersediaanQty = ``;
  const formattedQty = addSpace(el.PersediaanQty);
  if (el.PersediaanQty >= 1) {
    PersediaanQty = `<span class="badge text-bg-success fs-6"> + ${el.PersediaanQty}</span>`;
  } else {
    PersediaanQty = `<span class="badge text-bg-danger fs-6">${formattedQty}</span>`;
  }
  return `<tr>
                <td class="align-content-center text-center">${
                  el.PersediaanId
                }</td>
                <td class="align-content-center">${formatWaktuIndo(
                  el.PersediaanDDMY
                )}</td>
                <td class="align-content-center">${el.PersediaanHMS}</td>
                <td class="align-content-center text-nowrap text-capitalize">${
                  el.ProductName
                }</td>
                <td class="align-content-center text-nowrap text-capitalize">${
                  el.CategoryName
                }</td>
                <td class="align-content-center text-nowrap text-capitalize">
                    ${el.SupplierName}
                </td>
                <td class="text-nowrap align-content-center">
                    Mr.JK
                </td>
                <td class="text-nowrap align-content-center text-center">
                    ${PersediaanQty}
                </td>
                <td>
                    <div class="d-flex w-100 justify-content-center gap-2">
                        <button id="persediaanDetail"
                                class="btn btn-success text-white"                      
                                data-bs-toggle="modal" 
                                data-bs-target="#persediaanDetailModal"
                                data-persediaanid=${el.PersediaanId}
                                data-persediaanprice=${el.PersediaanRp} 
                                data-productname="${el.ProductName}"
                                data-productprice=${el.ProductPrice} 
                                data-persediaanddmy="${el.PersediaanDDMY}" 
                                data-persediaanHMS="${el.PersediaanHMS}"
                                data-persediaanqty=${el.PersediaanQty}
                                data-persediaaninfo="${el.PersediaanInfo}">
                            <i class="fa-solid fa-eye"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>lihat-${
                                 el.ProductName
                               }</span>" 
                               data-bs-placement="bottom">
                            </i>
                        </button>
                        <button id="persediaan-update-btn"
                                class="btn btn-primary text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#persediaanUpdateModal"
                                data-persediaanid=${el.PersediaanId}
                                data-persediaanprice=${el.PersediaanRp}
                                data-productid=${el.ProductId} 
                                data-productname="${el.ProductName}"
                                data-productprice=${el.ProductPrice} 
                                data-persediaanddmy="${el.PersediaanDDMY}" 
                                data-persediaanHMS="${el.PersediaanHMS}"
                                data-persediaanqty=${el.PersediaanQty}
                                data-persediaaninfo="${el.PersediaanInfo}">
                            <i class="fa-solid fa-pencil"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>edit-${
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
                                data-productname="${el.ProductName}"
                                data-persediaanddmy="${el.PersediaanDDMY}" 
                                data-persediaanHMS="${el.PersediaanHMS}"
                                data-persediaanqty=${el.PersediaanQty}>
                            <i class="fa-solid fa-trash-can"
                               data-bs-toggle="tooltip" 
                               data-bs-html="true"
                               data-bs-title="<span>hapus-${
                                 el.ProductName
                               }</span>" 
                               data-bs-placement="bottom"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
};
// make alert success after action crud
export const uiSuccessActionPersediaan = (res) => {
  const alertSuccessMe = `<div class="alert alert-success" role="alert">
                              ${res}
                            </div>`;
  $("#sectionSuccessActionPersediaan").html(alertSuccessMe);
  $("#sectionFailedActionPersediaan").html("");
  setTimeout(() => {
    $("#sectionSuccessActionPersediaan").html("");
  }, 20000);
};
// make alert failed after action crud
export const uiFailedActionPersediaan = (res) => {
  const alertFailedMe = `<div class="alert alert-danger" role="alert">
                            <i class="fa-solid fa-triangle-exclamation me-1"></i>
                            ${res}
                          </div>`;
  $("#sectionFailedActionPersediaan").html(alertFailedMe);
};
// button pagination
export const uiBtnPersediaanPage = (i) => {
  return `<button type = "button" 
                  class="persediaan-btn-page ${
                    i === 1 ? "persediaan-active-page" : ""
                  }" >
                    ${i}
          </button>`;
};
// Function to update active page button
export const uiActivePageButton = (
  persediaanNoActivePage,
  persediaanBtnPage
) => {
  const persediaanBtnPageActive = document.getElementsByClassName(
    "persediaan-active-page"
  );
  if (persediaanBtnPageActive.length >= 1) {
    persediaanBtnPageActive[0].classList.remove("persediaan-active-page");
  }
  persediaanBtnPage[persediaanNoActivePage - 1].classList.add(
    "persediaan-active-page"
  );
};
// when total row 0 being seaching
export const uiTrZeroSearch = (searchVal) => {
  return `<tr>
              <td colspan="9" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">Persediaan ${searchVal} tidak ditemukan....</td>
            </tr>`;
};
// when total row 0 being seaching
export const uiTrZero = () => {
  return `<tr>
              <td colspan="9" class="text-center align-content-center px-3 fst-italic fw-bold text-capitalize" style="background-color:#f2f2f2">tidak ada persediaan....</td>
            </tr>`;
};
// blank value after submit action
export const uiBlankValue = () => {
  $("input#persediaan-refproduct-create-id").val("");
  $("input#persediaan-refproduct-create-name").val("");
  $("input#persediaan-create-qty").val(0);
  $("textarea#persediaan-create-info").val("");
};