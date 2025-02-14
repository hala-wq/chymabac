const Client = require("../Model/ClientModel");

const getClientServices = async () => {
    try {
        return await Client.findAll();
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
};

const addClientServices = async (body) => {
    try {
        const exists = await Client.findOne({ where: { cin: body.cin } });
        if (exists) {
            throw new Error("Le client avec ce numéro de CIN existe déjà.");
        }
        return await Client.create(body);
    } catch (error) {
        console.error("Error adding client:", error);
        throw error;
    }
};

const getClientByCinServices = async (cin) => {
    try {
        return await Client.findOne({ where: { cin: cin } });
    } catch (error) {
        console.error("Error fetching client by CIN:", error);
        throw error;
    }
};

const updateClientService = async (cin, body) => {
    try {
        const [updated] = await Client.update(body, { where: { cin: cin } });
        return updated ? await Client.findOne({ where: { cin: cin } }) : null;
    } catch (error) {
        console.error("Error updating client:", error);
        throw error;
    }
};

const deleteClientService = async (cin) => {
    try {
        const deleted = await Client.destroy({ where: { cin: cin } });
        return deleted ? true : false;
    } catch (error) {
        console.error("Error deleting client:", error);
        throw error;
    }
};

module.exports = {
    getClientServices,
    addClientServices,
    getClientByCinServices,
    updateClientService,
    deleteClientService
};
