// Required modules
import moment from "moment";
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
  getProducts(req, res);
}

/**
 * Function which gets the available products
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function getProducts(req, res) {
  getData(constants.COLLECTIONS.PRODUCTS, {}).then(
    function (records) {
      // Has records ?
      if (records !== null && records.lenght > 0) {
        processesResponse(req, res, constants.STATUS_CODES.SUCCESS, {
            products: records.map((record) => {
                return {
                    id: record.productId,
                    name: record.name,
                    image: record.url,
                    stock: record.stock,
                    price: record.price,
                    updatedAt: moment(record.updatedAt).format('DD-MM-YYYY')
                }
            }),
        });
      } else {
        processesResponse(req, res, constants.STATUS_CODES.SUCCESS, {
          products: [],
        });
      }
    },
    function (error) {
      logger.error(`Unable to get the products `, error);
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

export { processesRequest as processesGetProductsRequest };
