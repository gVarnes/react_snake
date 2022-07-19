import React from 'react';
import { Formik, Form, Field } from 'formik';
import { createPlayer } from './../api/requests';

const Register = ({ actionOnSubmitName }) => {
  return (
    <Formik
      initialValues={{
        name: '',
      }}
      onSubmit={async (values) => {
        createPlayer(JSON.stringify(values));
        actionOnSubmitName(values.name);
      }}
    >
      <Form className="register">
        <Field
          className="register__input"
          name="name"
          placeholder="Enter your name"
        />
        <div>
          <button
            className="register__button button button__register"
            type="submit"
          >
            Play
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default Register;
