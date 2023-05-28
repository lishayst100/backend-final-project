import { Schema, model } from "mongoose";

const student = new Schema({
    firstname:String,
    lastname:String,
    email:String
})


export const Student = model('student',student)

