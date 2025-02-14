const { DataTypes } = require("sequelize");
const db = require("../conx/db");

const Client = db.define("Client", {
    id_client: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING, allowNull: false },
    nom_ar: { type: DataTypes.STRING, allowNull: false },
    prenom: { type: DataTypes.STRING, allowNull: false },
    prenom_ar: { type: DataTypes.STRING, allowNull: false },
    cin: { type: DataTypes.INTEGER, allowNull: false, unique: true },
    date_cin: { type: DataTypes.DATE, allowNull: false },
    date_naiss: { type: DataTypes.DATE, allowNull: false },
    adresse: { type: DataTypes.STRING, allowNull: false },
    adresse_ar: { type: DataTypes.STRING, allowNull: false },
    num_tel: { type: DataTypes.INTEGER, allowNull: false },
    num_permis: { type: DataTypes.INTEGER, allowNull: false },
    date_permis: { type: DataTypes.DATE, allowNull: false },
    profession: { type: DataTypes.STRING, allowNull: false },
    profession_ar: { type: DataTypes.STRING, allowNull: false },
    nationalite: { type: DataTypes.STRING, allowNull: false },
    nationalite_ar: { type: DataTypes.STRING, allowNull: false }
}, {
    tableName: "client",
    timestamps: false
});

module.exports = Client;
