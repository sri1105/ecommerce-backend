// Require modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../logger.js';

dotenv.config();

/**
 * Function which connect to the DB
 */
function connectDB () {
    return mongoose.connect(process.env.MONGO_DB_URI).then(function() {
       logger.info(`Successfully connected to database`);
    }, function(error) {
        logger.error(`Unable to connect to the database `,error);
    });  

}

// Export
export default connectDB;