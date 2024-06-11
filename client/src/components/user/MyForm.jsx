import React from 'react';
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { register, handleSubmit } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div>
        <label>First Name</label>
        <input
          {...register('firstName', {
            required: true,
            maxLength: 20,
          })}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          {...register('lastName', {
            pattern: /^[A-Za-z]+$/i,
          })}
        />
      </div>

      <div>
        <label>Phone Number</label>
        <input
          type='number'
          {...register('age', { min: 18, max: 99 })}
        />
      </div>
      <div>
        <label>Email ID</label>
        <input type='email' {...register('email')} />
      </div>
      <div>
        <label>Password</label>
        <input type='password' {...register('password')} />
      </div>
      <button>submit</button>

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
            message: 'Email must be at least 6 characters',
          },
        }}
        render={({ field, fieldState }) => (
          <TextField
            label='Email ID'
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error !== undefined}
            helperText={
              fieldState.error && fieldState.error.message
            }
          />
        )}
      />
    </form>
  );
};

export default MyForm;
