const UserSchema = require("../models/usuario")
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')



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
        const hashedPassword= await bcrypt.hash(req.body.password, 10)

        var updateUser ={
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: hashedPassword,
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


 async login(req, res){
    var correo = req.body.correo;
    var password = req.body.password

    var usuario = await UserSchema.findOne({correo})
    if(usuario){

        var verificacionClave = await bcrypt.compare(password, usuario.password)
        if(verificacionClave){

            usuario.password = null
            const token = jwt.sign({usuario}, 'secret', { expiresIn: '1h'})


            res.send ({"status": "success", 
                "message": "Bienvenido" + usuario.nombre + " " + usuario.apellidos,
                "user_id": usuario._id,
                "token": token

            })
        }else{
           res.status(401).send({"status": "error", "message": " Datos invalidos"})
           

        }
    }else{
        res.status(401).send({"status": "error", "message": "El correo ingresado no existe"})
    }
  }
}

module.exports = UsuarioController