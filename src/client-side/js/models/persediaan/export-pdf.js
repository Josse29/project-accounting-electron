import { getPDF } from "./services.js";
import { uiAlertFail1, uiAlertSuccess, uiPDF } from "./ui.js";
import {
  groupCategory,
  groupProduct,
  groupSupplier,
  sumPrice,
} from "./utils.js";

// actions
$("#persediaan-modal-convert-pdf #persediaan-convert-pdf")
  .off("click")
  .on("click", async () => {
    const startDateVal = $("input#persediaan-start-date-pdf").val();
    const endDateVal = $("input#persediaan-end-date-pdf").val();
    const req = { startDateVal, endDateVal };
    const { status, response } = await getPDF(req);
    if (status) {
      const existed = response.length >= 1;
      if (existed) {
        const sumPrice1 = await sumPrice(req);
        const groupProduct1 = await groupProduct(req);
        const groupSupplier1 = await groupSupplier(req);
        const groupCategory1 = await groupCategory(req);
        const htmlContent = uiPDF(
          response,
          sumPrice1,
          groupProduct1,
          groupSupplier1,
          groupCategory1
        );
        const filePath = await window.electronAPI.savePDF(htmlContent);
        if (filePath) {
          uiAlertSuccess(`File PDF Savded on ${filePath}`);
          $("#persediaan-modal-convert-pdf #failed").html(``);
          $("input#persediaan-start-date-pdf").val("");
          $("input#persediaan-end-date-pdf").val("");
          $("#persediaan-modal-convert-pdf").modal("hide");
        } else {
          console.error(filePath);
        }
      }
      if (!existed) {
        uiAlertFail1("uuppsss , sorry stock is still empty...");
      }
    }
    if (!status) {
      uiAlertFail1(response);
      throw new Error(response);
    }
  });
