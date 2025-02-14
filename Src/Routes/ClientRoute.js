const express = require("express");
const { validateParams, validateBody } = require("../Middleware/Validation");
const { findIdClientSchema, createClientSchema } = require("../Validations/ClientValidation");
const router = express.Router();
const {
    getClient,
    addClient,
    getClientByCin,
    updateClient,
    deleteClient
} = require("../Controllers/ClientController");

// Routes
router.get("/", getClient);
router.post("/", validateBody(createClientSchema), addClient);
router.get("/:cin", validateParams(findIdClientSchema), getClientByCin);
router.put("/:cin", validateParams(findIdClientSchema), validateBody(createClientSchema), updateClient);
router.delete("/:cin", validateParams(findIdClientSchema), deleteClient);

module.exports = router;
