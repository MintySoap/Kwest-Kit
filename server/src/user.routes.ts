import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const userRouter = express.Router();
userRouter.use(express.json());


//Note:Users functions
//used to get all of the users
userRouter.get("/", async (_req, res) => {
    try {
        const users = await collections.users.find({}).toArray();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//gets a specific user based on their ObjectId
userRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const user = await collections.users.findOne(query);
        if (user) {
            res.status(200).send(user);
        } else {
            res.status(404).send(`/:id Failed to find an user: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`error /:id Failed to find an user: ID ${req?.params?.id}`);
    }
});

userRouter.get("/verify/:username/:password", async(req, res) => {
    try {
        const username = req?.params?.username;
        const password = req?.params?.password;
        const query = { username: username, password: password};
        const user = await collections.users.findOne(query);
        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`ERROR /verify/:username/:password Failed to find an user: username ${req?.params?.username}`);
    }
});

//makes a new user
userRouter.post("/", async (req, res) => {
    try {
        const user = req.body;
        const result = await collections.users.insertOne(user);

        if (result.acknowledged) {
            res.status(201).send(`Created a new user: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("error / Failed to create a new user. uwu");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//edits a new user
userRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const user = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.users.updateOne(query, { $set: user });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an user: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to update an user: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an user: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

//deletes a user
userRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.users.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed an user: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an user: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to remove an user: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});




//Note:Characters functions

//gets all the characters
userRouter.get("/Character", async (_req, res) => {
    try {
        const quests = await collections.characters.find({}).toArray();
        res.status(200).send(quests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//gets a specific user based on their ObjectId
userRouter.get("/Character/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const character = await collections.characters.findOne(query);
        if (character) {
            res.status(200).send(character);
        } else {
            res.status(404).send(`/Character/:id Failed to find the character: ID ${id}`);
        }
    } catch (error) {
        res.status(404).send(`error /Character/:id Failed to find the character: ID ${req?.params?.id}`);
    }
});

//makes a new user
userRouter.post("/Character", async (req, res) => {
    try {
        const character = req.body;
        const result = await collections.characters.insertOne(character);

        if (result.acknowledged) {
            res.status(201).send(`Created a new character: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("/Character Failed to create a new character. uwu");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//edits a new user
userRouter.put("/Character/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const character = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: character });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an character: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`/Character/:id Failed to update an character 304: ID ${id}`);
        } else {
            res.status(304).send(`/Character/:id Failed to update an character 404: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

//deletes a user
userRouter.delete("/Character/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a character: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`/Character/:id Failed to remove a character 400: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`/Character/:id Failed to find a character 404: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
