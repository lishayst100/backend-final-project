import mongoose from 'mongoose'
import dbConfig from './config/db.config.js'
import { Role } from './models/role.js'


const {DB,HOST,PORT,ROLES} = dbConfig
const connect = async () =>{
    mongoose.set("strictQuery", false)
   // await mongoose.connect(`mongodb://${HOST}:${PORT}/${DB}`)
   await mongoose.connect(dbConfig.ConnectionString)
    console.log(`Connected to DataBase ${DB}`);
    initDB()
    
}

//


const initDB = () => {
  //create the User/Admin/Mod roles
  //if Role collection is Empty:
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      ROLES.map((s) => new Role({ name: s })).forEach((role) => {
        role.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added ", role.name, "to Roles collection");
          }
        });
      });
    }
  });
};



export {
    connect
}