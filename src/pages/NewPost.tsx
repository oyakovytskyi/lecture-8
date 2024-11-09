import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

import { addExhibit } from "../api/exhibitActions";

interface NewPostValues {
  description: string;
  image: File | null;
}

const NewPostSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("An image is required"),
});

const NewPostPage = () => {
  const handleSubmit = async (values: { description: string; image: File }) => {
    const formData = new FormData();
    formData.append("description", values.description);
    formData.append("image", values.image);

    try {
      await addExhibit(formData);
      toast.success("Post created successfully!");
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  return (
    <Box>
      <Typography variant="h4">Create New Post</Typography>
      <Formik<NewPostValues>
        initialValues={{ description: "", image: null }}
        validationSchema={NewPostSchema}
        onSubmit={async (values, { resetForm }) => {
          if (!values.image) {
            toast.error("Please upload an image before submitting.");
            return;
          }
          await handleSubmit({ ...values, image: values.image });
          resetForm();
        }}
      >
        {({ setFieldValue, errors, touched }) => (
          <Form>
            <Field
              as={TextField}
              name="description"
              label="Description"
              fullWidth
              error={touched.description && !!errors.description}
              helperText={touched.description && errors.description}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => {
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  setFieldValue("image", event.currentTarget.files[0]);
                }
              }}
            />
            {touched.image && errors.image && <div>{errors.image}</div>}

            <Button type="submit" variant="contained" fullWidth>
              Submit Post
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default NewPostPage;
