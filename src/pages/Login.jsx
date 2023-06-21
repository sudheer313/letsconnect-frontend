import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { LOGIN_GOOGLE_USER, LOGIN_USER } from "../utils/mutations";
import { saveToken } from "../utils/auth";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase";
import { useDispatch } from "react-redux";
import { loginError, loginStart, loginSuccess } from "../redux/userSlice";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("email is required"),
  password: Yup.string().required("password is required").min(8),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { error, loading }] = useMutation(LOGIN_USER);
  const [googleLogin, { error: googleAuthError, loading: googleAuthLoading }] =
    useMutation(LOGIN_GOOGLE_USER);

  const onSubmit = async (values, onSubmitProps) => {
    try {
      dispatch(loginStart());
      const { data } = await login({
        variables: { ...values },
      });

      toast.success("Login Successful");
      dispatch(loginSuccess(data.login));
      saveToken(data.login.token);
      onSubmitProps.resetForm();
      navigate("/");
    } catch (error) {
      dispatch(loginError());
      // console.log(error);
      toast.error(error.message);
    }
  };

  // Commented out the token log statement
  // if (loading) {
  //   console.log("Request loading");
  // }

  const handleGoogleAuth = async () => {
    try {
      dispatch(loginStart());
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { data } = await googleLogin({
        variables: {
          uid: result.user.uid,
          username: result.user.displayName,
          email: result.user.email,
        },
      });
      dispatch(loginSuccess(data.googleLogin));
      toast.success("Login Successful");
      saveToken(data.googleLogin.token);

      navigate("/");
    } catch (error) {
      dispatch(loginError());
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="text-center pt-4 flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl pb-12">Social Networking App</h1>
        <h3 className="text-2xl pb-2">Login</h3>
        <p className="text-gray-500 pb-4">
          Don't have an account yet?{" "}
          <Link to="/signup" className="underline text-blue-700">
            Signup
          </Link>
        </p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="flex flex-col gap-4">
            <Field
              type="email"
              name="email"
              placeholder="Email *"
              className="border p-3 rounded-lg w-80"
            />
            <ErrorMessage name="email">
              {(errorMsg) => <div className="text-red-500">{errorMsg}</div>}
            </ErrorMessage>
            <Field
              type="password"
              name="password"
              placeholder="Password *"
              className="border p-3 rounded-lg w-80"
            />
            <ErrorMessage name="password">
              {(errorMsg) => <div className="text-red-500">{errorMsg}</div>}
            </ErrorMessage>
            <button
              type="submit"
              className="border p-3 rounded-lg bg-blue-600 text-white w-80"
              disabled={loading}
            >
              {loading ? "LOADING..." : "LOGIN"}
            </button>
          </Form>
        </Formik>
        <div>
          <button
            onClick={handleGoogleAuth}
            className="border p-3 rounded-lg bg-blue-600 text-white w-80"
            disabled={googleAuthLoading}
          >
            {googleAuthLoading ? "LOADING..." : "Sign-In with Google"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
