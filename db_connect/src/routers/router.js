//app에서 app이라는 변수를 넘겨주었기 때문에 해당 변수를 받아주고
module.exports = (app) => {
  const memberRouter = require("./member/member_router");
  app.use("/member", memberRouter);

  const router = require("express").Router();

  router.get("/", (req, res) => {
    res.render("index");
  });

  return router;
};
