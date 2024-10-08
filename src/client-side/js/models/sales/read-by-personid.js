import {
  getSalesPersonId,
  getSalesSumPersonId,
} from "../../../../serverless-side/functions/sales.js";
import { formatRupiah2 } from "../../utils/formatRupiah.js";
import { uiTr, uiTrEmpty } from "./ui.js";
import { listUserRefSalesRead } from "./../users/list.js";
import { animateFade } from "../../utils/updateUi.js";
listUserRefSalesRead();
$("select#sales-read-personid")
  .off("change")
  .on("change", async function () {
    try {
      // animate
      animateFade("#sales-card-body");
      const seletedPersonId = parseInt($(this).val());
      // name
      const selectedText = $(this).find("option:selected").text();
      // summary
      const summary = await getSalesSumPersonId(seletedPersonId);
      const summaryRp = formatRupiah2(summary);
      const ui = `<p class="fs-4 mb-1 fw-bold text-capitalize">${selectedText}</p>
                  <p class="fs-5 ms-1 mb-1">Total : ${summaryRp}</p> `;
      $("div#summary").html(ui);
      // tables
      const tableSales = await getSalesPersonId(seletedPersonId);
      const existed = tableSales.length >= 1;
      if (existed) {
        let table = ``;
        let index = 1;
        tableSales.forEach((rows) => {
          table += uiTr(rows);
          index++;
        });
        $("tbody#sales-read-table").html(table);
      }
      if (!existed) {
        const empty = uiTrEmpty(selectedText);
        $("tbody#sales-read-table").html(empty);
      }
      // references callback ui
      // 1.limit-search
      $("div#sales-limit-search").addClass("d-none");
      // 2.select-adjacent
      $("select#sales-read-productid").val("Choose One Of Products");
      $("select#sales-read-customerid").val("Choose One Of Customers");
      // 3.pagination
      $("div#sales-page-container").addClass("d-none");
    } catch (error) {
      console.error(error);
    }
  });
