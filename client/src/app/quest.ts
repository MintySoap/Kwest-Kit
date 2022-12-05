import { IndividualQuest } from "./individual-quest";

export interface Quest {
    list?: IndividualQuest[];
    _id?: string;
    user_id?: string;
}