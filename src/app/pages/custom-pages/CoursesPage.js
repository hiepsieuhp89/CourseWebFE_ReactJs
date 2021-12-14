import React, { Suspense } from "react";
import { Switch } from "react-router-dom";
import { ProductsPage } from "./CoursePages/ProductsPage";
import { ProductEdit } from "./CoursePages/product-edit/ProductEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../_metronic/layout";

export const CoursesPage = ()=>{
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        <ContentRoute path="/courses/new" component={ProductEdit} />
        <ContentRoute path="/courses/:id/edit" component={ProductEdit} />
        <ContentRoute path="/courses" component={ProductsPage} />
      </Switch>
    </Suspense>
  );
}
