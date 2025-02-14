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

function AjouterContract({ open, handleClose, newContract, setNewContract, handleAddContract }) {
  const handleChange = (field) => (event) => {
    setNewContract({ ...newContract, [field]: event.target.value });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.4rem', fontWeight: 'bold', textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
        Ajouter un Contrat
      </DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Grid container spacing={2}>
            {[
              { label: "Numéro Contrat", field: "num_contrat" },
              { label: "Date Début", field: "date_debut", type: "date" },
              { label: "Date Retour", field: "date_retour", type: "date" },
              { label: "Heure Début", field: "heure_debut", type: "time" },
              { label: "Heure Retour", field: "heure_retour", type: "time" },
              { label: "Lieu Départ", field: "lieu_depart" },
              { label: "Lieu Final", field: "lieu_final" },
              { label: "Durée Location", field: "duree_location" },
              { label: "Prolongation", field: "prolongation" },
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
        <Button onClick={handleAddContract} color="primary" variant="contained" sx={{ bgcolor: "#1976d2", color: "white", px: 3, py: 1.5, '&:hover': { bgcolor: "#1565c0" } }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AjouterContract;