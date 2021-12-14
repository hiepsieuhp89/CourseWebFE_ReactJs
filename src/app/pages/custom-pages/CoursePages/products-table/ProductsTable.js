// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState } from "react";
//import { useHistory, useLocation } from "react-router-dom";
//import queryString from "querystring";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
//import { useDispatch} from "react-redux";
//import * as actions from "../../../_redux/products/productsActions";
import * as uiHelpers from "../ProductsUIHelpers";
import {
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../_metronic/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../_metronic/_partials/controls";
import { useProductsUIContext } from "../ProductsUIContext";
import { ProductsGrouping } from "../products-grouping/ProductsGrouping";
//import { ProductsDeleteDialog } from "../products-delete-dialog/ProductsDeleteDialog";

export function ProductsTable(props) {
  // const history = useHistory();
  // const location = useLocation();

  //
  const [totalCount, setTotalCount] = useState(0);
  const [entities, setEntities] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [batchSelection, setBatchSelection] = useState([]);

  // Products UI Context
  const productsUIContext = useProductsUIContext();
  const productsUIProps = useMemo(() => {
    return {
      ids: productsUIContext.ids,
      setIds: productsUIContext.setIds,
      queryParams: productsUIContext.queryParams,
      setQueryParams: productsUIContext.setQueryParams,
      openEditProductPage: productsUIContext.openEditProductPage,
      openDeleteProductDialog: productsUIContext.openDeleteProductDialog,
    };
  }, [productsUIContext]);

  const getSelectedRows = {
    mode: "checkbox",
    clickToSelect: true,
    onSelect: (row, isSelect, rowIndex, e) => {
      isSelect
        ? setBatchSelection(() => {
            return [...batchSelection, row.id];
          })
        : setBatchSelection(() => {
            return batchSelection.filter((id) => {
              return id != row.id;
            });
          });
    },
    onSelectAll: (isSelect, rows, e) => {
      //console.log(rows)
      isSelect
        ? setBatchSelection(() => {
            return rows.map((row) => row.id);
          })
        : setBatchSelection(() => {
            return [];
          });
    },
  };
  useEffect(() => {
    console.log("batchSelection changed! :");
    console.log(batchSelection);
  }, [batchSelection]);

  // Getting curret state of products list from store (Redux)
  // const { currentState } = useSelector(
  //   (state) => ({ currentState: state.products }),
  //   shallowEqual
  // );
  //const { totalCount, listLoading } = currentState;

  // Products Redux state
  //const dispatch = useDispatch();

  function fetchCourses(keyword) {
    const url = keyword
      ? `${process.env.REACT_APP_WEBSERVER_API_URL}/course?keyword=${keyword}`
      : `${process.env.REACT_APP_WEBSERVER_API_URL}/course`;

    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        setTotalCount(result.length);
        setEntities(result);
        setListLoading(false);
      });
  }
  useEffect(() => {
    const keyword = props.queryParams.filter.model || "";
    console.log("keyword searched: " + keyword);

    fetchCourses(keyword);
    console.log("courses fetched");
  }, [props]);

  // useEffect(() => {
  //   // clear selections list
  //   productsUIProps.setIds([]);
  //   // server call by queryParams
  //   dispatch(actions.fetchProducts(productsUIProps.queryParams));
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [productsUIProps.queryParams, dispatch]);

  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "Course id",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "code",
      text: "Course code",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "name",
      text: "Course name",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "description",
      text: "Description",
    },
    {
      dataField: "actor",
      text: "Actor",
      sort: true,
      sortCaret: sortCaret,
      // formatter: columnFormatters.ColorColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditProductPage: productsUIProps.openEditProductPage,
        openDeleteProductDialog: productsUIProps.openDeleteProductDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: productsUIProps.queryParams.pageSize,
    page: productsUIProps.queryParams.pageNumber,
  };
  return (
    <>
      {batchSelection.length > 0 && <ProductsGrouping ids={batchSelection} />}
      <BootstrapTable
        wrapperClasses="table-responsive"
        classes="table table-head-custom table-vertical-center overflow-hidden"
        bootstrap4
        bordered={false}
        // remote
        keyField="id"
        data={entities === null ? [] : entities}
        columns={columns}
        //sdefaultSorted={uiHelpers.defaultSorted}
        //defaultSorted={{dataField: "id", order: "desc"}}
        //onTableChange={getHandlerTableChange(productsUIProps.setQueryParams)}
        selectRow={getSelectedRows}
        pagination={paginationFactory()}
        // selectRow={getSelectRow({
        //   entities,
        //   ids: productsUIProps.ids,
        //   setIds: productsUIProps.setIds,
        // })}
        // {...paginationTableProps}
      >
        <PleaseWaitMessage entities={entities} />
        <NoRecordsFoundMessage entities={entities} />
      </BootstrapTable>
      {/* <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                //defaultSorted={{dataField: "id", order: "desc"}}
                onTableChange={getHandlerTableChange(
                  productsUIProps.setQueryParams
                )}
                selectRow={getSelectedRows}
                pagination={paginationFactory()}
                // selectRow={getSelectRow({
                //   entities,
                //   ids: productsUIProps.ids,
                //   setIds: productsUIProps.setIds,
                // })}
                // {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider> */}
    </>
  );
}
