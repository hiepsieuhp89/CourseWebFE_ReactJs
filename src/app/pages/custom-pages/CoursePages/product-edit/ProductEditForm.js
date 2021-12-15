// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../_metronic/_partials/controls";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Alert} from "react-bootstrap"
// import {
//   AVAILABLE_COLORS,
//   AVAILABLE_MANUFACTURES,
//   ProductStatusTitles,
//   ProductConditionTitles,
// } from "../ProductsUIHelpers";

// Validation schema
const ProductEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Name is required"),
  description: Yup.string().required("Description is required"),
});

export function ProductEditForm({
  validate_errors,
  product,
  btnRef,
  saveProduct,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={product}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          saveProduct(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-2">
                  <Field
                    name="code"
                    component={Input}
                    placeholder="Code"
                    label="Code"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    label="Name"
                  />
                </div>
                <div className="col-lg-2">
                  <Field
                    name="year"
                    type="number"
                    component={Input}
                    placeholder="Year"
                    label="Year"
                  />
                </div>
                <div className="col-lg-4">
                  <Select name="actor" label="Actor">
                    {[{name:"--Select--"},{name:"Xuân Tùng"},{name:"Phương Linh"}].map((actor, id) => (
                      <option selected={id==0} key={id} value={actor.name}>
                        {actor.name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                  render={({ field, form }: FieldProps<number | string>) => {
                      return (
                          <>
                              <CKEditor
                                  editor={ ClassicEditor }
                                  data="<p>Type description</p>"
                                  onReady={ editor => {
                                      // You can store the "editor" and use when it is needed.
                                      console.log( 'Editor is ready to use!', editor );
                                  } }
                                  onChange={ ( event, editor ) => {
                                      const data = editor.getData()
                                      form.setFieldValue(field.name, data)
                                  } }
                                  onBlur={ ( event, editor ) => {
                                      console.log( 'Blur.', editor );
                                  } }
                                  onFocus={ ( event, editor ) => {
                                      console.log( 'Focus.', editor );
                                  } }
                              />
                          </>
                      )
                  }}
                />
              </div>
              {validate_errors.map((message, id)=>(
              <Alert key={id} variant={message.variant}>
                <p>{message.message}</p>
              </Alert>))}
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
