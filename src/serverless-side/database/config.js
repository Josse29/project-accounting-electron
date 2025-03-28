const DbHandlers = (ipcMain, appPath, sqlite3) => {
  const dbPath = appPath("src", "serverless-side", "database", "myapps.db");
  const db = new sqlite3.Database(dbPath);
  ipcMain.handle("db-all", async (event, query) => {
    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  });
  ipcMain.handle("db-run", async (event, query, msg) => {
    return new Promise((resolve, reject) => {
      db.run(query, function (err) {
        if (err) reject(err);
        else resolve(msg);
      });
    });
  });
  ipcMain.handle("db-each", async (event, query, limitVal) => {
    return new Promise((resolve, reject) => {
      db.each(query, (err, res) => {
        if (!err) {
          let totalPage;
          let totalRow = parseInt(res.TOTAL_ROW);
          const isEven = totalRow % limitVal === 0;
          if (isEven) {
            totalPage = parseInt(totalRow / limitVal);
          } else {
            totalPage = parseInt(totalRow / limitVal) + 1;
          }
          resolve({ totalPage, totalRow });
        }
        if (err) {
          reject(err);
        }
      });
    });
  });
  ipcMain.handle("db-each-1", async (event, query) => {
    return new Promise((resolve, reject) => {
      db.each(query, (err, res) => {
        if (!err) {
          resolve(res);
        }
        if (err) {
          reject(err);
        }
      });
    });
  });
  ipcMain.handle("db-get", async (event, query) => {
    return new Promise((resolve, reject) => {
      db.get(query, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  });
};
export default DbHandlers;
