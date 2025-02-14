import React, { useState, useEffect } from "react";
import { Box, useTheme, Button, Snackbar, Alert } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { tokens } from "../../theme";
import { Header } from "../../components";
import AjouterContract from "./AjouterContrat";
import ModifierContract from "./ModifierContract";
import AfficherContract from "./AfficherContrat";
import { useAuth } from "../context/AuthContext";

const Contract = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { role } = useAuth();

  const initialContractState = () => ({
    date_debut: "",
    date_retour: "",
    heure_debut: "", // Use id_categorie instead of catégorie
    heure_retour: "",
    lieu_depart: "",
    lieu_final: "",
    duree_location: "",
    prolongation: "",
    num_contrat: "",
    id_client :"",
    id_vehicule:"",
    id_avance:"",
  });

  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newContract, setNewContract] = useState(initialContractState());
  const [contractToEdit, setContractToEdit] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [client, setClient] = useState([]);
  const [vehicule, setVehicule] = useState([]);
  const [avance, setAvance] = useState([]);
  //recupp
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7001/contract");
      setData(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des contracts", error);
      setSnackbarMessage("Erreur lors de la récupération des contracts");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);




  const handleAddContract = async () => {
    if (Object.values(newContract).some(field => field === "")) {
      setSnackbarMessage("Veuillez remplir tous les champs.");
      setSnackbarOpen(true);
      return;
    }

    console.log("Envoi des données :", newContract);  // Ajoute un log pour vérifier les données envoyées

    try {
      const response = await axios.post("http://localhost:7001/contract", newContract);
      setData((prevData) => [...prevData, response.data]);
      setSnackbarMessage("Contract ajouté avec succès !");
      setSnackbarOpen(true);
      handleAddClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout du contract:", error);
      setSnackbarMessage("Erreur lors de l'ajout du contract");
      setSnackbarOpen(true);
    }
  };




  const handleAddOpen = () => setOpenAddDialog(true);
  const handleAddClose = () => {
    setOpenAddDialog(false);
    setNewContract(initialContractState());
  };

  const handleOpen = (contract) => {
    setSelectedContract(contract);
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedContract(null);
  };


  const handleEdit = (contract) => {
    setContractToEdit(contract);
    setOpenEdit(true);
  };


  const handleCloseEdit = () => {
    setOpenEdit(false);
    setContractToEdit(null);
  };

  const handleUpdateContract= async () => {
    if (!cont) {
      setSnackbarMessage("Aucun contract à mettre à jour");
      setSnackbarOpen(true);
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:7001/contract/${contractToEdit.num_contrat}`,
        contractToEdit
      );
      setData((prevData) =>
        prevData.map((client) =>
          contract.num_contrat === contractToEdit.num_contrat ? response.data : contract
        )
      );
      setSnackbarMessage("modifié avec succès !");
      setSnackbarOpen(true);
      handleCloseEdit();
    } catch (error) {
      console.error("Erreur lors de la mise à jour du contract", error);
      setSnackbarMessage("Erreur lors de la mise à jour du contract");
      setSnackbarOpen(true);
    }
  };

  const handleDelete = async (num_contrat) => {
    try {
      await axios.delete(`http://localhost:7001/contract/${num_contrat}`);
      setData((prevData) => prevData.filter((contract) => contract.num_contrat !== num_contrat));
      setSnackbarMessage("contract supprimé avec succès !");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Erreur lors de la suppression du contract", error);
      setSnackbarMessage("Erreur lors de la suppression du contract");
      setSnackbarOpen(true);
    }
  };




  const handleSnackbarClose = () => setSnackbarOpen(false);

  const columns = [
    { field: "num_contrat", headerName: "Numéro Contract", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => (
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" sx={{ backgroundColor: "#3d59d5", color: "white", marginRight: 2 }} onClick={() => handleOpen(params.row)}>
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
              <Button variant="contained" color="error" onClick={() => handleDelete(params.row.num_contrat)}>
                Supprimer
              </Button>
            </>
          )}
        </Box>
      ),
    }
  ];
  return (
    <Box m="20px">
      <Header title="Véhicules" />
      {role === "admin" && (
        <Button variant="contained" sx={{ backgroundColor: "#3c55e2", color: "white" }}
          onClick={handleAddOpen}
        >
          Ajouter un contract
        </Button>
      )}
      <Box
        mt="30px"
        height="70vh"
        width="150vh"
        flex={1}
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { border: "none" },
          "& .name-column--cell": { color: colors.greenAccent[300] },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#6da5ee",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "#6da5ee",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-iconSeparator": {
            color: colors.primary[100],
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.gray[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.num_contrat}
          components={{ Toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
        />
      </Box>

      <AfficherContract open={open} handleClose={handleClose} selectedContract={selectedContract} />
      <AjouterContract
        open={openAddDialog}
        handleClose={handleAddClose}
        newContract={newContract}
        setNewContract={setNewContract}
        client={client}
        vehicule={vehicule}
        avance={avance}
        handleAddContract={handleAddContract} // Assurez-vous de passer la fonction ici
      />
      <ModifierContract
        open={openEdit}
        handleClose={handleCloseEdit}
        contract={contractToEdit}
        setcontract={setContractToEdit}
        handleUpdateContract={handleUpdateContract}
        client={client}
        vehicule={vehicule}
        avance={avance}
      />
      <Snackbar open={snackbarOpen} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
export default Contract;