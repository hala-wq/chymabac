import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import AjouteClient from "../Client/AjouteClient";
import ModifierClient from "../Client/ModifierClient";
import AfficherClient from "../Client/AfficherClient";
import { tokens } from "../../theme";
import { Header } from "../../components";
import { useAuth } from "../context/AuthContext";

const Client = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { role } = useAuth(); // Récupération du rôle de l'utilisateur

  // État initial d'un client
  const initialClientState = () => ({
    id_client: "", // Assurez-vous que cette valeur est bien remplie avant d'envoyer
    nom: "",
    nom_ar: "",
    prenom: "",
    prenom_ar: "",
    cin: "",
    date_cin: "",
    date_naiss: "",
    adresse: "",
    adresse_ar: "",
    num_tel: "",
    num_permis: "",
    date_permis: "",
    profession: "",
    profession_ar: "",
    nationalite: "",
    nationalite_ar: "",
  });
  
  // États
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newClient, setNewClient] = useState(initialClientState());
  const [clientToEdit, setClientToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  // Récupérer les données des clients
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7001/client");
      setData(response.data.data); // Mettre à jour l'état avec les données reçues
    } catch (error) {
      console.error("Erreur lors de la récupération des clients", error);
      setSnackbarMessage("Erreur lors de la récupération des clients");
      setSnackbarOpen(true);
    }
  };

  // Effet pour charger les données au montage du composant
  useEffect(() => {
    fetchData();
  }, []);

  const handleAddClient = async () => {
    if (Object.values(newClient).some(field => field === "")) {
      setSnackbarMessage("Veuillez remplir tous les champs.");
      setSnackbarOpen(true);
      return;
    }
  
    console.log("Envoi des données :", newClient);  // Ajoute un log pour vérifier les données envoyées
  
    try {
      const response = await axios.post("http://localhost:7001/client", newClient);
      setData((prevData) => [...prevData, response.data]);
      setSnackbarMessage("Client ajouté avec succès !");
      setSnackbarOpen(true);
      handleAddClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du client:", error);
      setSnackbarMessage("Erreur lors de l'ajout du client");
      setSnackbarOpen(true);
    }
  };
  
  

  // Ouvrir/fermer le dialogue d'ajout
  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewClient(initialClientState());
  };

  // Ouvrir/fermer le dialogue de visualisation
  const handleOpen = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  // Ouvrir/fermer le dialogue de modification
  const handleEdit = (client) => {
    setClientToEdit(client);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setClientToEdit(null);
  };

  // Mettre à jour un client
  const handleUpdateClient = async () => {
    if (!clientToEdit) {
      setSnackbarMessage("Aucun client à mettre à jour");
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:7001/client/${clientToEdit.cin}`,
        clientToEdit
      );
      setData((prevData) =>
        prevData.map((client) =>
          client.cin === clientToEdit.cin ? response.data : client
        )
      );
      setSnackbarMessage("Client modifié avec succès !");
      setSnackbarOpen(true);
      handleCloseEdit();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du client", error);
      setSnackbarMessage("Erreur lors de la mise à jour du client");
      setSnackbarOpen(true);
    }
  };

  // Supprimer un client
  const handleDelete = async (cin) => {
    try {
      await axios.delete(`http://localhost:7001/client/${cin}`);
      setData((prevData) => prevData.filter((client) => client.cin !== cin));
      setSnackbarMessage("Client supprimé avec succès !");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du client", error);
      setSnackbarMessage("Erreur lors de la suppression du client");
      setSnackbarOpen(true);
    }
  };

  // Fermer le Snackbar
  const handleSnackbarClose = () => setSnackbarOpen(false);

  // Colonnes du DataGrid
  const columns = [
    { field: "cin", headerName: "Numéro Cin", width: 180 },
    { field: "nom", headerName: "Nom", width: 150 },
    { field: "prenom", headerName: "Prénom", width: 180 },
    { field: "num_tel", headerName: "Numéro Tel", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            sx={{ backgroundColor: "#3d59d5", color: "white", marginRight: 2 }}
            onClick={() => handleOpen(params.row)}
          >
            Voir
          </Button>
          {role === "admin" && (
            <>
              <Button
                variant="contained"
                sx={{ bgcolor: "#3db351", color: "white", marginRight: 2 }}
                onClick={() => handleEdit(params.row)}
              >
                Modifier
              </Button>
              <Button variant="contained" color="error" onClick={() => handleDelete(params.row.cin)}>
                Supprimer
              </Button>
            </>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="Client" />
      {role === "admin" && (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#3c55e2", color: "white" }}
          onClick={handleAddOpen}
        >
          Ajouter un client
        </Button>
      )}
      <Box mt="30px" height="70vh" width="150vh">
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.cin}
          components={{ Toolbar: GridToolbar }}
          pageSizeOptions={[10]}
          checkboxSelection
        />
      </Box>

      {/* Composants modaux */}
      <AfficherClient open={open} handleClose={handleClose} selectedClient={selectedClient} />
      <AjouteClient open={openAddDialog} handleClose={handleAddClose} newClient={newClient} setNewClient={setNewClient} handleAddClient={handleAddClient} />
      <ModifierClient open={openEdit} handleClose={handleCloseEdit} client={clientToEdit} setClient={setClientToEdit} handleUpdateClient={handleUpdateClient} />

      {/* Snackbar pour les notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Client;