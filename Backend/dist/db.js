import mongoose, { Schema } from "mongoose";
import ObjectId from "mongoose";
const userSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});
export const userModel = mongoose.model("user", userSchema);
//# sourceMappingURL=db.js.map