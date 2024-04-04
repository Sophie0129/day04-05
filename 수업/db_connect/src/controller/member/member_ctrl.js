const oracledb = require("oracledb");
const dbConfig = require("../../../config/database/db_config");
const ser = require("../../service/member/member_service")

oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const list = async (req, res) => {

    const list = await ser.getList();
    console.log("list : ", list);
    //res.send( list )
    res.render("member/member_index", {list} );

    /*
    let con = await oracledb.getConnection( dbConfig );
    console.log("con : ", con);
    let result = await con.execute("select * from members");
    console.log("result : ", result);
    //console.log("result.rows : ", result.rows[0][3]);
    //let result = con.execute("select * from members");
    //result.then( res => console.log("res : ", res ) )
    res.send("list");
    */
}
const registerForm = (req, res) => {
    res.render("member/register_form")
}
const register = async (req, res) => {
    let msg = await ser.insert( req.body );
    res.send( msg )
}
const memberView01 = async (req, res) => {
    console.log("=== view 01 ===");
    console.log( "req.params " , req.params )
    console.log( "req.query " , req.query )
    let member = await ser.getMember( req.params );
    res.render("member/member_view", {member} );
}
const memberView02 = (req, res) => {
    console.log("=== view 02 ===");
    console.log( "req.params " , req.params )
    console.log( "req.query " , req.query )
    res.send( );
}
const deleteM = async (req, res) => {
    let msg = await ser.deleteM( req.params );
    res.send( msg );
}
const modifyForm = async (req, res) => {
    console.log(" req.query => ",  req.query)
    let member = await ser.getMember( req.query );
    res.render("member/modify_form", {member} );
}
const modify = async (req, res) => {
    let msg = await ser.modify( req.body );
    res.send( msg );
}
module.exports = { modify, 
    modifyForm, 
    deleteM,
    memberView01, memberView02,
                 register, registerForm, list };