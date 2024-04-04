const router = require("express").Router();
const memberCrtl = require("../../constroller/member/member_ctrl");

router.get("/list", memberCrtl.list); //(req,res)=>{res.send("member list 연동")})
router.get("/register_form", memberCrtl.registerForm);
router.post("/register", memberCrtl.register);

router.get("/member_view/:id", memberCrtl.memberView01);
router.get("/member_view", memberCrtl.memberView02);

router.get("/delete/:id", memberCrtl.deleteM);
router.get("/modify_form", memberCrtl.modifyForm);
router.post("/modify", memberCrtl.modify);

module.exports = router;
