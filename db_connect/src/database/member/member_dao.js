const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const getList = async () => {
  let con = await oracledb.getConnection(dbConfig);
  console.log("con : ", con);
  let result = await con.execute("select * from members");
  console.log("result", result);
  return result;
};

const insert = async (body) => {
  let con = await oracledb.getConnection(dbConfig);
  const sql = `insert into members(id, pwd, name, addr)
    values(:id, :pwd, :name, :addr)`;
  let result = 0;
  try {
    result = await con.execute(sql, body);
  } catch (err) {
    console.log(err);
  }
  console.log("result : ", result);
  return result;
};
const getMember = async (mId) => {
  console.log("dao id : ", mId);
  const con = await oracledb.getConnection(dbConfig);
  const sql = `select * from members where id=:Id`;
  let member;
  try {
    member = await con.execute(sql, mId);
  } catch (err) {
    console.log(err);
  }
  return member;
};

const deleteM = async (body) => {
  const sql = `delete from members where id=:id`;
  const cons = await oracledb.getConnection(dbConfig);
  let result = 0;
  try {
    result = await cons.execute(sql, body);
  } catch (err) {
    console.log(err);
  }
  return result;
};
const modify = async (body) => {
  let con = await oracledb.getConnection(dbConfig);
  const sql = `update members set pwd='${body.pwd}',
  name='${body.name}',addr='${body.addr}' where id='${body.id}'`;
  let result = 0;
  try {
    result = await con.execute(sql);
  } catch (err) {
    console.log(err);
  }
  return result;
};
module.exports = { getList, insert, getMember, deleteM, modify };