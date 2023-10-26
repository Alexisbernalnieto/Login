var conexion=require("./conexion").conexion //Mandamos llamar el archivo conexion
var fs=require("fs");
var Usuario=require("../modelos/Usuario");
const { generarPassword, validarPassword } = require("../middlewares/password");

 async function mostrarUsuarios(){
        var users=[];
        try{
                var usuarios= await conexion.get(); //Extraer de la BD
                usuarios.forEach((usuario)=>{
                     //console.log(usuario.data());
                        var usuario1= new Usuario(usuario.id, usuario.data());
                        if(usuario1.bandera==0){
                             users.push(usuario1.obtenerUsuario); //Hace que se inserte el arreglo
                        }
                });
        }
          catch(err){
                console.log("Error al obtener los usuarios de Firebase " +err);
                users.push(null);
          }
         // console.log(users);
          return users;
}

      async function buscarPorId(id){
        var user;
        try{

            var usuariobd= await conexion.doc(id).get();
            var usuarioObjeto= new Usuario(usuariobd.id, usuariobd.data());
            if(usuarioObjeto.bandera==0){
                user=usuarioObjeto;
            }    
        }
        catch(err){
           console.log("Error al buscar al usuario " +err);
           user=null;
        }
        return user;
     }



     async function nuevoUsuario(datos){
        var {salt,hash}= generarPassword(datos.password);
        datos.password=hash;
        datos.salt=salt
        datos.admin=false;
        var usuario= new Usuario(null,datos)
            var error=1
            if(usuario.bandera==0){
                try{
                   await conexion.doc().set(usuario.obtenerUsuario);
                   console.log("Usuario registrado correctamente") //Resgistro exitoso
                   error=0
                }
                catch(err){
                    console.log("Error al registrar al usuario " +err);   //Resgistro fallido
                }
                
            }
            
            return error;
            
            
        }

        async function login(datos){
          var user=undefined;
          var usuarioObjeto;
          try{
          var usuarios=await conexion. where('usuario', '==',datos.usuario).get();
          
          if(usuarios.docs. length==0){//No existe el usuario
          return undefined
          }
          usuarios.docs.filter((doc) => {//El usuario SI existe
          //  console.log(doc.data());
          var validar=validarPassword (datos. password, doc.data() . password, doc. data(). salt);
          if (validar){

          usuarioObjeto=new Usuario(doc.id, doc.data());
          if (usuarioObjeto.bandera==0){
          user=usuarioObjeto.obtenerUsuario;
       
          }
        }
          else
          return undefined;
      });

    }
          catch(err){
          console. log("Error al recuperar al usuario "+err);
          }
          return user;

          }
      
               


     async function modificarUsuario(datos){
       var user= await buscarPorId(datos.id); //Regresa todo lo que tiene ese usuario
       var error=1
       if(user!=undefined){
        if(datos.password==""){
          datos.password=user.password
          datos.salt=user.salt;
        }
        else{
          var {salt,hash} =generarPassword(datos.password);
          datos.password=hash;
          datos.salt=salt;

        }
            var usuario=new Usuario(datos.id,datos);
          if(usuario.bandera==0){
            try{
                 await conexion.doc(usuario.id).set(usuario.obtenerUsuario);
                 console.log("Usuario actualizado correctamente");
                 error=0
            }
            catch(err){
                console.log("Error al modificar el usuario", err);
            }
          }
          else{
            console.log("Los datos no son correctos");
          }
       }
          return error;
     }

     async function borrarUsuario(id){
              var error=1
              var user= await buscarPorId(id);
              if(user!=undefined){
               // console.log("abc");
                try{
                  console.log();
                  fs.unlinkSync("./web/images/" + user.foto);
                  
                  await conexion.doc(id).delete();
                  console.log("Usuario borrado");
                  error = 0
                }
                catch(err){
                   console.log("Error al borrar usuario" +err);
                }
       }
    return error;
    
      }
              


module.exports={
    mostrarUsuarios,
    buscarPorId,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario,
    login
}

// Entras a usuarios, dar de alta modificarlos, eliminarlos
// Los mismo para producto, mostrar 