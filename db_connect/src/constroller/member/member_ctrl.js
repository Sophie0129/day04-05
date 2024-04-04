const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
const ser = require("../../service/member/member_service");


oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT; //키,밸류 형식으로 표 설정

const list = async (req, res) => {
  const list = await ser.getList();
  console.log("list : ", list);
  //res.send(list);
  res.render("member/member_index", { list });
};

const registerForm = (req, res) => {
  res.render("member/register_form");
};
const register = async (req, res) => {
  let msg = await ser.insert(req.body);
  res.send(msg);
};
/*
const list = async (req, res) => {
  let con = await oracledb.getConnection(dbConfig);
  console.log("con : ", con);
  let result = con.execute("select*from members");
  console.log("result", result);
  //console.log("result.rows", result.rows[0][3]) //2차 배열로 표 설정
  //let result = con.execute("select * from members")
  //result.then(res => console.log("res : ",res))
  res.send("list");
};
*/
const memberView01 = async (req, res) => {
  console.log("===view 01===");
  console.log("req.params", req.params);
  console.log("req.query", req.query);
  let member = await ser.getMember(req.params);
  res.render("member/member_view", { member });
};

const memberView02 = (req, res) => {
  console.log("===view 02===");
  console.log("req.params", req.params);
  console.log("req.query", req.query);
  res.send();
};

const deleteM = async (req, res) => {
  let msg = await ser.deleteM(req.params);
  res.send(msg);
};
const modifyForm = async (req, res) => {
  console.log("req.query =>", req.query);
  let member = await ser.getMember(req.query);
  res.render("member/modify_form", { member });
};

const modify = async (req, res) => {
  let msg = await ser.modify(req.body);
  res.send(msg);
};

module.exports = {
  list,
  registerForm,
  register,
  memberView01,
  memberView02,
  deleteM,
  modifyForm,
  modify,
};
