import {
  getByGroupSale,
  getLimitOffset,
  getRowPage,
  getSum,
  getSum1,
} from "./services.js";
import { formatRupiah2 } from "../../utils/formatPrice.js";
import { handlePagination } from "./pagination.js";
import { uiBtnPageActive, uiTbody, uiTbodyEmpty } from "./ui.js";

export const getAll = async (data) => {
  const req =
    data !== undefined
      ? {
          searchVal: data.searchVal,
          limitVal: data.limitVal,
          offsetVal: data.offsetVal,
        }
      : {
          searchVal: "",
          limitVal: 10,
          offsetVal: 1,
        };
  const { status, response } = await getRowPage(req);
  const { totalPage, totalRow } = response;
  if (status) {
    const existed = totalRow >= 1;
    if (existed) {
      await getSummary();
      await getPage(req);
      handlePagination(totalPage);
    }
    if (!existed) {
      uiTbodyEmpty(req.searchVal);
      $("div#sales-total-sum").text(`Rp 0.00,-`);
    }
  }
  if (!status) {
    console.error(response);
  }
};
// 2. get summary
export async function getSummary() {
  const { status, response } = await getSum();
  if (status) {
    const currency = formatRupiah2(response);
    $("div#sales-total-sum").text(currency);
  }
  if (!status) {
    console.error(response);
  }
}
// 3. get sales by limit and offset
export async function getPage(req) {
  const { status, response } = await getLimitOffset(req);
  if (status) {
    uiTbody(response);
    uiBtnPageActive(req.offsetVal);
  }
  if (!status) {
    console.error(response);
  }
}
export const getSalesGroup = async (req) => {
  const { status, response } = await getByGroupSale(req);
  if (status) {
    return response;
  }
  if (!status) {
    console.error(response);
  }
};
export const getTotal = async (req) => {
  const { status, response } = await getSum1(req);
  if (status) {
    const { totalQty, totalRp } = response;
    return {
      totalQty,
      totalRp,
    };
  }
  if (!status) {
    console.error(response);
  }
};
