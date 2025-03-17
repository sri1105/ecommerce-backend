// Required modules
import moment from "moment";
import constants from "../../constants.js";
import { response } from "../../controllers/controller.js";
import { getData, insert } from "../../db/crud.js";
import logger from "../../logger.js";
import { generateId } from "../globalUtils.js";

/**
 * Function which processes the request
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function processesRequest(req, res) {
  let body = req.body;

  if (
    !body.name ||
    !body.description ||
    !body.url ||
    !body.stock ||
    typeof body.stock !== "number" ||
    !body.price ||
    typeof body.price !== "number"
  ) {
    processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
  } else {
    addProduct(req, res);
  }
}

/**
 * Function which genrates the product id
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function generateProductId(req, res) {
  let id = generateId(6);

  getData(constants.COLLECTIONS.PRODUCTS, {
    productId: id,
  }).then(
    function (records) {
      if (records !== null && records.length > 0) {
        generateProductId(req, res);
      } else {
        addProduct(req, res);
      }
    },
    function (error) {
      logger.error(`Unable to find the product `, error);
      processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
    }
  );
}

/**
 * Function which add the product
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function addProduct(req, res, productId) {
  let body = req.body,
    time = moment().toDate(),
    data = {
      productId: productId,
      name: (body.name || "").toString(),
      description: (body.description || "").toString(),
      url: (body.url || "").toString(),
      stock: parseInt(body.stock || 1, 10),
      price: parseFloat(body.price || 0, 10),
      createdAt: time,
      updatedAt: time,
    };

  insert(constants.COLLECTIONS.PRODUCTS, data).then(
    function () {
      logger.debug(`Successfully inserted the product for ${productId}`);
      processesResponse(req, res, constants.STATUS_CODES.SUCCESS, data);
    },
    function (error) {
      logger.error(`Unable to insert the product for ${productId} `, error);
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
export { processesRequest as processesAddProductRequest };
