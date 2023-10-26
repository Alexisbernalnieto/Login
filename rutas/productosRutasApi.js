var ruta=require("express").Router(); 
var {mostrarProductos,nuevoProducto, buscarPorId, modificarProducto, borrarProducto}=require("../bd/productosBD");
const {subirArchivo} = require("../middlewares/middlewares");


ruta.get("/api/mostrarproductos" , async(req,res)=>{
    var productos= await mostrarProductos();
    //console.log(productos);
    if(productos.length==0){
        res.status(400).json(productos);
     }else{
        res.status(200).json(productos);
     }
});



ruta.post("/api/nuevoProducto", subirArchivo(),async (req,res)=>{
    //console.log("jdhkfjhasdkfj");
    //console.log(req.body);
    console.log(req.file.originalname);
    console.log(req.body);
    req.body.foto=req.file.originalname
    var error=await nuevoProducto(req.body);
    if (error==0){
        res.status(200).json("Producto registrado correctamente");
      }else{
        res.status(400).json("Error al registrar al producto");
      }
});

ruta.post("/api/nuevoProducto", async (req,res)=>{
    var error = await nuevoProducto (req.body);
    res.redirect("/Productos/nuevo");
});


ruta.get("/api/buscarProductoPorId/:id", async(req,res)=>{
    var prod= await buscarPorId(req.params.id);
    if(prod==""){
        res.status(400).json("Usuario no encontrado");
    }else{
        res.status(200).json(prod);
    }


});

ruta.post("/api/editarproducto", subirArchivo(), async (req,res)=>{
    console.log(req.file.originalname);
    console.log(req.body);
    req.body.foto=req.file.originalname
    var error=await modificarProducto(req.body);
     if(error==0){
        res.status(200).json("Producto actualizado correctamente");
     }else{
      res.status(400).json("Error al actualizar al producto");
     }

});

ruta.get("/api/borrarproducto/:id", async (req,res)=>{
    try{
        var error = await borrarProducto(req.params.id);
        if(error==0){
         res.status(200).json("Producto borrado")
     
        }
        else{
         res.status(400).json("Error producto");
        }
        
         }catch(err){
          console.log("Error al borrar el producto" +err);
         }
     });


module.exports=ruta;




