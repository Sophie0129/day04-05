const memberDAO = require("../../database/member/member_dao");
const getList = async () => {
  const result = await memberDAO.getList();
  console.log("service : ", result);
  return result.rows;
};

const bcrypt = require("bcrypt");

const insert = async (body) => {
  body.pwd = bcrypt.hashSync(body.pwd, 10);
  console.log("service body : ", body)
  const result = await memberDAO.insert(body);
  let msg = "",
    url = "";
  if (result == 0) {
    msg = "문제 발생";
    url = "/member/register_form";
  } else {
    msg = "회원가입 성공";
    url = "/member/list";
  }
  let msgPack = getMessage(msg, url);
  return msgPack;
};

const getMessage = (msg, url) => {
  return `<script>
  alert("${msg}");
  location.href="${url}";
  </script>`;
};

const getMember = async (mId) => {
  const member = await memberDAO.getMember(mId);
  return member.rows[0];
};

const deleteM = async (body) => {
  const result = await memberDAO.deleteM(body);
  let msg = "",
    url = "";
  if (result == 0) {
    msg = "문제 발생!!";
    url = `/member/member_view/${body.id}`;
  } else {
    msg = "삭제 되었습니다.";
    url = "/member/list";
  }
  return getMessage(msg, url);
};

const modify = async (body) => {
  let msg = "",
    url = "";
  let result = await memberDAO.modify(body);
  if (result == 0) {
    msg = "문제발생";
    url = `/member/modify_form?id=${body.id}`;
  } else {
    msg = "수정완료";
    url = `/member/member_view/${body.id}`;
  }
  return getMessage(msg, url);
};

module.exports = { getList, insert, getMember, deleteM, modify };

//비동기 async, awiat. 연결된 함수들이 있는 페이지는 전부 넣어줘야함
//서비스쪽에서는 생략가능
