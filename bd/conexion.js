var admin= require("firebase-admin");
var keys = require("../serviceAccountKeys.json");

admin.initializeApp({
    credential:admin.credential.cert(keys)
});

var db=admin.firestore();
var dbp= admin.firestore();
var conexion=db.collection("miejemploBD")
var conexionP= dbp.collection("productoBD")


module.exports={conexion, conexionP};

