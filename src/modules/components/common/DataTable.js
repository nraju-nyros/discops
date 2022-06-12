import React, { useCallback, useEffect, useState } from "react";
import { Table, Tooltip } from "antd";
import { OptionsDropdown } from "./OptionsDropdown";
import { FormatDateLocal } from "./helpers";
import { Link } from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

export const DataTable = (props) => {
  const [tableBodyWidth, setTableBodyWidth] = useState(
    document.getElementsByClassName("ant-table-body").length
      ? document.getElementsByClassName("ant-table-body")[0].offsetWidth
      : 0
  );
  const [columnWidthTotal, setColumnWidthTotal] = useState(0);

  let {
    showActionButton,
    onActionButtonClick,
    className,
    dataSource,
    columns,
    rowKey,
    onChange,
    tableScrollSize,
    currentPage,
    pageSize,
    totalRecords,
    actionButtonItemClick,
    actionButtonItems,
    showHorizontalScroll,
    pagination,
    noDataFound,
    showViewMoreExpandable,
    expandIconColumnIndex,
    expandableView,
    rowSelection,
    disabledCheckboxes,
    showHeader,
    rowClassName
  } = props;
  if (props.showViewMoreExpandable) {
    showViewMoreExpandable = props.showViewMoreExpandable;
    expandIconColumnIndex = props.expandIconColumnIndex;
    expandableView = props.expandableView;
  } else {
    showViewMoreExpandable = false;
    expandIconColumnIndex = -1;
  }

  const linkClickEvent = (item, record) => {
    if (typeof item.onClick === "function") {
      item.onClick(record);
    } else {
      return;
    }
  };

  const mapColumnsForTable = useCallback(() => {
    let mappedColumns = [];
    if (!columns.length) {
      return mappedColumns;
    }
    columns.forEach((item, key) => {
      let columnObj = {
        title: item.sorter ? (
          <div className="flex cursor-pointer">
            <span className="table-th-title">{item.title}</span>
            <img src="/images/icons/sort.svg" alt="sort" className="ml-2" />
          </div>
        ) : (
          item.title
        ),
        dataIndex: item.dataIndex,
        key: item.dataIndex,
        sorter: (a, b) => {
          let first = item && item.key;
          if (typeof b[first] === "number") {
            first = b[first] === 1 ? "In Progress" : "-";
          }
          if (
            a[first] !== undefined &&
            b[first] !== undefined &&
            b[first] !== null
          ) {
            return a[first].toString().localeCompare(b[first].toString());
          } else if (a && a[first] && a[first].length) {
            // That means be has null filterType, so a will come first.
            return -1;
          } else if (b && b[first] && b[first].length) {
            // That means a has null filterType so b will come first.
            return 1;
          }
          // Both rechargeType has null value so there will be no order change.
          return 0;
        },
        sortDirections: ["ascend", "descend", "ascend"],
        fixed: item.fixed,
        render: (text, record) => {
          if (item.render && typeof item.render === "function") {
            return item.render(text, record, item.dataIndex);
          } else if (item.type === "date" && !item.render) {
            return FormatDateLocal(text, "-");
          } else if (item.type === "status" && !item.render) {
            return text ? "Active" : "Inactive";
          } else {
            // return text ? text : "-";
            return text ? (
              <Tooltip
                title={text}
                placement="topLeft"
                overlayClassName="custom-tooltip-scroll"
                overlayStyle={{
                  maxWidth: "50%",
                }}
                rowSelection={(data) => console.log()}
                overlayInnerStyle={{
                  maxHeight: "80vh",
                  overflowY: "auto",
                }}
              >
                <span
                  style={{
                    color: item.isLink || item.onClick ? "#4E2C90" : "",
                    cursor: item.isLink || item.onClick ? "pointer" : "auto",
                  }}
                  className={`overflow-hidden overflow-ellipsis text-h1 whitespace-nowrap block ${
                    item.bold ? "font-semibold" : ""
                  }`}
                  onClick={() => {
                    linkClickEvent(item, record);
                  }}
                >
                  {item.isLink ? (
                    <Link
                      to={{
                        pathname: item.redirectTo(record),
                      }}
                      className="session-link"
                    >
                      {text ? text : "-"}
                    </Link>
                  ) : text ? (
                    text
                  ) : (
                    "-"
                  )}
                </span>
              </Tooltip>
            ) : (
              "-"
            );
          }
        },
      };
      // set width for column if passed
      // or field type is date, ip, json
      let itemType = item.type.toLowerCase();
      if (item.width) {
        columnObj["width"] = item.width;
      } else if (itemType === DataTypes.DATE) {
        columnObj["width"] = "170px";
      } else if (itemType === DataTypes.IP) {
        columnObj["width"] = "120px";
      } else if (itemType === DataTypes.JSON || itemType === DataTypes.URL) {
        columnObj["width"] = "300px";
      } else if (
        itemType === DataTypes.STATUS ||
        itemType === DataTypes.STATUSNAME
      ) {
        columnObj["width"] = "100px";
      }
      mappedColumns.push(columnObj);
    });
    // add 3 dots option menu column if action button is required
    if (showActionButton) {
      mappedColumns.push({
        title: "",
        dataIndex: "",
        key: "",
        width: "50px",
        fixed: "right",
        render: (text, record) => (
          <OptionsDropdown
            onActionButtonClick={() => {
              onActionButtonClick(record);
            }}
            actionButtonItems={actionButtonItems}
            actionButtonItemClick={(clickedItem) => {
              actionButtonItemClick(clickedItem);
            }}
          />
        ),
      });
    }
    return mappedColumns;
  }, [
    columns,
    onActionButtonClick,
    actionButtonItemClick,
    actionButtonItems,
    showActionButton,
  ]);

  let scrollObj = {
    y: tableScrollSize
      ? tableScrollSize
      : `calc(100vh - ${pagination === false ? "205" : "262"}px)`,
  };
  if (showHorizontalScroll) {
    scrollObj["x"] =
      parseFloat(columnWidthTotal) > parseFloat(tableBodyWidth)
        ? columnWidthTotal
        : tableBodyWidth;
  }

  useEffect(() => {
    let columnsTotalWidth = 0;
    let mappedColumns = mapColumnsForTable();
    mappedColumns.forEach((column) => {
      if (column.width) {
        columnsTotalWidth += parseFloat(column.width);
      } else {
        columnsTotalWidth += 150; // 150px is default width for columns if horizontal scroll is enabled
      }
    });
    setColumnWidthTotal(columnsTotalWidth);
  }, [mapColumnsForTable]);

  useEffect(() => {
    // to set horizontal scroll for table
    if (document.getElementsByClassName("ant-table-body").length) {
      setTableBodyWidth(
        document.getElementsByClassName("ant-table-body")[0].offsetWidth
      );
    }
  }, []);

  return (
    <>
      {dataSource.length ? (
        <Table
          className={`flat-table ${className}`}
          dataSource={dataSource}
          columns={mapColumnsForTable()}
          onChange={onChange}
          rowKey={(record) => `${record[rowKey]}`}
          scroll={scrollObj}
          rowSelection={rowSelection}
          // this
          rowClassName={(record) =>
            disabledCheckboxes ? record.ParentId && "disabled-row" : rowClassName ? rowClassName : ''
          }
          showHeader={showHeader == false ? false : true}
          onExpand={(expanded, record) => props.onExpand ? props.onExpand(expanded, record) : ''}
          expandIconColumnIndex={expandIconColumnIndex}
          expandIcon={({ expanded, onExpand, record }) =>
            expanded ? (
              <button
                size="small"
                // icon={<UpOutlined />}
                onClick={(e) => onExpand(record, e)}
                className="data-table-expandable up-arrow"
                style={{ float: "left" }}
              >
                <UpOutlined />
              </button>
            ) : (
              <button
                size="small"
                // icon={<DownOutlined />}
                onClick={(e) => onExpand(record, e)}
                className="data-table-expandable down-arrow"
                style={{ float: "left" }}
              >
                <DownOutlined />
              </button>
            )
          }
          expandable={{
            expandedRowRender: (record) => expandableView(record),
            rowExpandable: (record) => showViewMoreExpandable,
          }}
          pagination={
            pagination !== false
              ? {
                  current: currentPage,
                  position: ["bottomRight"],
                  showTotal: (total, range) =>
                    `Showing ${range[0]}-${range[1]} of ${total}`,
                  pageSize: pageSize,
                  total: totalRecords,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "50"],
                }
              : false
          }
        />
      ) : (
        noDataFound && noDataFound()
      )}
    </>
  );
};

export const DataTypes = {
  CUSTOM: "custom",
  DATE: "date",
  IP: "ip",
  STATUS: "status",
  STATUSNAME: "statusname",
  JSON: "json",
  URL: "url",
};
