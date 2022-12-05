import * as mongodb from "mongodb";
import { IndividualQuest } from "./individual-quest";

export interface Quest {
    list: IndividualQuest[],
    _id?: mongodb.ObjectId;
    user_id: mongodb.ObjectId;
}