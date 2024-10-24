import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { animateFade } from "../../utils/updateUi.js";
import { getByCustomerId, getSumCustomerId } from "./services.js";
import { uiTBody, uiTrEmpty } from "./ui.js";

$("select#sales-read-customerid")
  .off("change")
  .on("change", async function () {
    // animate
    animateFade("#sales-card-body");
    const seletedPersonId = parseInt($(this).val());
    const selectedText = $(this).find("option:selected").text();
    // sum
    const sum = await getSumCustomerId(seletedPersonId);
    const sumStatus = sum.status;
    const sumResponse = sum.response;
    if (sumStatus) {
      const rupiah = formatRupiah2(sumResponse);
      const p = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                   <p class="fs-5 ms-1 mb-1">Total : ${rupiah}</p> `;
      $("div#summary").html(p);
    }
    if (!sumStatus) {
      console.error(sumResponse);
    }
    // table
    const sales = await getByCustomerId(seletedPersonId);
    const status = sales.status;
    const response = sales.response;
    if (status) {
      console.log(response);
      const existed = response.length >= 1;
      console.log(existed);
      if (existed) {
        uiTBody(response);
      }
      if (!existed) {
        uiTrEmpty(selectedText);
      }
    }
    if (!status) {
      console.error(response);
    }
    // references ui
    // 1.limit-search
    $("div#sales-limit-search").addClass("d-none");
    // 2.select-adjacent
    $("select#sales-read-productid").val("Choose One Of Products");
    $("select#sales-read-personid").val("Choose One Of Sales");
    // 3.pagination
    $("div#sales-page-container").addClass("d-none");
  });
