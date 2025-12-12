import express from "express";
import * as z from "zod";
import mongoose from "mongoose";
import { userModel } from "./db.js";
import jwt from "jsonwebtoken";
const JWT_PASSWORD = "erling";
const mongoPasswd = "mongodb+srv://ayush7275:DRVrgzlKwu1uOFBu@secondbrain.dexuqtv.mongodb.net/?appName=SecondBrain";
const app = express();
mongoose.connect(mongoPasswd).then(() => {
    console.log("Database Connected");
});
app.use(express.json());
var errorStatus;
(function (errorStatus) {
    errorStatus[errorStatus["succesfull"] = 200] = "succesfull";
    errorStatus[errorStatus["clientError"] = 411] = "clientError";
    errorStatus[errorStatus["inputError"] = 403] = "inputError";
    errorStatus[errorStatus["serverError"] = 500] = "serverError";
})(errorStatus || (errorStatus = {}));
//things still to do 1->password encryption 2->throw error if db username is not unique
app.post("/api/v1/signup", async (req, res) => {
    //schema
    const User = z.object({
        username: z.string().min(3).max(8).trim(),
        password: z
            .string()
            .min(8)
            .max(20)
            .regex(/[A-Z]/, "passwd must contain one uppercase letter")
            .regex(/[0-9]/, "passwd must contain one number"),
    });
    const parsedResult = User.safeParse(req.body);
    if (parsedResult.success) {
        try {
            await userModel.create({
                username: parsedResult.data.username,
                password: parsedResult.data.password,
            });
            res.status(errorStatus.succesfull).send("Sign up Succesfull");
        }
        catch (e) {
            console.error("db", e);
        }
    }
    else {
        const error = parsedResult.error.issues;
        const errorMessages = error.map((issue) => issue.message);
        res.status(errorStatus.clientError).send(errorMessages);
    }
});
//Signin Route
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({ username: username });
    const passwordMatch = (password == user?.password);
    if (!passwordMatch) {
        res.status(errorStatus.inputError).send("Wrong Crendentials");
    }
    else {
        const token = jwt.sign(username, JWT_PASSWORD);
        res.status(errorStatus.succesfull).header(token).send(token);
    }
});
app.post("/api/v1/content", (req, res) => { }); //adding new content
app.get("/api/v1/content", (req, res) => { });
app.delete("/api/v1/content", (req, res) => { });
app.post("/api/v1/brain/share", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.listen(3000, () => {
    console.log("Server is running at 3000");
});
//# sourceMappingURL=index.js.map