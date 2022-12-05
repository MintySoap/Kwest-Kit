import * as mongodb from "mongodb";
export interface User {
    username: string;
    password: string;
    characters_id: mongodb.ObjectId;
    quests_id?: mongodb.ObjectId;
    _id?: mongodb.ObjectId;
}
