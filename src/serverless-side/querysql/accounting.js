export const createTableTransaksi = () => {
  return `CREATE TABLE Accounting (
            AccountingId INTEGER PRIMARY KEY AUTOINCREMENT,
            AccountingYMD VARCHAR(255),
            AccountingHMS VARCHAR(255),
            AccountingRef VARCHAR(255),
            AccountingName VARCHAR(255),
            AccountingPosition VARCHAR(255),
            AccountingRp INTEGER,
            AccountingImg BLOB,
            AccountingInfo TEXT
          )`;
};
export const queryCreateAccounting = (
  accountingYMDVal,
  accountingHMSVal,
  accountingRefVal,
  accountingNameVal,
  accountingPositionVal,
  accountingRpVal,
  accountingInfoVal
) => {
  let query = `INSERT INTO Accounting
               (AccountingYMD, AccountingHMS, AccountingRef, AccountingName, AccountingPosition, AccountingRp, AccountingInfo)
               VALUES
               ('${accountingYMDVal}', '${accountingHMSVal}', '${accountingRefVal}', '${accountingNameVal}', '${accountingPositionVal}', ${accountingRpVal}, '${accountingInfoVal}')`;
  return query;
};
export const queryInitAccounting = () => {
  let query = `SELECT 
               COUNT(Accounting.AccountingId) AS Total_Row
               FROM Accounting `;
  return query;
};
export const queryReadAccounting = (searchVal, limitVal, startoffsetVal) => {
  let query = `SELECT * FROM Accounting `;
  query += `ORDER BY Accounting.AccountingYMD DESC 
            LIMIT ${limitVal}
            OFFSET ${startoffsetVal} `;
  return query;
};
// balance sheet
export const querySumDebt = () => {
  let query = `SELECT
               SUM(AccountingRp) AS Total_Rp 
               FROM Accounting `;
  query += `WHERE AccountingPosition = 'debt' `;
  return query;
};
export const querySumCredit = () => {
  let query = `SELECT
               SUM(AccountingRp) AS Total_Rp 
               FROM Accounting `;
  query += `WHERE AccountingPosition = 'credit' `;
  return query;
};
export const queryReadAccounting1 = () => {
  let query = `SELECT 
               AccountingRef, 
               AccountingName, AccountingPosition, 
               SUM(AccountingRp) AS TotalRp
               FROM Accounting `;
  query += `GROUP BY Accounting.AccountingRef`;
  return query;
};
export const queryUpdateAccounting = (req) => {
  const {
    accountingYMDVal,
    accountingHMSVal,
    accountingRefVal,
    accountingNameVal,
    accountingPositionVal,
    accountingRpVal,
    accountingInfoVal,
    accountingId,
  } = req;
  let query = `UPDATE Accounting 
               SET AccountingYMD = '${accountingYMDVal}',
                   AccountingHMS = '${accountingHMSVal}',
                   AccountingRef = '${accountingRefVal}',
                   AccountingName = '${accountingNameVal}',
                   AccountingPosition = '${accountingPositionVal}',
                   AccountingRp = ${accountingRpVal},
                   AccountingInfo = '${accountingInfoVal}'
               WHERE AccountingId = ${accountingId}`;
  return query;
};
export const queryDeleteAccounting = (accountingIdVal) => {
  let query = `DELETE FROM Accounting 
               WHERE AccountingId = ${accountingIdVal}`;
  return query;
};

// storageCart4.forEach((row) => {
//   const req1 = {
//     accountingYMDVal: formattedDDMY,
//     accountingHMSVal: formattedHMS,
//     accountingRefVal: "111",
//     accountingNameVal: "Cash",
//     accountingPositionVal: "debt",
//     accountingRpVal: row.ProductPrice,
//     accountingInfoVal: `Sales Product ${row.ProductId} - ${row.ProductName}`,
//   };

//   const req2 = {
//     accountingYMDVal: formattedDDMY,
//     accountingHMSVal: formattedHMS,
//     accountingRefVal: "411",
//     accountingNameVal: "Sales",
//     accountingPositionVal: "credit",
//     accountingRpVal: row.ProductPrice,
//     accountingInfoVal: `Paid`,
//   };

//   createAccounting(req1, (status, response) => {
//     console.log(response);
//   });

//   createAccounting(req2, (status, response) => {
//     console.log(response);
//   });
// });
