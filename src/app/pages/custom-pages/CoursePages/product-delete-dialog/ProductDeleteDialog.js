/* eslint-disable no-restricted-imports */
import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
//import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
//import * as actions from "../../../_redux/products/productsActions";
//import { useProductsUIContext } from "../ProductsUIContext";

export function ProductDeleteDialog({ id, show, onHide }) {
  // Products UI Context
  //const productsUIContext = useProductsUIContext();
  const history = useHistory();

  // Products Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.products.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteProduct = () => {
    // server request for deleting product by id
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/course?id=${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json()).then((result) => {
        if(!result.status){
          //setMessages([{message:"Sửa khóa học không thành công", variant:"danger"}]);
        }
        else{
          history.push('/courses');
        }
      });
    // dispatch(actions.deleteProduct(id)).then(() => {
    //   // refresh list after deletion
    //   dispatch(actions.fetchProducts(productsUIProps.queryParams));
    //   // clear selections list
    //   productsUIProps.setIds([]);
    //   // closing delete modal
    //   onHide();
    // });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Course Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this course?</span>
        )}
        {isLoading && <span>Course is deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteProduct}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
