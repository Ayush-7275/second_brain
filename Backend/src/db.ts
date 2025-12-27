import { Model, Schema, model } from "mongoose";


const contentType = ["Youtube","Twitter"];

const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

export const Users = model("Users", userSchema);

const contentSchema = new Schema({
    title: { type: String, required: true },//ref mei model ke andar wala name dete hain
    link: { type: String, required: true },
    type: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
});

export const Content = model("content", contentSchema);

const tagsSchema = new Schema({
    title: { type: String, required: true },
});

export const Tags = model("Tags", tagsSchema);//learn ref wala fanda

const linkSchema = new Schema({
    link : {type:String,required:true,unique:true},
    userId : {type:Schema.Types.ObjectId, ref:"Users",required:true,unique:true}
})

export const Links = model("links",linkSchema);