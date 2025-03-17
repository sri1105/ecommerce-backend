// Required modules
import constants from "../../constants.js";
import { response } from "../../controllers/controller.js";
import { getData } from "../../db/crud.js";
import logger from "../../logger.js";

/**
 * Function which processes the request
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function processesRequest(req, res) {
  if (!req.body || req.body.id) {
    processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
  } else {
    getProduct(req, res);
  }
}

/**
 * Function which pet the product for the given id
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function getProduct(req, res) {
  getData(constants.COLLECTIONS.PRODUCTS, {
    productId: req.body.id,
  }).then(
    function (records) {
      // Has records ?
      if (records !== null && records.length > 0 && records.length === 1) {
        records = records[0];
        processesResponse(req, res, constants.STATUS_CODES.SUCCESS, {
          product: {
            id: records.productId,
            name: records.name,
            image: records.url,
            stock: records.stock,
            price: records.price,
            updatedAt: moment(records.updatedAt).format("DD-MM-YYYY"),
          },
        });
      } else {
        processesResponse(req, res, constants.STATUS_CODES.INVALID_PRODUCT_ID);
      }
    },
    function (error) {
      logger.error(
        `Unable to find the product for the id ${req.body.id}`,
        error
      );
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
export { processesRequest as processesGetProductRequest };