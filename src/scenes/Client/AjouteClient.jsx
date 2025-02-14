import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Paper
} from '@mui/material';

function AjouteClient({ open, handleClose, newClient, setNewClient, handleAddClient }) {
  const handleChange = (field) => (event) => {
    setNewClient({ ...newClient, [field]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
        Ajouter un Client
      </DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            {[
              { label: "Nom", field: "nom" },
              { label: "Nom (Arabe)", field: "nom_ar" },
              { label: "Prénom", field: "prenom" },
              { label: "Prénom (Arabe)", field: "prenom_ar" },
              { label: "CIN", field: "cin" },
              { label: "Date CIN", field: "date_cin", type: "date" },
              { label: "Date de Naissance", field: "date_naiss", type: "date" },
              { label: "Adresse", field: "adresse" },
              { label: "Adresse (Arabe)", field: "adresse_ar" },
              { label: "Numéro de Téléphone", field: "num_tel" },
              { label: "Numéro de Permis", field: "num_permis" },
              { label: "Date de Permis", field: "date_permis", type: "date" },
              { label: "Profession", field: "profession" },
              { label: "Profession (Arabe)", field: "profession_ar" },
              { label: "Nationalité", field: "nationalite" },
              { label: "Nationalité (Arabe)", field: "nationalite_ar" }
            ].map(({ label, field, type }) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label={label}
                  type={type || "text"}
                  value={newClient[field] || ""}
                  onChange={handleChange(field)}
                  InputLabelProps={type === "date" ? { shrink: true } : {}}
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: "flex-end" }}>
        <Button onClick={handleClose} color="error" variant="outlined" sx={{ bgcolor: "#d32f2f", color: "white", px: 3, py: 1.5, '&:hover': { bgcolor: "#b71c1c" } }}>
          Annuler
        </Button>
        <Button onClick={handleAddClient} color="primary" variant="contained" sx={{ bgcolor: "#1976d2", color: "white", px: 3, py: 1.5, '&:hover': { bgcolor: "#1565c0" } }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AjouteClient;