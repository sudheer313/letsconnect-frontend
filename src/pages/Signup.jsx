import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { saveToken } from "../utils/auth";

const initialValues = {
  username: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  username: Yup.string().required("username is required").min(6).max(30),
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  password: Yup.string().required("password is required").min(8),
});

const Signup = () => {
  const navigate = useNavigate();
  const [registerUser, { error, loading }] = useMutation(ADD_USER);

  const onSubmit = async (values, onSubmitProps) => {
    const { data } = await registerUser({
      variables: { ...values },
    });
    console.log(data);
    saveToken(data.registerUser.token);
    onSubmitProps.resetForm();
    navigate("/");
  };

  if (loading) {
    console.log("Request lOading");
  }
  if (error) {
    console.log("error request");
  }
  
  return (
    <div className="text-center pt-4 flex flex-col items-center self-auto ">
      <h1 className="text-3xl pb-4 ">Namasthe</h1>
      <h3 className="text-2xl pb-2"> SignUp</h3>
      <p className="text-gray-500">
        Already have a Account?
        <Link to="/login" className="underline text-blue-700">
          Login
        </Link>
      </p>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="flex flex-col gap-4">
          <Field
            type="text"
            name="username"
            placeholder="username *"
            className="border p-3 rounded-lg w-80"
          />
          <ErrorMessage name="username">
            {(errorMessage) => (
              <div className="text-red-600"> {errorMessage}</div>
            )}
          </ErrorMessage>

          <Field
            type="e-mail"
            name="email"
            placeholder="email *"
            className="border p-3 rounded-lg w-80"
          />
          <ErrorMessage name="email">
            {(errorMessage) => (
              <div className="text-red-600"> {errorMessage}</div>
            )}
          </ErrorMessage>

          <Field
            type="password"
            name="password"
            placeholder="Password *"
            className="border p-3 rounded-lg w-80"
          />
          <ErrorMessage name="password">
            {(errorMessage) => (
              <div className="text-red-600"> {errorMessage}</div>
            )}
          </ErrorMessage>
          <button
            type="submit"
            className="border p-3 bg-blue-600 text-white w-80"
          >
            SIGNUP
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
