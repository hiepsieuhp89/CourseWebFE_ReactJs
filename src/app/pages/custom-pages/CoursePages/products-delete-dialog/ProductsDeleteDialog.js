/* eslint-disable no-restricted-imports */
import React from "react";
import { Modal } from "react-bootstrap";
//import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../_metronic/_partials/controls";
//import * as actions from "../../../_redux/products/productsActions";
import { useHistory } from "react-router-dom";
//import { useProductsUIContext } from "../ProductsUIContext";

export function ProductsDeleteDialog({ show, onHide, ids}) {

  const history = useHistory();
  const isLoading = false;
  // Products UI Context
  // const productsUIContext = useProductsUIContext();
  // const productsUIProps = useMemo(() => {
  //   return {
  //     ids: productsUIContext.ids,
  //     setIds: productsUIContext.setIds,
  //     queryParams: productsUIContext.queryParams,
  //   };
  // }, [productsUIContext]);

  // // Products Redux state
  // const dispatch = useDispatch();
  // const { isLoading } = useSelector(
  //   (state) => ({ isLoading: state.products.actionsLoading }),
  //   shallowEqual
  // );

  // // looking for loading/dispatch
  // useEffect(() => {}, [isLoading, dispatch]);

  // // if there weren't selected products we should close modal
  // useEffect(() => {
  //   if (!productsUIProps.ids || productsUIProps.ids.length === 0) {
  //     onHide();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productsUIProps.ids]);

  const deleteProducts = () => {

    console.log(JSON.stringify(ids));
    
    fetch(`${process.env.REACT_APP_WEBSERVER_API_URL}/course`,{
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ids),
      })
      .then(res => res.json()).then((result) => {
        onHide();
        history.push('/courses');
        // if(!result.status){
        //   //setMessages([{message:"Sửa khóa học không thành công", variant:"danger"}]);
        // }
        // else{
        //   history.push('/courses');
        // }
      });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Courses Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected courses?</span>
        )}
        {isLoading && <span>Courses are deleting...</span>}
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
            onClick={deleteProducts}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
