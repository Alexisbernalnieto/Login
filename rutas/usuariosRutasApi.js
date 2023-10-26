var ruta=require("express").Router(); 
var {subirArchivo}=require("../middlewares/middlewares");
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario}=require("../bd/usuariosBD");


ruta.get("/api/mostrarusuarios" , async(req,res)=>{
     var usuarios= await mostrarUsuarios();
     //console.log(usuarios);
     if(usuarios.length==0){
        res.status(400).json(usuarios);
     }else{
        res.status(200).json(usuarios);
     }
});


//Esa despliega el formulario y no la necesitamos ahorita

ruta.post("/api/nuevousuario", subirArchivo(),async (req,res)=>{
  console.log(req.file.originalname);
    console.log(req.body);
    req.body.foto=req.file.originalname
      var error=await nuevoUsuario(req.body);
      if (error==0){
        res.status(200).json("Usuario registrado correctamente");
      }else{
        res.status(400).json("Error al registrar al usuario");
      }
});

ruta.get("/api/buscarUsuarioPorId/:id", async(req,res)=>{
    var user= await buscarPorId(req.params.id);
    if(user==""){
        res.status(400).json("Usuario no encontrado");
    }else{
        res.status(200).json(user);
    }


});

ruta.post("/api/editarUsuario", subirArchivo(),async (req,res)=>{
//  console.log(req.file.originalname);
 // console.log(req.body);
  req.body.foto=req.file.originalname  
  var error=await modificarUsuario(req.body);
     if(error==0){
        res.status(200).json("Usuario actualizado correctamente");
     }else{
      res.status(400).json("Error al actualizar al usuario");
     }

});

ruta.get("/api/borrarUsuario/:id", async (req,res)=>{
    try{
   var error = await borrarUsuario(req.params.id);
   if(error==0){
    res.status(200).json("Usuario borrado")

   }
   else{
    res.status(400).json("Error usuario");
   }
   
    }catch(err){
     console.log("Error al borrar el usuario" +err);
    }
});


module.exports=ruta;