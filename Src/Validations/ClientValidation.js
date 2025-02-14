const joi = require("joi");

const createClientSchema = joi.object({
    id_client: joi.number().optional(), // Auto-incrémenté en BDD
    nom: joi.string().required(),
    nom_ar: joi.string().required(),
    prenom: joi.string().required(),
    prenom_ar: joi.string().required(),
    cin: joi.number().required(),
    date_cin: joi.date().required(),
    date_naiss: joi.date().required(),
    adresse: joi.string().required(),
    adresse_ar: joi.string().required(),
    num_tel: joi.number().required(),
    num_permis: joi.number().required(),
    date_permis: joi.date().required(),
    profession: joi.string().required(),
    profession_ar: joi.string().required(),
    nationalite: joi.string().required(),
    nationalite_ar: joi.string().required(),
}).unknown(true);

const findIdClientSchema = joi.object({
    cin: joi.number().required()
});

exports.findIdClientSchema = findIdClientSchema;
exports.createClientSchema = createClientSchema;
