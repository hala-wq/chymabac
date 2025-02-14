import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Divider
} from "@mui/material";

function AfficherContract({ open, handleClose, selectedContract }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle
        sx={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          textAlign: "center",
          bgcolor: "#1976d2",
          color: "white",
        }}
      >
        Détails du Contrat
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {selectedContract && (
          <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Grid container spacing={1.4}>
                {[
                  { label: "Numéro Contrat", value: selectedContract.num_contrat },
                  { label: "Date Début", value: selectedContract.date_debut },
                  { label: "Date Retour", value: selectedContract.date_retour },
                  { label: "Heure Début", value: selectedContract.heure_debut },
                  { label: "Heure Retour", value: selectedContract.heure_retour },
                  { label: "Lieu Départ", value: selectedContract.lieu_depart },
                  { label: "Lieu Final", value: selectedContract.lieu_final },
                  { label: "Durée Location", value: selectedContract.duree_location },
                  { label: "Prolongation", value: selectedContract.prolongation },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color: "#333" }}>
                        {item.label} :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ color: "#555" }}>
                        {item.value || "Non spécifié"}
                      </Typography>
                    </Grid>
                    {index % 2 !== 0 && <Grid item xs={12}><Divider /></Grid>}
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      <DialogActions sx={{ padding: 2, justifyContent: "flex-end" }}>
        <Button
          onClick={handleClose}
          color="primary"
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            color: "white",
            px: 3,
            py: 1.5,
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AfficherContract;
