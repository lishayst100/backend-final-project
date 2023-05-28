import { RequestHandler } from "express"
import { Role } from "../db/models/role.js"
import { User } from "../db/models/user.js"

const isAdmin:RequestHandler =  async(req,res,next)=>{

        const userId = req.userId

        try{
            const user = await User.findById(userId)
            const roles = await Role.find({_id: {$in : user.roles}})

            for(let role of roles){
                if(role.name === 'admin')
                return next()
            }

            return res.status(404).json({message: 'Requries Admin Role'})
        }catch(e){

        }
}


export {
    isAdmin
}