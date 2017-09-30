import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SimpleForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="name"
        component="input"
        type="text"
        placeholder="Nome"
      />
      <Field
        name="email"
        component="input"
        type="text"
        placeholder="Email"
      />
      <Field
        name="phone"
        component="input"
        type="text"
        placeholder="Telefone"
      />
      <button type="submit" disabled={pristine || submitting}>
        Enviar
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'simple', // a unique identifier for this form
})(SimpleForm);

