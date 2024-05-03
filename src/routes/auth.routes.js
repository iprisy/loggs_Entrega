const {Router} = require ('express');

const userModel = require ('../models/user.model');
const {createHashValue, isValidPasswd} = require ('../utils/encrypt');
const { generateJWT } = require("../utils/jwt");

const router = Router ();

router.post ('/login', async (req, res) => {
  try {
    const {email, password} =req.body;
    const findUser=await userModel.findOne({email});

    if (!findUser){
      return res
      .status(401)
      .json({message:`este usuario no está registrado`});
    }
    const isValidComparePsw=await isValidPasswd(password, findUser.password);
    if (!isValidComparePsw){
      return res.status(401).json({message: `credenciales inválidas`});
    }
    //Aquí está si queremos pasar todo el objeto de la base de datos, esto puede no ser deseable
    //const {password: passwordFromDB, ...restInfoUser}=findUser;

    //Aquí está cuando pasamos solo los datos necesarios

    const{ password: passwordFromDB, first_name, last_name, email: emailDB, age, role, notes} = findUser;


     // antes con toda la info 
     //const token=await generateJWT({...restInfoUser});

//TODO. crear una estregia local para el registro



     //ahora con lo que necesito
     const token=await generateJWT({
      // POR SEGURIDAD NO MANDAMOS ESTO password: passwordFromDB,
      first_name,
      last_name,
      email: emailDB,
      age,
      role,
      notes
      })



    return res.json({message:`Welcome $${email}, login success`, token})

  } catch (error) {
    console.log("🚀 ~ router.post ~ error:", error)
  }


});

router.post ('/register', async (req, res) => {
  try {
    const {first_name, last_name, email, age, password, role} = req.body;
   
    //incluir las validaciones

    const pswHashed = await createHashValue(password);
    
    const newUser = await userModel.create ({
      first_name,
      last_name,
      email,
      age,
      role,
      password: pswHashed,
    });
   
    if (!newUser){
        //manejar el error
       
    }


    return res.json({message:`usuario creado`, user:newUser})




  } catch (error) {
  console.log("🚀 ~ router.post ~ error:", error)
  }
});
module.exports = router;
