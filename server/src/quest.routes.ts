import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const questRouter = express.Router();
questRouter.use(express.json());


//gets all quests in the collection
questRouter.get("/", async (_req, res) => {
    try {
        const quests = await collections.quests.find({}).toArray();
        res.status(200).send(quests);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


//gets specific quest based on quest id
questRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const quest = await collections.quests.findOne(query);
        if (quest) {
            res.status(200).send(quest);
        } else {
            res.status(404).send(`/Quest/:id Failed to find the quest: ID ${id}`);//error: something went wrong here?
        }
    } catch (error) {
        res.status(404).send(`error /Quest/:id Failed to find the quest for getQuestID: ID ${req?.params?.id}`);
    }
});

//gets a specific quest based on the object id of the associated user
questRouter.get("/User/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { user_id: new mongodb.ObjectId(id) };
        const quest = await collections.quests.findOne(query);
        if (quest) {
            res.status(200).send(quest);
        } else {
            res.status(404).send(`/Quest/User/:id Failed to find the quest list: IDd ${id}`);
        }
    } catch (error) {
        res.status(404).send(`error /Quest/User/:id Failed to find the quest list: IDD ${req?.params?.id}`);
    }
});

//makes a new quest
questRouter.post("/post", async (req, res) => {
    try {
        var quest = req.body;
        quest.user_id = new mongodb.ObjectId(quest.user_id);
        const result = await collections.quests.insertOne(quest);

        if (result.acknowledged) {
            res.status(201).send(`Created a new quest: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("/Quest Failed to create a new quest. uwu");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//edits a quest
questRouter.put("/put/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const newList = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.quests.updateOne(query, { $set: {list: newList} });

        console.log(result);
        console.log(result.matchedCount);

        if (result && result.matchedCount) {
            res.status(200).send(`Updated an quest: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`/Quest/:id Failed to update an quest 404: ID ${id}`);
        } else {
            res.status(304).send(`/Quest/:id Failed to update an quest 304: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

//deletes a quest
questRouter.delete("/delete/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.quests.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Removed a quest: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`/Quest/:id Failed to remove a quest: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`/Quest/:id Failed to remove a quest: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});