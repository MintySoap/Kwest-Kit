import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { userRouter} from "./user.routes";
import {questRouter} from "./quest.routes"
import {characterRouter} from "./character.routes"


//question: for some reason I can only run this file using 'npx ts-node src/server.ts' from the server folder? not sure why I can't run from src
//answer: because I need to reference .env which isn't in src

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express();
        app.use(cors());
    
        app.use("/User", userRouter);
        app.use("/Quest", questRouter);
        app.use("/Character", characterRouter)

        // start the Express server
        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });
    
    })
    .catch(error => console.error(error));