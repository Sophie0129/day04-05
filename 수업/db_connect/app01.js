const express = require("express");
const app = express();
let con;
app.get("/", (req, res)=>{
    console.log("1.연동 전..");
    con = connect();
    con.then( msg => {
        console.log("3.연동 완료 후 특정 기능 사용..");
        res.send("msg : " + msg);
    })
});
const connect = () => {
    let msg;
    return new Promise( (resolve)=>{
        setTimeout( ()=>{
            msg = "연동 되었습니다";
            console.log("2.연동 하는 중....");
            resolve( msg );
        } , 1000 );
    });
    //return msg;
}

app.get("/async", async (req, res)=>{
    console.log("1111 연동전 async");
    con = await connect();
    console.log("3333 받아온 객체 연산 async");
    res.send("con : "+con);
});

const oracleDB = require("oracledb");
const dbConfig = {
    user : "java",
    password : "1234",
    connectString : "localhost:1521/xe"// orcl
}
app.get("/connect", async (req, res) => {
    let con = await oracleDB.getConnection( dbConfig );
    console.log("con : ", con);
    con.execute( "sql 명령어" )

    let con1 = oracleDB.getConnection( dbConfig );
    con1.then( res => {
        console.log("res : ", res );
        res.execute("sql 명령어");
    })
    console.log("con1111 : ", con1);
    
    res.send("con : "+con)
});


app.listen(3000, ()=> console.log("3000") );