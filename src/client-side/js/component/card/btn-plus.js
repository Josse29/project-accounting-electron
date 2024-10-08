import { disFormatRupiah1 } from "../../utils/formatRupiah.js";
import { list } from "../list/index.js";
import { getStorageCart, setStorageCart } from "./../../utils/localStorage.js";
import { uiQty } from "./qty.js";

$("div#product-refpersediaan-read")
  .off("click", "button#order-create-qty-plus")
  .on("click", "button#order-create-qty-plus", function () {
    // get from storage
    const cartArray = getStorageCart();
    // get all data
    const productId = $(this).data("productid");
    const productName = $(this).data("productname");
    const productStock = $(this).data("productstock");
    const productPriceSell = disFormatRupiah1($(this).data("productpricesell"));
    const productPriceBuy = disFormatRupiah1($(this).data("productpricebuy"));
    // find dom
    const productCard = $(`button[data-productid=${productId}]`).closest(
      ".card-body"
    );
    const btnPlus = productCard.find("button#order-create-qty-plus");
    const btnMin = productCard.find("button#order-create-qty-minus");
    // find index id
    const productIndex = cartArray.findIndex((e) => {
      return e.ProductId === productId;
    });
    // if it already exist in storage, justupdate qty++
    if (productIndex !== -1) {
      let cartProductI = cartArray[productIndex];
      // it enough from stock
      if (cartProductI.ProductQty < productStock) {
        cartProductI.ProductQty++;
        btnMin.removeClass("unsufficient");
      }
      // it exceed from stock
      if (cartProductI.ProductQty >= productStock) {
        btnPlus.addClass("unsufficient");
      }
    }
    // if it isn't already exist in storage, push to storage
    if (productIndex === -1) {
      const newObject = {
        ProductId: productId,
        ProductName: productName,
        ProductPriceBuy: productPriceBuy,
        ProductPriceSell: productPriceSell,
        ProductQty: 1,
      };
      // push to array
      cartArray.push(newObject);
      // sort array by name
      cartArray.sort((a, b) => a.ProductName.localeCompare(b.ProductName));
      btnMin.removeClass("unsufficient");
    }
    // save to storage
    setStorageCart(cartArray);
    // updating ui only qty
    uiQty();
    // updating list cart
    list();
  });
