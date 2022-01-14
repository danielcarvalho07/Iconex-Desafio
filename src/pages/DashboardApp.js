// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  PedidosConcluidos,
  TotalPedidos,
  KmPorDia,
  DadosPessoais,
  Quilometragem
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Iconex">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Bem Vindo, Nome</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} md={3}>
              <Quilometragem />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TotalPedidos />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <PedidosConcluidos />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <KmPorDia />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <DadosPessoais />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
