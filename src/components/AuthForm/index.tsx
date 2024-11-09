import React from "react";
import { TextField, Button, Typography } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (values: { username: string; password: string }) => void;
  isRegistration?: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  onSubmit,
  isRegistration = false,
}) => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .max(
        isRegistration ? 4 : Infinity,
        "The user must have a name of no more than 4 characters"
      )
      .required("Username is required"),

    password: Yup.string()
      .max(
        isRegistration ? 4 : Infinity,
        "The user must have a password of no more than 4 characters"
      )
      .required("Password is required"),
  });

  return (
    <>
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="username" component="div" />

            <Field
              as={TextField}
              name="password"
              type="password"
              label="Password"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="password" component="div" />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
              sx={{ mt: 2 }}
            >
              {isSubmitting ? `${buttonText}...` : buttonText}
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
