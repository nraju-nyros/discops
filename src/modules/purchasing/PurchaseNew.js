import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  Select,
  Table,
  Button,
  Checkbox,
  Col,
  Modal,
  Row,
  Tooltip,
  Input,
  Typography,
  Card,
} from "antd";

export const PurchaseNew = () => {
  const navigate = useNavigate();

  const validationSchema1 = Yup.object().shape({
    materialData: Yup.array().of(
      Yup.object().shape({
        material: Yup.string().required("Material is required"),
        plant: Yup.string().required("Plant is required"),
        accountAssignment: Yup.string().required("Account Assignment required"),
        item: Yup.string().required("Item is required"),
        uom: Yup.string().required("UOM is required"),
        storageLocation: Yup.string().required("Storage Location is required"),
        quantity: Yup.number()
          .typeError("Only numbers are allowed")
          .min(5, "Not greater than 5 digits")
          .required("Quantity is required"),
      })
    ),
  });

  const initialValues = {
    materialData: [
      {
        material: "",
        storageLocation: "",
        quantity: null,
        plant: "",
        accountAssignment: "",
        item: "",
        uom: "",
      },
    ],
  };

  const addPurchase = () => {
    fetch("https://62a19ef0cd2e8da9b0f56b79.mockapi.io/api/v6/purchasing", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        DodDocNo: 10010213,
        PurchaseType: "Pending",
        SLoc: "Boston",
        FederalSupply: "WAH0C0",
        Material: "Yes",
        Quantity: 9,
        Description: "Replacement",
        CategoryOfIncompleteness: 14,
        ReleaseStrategy: "Release1",
        ReleaseStatus: "Approved",
        Priority: "Priority11",
        MilstripStatus: "MilstripStatus111",
        Value: "111",
        DeliveryDate: "12-04-2022",
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
    alert("Data insert success");
  };

  return (
    <>
      <div>
        <div>
          <div
            style={{
              textAlign: "center",
              color: "#fff",
              backgroundColor: "green",
              paddingTop: "2px",
              paddingBottom: "0px",
            }}
          >
            <p>CONTROLLED UNCLASSIFIED INFORMATION(CUI)</p>
          </div>

          <div className={"mt-4"}>CREATE PURCHASE REQUISITION</div>
          <div
            className={"mt-6 content flex-grow "}
            style={{ background: "#F3F5F8" }}
          >
            <div className="container">
              <div className="content rounded-lg  flex-grow mr-5  ml-5">
                <div className="px-4 pt-20 pb-5 ">
                  <h1 className="uppercase text-sub0 font-semibold">
                    Create Purchasing Requisition{" "}
                  </h1>
                </div>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema1}
                  onSubmit={addPurchase}
                >
                  {({ values }) => (
                    <Form>
                      <Card className=" rounded-2xl">
                        <FieldArray name="materialData">
                          {({ insert, remove, push }) => (
                            <div>
                              {values.materialData.length > 0 &&
                                values.materialData.map((friend, index) => (
                                  <div className={"mt-2"}>
                                    {values.materialData.length > 1 ? (
                                      <div align="right" id={index}>
                                        <button
                                          type="button"
                                          className="secondary"
                                          onClick={() => remove(index)}
                                        >
                                          X
                                        </button>
                                      </div>
                                    ) : null}

                                    <Row gutter={50} className={"mb-2"}>
                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.material`}
                                          >
                                            Material
                                          </label>
                                          <Field
                                            name={`materialData.${index}.material`}
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            type="text"
                                          />
                                          <ErrorMessage
                                            name={`materialData.${index}.material`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>

                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.storageLocation`}
                                          >
                                            Storage Location
                                          </label>
                                          <Field
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            as="select"
                                            name={`materialData.${index}.storageLocation`}
                                          >
                                            <option
                                              value=""
                                              label="Select Storage Location"
                                            >
                                              Select Storage Location{" "}
                                            </option>
                                            <option value="storageLocation1">
                                              Storage Location 1
                                            </option>
                                            <option value="storageLocation2">
                                              Storage Location 2
                                            </option>
                                            <option value="storageLocation3">
                                              Storage Location 3
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name={`materialData.${index}.storageLocation`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>
                                    </Row>

                                    <Row gutter={50} className={"mb-2"}>
                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.quantity`}
                                          >
                                            Quantity
                                          </label>
                                          <Field
                                            name={`materialData.${index}.quantity`}
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            type="text"
                                          />
                                          <ErrorMessage
                                            name={`materialData.${index}.quantity`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>

                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.plant`}
                                          >
                                            Plant
                                          </label>

                                          <Field
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            as="select"
                                            name={`materialData.${index}.plant`}
                                          >
                                            <option
                                              value=""
                                              label="Select Plant"
                                            >
                                              Select Plant{" "}
                                            </option>
                                            <option value="plant1">
                                              Plant 1
                                            </option>
                                            <option value="plant2">
                                              Plant 2
                                            </option>
                                            <option value="plant3">
                                              Plant 3
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name={`materialData.${index}.plant`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <Row gutter={50} className={"mb-2"}>
                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.accountAssignment`}
                                          >
                                            Account Assignment
                                          </label>
                                          <Field
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            as="select"
                                            name={`materialData.${index}.accountAssignment`}
                                          >
                                            <option
                                              value=""
                                              label="Select Plant"
                                            >
                                              Account Assignment{" "}
                                            </option>
                                            <option value="accountAssignment1">
                                              Account Assignment 1
                                            </option>
                                            <option value="accountAssignment2">
                                              Account Assignment 2
                                            </option>
                                            <option value="accountAssignment3">
                                              Account Assignment 3
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name={`materialData.${index}.accountAssignment`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>

                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.item`}
                                          >
                                            Item
                                          </label>
                                          <Field
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            as="select"
                                            name={`materialData.${index}.item`}
                                          >
                                            <option
                                              value=""
                                              label="Select Plant"
                                            >
                                              Item{" "}
                                            </option>
                                            <option value="Item1">
                                              Item 1
                                            </option>
                                            <option value="Item2">
                                              Item 2
                                            </option>
                                            <option value="Item3">
                                              Item 3
                                            </option>
                                          </Field>
                                          <ErrorMessage
                                            name={`materialData.${index}.item`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>
                                    </Row>

                                    <Row gutter={50} className={"mb-2"}>
                                      <Col span={12}>
                                        <div>
                                          <label
                                            htmlFor={`materialData.${index}.uom`}
                                          >
                                            UOM
                                          </label>
                                          <Field
                                            name={`materialData.${index}.uom`}
                                            className="block border border-grey-light w-full p-3 rounded mb-2"
                                            type="text"
                                          />
                                          <ErrorMessage
                                            name={`materialData.${index}.uom`}
                                            component="div"
                                            className="field-error"
                                          />
                                        </div>
                                      </Col>
                                    </Row>
                                    <div className="dotted_border mt-8"></div>
                                  </div>
                                ))}

                              <div className="px-8 pb-8 mt-4 text-right">
                                <Row className="px-1 items-center">
                                  <Col span={20}></Col>
                                  <Col span={4} className="text-right">
                                    <Button
                                      type="link"
                                      onClick={() =>
                                        push({
                                          material: "",
                                          storageLocation: "",
                                          quantity: null,
                                          plant: "",
                                          accountAssignment: "",
                                          item: "",
                                          uom: "",
                                        })
                                      }
                                      size="large"
                                      className="py-0 inline-flex items-center border border-daisy-bush rounded-md px-3"
                                    >
                                      <div className="flex font-poppins text-daisy-bush text-sm font-semibold leading-normal">
                                        <div className="m-auto">
                                          <PlusOutlined
                                            style={{ color: "#4E2C90" }}
                                            className="flex m-auto"
                                          />
                                        </div>

                                        <div className=" font-poppins text-daisy-bush text-sm font-semibold leading-normal " />
                                        {"Add Material"}
                                      </div>
                                    </Button>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          )}
                        </FieldArray>
                      </Card>

                      <Row
                        className={`footer notification-footer drawer-header sticky bottom-0 z-10 bg-white py-5  justify-center items-end`}
                      >
                        <Button
                          type="link"
                          className="p-5 flex items-center  border-regent-gray rounded-lg mr-28 botton_text_gray"
                          onClick={() => {
                            navigate("/purchasing");
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          htmlType="submit"
                          className="p-5 flex items-center bg-blue-text text-white rounded-lg px-7 ml-28"
                        >
                          Submit
                        </Button>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
