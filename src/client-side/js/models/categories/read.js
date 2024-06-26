import {
  getCategory,
  getTotalPageCategory,
  getTotalRowCategory,
} from "../../../../serverless-side/functions/categories.js";
import { reinitializeTooltips } from "../../utils/updateUi.js";
import {
  uiActivePageButton,
  uiBtnPage,
  uiTrCategory,
  uiTrZero,
  uiTrZeroSearch,
} from "./ui.js";
import { listCategoryRefProductCreate } from "./list.js";
$(document).ready(function () {
  let categoryTotalRow;
  let categoryTotalPage;
  let categoryBtnPage;
  let categoryCurrentPage = 1;
  let categorySearch = $("#category-search-input").val();
  let categoryLimit = $("#category-limit").val();
  function getCategoryPage(categoryPageNumber) {
    // function to only get product based on search, limit, page
    getCategory(
      categorySearch,
      categoryLimit,
      categoryPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrCategory(element);
          });
          $("#category-data").html(tr);
          uiActivePageButton(categoryPageNumber, categoryBtnPage);
          reinitializeTooltips();
        }
        // if failed
        if (!status) {
          console.error(response);
        }
      }
    );
    // get-detail-product event binding fuckkkkkkk 2 jam lebih
    $(document).on("click", "#categoryDetailBtn", function () {
      const category = this.dataset;
      $("#category-detail-label").text(category.categorynama);
      $("#category-detail-name").text(category.categorynama);
      $("#category-detail-info").text(category.categoryketerangan);
    });
  }
  function handlePagination(response) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= response; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    // Event listeners for pagination buttons
    categoryBtnPage = document.getElementsByClassName("category-btn-page");
    categoryTotalPage = response;
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", () => {
        getCategoryPage(1);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = categoryTotalPage;
        }
        getCategoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < categoryTotalPage; i++) {
      categoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getCategoryPage(pageNumber);
      });
    }
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > categoryTotalPage) {
          incrementPage = 1;
        }
        getCategoryPage(incrementPage);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", () => getCategoryPage(categoryTotalPage));

    // Initial page load
    getCategoryPage(categoryCurrentPage);
  }
  function getCategorySearch() {
    categorySearch = $("#category-search-input").val();
    getTotalRowCategory(categorySearch, (status, response) => {
      // if success get total row category
      if (status) {
        categoryTotalRow = response;
        $("#categories-total-row").html(categoryTotalRow);
        // if it exist category
        if (categoryTotalRow >= 1) {
          getTotalPageCategory(
            categorySearch,
            categoryLimit,
            (status, response) => {
              if (status) {
                categoryTotalPage = response;
                handlePagination(categoryTotalPage);
                $("#category-pagination").removeClass("d-none");
              }
              if (!status) {
                console.error(response);
              }
            }
          );
          $("#category-pagination").removeClass("d-none");
        }
        // if it doesn't exist category
        if (categoryTotalRow < 1) {
          $("#category-data").html(uiTrZeroSearch(categorySearch));
          $("#category-pagination").addClass("d-none");
        }
      }
      // if failed get total row category
      if (!status) {
        console.error(response);
      }
    });
  }
  // when limit change
  function getCategoryLimit() {
    categoryLimit = $("#category-limit").val();
    getTotalPageCategory(categorySearch, categoryLimit, (status, response) => {
      if (status) {
        categoryTotalPage = response;
        handlePagination(categoryTotalPage);
        $("#category-pagination").removeClass("d-none");
      }
      if (!status) {
        console.error(response);
      }
    });
  }
  // init & get total row
  getTotalRowCategory(categorySearch, (status, response) => {
    // if success get total row category
    if (status) {
      categoryTotalRow = response;
      $("#categories-total-row").html(categoryTotalRow);
      // if it exist category
      if (categoryTotalRow >= 1) {
        getTotalPageCategory(
          categorySearch,
          categoryLimit,
          (status, response) => {
            if (status) {
              categoryTotalPage = response;
              handlePagination(categoryTotalPage);
              $("#category-pagination").removeClass("d-none");
              $("#category-search-input").on("keyup", getCategorySearch);
              $("#category-limit").on("change", getCategoryLimit);
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
      // if it doesn't exist category
      if (categoryTotalRow < 1) {
        $("#category-data").html(uiTrZero);
        $("#category-pagination").addClass("d-none");
      }
    }
    // if failed get total row category
    if (!status) {
      console.error(response);
    }
  });
  listCategoryRefProductCreate();
});
export const getCategoryAgain = () => {
  let categoryTotalRow;
  let categoryTotalPage;
  let categoryBtnPage;
  let categoryCurrentPage = 1;
  let categorySearch = $("#category-search-input").val();
  let categoryLimit = $("#category-limit").val();
  function getCategoryPage(categoryPageNumber) {
    // function to only get product based on search, limit, page
    getCategory(
      categorySearch,
      categoryLimit,
      categoryPageNumber,
      (status, response) => {
        // if success
        if (status) {
          let tr = "";
          response.forEach((element) => {
            tr += uiTrCategory(element);
          });
          $("#category-data").html(tr);
          uiActivePageButton(categoryPageNumber, categoryBtnPage);
          reinitializeTooltips();
        }
        // if failed
        if (!status) {
          console.error(response);
        }
      }
    );
    // // get-detail-product event binding fuckkkkkkk 2 jam lebih
    $(document).on("click", "#categoryDetailBtn", function () {
      const category = this.dataset;
      $("#category-detail-label").text(category.categorynama);
      $("#category-detail-name").text(category.categorynama);
      $("#category-detail-info").text(category.categoryketerangan);
    });
  }
  function handlePagination(response) {
    let uiBtnPaginate = "";
    for (let i = 1; i <= response; i++) {
      uiBtnPaginate += uiBtnPage(i);
    }
    $("#category-number-page").html(uiBtnPaginate);
    // Event listeners for pagination buttons
    categoryBtnPage = document.getElementsByClassName("category-btn-page");
    categoryTotalPage = response;
    // first page
    $("#category-first-page")
      .off("click")
      .on("click", () => {
        getCategoryPage(1);
      });
    // previous page
    $("#category-prev-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let decrementPage = pageActive - 1;
        if (decrementPage < 1) {
          decrementPage = categoryTotalPage;
        }
        getCategoryPage(decrementPage);
      });
    // based on number when clicked
    for (let i = 0; i < categoryTotalPage; i++) {
      categoryBtnPage[i].addEventListener("click", function () {
        const pageNumber = parseInt(this.textContent.trim());
        getCategoryPage(pageNumber);
      });
    }
    // // next page
    $("#category-next-page")
      .off("click")
      .on("click", () => {
        let pageActive = parseInt($(".category-active-page").text().trim());
        let incrementPage = pageActive + 1;
        if (incrementPage > categoryTotalPage) {
          incrementPage = 1;
        }
        getCategoryPage(incrementPage);
      });
    // last page
    $("#category-last-page")
      .off("click")
      .on("click", () => getCategoryPage(categoryTotalPage));

    // Initial page load
    getCategoryPage(categoryCurrentPage);
  }
  // init & get total row
  getTotalRowCategory(categorySearch, (status, response) => {
    // if success get total row category
    if (status) {
      categoryTotalRow = response;
      $("#categories-total-row").html(categoryTotalRow);
      // if it exist category
      if (categoryTotalRow >= 1) {
        getTotalPageCategory(
          categorySearch,
          categoryLimit,
          (status, response) => {
            if (status) {
              categoryTotalPage = response;
              handlePagination(categoryTotalPage);
              $("#category-pagination").removeClass("d-none");
            }
            if (!status) {
              console.error(response);
            }
          }
        );
      }
      // if it doesn't exist category
      if (categoryTotalRow < 1) {
        $("#category-data").html(uiTrZero);
        $("#category-pagination").addClass("d-none");
      }
    }
    // if failed get total row category
    if (!status) {
      console.error(response);
    }
  });
  listCategoryRefProductCreate();
};
