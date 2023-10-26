var express=require("express");
var path=require("path");
var cors=require("cors");
var session=require ("cookie-session");
var usuariosRutas=require("./rutas/usuariosRutas");
var productosRutas=require("./rutas/productosRutas");
var usuariosRutasApi=require("./rutas/usuariosRutasApi");
var productosRutasApi=require("./rutas/productosRutasApi");

var app=express();
app.set("view engine", "ejs");
app.use(cors());
app.use(session({
    name: "session",
    keys: ["kxnkccdksxszczx"],
    maxAge:24*60*60*100
}));
app.use(express.urlencoded({extended:true}));
app.use("/", express.static(path.join(__dirname,"/web")));
app.use("/", usuariosRutas);
app.use("/producto", productosRutas);
app.use("/", usuariosRutasApi);
app.use("/", productosRutasApi);




var port= process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});

