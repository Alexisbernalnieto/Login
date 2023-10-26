var ruta=require("express").Router(); 
var {subirArchivo}=require("../middlewares/middlewares");
var {autorizado}=require("../middlewares/password");
var {mostrarUsuarios, nuevoUsuario, buscarPorId, modificarUsuario, borrarUsuario, login}=require("../bd/usuariosBD");


ruta.get("/", autorizado, async (req,res)=>{
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar" , {usuarios});
});



ruta.get("/login", async (req,res)=>{
    res.render("usuarios/login");
});

ruta.post("/login", async (req,res)=>{
    var user= await login(req.body);
    if(user==undefined){
        res.redirect("/login");
    }
    else{
        if(user.admin){
            console.log("Administrador");
            req.session.admin=req.body.usuario;
            res.redirect("producto/nuevoproducto");
        }
        else{
            console.log("usuario");
            req.session.usuario=req.body.usuario;
            res.redirect("/");
        }
        
    }
      
});

ruta.get("/logout", (req,res)=>{
req.session=null;
res.redirect("/login");
});


ruta.get("/nuevoUsuario", (req,res)=>{
    res.render("usuarios/nuevo");
});

ruta.post("/nuevousuario", subirArchivo(),async (req,res)=>{
    req.body.foto=req.file.filename
    var error=await nuevoUsuario(req.body);
      //res.end();
      res.redirect("/");
});

ruta.get("/editarUsuario/:id" , subirArchivo(), async(req,res)=>{

    console.log(req.params.id);
    var user= await buscarPorId(req.params.id);
    res.render("usuarios/modificar",{user});


});

ruta.post("/editarusuario", subirArchivo(), async (req,res)=>{
    if(req.file!=null){
        req.body.foto=req.file.filename;
    }
    else {
        req.body.foto=req.body.foto2;
    }
    var error=await modificarUsuario(req.body);
    res.redirect("/");

});

ruta.get("/borrarusuario/:id", async (req,res)=>{
    try{
   await borrarUsuario(req.params.id);
   res.redirect("/");
    }catch(err){
     console.log("Error al borrar el usuario" +err);
    }
});


module.exports=ruta;