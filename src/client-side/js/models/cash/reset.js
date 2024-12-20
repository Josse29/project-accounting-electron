import { debounce } from "../../utils/debounce.js";
import { uiTbodyLoad } from "./ui.js";
import { getAll } from "./utils.js";

const handleBounce = debounce(() => {
  getAll();
}, 1000);

$("button#cash-read-reset")
  .off("click")
  .on("click", () => {
    $("div#cash-summary").html(``);
    $("div#cash-card #limit-search").removeClass("d-none");
    $("div#cash-pagination-container").removeClass("d-none");
    uiTbodyLoad();
    handleBounce();
  });
