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

function ModifierContract({ open, handleClose, contract, setContract, handleUpdateContract }) {
  const currentContract = contract || {};

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { height: '80vh', maxHeight: '100vh', overflowY: 'auto' } }}
    >
      <DialogTitle sx={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
        Modifier le Contrat
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2, p: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              {[
                { label: "Numéro Contrat", key: "num_contrat", readOnly: true },
                { label: "Date Début", key: "date_debut", type: "date" },
                { label: "Date Retour", key: "date_retour", type: "date" },
                { label: "Heure Début", key: "heure_debut", type: "time" },
                { label: "Heure Retour", key: "heure_retour", type: "time" },
                { label: "Lieu Départ", key: "lieu_depart" },
                { label: "Lieu Final", key: "lieu_final" },
                { label: "Durée Location", key: "duree_location" },
                { label: "Prolongation", key: "prolongation" }
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
          onClick={handleUpdateContract}
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

export default ModifierContract;
