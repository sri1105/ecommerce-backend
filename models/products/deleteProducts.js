// Required modules
import constants from "../../constants.js";
import { response } from "../../controllers/controller.js";
import { deleteAll } from "../../db/crud.js";
import logger from "../../logger.js";

/**
 * Function which processes the request
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function processesRequest(req, res) {
  if (!Array.isArray(req.body.ids) || req.body.ids.length === 0) {
    processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
  } else {
    deleteProducts(req, res);
  }
}

/**
 * Function which delete the products
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function deleteProducts(req, res) {
  let ids = req.body.ids;

  deleteAll(constants.COLLECTIONS.PRODUCTS, {
    productId: {
      $in: ids,
    },
  }).then(
    function () {
        logger.debug(`Successfully deleted the products`);
        processesResponse(req, res, constants.STATUS_CODES.SUCCESS); 
    },
    function (error) {
      logger.error(`Unable to delete the products `, error);
      processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
    }
  );
}

/**
 * Function which processes the response
 * @param {Object} req Request body
 * @param {Object} res Response object
 * @param {Object} statusCode Response status code
 * @param {Object} data Reponse data
 */
function processesResponse(req, res, statusCode, data) {
  response(req, res, statusCode, data);
}

// Export
export { processesRequest as processesDeleteProductsRequest };
