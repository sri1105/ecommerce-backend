// Required modules
import { customAlphabet } from "nanoid";

/**
 * Function which generate id for the given length
 * @param {Number} length Lenght of the id to be generated
 */
function generateId(length) {
    return customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', (length || 10))();
}

export {
    generateId
};