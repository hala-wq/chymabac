import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, Grid, Card, CardContent, Divider } from "@mui/material";

function AfficherClient({ open, handleClose, selectedClient }) {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center', bgcolor: '#1976d2', color: 'white' }}>
        Détails du Client
      </DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        {selectedClient && (
          <Card variant="outlined" sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
            <CardContent>
              <Grid container spacing={1.4}>
                {[
                  { label: "Nom", value: selectedClient.nom },
                  { label: "Nom (Arabe)", value: selectedClient.nom_ar },
                  { label: "Prénom", value: selectedClient.prenom },
                  { label: "Prénom (Arabe)", value: selectedClient.prenom_ar },
                  { label: "CIN", value: selectedClient.cin },
                  { label: "Date CIN", value: selectedClient.date_cin },
                  { label: "Date de Naissance", value: selectedClient.date_naiss },
                  { label: "Adresse", value: selectedClient.adresse },
                  { label: "Adresse (Arabe)", value: selectedClient.adresse_ar },
                  { label: "Numéro de Téléphone", value: selectedClient.num_tel },
                  { label: "Numéro de Permis", value: selectedClient.num_permis },
                  { label: "Date de Permis", value: selectedClient.date_permis },
                  { label: "Profession", value: selectedClient.profession },
                  { label: "Profession (Arabe)", value: selectedClient.profession_ar },
                  { label: "Nationalité", value: selectedClient.nationalite },
                  { label: "Nationalité (Arabe)", value: selectedClient.nationalite_ar },
                ].map((item, index) => (
                  <React.Fragment key={index}>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {item.label} :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1" sx={{ color: '#555' }}>
                        {item.value || "Non spécifié"}
                      </Typography>
                    </Grid>
                    {index % 2 !== 0 && <Grid item xs={10}><Divider /></Grid>}
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" sx={{ bgcolor: "#1976d2", color: "white", fontWeight: "bold", '&:hover': { bgcolor: "#1565c0" } }}>
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AfficherClient;