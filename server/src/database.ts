import * as mongodb from "mongodb";
import { User } from "./user";
import { Quest } from "./quest";
import { Character } from "./character";

export const collections: {
    users?: mongodb.Collection<User>;
    quests?: mongodb.Collection<Quest>;
    characters?: mongodb.Collection<Character>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();
    
    const db = client.db("Users");
    //await applySchemaValidation(db);
    
    const usersCollection = db.collection<User>("users");
    const questsCollection = db.collection<Quest>("quests");
    const charactersCollection = db.collection<Character>("characters");
    collections.users = usersCollection;
    collections.quests = questsCollection;
    collections.characters = charactersCollection;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
//note: we are using schema validation here but since we don't know what our final schema is gonna be like we're not gonna use it yet
//https://www.mongodb.com/docs/manual/core/schema-validation/ 
/*async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "unique username for the user",
                },
                //
                password: {
                    bsonType: "string",
                    description: "password for the user's account",
                    minLength: 6
                },
            },
        },
    };
    
    // Try applying the modification to the collection, if the collection doesn't exist, create it
    await db.command({
        collMod: "users",
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection("users", {validator: jsonSchema});
        }
    });
}*/
