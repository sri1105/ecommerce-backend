import constants from "../constants.js";
import logger from "../logger.js";
import { getFunction } from "./utils.js";

/**
 * Function which processes the request
 * @param {Object} req Request object
 * @param {Object} res Response object
 */
function processesRequest(req, res) {
  let endpoint = (req.url || "").split("/").pop();

  if (endpoint.includes("?")) {
    endpoint = endpoint.split("?")[0];
  }

  let fn = getFunction(endpoint);

  if (fn) {
    fn(req, res);
  } else {
    sendSystemError(req, res);
  }
}

/**
 * Function which processes the response
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {Number} statusCode Response status code
 * @param {Object} data
 */
function processesResponse(req, res, statusCode, data) {
  let serviceName = (req.url || "").split("/").pop();

  if (serviceName.includes("?")) {
    serviceName = serviceName.split("?")[0];
  }

  if (typeof data !== "object") {
    data = {};
  }

  getStatusMessage(serviceName, statusCode).then(
    function (message) {
      data.code = statusCode;
      data.message = message;

      res.status(200).json(data);
    },
    function (error) {
      logger.error(`Unable to get status message for ${serviceName} `, error);
      sendSystemError(req, res);
    }
  );
}

/**
 * Function which sends system error
 * @param {Object} req Request body
 * @param {Object} res Response object
 */
function sendSystemError(req, res) {
  res.status(500).json({
    message: constants.SYSTEM_MESSAGES.SYSTEM_ERROR,
  });
}

// Export
export { processesRequest, processesResponse as response };
