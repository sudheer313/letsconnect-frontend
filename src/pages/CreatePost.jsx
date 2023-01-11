import React from "react";
import Navbar from "../components/Navbar";
import { FiUserPlus } from "react-icons/fi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FindUser from "../components/FindUser";
import { useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { ADD_POST } from "../utils/mutations";
import { QUERY_RANDOMUSERS } from "../utils/queries";

const initialValues = {
  title: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("Post title is required"),
  description: Yup.string().required("Post description is required"),
});

const CreatePost = () => {
  const navigate = useNavigate();
  const [createPost, { error, loading }] = useMutation(ADD_POST);

  const {
    loading: randomUserLoading,
    error: randomUsersError,
    data: randomUserData,
  } = useQuery(QUERY_RANDOMUSERS, {
    fetchPolicy: "nocache",
  });
  const randomUsers = randomUserData?.getRandomUsers || [];

  if (randomUsersError) {
    console.log("error request", randomUsersError);
  }

  const onSubmit = async (values, onSubmitProps) => {
    const { data } = await createPost({
      variables: { ...values },
    });
    console.log(data);
    onSubmitProps.resetForm();
    navigate("/");
    if (loading) {
      console.log("Request loading");
    }
    if (error) {
      console.log("error request");
    }
  };

  return (
    <div className="md:container md:mx-auto md:px-40">
      <Navbar />
      <div className="flex flex-row gap-2">
        <div className="basis-full mx-4 md:mx-0 md:basis-3/4">
          <div className="flex flex-col gap-4 border p-4 rounded-md">
            <h1 className="text-center">What's on your mind today?</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <Form className="flex flex-col gap-4">
                <Field
                  type="text"
                  name="title"
                  placeholder="Title *"
                  className="border p-3 rounded-lg"
                />
                <ErrorMessage name="title">
                  {(errorMsg) => <div>{errorMsg}</div>}
                </ErrorMessage>
                <Field
                  as="textarea"
                  rows={10}
                  name="description"
                  placeholder="Description *"
                  className="border p-3 rounded-lg"
                />
                <ErrorMessage name="description">
                  {(errorMsg) => <div>{errorMsg}</div>}
                </ErrorMessage>
                <button
                  type="submit"
                  className="border p-3 rounded-lg bg-slate-600 text-white"
                >
                  SUBMIT
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className="hidden md:inline-flex md:flex-col md:basis-1/4">
          <div className="flex items-center justify-center gap-4 border p-4 rounded-md">
            <FiUserPlus className="text-xl" />
            <h1>Find Others</h1>
          </div>
          <div className="flex flex-col gap-4 border p-4 my-3 rounded-md cursor-pointer">
            {randomUserLoading ? (
              <div> Request is loading </div>
            ) : (
              <>
                {randomUsers.map((randomUser) => (
                  <FindUser key={randomUser._id} randomUser={randomUser} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
