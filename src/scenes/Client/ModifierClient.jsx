import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Card,
  CardContent
} from '@mui/material';

function ModifierClient({ open, handleClose, client, setClient, handleUpdateClient }) {
  const currentClient = client || {};

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="md" 
      fullWidth
      sx={{ '& .MuiDialog-paper': { height: '80vh', maxHeight: '100vh', overflowY: 'auto' } }}
    >
      <DialogTitle sx={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
        Modifier le Client
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              {[ 
                { label: "Numéro CIN", key: "cin", readOnly: true },
                { label: "Nom", key: "nom" },
                { label: "Prénom", key: "prenom" },
                { label: "Numéro Téléphone", key: "num_tel" },
                { label: "Adresse", key: "adresse" },
                { label: "Date de Naissance", key: "date_naiss", type: "date" },
                { label: "Numéro Permis", key: "num_permis" },
                { label: "Date Permis", key: "date_permis", type: "date" },
                { label: "Profession", key: "profession" },
                { label: "Nationalité", key: "nationalite" }
              ].map((field, index) => (
                <Grid item xs={6} key={index}>
                  <TextField
                    label={field.label}
                    type={field.type || "text"}
                    fullWidth
                    variant="outlined"
                    value={currentClient[field.key] || ""}
                    onChange={(e) => !field.readOnly && setClient({ ...currentClient, [field.key]: e.target.value })}
                    InputLabelProps={field.type === "date" ? { shrink: true } : {}}
                    InputProps={field.readOnly ? { readOnly: true } : {}}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          onClick={handleUpdateClient} 
          variant="contained" 
          sx={{ bgcolor: "#1976d2", color: "white", px: 3, py: 1.5, '&:hover': { bgcolor: "#1565c0" } }}
        >
          Modifier
        </Button>
        <Button 
          onClick={handleClose} 
          variant="contained" 
          sx={{ bgcolor: "#d32f2f", color: "white", px: 3, py: 1.5, '&:hover': { bgcolor: "#b71c1c" } }}
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ModifierClient;