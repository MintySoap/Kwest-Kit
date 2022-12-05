import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";
import { BodyParser } from "body-parser";

export const characterRouter = express.Router();
characterRouter.use(express.json());

//gets all the characters
characterRouter.get("/", async (_req, res) => {
    try {
        const quests = await collections.characters.find({}).toArray();
        res.status(200).send(quests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

//gets a specific user based on their ObjectId
characterRouter.get("/:id", async (req, res) => {
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

//gets a specific user based on their ObjectId
characterRouter.get("/user/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { user_id: new mongodb.ObjectId(id) };
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
characterRouter.post("/", async (req, res) => {
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

//edits a character's level
characterRouter.put("/level/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {level: new_stat} });

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

//edits a character's experience
characterRouter.put("/exp/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {experience: new_stat} });

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an character: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`/Character/:id Failed to update an character 304: ID ${id}`);
        } else {
            res.status(304).send(`/Character/:id Failed to update an character 404: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send("wrong updating experience");
    }
});

//edits a character's strength
characterRouter.put("/strength/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {strength: new_stat} });

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

//edits a character's agility
characterRouter.put("/agility/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {agility: new_stat} });

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

//edits a character's intelligence
characterRouter.put("/intelligence/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {intelligence: new_stat} });

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

//edits a character's wisdom
characterRouter.put("/wisdom/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {wisdom: new_stat} });

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

//edits a character's charisma
characterRouter.put("/charisma/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {charisma: new_stat} });

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

//edits a character's endurance
characterRouter.put("/endurance/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const new_stat = req.body.stat_change;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.characters.updateOne(query, { $set: {endurance: new_stat} });

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
characterRouter.delete("/:id", async (req, res) => {
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
