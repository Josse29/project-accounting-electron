import {
  queryDeleteSupplier,
  queryGetListSupplier,
  queryGetSupplier,
  queryInsertSupplier,
  queryTotalRowSupplier,
  queryUpdateSupplier,
} from "../querysql/supplier.js";

// 1.CREATE
export const createSupplier = (
  supplierName,
  supplierInfo,
  supplierImg,
  callback
) => {
  db.run(
    queryInsertSupplier(supplierName, supplierInfo, supplierImg),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Supplier <b class='text-capitalize'>${supplierName}</b> berhasil ditambahkan`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 2.READ
export const getSupplier = (
  supplierSearch,
  supplierLimit,
  supplierPage,
  callback
) => {
  const supplierStartOffset = (supplierPage - 1) * supplierLimit;
  db.all(
    queryGetSupplier(supplierSearch, supplierLimit, supplierStartOffset),
    (err, res) => {
      if (!err) {
        return callback(true, res);
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
export const getTotalRowSupplier = (supplierSearch, callback) => {
  db.each(queryTotalRowSupplier(supplierSearch), (err, res) => {
    if (!err) {
      const totalSupplier = parseInt(res.TOTAL_ROW);
      return callback(true, totalSupplier);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getTotalPageSupplier = (
  supplierSearch,
  supplierLimit,
  callback
) => {
  db.each(queryTotalRowSupplier(supplierSearch), (err, res) => {
    if (!err) {
      let lastPage;
      let totalRowSupplier = parseInt(res.TOTAL_ROW);
      let supplierLimitInt = parseInt(supplierLimit);
      if (totalRowSupplier % supplierLimit === 0) {
        lastPage = totalRowSupplier / supplierLimitInt;
      }
      if (totalRowSupplier % supplierLimit !== 0) {
        lastPage = parseInt(totalRowSupplier / supplierLimitInt) + 1;
      }
      return callback(true, lastPage);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
export const getListSupplier = (supplierSearch, callback) => {
  db.all(queryGetListSupplier(supplierSearch), (err, res) => {
    if (!err) {
      return callback(true, res);
    }
    if (err) {
      return callback(false, err);
    }
  });
};
// 3.UPDATE
export const updateSupplier = (
  supplierId,
  supplierName,
  supplierInfo,
  supplierImg,
  callback
) => {
  db.run(
    queryUpdateSupplier(supplierId, supplierName, supplierInfo, supplierImg),
    (err) => {
      if (!err) {
        return callback(
          true,
          `Supplier <b>${supplierName}</b> berhasil diperbaharui`
        );
      }
      if (err) {
        return callback(false, err);
      }
    }
  );
};
// 4.DELETE
export const deleteSupplier = (supplierId, supplierName, callback) => {
  db.run(queryDeleteSupplier(supplierId), (err) => {
    if (!err) {
      return callback(
        true,
        `Supplier <b class= 'text-capitalize'>${supplierName}</b> berhasil dihapus`
      );
    }
    if (err) {
      return callback(false, err);
    }
  });
};