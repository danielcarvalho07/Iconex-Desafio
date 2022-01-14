import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack, Button, Divider, Box, Card, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import RegisterMotoristaForm from '../components/authentication/register/RegisterMotoristaForm';
import RegisterCompanhiaForm from '../components/authentication/register/RegisterCompanhiaForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Register() {
  const [Active, setActive] = useState('');

  return (
    <RootStyle title="Registrar">
      <AuthLayout>
        Já tem uma conta? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/login">
          Login
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            Veja seus dados na dashboard
          </Typography>
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Cadastre-se.
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Button
              onClick={() => setActive('COMPANHIA')}
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
            >
              Sou companhia
            </Button>

            <Button
              onClick={() => setActive('MOTORISTA')}
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
            >
              Sou Motorista
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Preencha
            </Typography>
          </Divider>

          {Active === 'MOTORISTA' && <RegisterMotoristaForm />}
          {Active === 'COMPANHIA' && <RegisterCompanhiaForm />}

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Já tem uma conta?&nbsp;
              <Link to="/login" component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
