import {
  getAll1,
  getByGroupCategory,
  getByGroupProduct1,
  getByGroupSupplier,
  getGroupProduct,
  getPagination,
  getRowPage1,
  getSumPrice,
  getSumPriceDate,
} from "./services.js";
import { handlePagination } from "./pagination.js";
import {
  uiBtnPageActive,
  uiBtnPageActive1,
  uiCard,
  uiCardEmpty,
  uiTbody,
  uiTbodyEmpty,
} from "./ui.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";
import { reinitTooltip } from "../../utils/updateUi.js";
import { handlePagination1 } from "./pagination-1.js";
import { uiQty } from "../../component/card/qty.js";
import { list } from "../../component/list/index.js";

// get paginaton , summary ,and by limit offset
export const getAll = async (data) => {
  // get all value
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: parseInt($("select#persediaan-limit").val()),
          offsetVal: 1,
        };
  // 1. get total page and row
  const { status, response } = await getPagination(req);
  if (status) {
    const { totalRow, totalPage } = response;
    // if it exist inventory
    const existed = totalRow >= 1;
    if (existed) {
      await get2();
      await get3(req);
      handlePagination(totalPage);
    }
    // if it doesn't exist inventory
    if (!existed) {
      uiTbodyEmpty(req.searchVal);
      $("#persediaan-detail-totalrp").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// get summary
export async function get2() {
  const { status, response } = await getSumPrice();
  if (status) {
    const txt = formatRupiah2(response);
    $("#persediaan-detail-totalrp").text(txt);
  }
  if (!status) {
    console.error(response);
  }
}
// get persediaan by limit offset
export async function get3(req) {
  const { status, response } = await getAll1(req);
  if (status) {
    console.log(response);
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
    reinitTooltip();
  }
  if (!status) {
    console.error(response);
  }
}
// get pagination by group product and all
export const getAll2 = async (data) => {
  // 1. get total page and row
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: 3,
          offsetVal: 1,
        };
  const { status, response } = await getRowPage1(req);
  if (status) {
    const { totalPage, totalRow } = response;
    if (totalRow >= 1) {
      await getPage1(req);
      handlePagination1(totalPage);
    }
    if (totalRow < 1) {
      uiCardEmpty(req.searchVal);
    }
  }
  if (!status) {
    console.error(response);
  }
};

// to pdf
// get by group product
export async function getPage1(req) {
  const stock = await getGroupProduct(req);
  const { status, response } = stock;
  if (status) {
    uiCard(response);
    // update qty to card menu as well as btn plus/min triggered
    uiQty();
    // update list cart menu as well as btn plus/min triggered
    list();
    // update active page
    uiBtnPageActive1(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
// sum-rp
export const sumPrice = async (req) => {
  const { status, response } = await getSumPriceDate(req);
  if (status) {
    const rupiah = formatRupiah2(response);
    return rupiah;
  }
  if (!status) {
    console.error(response);
  }
};
// persediaan by product
export async function groupProduct(req) {
  const { status, response } = await getByGroupProduct1(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
}
// persediaan by supplier
export const groupSupplier = async (req) => {
  const { status, response } = await getByGroupSupplier(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
};
export const groupCategory = async (req) => {
  const { status, response } = await getByGroupCategory(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
};
