// 1.CREATE
export const queryInsertPersediaan = (
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  let query = `INSERT 
               INTO Persediaan 
               (PersediaanDDMY,PersediaanHMS,PersediaanProductId,PersediaanQty,PersediaanRp,PersediaanInfo) 
               VALUES 
               ('${valPersediaanDDMY}', '${valPersediaanHMS}',${valPersediaanProductId},${valPersediaanQty},${valPersediaanRp},'${valPersediaanInfo}')`;
  return query;
};
export const queryInsertPersediaan1 = (req) => {
  const {
    PersediaanYMDVal,
    PersediaanHMSVal,
    PersediaanQtyVal,
    PersediaanTotalVal,
    PersediaanInfoVal,
    PersediaanProductIdVal,
    PersediaanPersonIdVal,
  } = req;
  let query = `INSERT 
               INTO Persediaan
               (PersediaanDDMY, PersediaanHMS, PersediaanQty, PersediaanRp, PersediaanInfo, PersediaanProductId,PersediaanPersonId) 
               VALUES 
               ('${PersediaanYMDVal}', '${PersediaanHMSVal}',${PersediaanQtyVal}, ${PersediaanTotalVal}, '${PersediaanInfoVal}', ${PersediaanProductIdVal}, ${PersediaanPersonIdVal})`;
  return query;
};
// 2.READ
export const queryGetPersediaan = (searchVal, limitVal, offsetStartVal) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Product.ProductPriceJual,
                 Category.CategoryName,
                 Supplier.SupplierName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${searchVal}%' ESCAPE '!' OR
                      Supplier.SupplierName LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with order limit offset
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC
              LIMIT ${limitVal} 
              OFFSET ${offsetStartVal}`;
  return query;
};
export const queryGetPersediaanTotalRow = (searchVal) => {
  let query = `SELECT COUNT(*)
                 AS TOTAL_ROW
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  if (searchVal !== "") {
    //  with searhing value
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${searchVal}%' ESCAPE '!' OR
                      Supplier.SupplierName LIKE '%${searchVal}%' ESCAPE '!'
   `;
  }
  return query;
};
export const queryListPersediaan = (valPersediaanSearch) => {
  let query = `SELECT  
                 Product.ProductId,
                 Product.ProductName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with searhing value
  if (valPersediaanSearch !== "") {
    query += `WHERE Product.ProductName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                      Category.CategoryName LIKE '%${valPersediaanSearch}%' ESCAPE '!' OR
                      Supplier.SupplierName LIKE '%${valPersediaanSearch}%' ESCAPE '!' `;
  }
  return query;
};
export const queryGetPersediaanReport = (startDateVal, endDateVal) => {
  let query = `SELECT
               Persediaan.PersediaanDDMY AS Tanggal,
               Persediaan.PersediaanHMS AS Waktu, 
               Product.ProductName AS NamaProduk,
               Category.CategoryName AS Kategori, 
               Product.ProductPriceBeli AS HargaBeli,
               Supplier.SupplierName AS Supplier,  
               Persediaan.PersediaanQty AS TotalQty,
               Persediaan.PersediaanRp AS TotalRupiah
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // with order by
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,Persediaan.PersediaanHMS DESC `;
  return query;
};
export const queryGetPersediaanDate = (startDate, endDate) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${startDate}' AND '${endDate}' `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, 
                     Persediaan.PersediaanHMS DESC `;
  return query;
};

// reference product
export const queryGetPersediaanProductRow = (valPersediaanProductId) => {
  let query = `SELECT
                 COUNT(Persediaan.PersediaanProductId) AS TotalRow
                 FROM Persediaan
                 WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  return query;
};
export const queryGetPersediaanProductId = (valPersediaanProductId) => {
  const query = `SELECT
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanQty
                 FROM Persediaan
                 WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId}
                 ORDER BY Persediaan.PersediaanDDMY DESC, 
                Persediaan.PersediaanHMS DESC `;
  return query;
};

export const queryGetPersediaanProductId2 = (valPersediaanProductId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valPersediaanProductId
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
export const queryGetPersediaanDateProductId = (
  valStartDate,
  valEndDate,
  valProductId
) => {
  // table persediaan and sum persediaanqtyandtotalrp
  let query = `SELECT
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanProductId,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanRp, 
                 Persediaan.PersediaanInfo, `;
  //  table product
  query += `Product.ProductName,
              Product.ProductPriceBeli, `;
  // table category
  query += `Category.CategoryName, `;
  //table supplier
  query += `Supplier.SupplierName `;
  // from table and left join
  query += `FROM Persediaan
              LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
              AND Persediaan.PersediaanProductId = ${valProductId} `;
  // with order persediaaddmy and date  desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
                       Persediaan.PersediaanHMS DESC`;
  return query;
};

export const queryGetPersediaanProductReport = (startDateVal, endDateVal) => {
  let query = `SELECT
               Persediaan.PersediaanDDMY,
               Persediaan.PersediaanHMS, 
               Product.ProductName, 
               Product.ProductPriceBeli AS HargaBeli,
               Persediaan.PersediaanQty,
               Persediaan.PersediaanRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  }
  // order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanProductGroup = (startDateVal, endDateVal) => {
  let query = `SELECT
                   Product.ProductName,
                   Product.ProductPriceBeli,
                   SUM(Persediaan.PersediaanQty) AS TotalQty,
                   SUM(Persediaan.PersediaanRp) AS TotalRp
                   FROM Persediaan
                   LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}'`;
  }
  // order
  query += `GROUP BY Persediaan.PersediaanProductId
            ORDER BY Product.ProductName ASC`;
  return query;
};

// reference category
export const queryGetPersediaanCategoryId = (valCategoryId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with valCategoryId
  query += `WHERE Category.CategoryId = ${valCategoryId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};
export const queryGetPersediaanCategoryGroup = (startDateVal, endDateVal) => {
  let query = `SELECT
               Category.CategoryId,
               Category.CategoryName,
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
               WHERE Category.CategoryId IS NOT NULL `;
  // with between date
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // grouping
  query += `GROUP BY Category.CategoryId 
            ORDER BY Category.CategoryName ASC `;
  return query;
};
export const queryGetPersediaanDateCategoryId = (
  valStartDate,
  valEndDate,
  valCategoryId
) => {
  let query = `SELECT
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo
                 FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}' `;
  // with category id
  query += `AND Category.CategoryId = ${valCategoryId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
              Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanDateRpCategoryId = (
  startDate,
  endDate,
  valCategoryId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan 
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductCategoryId = ${valCategoryId}`;
  return query;
};

// reference suppliers
export const queryGetPersediaanSupplierGroup = (startDateVal, endDateVal) => {
  let query = `SELECT
               Supplier.SupplierName,
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan
               LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
               LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId 
               WHERE Supplier.SupplierId IS NOT NULL `;
  if (startDateVal !== "" && endDateVal !== "") {
    query += `AND Persediaan.PersediaanDDMY BETWEEN '${startDateVal}' AND '${endDateVal}' `;
  }
  // group
  query += `GROUP BY Supplier.SupplierId 
            ORDER BY Supplier.SupplierName ASC `;
  return query;
};
export const queryGetPersediaanDateSupplierId = (
  valStartDate,
  valEndDate,
  valSupplierId
) => {
  let query = `SELECT
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo
                 FROM Persediaan `;
  // with left join table 2
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
              LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
              LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  // with between date and supplier id
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${valStartDate}' AND '${valEndDate}'
                    AND Supplier.SupplierId = ${valSupplierId} `;
  // with order persediaan date desc
  query += `ORDER BY Persediaan.PersediaanDDMY DESC,
              Persediaan.PersediaanHMS DESC`;
  return query;
};
export const queryGetPersediaanDateRpSupplierId = (
  startDate,
  endDate,
  valSupplierId
) => {
  let query = `SELECT 
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan 
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN '${startDate}' AND '${endDate}' `;
  // with supplier id
  query += `AND Product.ProductSupplierId = ${valSupplierId}`;
  return query;
};
export const queryGetPersediaanSupplierId = (valSupplierId) => {
  let query = `SELECT 
                 Persediaan.PersediaanId,
                 Persediaan.PersediaanDDMY,
                 Persediaan.PersediaanHMS,
                 Persediaan.PersediaanRp,
                 Persediaan.PersediaanQty,
                 Persediaan.PersediaanInfo,
                 Product.ProductId,
                 Product.ProductName,
                 Product.ProductPriceBeli,
                 Category.CategoryName,
                 Supplier.SupplierName
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId `;
  //  with supplier id
  query += `WHERE Supplier.SupplierId = ${valSupplierId} `;
  // with order
  query += `ORDER BY Persediaan.PersediaanDDMY DESC, Persediaan.PersediaanHMS DESC `;
  return query;
};

// qty
export const queryGetPersediaanQty = (valPersediaanProductId) => {
  let query = `SELECT
               PersediaanProductId,
               SUM(PersediaanQty) AS TotalQty
               FROM Persediaan `;
  if (valPersediaanProductId !== "") {
    query += `WHERE PersediaanProductId = ${valPersediaanProductId} `;
  }
  return query;
};
export const queryGetPersediaanQty2 = (
  valPersediaanId,
  valPersediaanProductId
) => {
  let query = `SELECT
                 SUM(Persediaan.PersediaanQty) AS TotalQty
                 FROM Persediaan `;
  //with persediaanproductid
  query += `WHERE Persediaan.PersediaanProductId = ${valPersediaanProductId} AND `;
  query += `Persediaan.PersediaanId != ${valPersediaanId} `;
  return query;
};
export const queryGetPersediaanDateQtyProductId = (
  valStartDate,
  valEndDate,
  valProductId
) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  //  with valstartDate - endDate
  query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${valStartDate}' AND '${valEndDate}' `;
  // with valProductId
  query += `AND Persediaan.PersediaanProductId = ${valProductId}`;
  return query;
};

// totalrp
export const queryGetPersediaanRpSum = () => {
  let query = `SELECT
               SUM(PersediaanRp) AS TotalRp
               FROM Persediaan `;
  return query;
};
export const queryGetPersediaanRpSumCategoryId = (valCategoryId) => {
  let query = `SELECT
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan 
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Category ON Product.ProductCategoryId = Category.CategoryId `;
  query += `WHERE Category.CategoryId = ${valCategoryId}`;
  return query;
};
export const queryGetPersediaanRpSupplier = (supplierIdVal) => {
  const query = `SELECT
                 SUM(Persediaan.PersediaanRp) AS TotalRp
                 FROM Persediaan
                 LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                 LEFT JOIN Supplier ON Product.ProductSupplierId = Supplier.SupplierId
                 WHERE Supplier.SupplierId IS NOT NULL 
                       AND Supplier.SupplierId = ${supplierIdVal}`;
  return query;
};
export const queryGetPersediaanDateSUM = (startDate, endDate) => {
  let query = `SELECT 
               SUM(Persediaan.PersediaanRp) AS TotalRp
               FROM Persediaan `;
  //  with valstartDate - endDate
  if (startDate !== "" && endDate !== "") {
    query += `WHERE Persediaan.PersediaanDDMY BETWEEN  '${startDate}' AND '${endDate}' `;
  }
  return query;
};

// references order and cart
export const queryGetPersediaanTotalRow1 = (searchVal) => {
  let query = `SELECT
               COUNT(*) AS TOTAL_ROW 
               FROM `;
  // subquery
  query += `(
              SELECT
              Product.ProductId,
              SUM(Persediaan.PersediaanQty) AS TotalQty
              FROM Persediaan
                LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId
                WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!'
                GROUP BY Persediaan.PersediaanProductId
                HAVING TotalQty >= 1
            ) AS SUBSQUERY`;
  return query;
};
export const queryGetPersediaanProductGroup1 = (
  searchVal,
  limitVal,
  offsetVal
) => {
  let query = `SELECT
               Persediaan.PersediaanProductId,
               Product.ProductName,
               Product.ProductImage,
               Product.ProductPriceBeli AS PriceBuy,
               Product.ProductPriceJual AS PriceSell,
               SUM(Persediaan.PersediaanQty) AS TotalQty
               FROM Persediaan `;
  // left join, group, order
  query += `LEFT JOIN Product ON Persediaan.PersediaanProductId = Product.ProductId `;
  // with search AND PRODUCT IS STILL EXIST
  if (searchVal !== "") {
    query += `WHERE Product.ProductName LIKE '%${searchVal}%' ESCAPE '!' `;
  }
  // with group,HAVING
  query += `GROUP BY Persediaan.PersediaanProductId
            HAVING TotalQty >= 1 `;
  // offset limit, for pagination order
  query += `ORDER BY Product.ProductName ASC 
            LIMIT ${limitVal}
            OFFSET ${offsetVal}`;
  return query;
};

// 3.UPDATE
export const queryUpdatePersediaan = (
  valPersediaanId,
  valPersediaanDDMY,
  valPersediaanHMS,
  valPersediaanProductId,
  valPersediaanQty,
  valPersediaanRp,
  valPersediaanInfo
) => {
  return `UPDATE
            Persediaan
            SET PersediaanDDMY = '${valPersediaanDDMY}',
                PersediaanHMS = '${valPersediaanHMS}',
                PersediaanProductId = ${valPersediaanProductId},
                PersediaanQty = ${valPersediaanQty},
                PersediaanRp = ${valPersediaanRp},
                PersediaanInfo = '${valPersediaanInfo}'
            WHERE PersediaanId = ${valPersediaanId}`;
};
// 4.DELETE
export const queryDeletePersediaan = (valPersediaanId) => {
  let query = `DELETE
                 FROM Persediaan
                 WHERE PersediaanId = ${valPersediaanId}`;
  return query;
};
export const queryDeletePersediaanAll = () => {
  return `DELETE
            FROM Persediaan`;
};
export const queryDeletePersediaanProductId = (valProductId) => {
  return `DELETE
            FROM Persediaan
            WHERE Persediaan.PersediaanProductId = ${valProductId}`;
};
export const queryDeletePersediaanCategoryId = (categoryId) => {
  return `DELETE
            FROM Persediaan
            WHERE Persediaan.PersediaanProductId = ${categoryId}`;
};
