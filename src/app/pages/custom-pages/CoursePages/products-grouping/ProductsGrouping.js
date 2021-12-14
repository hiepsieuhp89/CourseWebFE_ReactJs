import React, {useState} from "react";
//import { useProductsUIContext } from "../ProductsUIContext";
import { ProductsDeleteDialog } from "../products-delete-dialog/ProductsDeleteDialog";

export function ProductsGrouping(props) {

  const [isShowDelete, setIsShowDelete] = useState(false);
  //Products UI Context
  // const productsUIContext = useProductsUIContext();
  // const productsUIProps = useMemo(() => {
  //   return {
  //     ids: productsUIContext.ids,
  //     setIds: productsUIContext.setIds,
  //     openDeleteProductsDialog: productsUIContext.openDeleteProductsDialog,
  //     openFetchProductsDialog: productsUIContext.openFetchProductsDialog,
  //     openUpdateProductsStatusDialog:
  //       productsUIContext.openUpdateProductsStatusDialog,
  //   };
  // }, [productsUIContext]);

  function openDeleteProductsDialog(){
    setIsShowDelete(true)
  }
  function closeDeleteProductsDialog(){
    setIsShowDelete(false)
  }

  return (
    <>
      <ProductsDeleteDialog 
        show={isShowDelete}
        onHide={() => {
          closeDeleteProductsDialog();
        }}
        ids={props.ids} 
      />
      <div className="form">
        <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
          <div className="col-xl-12">
            <div className="form-group form-group-inline">
              <div className="form-label form-label-no-wrap">
                <label className="-font-bold font-danger-">
                  <span>
                    Selected records count: <b>{props.ids.length}</b>
                  </span>
                </label>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-danger font-weight-bolder font-size-sm"
                  onClick={openDeleteProductsDialog}
                >
                  <i className="fa fa-trash"></i> Delete All
                </button>
                &nbsp;
                {/* <button
                  type="button"
                  className="btn btn-light-primary font-weight-bolder font-size-sm"
                  onClick={productsUIProps.openFetchProductsDialog}
                >
                  <i className="fa fa-stream"></i> Fetch Selected
                </button>
                &nbsp;
                <button
                  type="button"
                  className="btn btn-light-primary font-weight-bolder font-size-sm"
                  onClick={productsUIProps.openUpdateProductsStatusDialog}
                >
                  <i className="fa fa-sync-alt"></i> Update Status
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
