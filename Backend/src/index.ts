import express from "express";
import * as z from "zod";
import mongoose from "mongoose";
import { Content, Users, Links } from "./db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { mongoPasswd, JWT_PASSWORD, HASHINGPASSWD } from "./secret.js";
import { verifying } from "./middleware.js";
import cors from 'cors'

const app = express();

mongoose.connect(mongoPasswd).then(() => {
    console.log("Database Connected");
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["token"],
  }))

enum errorStatus {
    succesfull = 200,
    clientError = 411,
    inputError = 403,
    serverError = 500,
}

//Signup Route
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
            bcrypt.hash(parsedResult.data.password, 1, async (err, hash) => {
                await Users.create({
                    username: parsedResult.data.username,
                    password: hash,
                });
            });

            res.status(errorStatus.succesfull).json({
                message : 'Sign up successfull'
            })
        } catch (e: any) {
            res.status(errorStatus.inputError).json({
                message: "Username exists",
            });
            console.error("db", e);
        }
    } else {
        const error = parsedResult.error.issues;
        const errorMessages = error.map((issue) => issue.message);
        res.status(errorStatus.clientError).json({
            message : errorMessages
        });
    }
});

//Signin Route
app.post("/api/v1/signin", async (req, res) => {
    const username: string = req.body.username;
    const password: string = req.body.password;

    const user = await Users.findOne({ username: username });

    if (user != null) {
        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                res.status(errorStatus.inputError).json({
                    message : 'Wrong Credentials'
                });
            } else {
                const token = jwt.sign(
                    {
                        id: user._id,
                    },
                    JWT_PASSWORD
                );
                res.status(errorStatus.succesfull)
                    .header("token", token).json({
                        message:'Successfully signed in'
                    })
            }
        });
    } else {
        res.status(errorStatus.clientError).json({
            message: "Username not found",
        });
    }
});

app.post("/api/v1/content", verifying, async (req: any, res: any) => {
    const { link, type, title } = req.body;

    try {
        await Content.create({
            title: title,
            link: link,
            type: type,
            userId: req.userId,
        });
        res.status(errorStatus.succesfull).json({
            message: "Content Added",
        });
    } catch (error) {
        res.status(errorStatus.serverError).json({
            message: "some error happened while adding content",
            error,
        });
    }
}); //adding new content

app.get("/api/v1/content", verifying, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await Content.find({ userId: userId }).populate(
        "userId",
        "username"
    );
    res.json(content); // Send the content as response
});

app.delete("/api/v1/content", verifying, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.params.contentId;

    await Content.deleteMany({ contentId, userId: userId });
    res.status(errorStatus.succesfull).json({ message: "Deleted" });
});

app.post("/api/v1/share", verifying, async (req, res) => {
    const { share } = req.body;
    //@ts-ignore
    const userId = req.userId;

    if (share) {
        const existingLink = await Links.findOne({ userId: userId });
        if (existingLink) {
            res.status(errorStatus.succesfull).json({
                message: "Link Created",
                Link: existingLink,
            });
            return;
        } else {
            const hash = jwt.sign(userId, JWT_PASSWORD);
            console.log(hash);
            await Links.create({
                link: hash,
                userId: userId,
            });
            res.status(errorStatus.succesfull).json({ link: hash });
        }
    } else {
        Links.deleteOne({ userId: userId });
        res.status(errorStatus.succesfull).send("Link deleted successfully");
    }
});

app.get("/api/v1/:shareLink",async (req, res) => {
    const hash = req.params.shareLink;
    const link = await Links.findOne({ link:hash });
    if (!link) {
        res.status(404).json({ message: "Invalid share link" }); // Send error if not found.
        return;
    }

    // Fetch content and user details for the shareable link.
    const content = await Content.find({ userId: link.userId });
    const user = await Users.findOne({ _id: link.userId });
    
    if (!user) {
        res.status(404).json({ message: "User not found" }); // Handle missing user case.
        return;
    }

    res.json({
        username: user.username,
        content
    }); // Send user and content details in response.
});

app.listen(3000, () => {
    console.log("Server is running at 3000");
});
