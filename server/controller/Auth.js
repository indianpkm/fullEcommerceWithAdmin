import UserModel from "../model/UserModel.js"
import crypto from 'crypto'
import { sanitizeUser } from "../service/common.js";


export const createUser=async(req,res)=>{
    const user=new UserModel(req.body);
    try{
      const salt = crypto.randomBytes(16);
      crypto.pbkdf2(
        req.body.password,
        salt,
        310000,
        32,
        'sha256',
        async function (err, hashedPassword) {
          const user = new UserModel({ ...req.body, password: hashedPassword, salt });
          const doc = await user.save();

        res.status(201).json(sanitizeUser(doc))

          // req.login(sanitizeUser(doc), (err) => {
          //   // this also calls serializer and adds to session
          //   if (err) {
          //     res.status(400).json(err);
          //   } else {
          //     const token = jwt.sign(
          //       sanitizeUser(doc),
          //       process.env.JWT_SECRET_KEY
          //     );
          //     res
          //       .cookie('jwt', token, {
          //         expires: new Date(Date.now() + 3600000),
          //         httpOnly: true,
          //       })
          //       .status(201)
          //       .json({ id: doc.id, role: doc.role });
          //   }
          // });
        }
      );
    }catch(err){
        res.status(400).json(err)
    }
}

export const loginUser=async(req,res)=>{
    res.json(req.user)
    // try{
    //     const user=await UserModel.findOne({email:req.body.email})
    //     if(!user){
    //         res.status(401).json({message:"Invalid Details"})
    //     }else if(user.password===req.body.password){
    //         res.status(200).json({
    //             id: user.id, role: user.role
    //         })}else{
    //             res.status(401).json({message:"Invalid Details"})
    //         }
    // }catch(err){
    //     res.status(400).json(err)
    // }
}

export const checkAuth = async (req, res) => {
    if (req.user) {
      res.json(req.user);
    } else {
      res.sendStatus(401);
    }
  };