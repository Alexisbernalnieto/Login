var {conexionP}=require("./conexion")//Mandamos llamar el archivo conexion
var fs=require("fs");
var Producto=require("../modelos/Producto")

async function mostrarProductos(){
    var prod=[];
    try{
            var productos= await conexionP.get(); //Extraer de la BD
            productos.forEach((producto)=>{
                 //console.log(usuario.data());
                    var producto1= new  Producto(producto.id, producto.data());
                    //console.log(producto1);
                    if(producto1.bandera==0){
                         prod.push(producto1.obtenerProducto); //Hace que se inserte el arreglo
                    }
            });
    }
      catch(err){
            console.log("Error al obtener los usuarios de Firebase " +err);
            prod.push(null);
      }
      return prod;
}

async function buscarPorId(id){
        var prod;
        try{
            var productobd= await conexionP.doc(id).get();
            var productoObjeto= new Producto(productobd.id, productobd.data());
            if(productoObjeto.bandera==0){
                prod=productoObjeto;
            }    
        }
        catch(err){
           console.log("Error al buscar el producto " +err);
           prod=null;
        }
        return prod;
     }

     async function nuevoProducto(datos){
      
      //console.log(datos);
        var producto= new Producto(null,datos)
        console.log("kjhaksdhfkja");
            var error=1
            if(producto.bandera==0){
             
                try{
                   await conexionP.doc().set(producto.obtenerProducto);
                   console.log("Producto registrado correctamente") //Resgistro exitoso
                   error=0
                }
                catch(err){
                    console.log("Error al registrar el producto " +err);   //Resgistro fallido
                }
                
            }
            
            return error;
            
            
        }



 async function modificarProducto(datos){
  var prod =await buscarPorId(datos.id);
  var error=1
  if (prod!=undefined){
    var producto=new Producto(datos.id,datos);
    if(producto.bandera==0){
      try{
           await conexionP.doc(producto.id).set(producto.obtenerProducto);
           console.log("Producto actualizado correctamente");
           error=0
      }
      catch(err){
          console.log("Error al modificar producto", err);
      }
    }
    else{
      console.log("Los datos no son correctos");
    }
  }
           
          return error;
     }

     async function borrarProducto(id){
        var error=1
        var prod= await buscarPorId(id);
        if(prod!= undefined){
          try{
            fs.unlinkSync("./web/images/" + prod.foto);
            await conexionP.doc(id).delete();
            console.log("Producto borrado");
            error = 0
          }
          catch(err){
             console.log("Error al borrar usuario" +err);
          }
        }
        return error;
       
}


module.exports={
mostrarProductos,
buscarPorId,
nuevoProducto,
modificarProducto,
borrarProducto
}








