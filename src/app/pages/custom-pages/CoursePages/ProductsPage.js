import React from "react";
import { Route } from "react-router-dom";
import { ProductsLoadingDialog } from "./products-loading-dialog/ProductsLoadingDialog";
import { ProductDeleteDialog } from "./product-delete-dialog/ProductDeleteDialog";
import { ProductsDeleteDialog } from "./products-delete-dialog/ProductsDeleteDialog";
import { ProductsFetchDialog } from "./products-fetch-dialog/ProductsFetchDialog";
import { ProductsUpdateStatusDialog } from "./products-update-status-dialog/ProductsUpdateStatusDialog";
import { ProductsCard } from "./ProductsCard";
import { ProductsUIProvider } from "./ProductsUIContext";

export function ProductsPage({ history }) {
  const productsUIEvents = {
    newProductButtonClick: () => {
      history.push("/courses/new");
    },
    openEditProductPage: (id) => {
      history.push(`/courses/${id}/edit`);
    },
    openDeleteProductDialog: (id) => {
      history.push(`/courses/${id}/delete`);
    },
    openDeleteProductsDialog: () => {
      history.push(`/courses/deleteCourses`);
    },
    openFetchProductsDialog: () => {
      history.push(`/courses/fetch`);
    },
    openUpdateProductsStatusDialog: () => {
      history.push("/courses/updateStatus");
    },
  };

  return (
    <ProductsUIProvider productsUIEvents={productsUIEvents}>
      <ProductsLoadingDialog />
      <Route path="/courses/deleteCourses">
        {({ history, match }) => (
          <ProductsDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/courses");
            }}
          />
        )}
      </Route>
      <Route path="/courses/:id/delete">
        {({ history, match }) => (
          <ProductDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/courses");
            }}
          />
        )}
      </Route>
      <Route path="/courses/fetch">
        {({ history, match }) => (
          <ProductsFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/courses");
            }}
          />
        )}
      </Route>
      <Route path="/courses/updateStatus">
        {({ history, match }) => (
          <ProductsUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/courses");
            }}
          />
        )}
      </Route>
      <ProductsCard />
    </ProductsUIProvider>
  );
}