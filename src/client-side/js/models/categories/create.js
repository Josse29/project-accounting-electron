import { create } from "./services.js";
import { executeRead, getCategoryRef } from "./utils.js";
import { uiAlertFailCreate, uiAlertSuccess, uiBlankVal } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";

$("button#btnCreateCategory")
  .off("click")
  .on("click", function () {
    $("#category-create-failed").html("");
  });
// Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
$("#category-submit")
  .off("click")
  .on("click", async () => {
    const categoryName = capitalizeWord($("#category-nama").val().trim());
    const categoryInfo = $("#category-keterangan").val();
    const req = {
      categoryName,
      categoryInfo,
    };
    const { status, response } = await create(req);
    if (status) {
      await executeRead();
      await getCategoryRef();
      uiAlertSuccess(response);
      uiBlankVal();
      $("#categoryModal").modal("hide");
    }
    if (!status) {
      console.error(response);
      uiAlertFailCreate(response);
      const modalBody = $("#category-create-modal-body").get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
