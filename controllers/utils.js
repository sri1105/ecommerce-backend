// Required modules
import { processesAddProductRequest } from "../models/products/addproduct.js";
import { processesEditProductRequest } from "../models/products/editproduct.js";
import { processesDeleteProductsRequest } from "../models/products/deleteproducts.js";
import { processesGetProductsRequest } from "../models/products/getProducts.js";
import { processesGetProductRequest } from "../models/products/getProduct.js";

/**
 * Function which return a function to processes the incoming
 * request for the end point
 * @param {String} endPoint URL end point
 */
function getFunction(endPoint) {
    switch(endPoint) {
        case 'addProduct':
            return processesAddProductRequest;
            break;
        case 'editproduct':
            return processesEditProductRequest;
            break;
        case 'deleteProducts':
            return processesDeleteProductsRequest;
            break;
        case 'getProducts':
            return processesGetProductsRequest;
            break;
        case 'getProduct':
            return processesGetProductRequest;
            break;
        default:
            return;
    }
}

// Export
export {
    getFunction
};