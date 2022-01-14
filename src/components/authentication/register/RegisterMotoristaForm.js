import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

export default function RegisterMotoristaForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Muito Curto!')
      .max(50, 'Muito Longo!')
      .required('Primeiro nome requerido'),
    lastName: Yup.string()
      .min(2, 'Muito Curto!')
      .max(50, 'Muito Longo!')
      .required('Último nome requerido'),
    email: Yup.string().email('Email deve ser válido').required('Email é obrigatório'),
    password: Yup.string().required('Password é obrigatório'),
    cep: Yup.string().min(8, 'Muito Curto!').max(8, 'Muito Longo!').required('CEP requerido'),
    cpf: Yup.string().min(11, 'Muito Curto!').max(11, 'Muito Longo!').required('CEP requerido')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpf: '',
      cep: '',
      carro: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: () => {
      navigate('/dashboard', { replace: true });
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="Nome"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Sobrenome"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            autoComplete="cpf"
            label="CPF"
            {...getFieldProps('cpf')}
            {...getFieldProps('cpf')}
            error={Boolean(touched.cpf && errors.cpf)}
            helperText={touched.cpf && errors.cpf}
          />

          <TextField
            fullWidth
            autoComplete="cep"
            label="CEP"
            type="number"
            {...getFieldProps('CEP')}
            error={Boolean(touched.cep && errors.cep)}
            helperText={touched.cep && errors.cep}
          />

          <TextField
            fullWidth
            autoComplete="carro"
            label="Veículo"
            type="text"
            {...getFieldProps('carro')}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cadastro
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
