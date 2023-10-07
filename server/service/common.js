



export const isAuth=(req,res,done)=>{
  console.log(req.user);
  if(req.user){
    done()
  }else{
    res.send(401)
  }
}


export const sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};