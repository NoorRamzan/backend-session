import userModels from "../models/User.js"

const Creatuser= async(req,res)=>{
 
    const {name,fathername,email,phone,image: imagePath}=req.body

    const NewUser= new userModels({
          name,fathername,email,phone,image: imagePath
    })
  await NewUser.save(  )
}
export {Creatuser}

