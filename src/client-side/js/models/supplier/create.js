import { uiAlertFailCreate, uiAlertSuccess, uiBlankVal } from "./ui.js";
import { capitalizeWord } from "../../utils/formatCapitalize.js";
import { previewLoadImg } from "../../utils/loadImg.js";
import { create } from "./services.js";
import { getSupplier1, getSupplierRef } from "./utils.js";

// supplier-create-name
$("button#btnCreateSupplier")
  .off("click")
  .on("click", function () {
    $("#supplier-create-failed").html("");
  });
// preview-image
const args = {
  inputImg: $("input#supplier-create-img"),
  sectionImg: $("#supplier-create-img-section"),
  previewImg: $("#supplier-create-img-preview"),
};
previewLoadImg(args);
// canceling image
$("#supplier-create-img-cancel")
  .off("click")
  .on("click", () => {
    $("#supplier-create-img").val("");
    $("#supplier-create-img-section").addClass("d-none");
  });
// Hapus event listener sebelumnya jika ada MCCCCCKKKKKKKK
// event create product
$("#supplier-create-submit")
  .off("click")
  .on("click", async () => {
    // get all value
    const supplierName = capitalizeWord(
      $("#supplier-create-name").val().trim()
    );
    const supplierInfo = $("#supplier-create-info").val();
    const supplierImg = document.getElementById("supplier-create-img").files;
    // action createSupplier
    const req = {
      supplierName,
      supplierInfo,
      supplierImg,
    };
    const { status, response } = await create(req);
    if (status) {
      await getSupplier1();
      await getSupplierRef();
      uiAlertSuccess(response);
      uiBlankVal();
      $("#supplierCreate").modal("hide");
    }
    if (!status) {
      uiAlertFailCreate(response);
      const modalBody = $("#supplier-create-modalBody").get(0);
      modalBody.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  });
