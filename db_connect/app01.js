const express = require("express")
const app = express();
let con;
app.get("/",(req,res)=>{
    console.log("1.연동 전")
    con = connect();
    con.then(msg =>{
        console.log("3. 연동 완료 후 특정 기능 사용")
        res.send("con : "+msg)
    })
    res.send("con : "+con)
});
const connect = () => {
    let msg;

    return new Promise((resolve)=>{//비동기 연결시 값을 받아오는 promise
        setTimeout(()=>{
            msg="연동 완료";
            console.log("2. 연동 중"); 
            resolve(msg);}, 1000);
           
        });
    //return msg;
}

app.get("/async", async (req, res)=>{ 
    //함수안에 비동기로 연동하는 함수가 있으면 부모자리에 async를 적어준다
    console.log("1111 연동전 async");
    con = await connect(); //그 비동기함수를 기다리게 함(데이터를 가져올때까지)
    console.log("333 받아온 객체 연산 async")
    res.send("con : "+con);
})

const oracleDB = require("oracledb");
const dbConfig = {
    user : "c##java2", password : "1234",
    connectString : "localhost:1521/orcl" //xe
}
app.get("/connect", async (req,res)=> {
    let con = await oracleDB.getConnection(dbConfig);
    console.log("con : ", con);
    con.execute("sql 명령어")

    let con1 = oracleDB.getConnection(dbConfig);
    con1.then(res => {
        console.log("res : ",res);
    })
    //위 두개 단락이 비동기 연결을 하는 명령어로 둘 중 하나로 연결하게 된다.
    console.log("con111 : ", con1);
    res.send("con : "+con)
})

app.listen(3000, console.log("포트3000 시작"))