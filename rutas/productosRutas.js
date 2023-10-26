var ruta=require("express").Router();
var {subirArchivo}=require("../middlewares/middlewares");
var {autorizado, admin}= require ("../middlewares/password");
var {mostrarProductos,nuevoProducto, buscarPorId, modificarProducto, borrarProducto}=require("../bd/productosBD");

ruta.get("/" , async(req,res)=>{
    var productos= await mostrarProductos();
    //console.log(productos);
   res.render("productos/mostrarPro", {productos})
});

ruta.get("/nuevoProducto", admin, async (req,res)=>{
    res.render("productos/nuevoPro");
});

ruta.post("/nuevoproducto", subirArchivo(),async (req,res)=>{
    req.body.foto=req.file.originalname 
    var error=await nuevoProducto(req.body);
    res.redirect("/producto");
});

ruta.get("/editarProducto/:id", async(req,res)=>{
    console.log(req.params.id);
    var prod= await buscarPorId(req.params.id);
    res.render("productos/modificarPro",{prod});
    res.end;


});

ruta.post("/editarproducto", async (req,res)=>{
     var error=await modificarProducto(req.body);
     res.redirect("/producto");

});

ruta.get("/borrarproducto/:id", async (req,res)=>{
    try{
   await borrarProducto(req.params.id);
   res.redirect("/producto");
    }catch(err){
     console.log("Error al borrar el producto" +err);
    }
});


module.exports=ruta;




