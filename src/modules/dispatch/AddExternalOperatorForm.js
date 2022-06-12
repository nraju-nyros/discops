import { useState, useEffect } from "react";
import { Button, Card, Col, Row } from "antd";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../components/Customs/CustomInput";
import { CustomSwitchToggle } from "../components/Customs/CustomSwitchToggle";

export const AddExternalOperatorForm = ({
  initialValues,
  externalOperatorValues,
}) => {
  const validationSchema = Yup.object().shape({
    lastname: Yup.string()
      .required("Last Name is required")
      .typeError("Last Name is required"),
    firstname: Yup.string()
      .required("First Name is required")
      .typeError("First Name is required"),
  });

  const onSubmit = (val, { resetForm }) => {
    console.log("CLICKED FORM SUBMIT.....");
    console.log(val);
    externalOperatorValues(val);
    resetForm({ initialValues });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    return () => {
      setErrors({});
    };
  }, []);
  const { touched, errors, handleSubmit, values, setFieldValue, setErrors } =
    formik;

  return (
    <>
      <FormikProvider value={formik}>
        <div>
          <div class="search-by-card">
            <div className="notification-form-left">
              <div className="form-item">
                <div className="my-5">
                  <div className="flex flex-col custom-search">
                    <h4 className="font-semibold mb-6 text-sub0 font-extralight ">
                      Enter External Operator Details
                    </h4>

                    <CustomInput
                      inputValue={values.firstname}
                      placeholder="First Name"
                      label="First Name"
                      requiredField={true}
                      onChange={(val) => setFieldValue("firstname", val)}
                      error={touched.firstname && errors.firstname}
                    />
                    <br />

                    <CustomInput
                      inputValue={values.lastname}
                      placeholder="Last Name"
                      label="Last Name"
                      requiredField={true}
                      onChange={(val) => setFieldValue("lastname", val)}
                      error={touched.lastname && errors.lastname}
                    />

                    <br />
                    <h4 className="font-poppins z-10 text-h1 font-semibold leading-normal text-pickled-bluewood pb-2">
                      Permit Validated
                    </h4>
                    <CustomSwitchToggle
                      className="flex-row-reverse mt-2"
                      switchValue={values.permitValidated}
                      onText="Yes"
                      offText="No"
                      onChange={(val) =>
                        setFieldValue("permitValidated", val ? 1 : 0)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
            <Row
              className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-2 justify-center items-end`}
            >
              <Button
                className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
                // htmlType="submit"
                onClick={handleSubmit}
              >
                Add to List
              </Button>
            </Row>
          </div>
        </div>
        <br />
      </FormikProvider>
    </>
  );
};