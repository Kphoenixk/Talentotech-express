const UserSchema = require("../models/usuario")
const bcrypt= require('bcrypt')



class UsuarioController{

    async getUsuarios(req, res) {
        var usuarios= await UserSchema.find();
        res.json(usuarios)
        
    }
    
    async createUsuario (req, res) {

        const hashedPassword= await bcrypt.hash(req.body.password, 10)


        var nuevoUsuario = {
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,
        }
        
   await UserSchema(nuevoUsuario).save().then((result) =>{ 
    res.send({"status": "success", "message": "Usuario Guardado Correctamente"})
}).catch((error) => {
    res.send({"status": "error", "message": error.message})
})

}


    async getUsuarioById(req, res){
        var id= req.params.id
        var usuario= await UserSchema.findById(id)
        res.json(usuario)

        }

      async updateUsuario(req, res){

        var id = req.params.id;

        var updateUser ={
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password,
        }

       await UserSchema.findByIdAndUpdate(id, updateUser,{ new: true })
       .then((result) => { 
        res.send({"status": "success", "message": "Usuario Actualizado Correctamente"})
    }).catch((error) => {
        res.send({"status": "error", "message": error.message})
    })
    
    }


    async deleteUsuario(req, res){
        var id= req.params.id
        
        await UserSchema.deleteOne({_id:id})

        res.json({"status": "success", "message": "Usuario Eliminado correctamente"})
    }


}

module.exports = UsuarioController