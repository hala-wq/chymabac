const {
    getClientServices,
    addClientServices,
    getClientByCinServices,
    updateClientService,
    deleteClientService
} = require("../Services/ClientServices");

const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({ statusCode, message, data });
};

const getClient = async (req, res) => {
    try {
        const data = await getClientServices();
        return handleResponse(res, data.length > 0 ? 200 : 404, data.length > 0 ? "Clients retrieved successfully" : "No clients found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving clients", { error: error.message });
    }
};

const addClient = async (req, res) => {
    try {
        const data = await addClientServices(req.body);
        return handleResponse(res, 201, "Client added successfully", data);
    } catch (error) {
        return handleResponse(res, 400, error.message, null);
    }
};

const getClientByCin = async (req, res) => {
    try {
        const data = await getClientByCinServices(req.params.cin);
        return handleResponse(res, data ? 200 : 404, data ? "Client retrieved successfully" : "Client not found", data);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while retrieving client", { error: error.message });
    }
};

const updateClient = async (req, res) => {
    try {
        const { cin } = req.params;
        const updatedClient = await updateClientService(cin, req.body);
        return handleResponse(res, updatedClient ? 200 : 404, updatedClient ? "Client updated successfully" : "Client not found", updatedClient);
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while updating client", { error: error.message });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { cin } = req.params;
        const client = await getClientByCinServices(cin);
        if (!client) {
            return handleResponse(res, 404, "Client not found");
        }
        await deleteClientService(cin);
        return handleResponse(res, 200, "Client deleted successfully");
    } catch (error) {
        return handleResponse(res, 500, "An error occurred while deleting client", { error: error.message });
    }
};

module.exports = {
    getClient,
    addClient,
    getClientByCin,
    updateClient,
    deleteClient
};
