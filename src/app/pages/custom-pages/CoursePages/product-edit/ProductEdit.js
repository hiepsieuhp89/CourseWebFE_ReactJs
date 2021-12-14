/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, { useEffect, useState, useRef } from "react";
// import { useDispatch } from "react-redux";
// import * as actions from "../../../_redux/products/productsActions";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { ProductEditForm } from "./ProductEditForm";
import { useSubheader } from "../../../../../_metronic/layout";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
import {Toast} from 'react-bootstrap';

const initProduct = {
  id: undefined,
  name: "",
  code: "",
  description: "",
  year: 2021,
  actor: "",
};

export function ProductEdit({
  history,
  match: {
    params: { id },
  },
}) {
  // Subheader
  const suhbeader = useSubheader();

  // Product for edit
  const [productForEdit, setProductForEdit] = useState({});
  const [actionsLoading, setActionsLoading] = useState(true);

  // Validate Errors
  const [messages, setMessages] = useState([]);

  // Tabs
  const [tab, setTab] = useState("basic");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if(id)
      fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/course/${id}`)
      .then(res => res.json()).then((result) => {
        setProductForEdit(result);
      });
    setActionsLoading(false);
  }, [id]);

  useEffect(() => {
    let _title = id ? "" : "New Course";
    if (productForEdit && id) {
      _title = `Edit course ' ${productForEdit.code} - ${productForEdit.name} - ${productForEdit.year} - ${productForEdit.actor} '`;
    }
    setTitle(_title);
    suhbeader.setTitle(_title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productForEdit, id]);

  // 
  // 
  // 
  //create course
  function createCourse(course){
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/course`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(res => res.json()).then((result) => {
      if(!result.status){
        setMessages([{message:"Tạo khóa học không thành công", variant:"danger"}])
      }
      else{
        console.log("created course: ")
        console.log(course)
        setMessages([{message:"Tạo khóa học thành công", variant:"success"}])
        backToProductsList()
      }
    })
  }
  // 
  // 
  // 
  //update a course
  function updateCourse(course){
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/course`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(res => res.json()).then((result) => {
      if(!result.status){
        setMessages([{message:"Sửa khóa học không thành công", variant:"danger"}])
      }
      else{
        console.log("updated course: ")
        console.log(course)
        setMessages([{message:"Sửa khóa học thành công", variant:"success"}])
        backToProductsList()
      }
    })
  }

  // 
  // 
  // 
  //trigger submit button
  const saveProduct = (values) => {
    if (!id)// Add course 
      createCourse(values)
    else// Update course
      updateCourse(values)
  };

  const btnRef = useRef();
  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const backToProductsList = () => {
    history.push(`/courses`);
  };
  function ShowAlert(props){

    // useEffect(() => {
      
    // })
    return (
    <Toast show={props.show} delay={3000} autohide>
      <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
    </Toast>
    );
  }

  return (
    <div>
      <ShowAlert show={false}/>
      <Card>
        {actionsLoading && <ModalProgressBar />}
        <CardHeader title={title}>
          <CardHeaderToolbar>
            <button
              type="button"
              onClick={backToProductsList}
              className="btn btn-light"
            >
              <i className="fa fa-arrow-left"></i>
              Back
            </button>
            {`  `}
            <button
              type="submit"
              className="btn btn-primary ml-2"
              onClick={saveProductClick}
            >
              Save
            </button>
          </CardHeaderToolbar>
        </CardHeader>
        <CardBody>
          <ul className="nav nav-tabs nav-tabs-line " role="tablist">
            <li className="nav-item" onClick={() => setTab("basic")}>
              <a
                className={`nav-link ${tab === "basic" && "active"}`}
                data-toggle="tab"
                role="tab"
                aria-selected={(tab === "basic").toString()}
              >
                Basic info
              </a>
            </li>
          </ul>
          <div className="mt-5">
            {tab === "basic" && (
              <ProductEditForm
                validate_errors={messages || []}
                actionsLoading={actionsLoading}
                product={productForEdit || initProduct}
                btnRef={btnRef}
                saveProduct={saveProduct}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </div>
    
  );
}
