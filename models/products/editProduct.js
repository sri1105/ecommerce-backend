// Required modules
import moment from "moment";
import constants from "../../constants.js";
import { response } from "../../controllers/controller.js";
import { getData, update } from "../../db/crud.js";
import logger from "../../logger.js";

/**
 * Function which processes the request
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function processesRequest(req, res) {
  let body = req.body;

  if (!body.id) {
    processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
  } else if (
    !body.name &&
    !body.description &&
    !body.url &&
   ( !body.stock || 
    typeof body.stock !== "number") &&
   ( !body.price ||
    typeof body.price !== "number")
  ) {
    processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
  } else {
    updateProduct(req, res);
  }
}

/**
 * Function which update the product data
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function updateProduct(req, res) {
  let body = req.body,
    data = {
      updatedAt: moment().toDate(),
    };

  if (body.name) {
    data.name = (body.name || "").toString();
  }

  if (body.url) {
    data.url = (body.url || "").toString();
  }

  if (body.description) {
    data.description = (body.description || "").toString();
  }

  if (body.stock) {
    data.stock = parseInt(body.stock || 1, 10);
  }

  if (body.price) {
    data.price = parseFloat(body.price || 1, 10);
  }

  update(
    constants.COLLECTIONS.PRODUCTS,
    {
      productId: body.id,
    },
    data
  ).then(
    function () {
      logger.debug(`Successfully updated the product ${body.id} `);
      getProduct(req, res);
    },
    function (error) {
      logger.error(`Unable to update the product ${body.id} `, error);
      processesResponse(req, res, constants.STATUS_CODES.SYSTEM_ERROR);
    }
  );
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

export { processesRequest as processesEditProductRequest };
