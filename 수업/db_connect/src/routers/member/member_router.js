const router = require("express").Router();
const memberCtrl = require("../../controller/member/member_ctrl")

router.get("/list", memberCtrl.list )
router.get("/register_form", memberCtrl.registerForm )
router.post("/register", memberCtrl.register );

router.get("/member_view/:id", memberCtrl.memberView01 )
router.get("/member_view", memberCtrl.memberView02 )

router.get("/delete/:id", memberCtrl.deleteM )
router.get("/modify_form", memberCtrl.modifyForm )
router.post("/modify", memberCtrl.modify )

module.exports = router;