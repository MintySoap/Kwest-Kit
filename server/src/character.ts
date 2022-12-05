import * as mongodb from "mongodb";
export interface Character {
    character_name: string;
    _id?: mongodb.ObjectId;
    user_id: mongodb.ObjectId;
    level: number;
    experience: number;
    strength: number;
    dexterity: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
    endurance: number;
}