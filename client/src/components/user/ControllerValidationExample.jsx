import { Button, Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const ControllerValidationExample = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Grid item>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={'column'} spacing={3}>
          <Grid item style={{ width: '100%' }}>
            <Controller
              name='firstName'
              control={control}
              defaultValue={''}
              rules={{ required: 'First Name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label='First Name'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Controller
              name='lastName'
              control={control}
              defaultValue={''}
              rules={{ required: 'Last Name is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label='Last Name'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Controller
              name='phone'
              defaultValue={''}
              control={control}
              rules={{
                required: 'Phone Number is required',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label='Phone Number'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Controller
              name='email'
              control={control}
              defaultValue={''}
              rules={{
                required: 'Email ID is required',
                pattern: {
                  value:
                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
                minLength: {
                  value: 6,
                  message:
                    'Email must be at least 6 characters',
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  label='Email ID'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '100%' }}>
            <Controller
              name='password'
              defaultValue={''}
              control={control}
              rules={{ required: 'Password is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  label='Password'
                  type='password'
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error !== undefined}
                  helperText={
                    fieldState.error &&
                    fieldState.error.message
                  }
                />
              )}
            />
          </Grid>
          <Grid item style={{ width: '30%' }}>
            <Button type='submit' variant='contained'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default ControllerValidationExample;
