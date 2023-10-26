class Producto{
    constructor(id,data){
      //console.log(data);
      this.bandera=0;
      this.id=id;
      this.nombre=data.nombre;
      this.cantidad=data.cantidad;
      this.precio=data.precio;
      this.foto=data.foto;
  
    }
  
  //Validar los datos
  
  set id(id){
      if(id!=null)
      id.length>0?this._id=id:this.bandera=1;
  }
  
  set nombre(nombre){
  nombre.length>0?this._nombre=nombre:this.bandera=1;
  
  }
  
  set cantidad(cantidad){
      cantidad>0?this._cantidad=cantidad:this.bandera=1;
  }
  
  set precio(precio){
      precio>0?this._precio=precio:this.bandera=1;
  }

  set foto(foto){
    foto.length>0?this._foto=foto:this.foto.bandera=1;
}
  
  get id(){
      return this._id;
  }
  
  get nombre(){
      return this._nombre;
  }
  
  get cantidad(){
      return this._cantidad;
  }
  
  get precio(){
      return this._precio;
  }

  get foto(){
    return this._foto;
}
  
  get obtenerProducto(){
          if(this._id==null){
               return { 
                  nombre:this.nombre,
                  cantidad:this.cantidad,
                  precio:this.precio,
                  foto:this.foto
               }
          }
          else{
             return{
              id:this.id, 
          nombre:this.nombre,
          cantidad:this.cantidad,
          precio:this.precio,
          foto:this.foto
             }
          }
          
      }
  }
  
  
  module.exports=Producto;