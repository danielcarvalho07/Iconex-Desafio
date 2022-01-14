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

export default function RegisterCompanhiaForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    Name: Yup.string().min(2, 'Muito Curto!').max(50, 'Muito Longo!').required('Nome requerido'),
    email: Yup.string().email('Email deve ser válido').required('Email é obrigatório'),
    password: Yup.string().required('Password é obrigatório'),
    cep: Yup.string().min(8, 'Muito Curto!').max(8, 'Muito Longo!').required('CEP requerido'),
    cnpj: Yup.string().min(14, 'Muito Curto!').max(14, 'Muito Longo!').required('CNPJ requerido')
  });

  const formik = useFormik({
    initialValues: {
      Name: '',
      email: '',
      password: '',
      cnpj: '',
      cep: ''
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
          <TextField
            fullWidth
            label="Nome"
            {...getFieldProps('Name')}
            error={Boolean(touched.Name && errors.Name)}
            helperText={touched.Name && errors.Name}
          />
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
            autoComplete="cnpj"
            label="CNPJ"
            {...getFieldProps('cnpj')}
            error={Boolean(touched.cnpj && errors.cnpj)}
            helperText={touched.cnpj && errors.cnpj}
          />

          <TextField
            fullWidth
            autoComplete="cep"
            label="CEP"
            type="number"
            {...getFieldProps('cep')}
            error={Boolean(touched.cep && errors.cep)}
            helperText={touched.cep && errors.cep}
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
