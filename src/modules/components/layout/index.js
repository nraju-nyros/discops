import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Select } from "antd";
import { SideBar } from "./sidebar";
import { PageTitleBox } from "../common/PageTitleBox";
import { SearchBox } from "../SearchBox";
import { AppContext } from "../store/app-context";
import "./sidebar-style.css";
import { Help } from "../Help";
const { Option } = Select;

export const Layout = (props) => {
  const searchIcon = {
    backgroundImage:
      'url( {process.env.PUBLIC_URL + "/images/icons/search.svg"})',
    backgroundPosition: "center left",
    backgroundRepeat: "no-repeat",
  };
  const {
    page,
    id,
    title,
    subTitle,
    pageTitleButton,
    buttonOnClick,
    buttonLabel,
    buttonIcon,
    mainContentClassName,
    children,
    showSearch,
    onSearchChange,
    searchPlaceholder,
    searchOnModule,
    showFilter,
    onFilterClick,
    showPageActionButton,
    pageTitleButtonDisabled,
    pageActionButtonLabel,
    pageActionButtonIcon,
    pageActionButtonOnClick,
    filterApplied,
    disablePageActionButton,
    onListSearch,
    onListChange,
    searchListOptions,
    searchList,
    searchListPlaceHolder,
    searchListClassName,
    searchListValue,
    showRecordActionButton,
    recordActionButtonLabel,
    recordActionButtonOnClick,
    recordActionButtonIcon,
    showHelp,
    helpText,
    helpIcon,
    onHelpClick,
    showTitleButton,
    titleButtonLabel,
    titleButtonIcon,
    titleButtonOnClick,
    helpToggle,
    helpTemplate,
  } = props;

  const ctx = useContext(AppContext);
  const [maxHeightRequired, setMaxHeightRequired] = useState(true);

  // if page have table then don't give max-height else give max-height to handle scroll
  // for table the scroll is handled in different way
  useEffect(() => {
    if (document.querySelector(".flat-table")) {
      setMaxHeightRequired(false);
    } else {
      setMaxHeightRequired(true);
    }
  }, []);

  return (
    <div style={{ height: "100vh" }}>
      <Row
        id="layout-section"
        type="flex"
        className={`h-full`}
        style={{ overflow: "hidden" }}
      >
        <Col className="bg-athens-gray">
          <SideBar page={page} />
        </Col>
        <Col span={helpToggle ? 20 : 24} className="bg-athens-gray">
         {/* {ctx.pageInfo?.HomeTitle ? (
            <Row style={{ backgroundColor: "green", color: "white" }}>
              <div className="text-center w-full">
                {ctx.pageInfo?.HomeTitle}
              </div>
            </Row>
          ) : (
            ""
          )}*/}
          <Row type="flex" className="pt-5 pt-1 px-2 pb-2">
            <Col span={1} />
            <Col span={23} className="pr-4 px-7">
              <PageTitleBox
                id={id}
                title={title}
                subTitle={subTitle}
                pageTitleButton={pageTitleButton}
                pageTitleButtonDisabled={pageTitleButtonDisabled}
                buttonOnClick={buttonOnClick}
                buttonLabel={buttonLabel}
                buttonIcon={buttonIcon}
                showHelp={showHelp}
                helpText={helpText}
                helpIcon={helpIcon}
                onHelpClick={onHelpClick}
                helpToggle={helpToggle}
              />
              <div
                className={`main-content custom-scrollbar px-1 ${
                  mainContentClassName ? mainContentClassName : ""
                }`}
                style={{
                  maxHeight: !maxHeightRequired ? "none" : "calc(100vh - 95px)",
                  overflowX: "hidden",
                  overflowY: "auto",
                }}
              >
                {/* search, filter, export */}
                <Row
                  type="flex"
                  style={{
                    display:
                      showSearch || showFilter || showPageActionButton
                        ? "flex"
                        : "none",
                  }}
                  className={`${
                    showSearch || showFilter || showPageActionButton
                      ? "mt-4 pt-1"
                      : ""
                  }`}
                >
                  <Col span={12}>
                    <div className="flex items-center">
                      <div style={searchIcon}>
                        {showSearch ? (
                          <div className="flex custom-search">
                            <SearchBox
                              placeholder={searchPlaceholder}
                              searchOnModule={searchOnModule}
                              onChange={(value) => {
                                onSearchChange(value);
                              }}
                              className="border border-red-800"
                            />
                          </div>
                        ) : (
                          ""
                        )}
                        {searchList ? (
                          <div className="flex custom-search customSearchService">
                            <div className="searchIcon flex items-center pl-3">
                              <img
                                src="/images/icons/search.svg"
                                alt="filter"
                              />
                            </div>
                            <Select
                              className={searchListClassName + " border-0"}
                              placeholder={searchListPlaceHolder}
                              showSearch
                              defaultActiveFirstOption={false}
                              allowClear={true}
                              showArrow={false}
                              filterOption={false}
                              onSearch={onListSearch}
                              onChange={onListChange}
                              notFoundContent={null}
                            >
                              {searchListOptions &&
                                searchListOptions.length &&
                                searchListOptions.map((ele) => (
                                  <Option key={ele}>{ele}</Option>
                                ))}
                            </Select>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div>
                        {showFilter ? (
                          <div className="my-auto">
                            <Button
                              className="pl-2"
                              onClick={(value) => {
                                onFilterClick(value);
                              }}
                              type="link"
                            >
                              <div className="flex">
                                <img
                                  src={
                                    filterApplied === true
                                      ? "/images/icons/filter-filled.svg"
                                      : "/images/icons/filter.svg"
                                  }
                                  alt="filter"
                                />
                                <span className="text-h1 font-medium text-regent-gray ml-2">
                                  Filter
                                </span>
                              </div>
                            </Button>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col span={12} className="my-auto text-right">
                    <div class="flex justify-end">
                      <div>
                        {showRecordActionButton ? (
                          <Button
                            onClick={() => {
                              recordActionButtonOnClick();
                            }}
                            className="inline-flex items-center font-poppins text-h1 font-medium rounded-lg mr-4 border border-purple-500 leading-normal default_btn"
                          >
                            {recordActionButtonIcon ? (
                              <img
                                className="mr-2"
                                alt="back"
                                src={
                                  recordActionButtonIcon
                                    ? recordActionButtonIcon
                                    : ""
                                }
                              />
                            ) : (
                              ""
                            )}
                            {recordActionButtonLabel
                              ? recordActionButtonLabel
                              : "Export"}
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {showPageActionButton ? (
                          <Button
                            disabled={disablePageActionButton}
                            onClick={() => {
                              pageActionButtonOnClick();
                            }}
                            className="inline-flex items-center font-poppins text-h1 font-medium rounded-lg border border-purple-500 leading-normal default_btn mr-4"
                          >
                            {pageActionButtonIcon ? (
                              <img
                                className="mr-2 w-4"
                                alt="back"
                                src={
                                  pageActionButtonIcon
                                    ? pageActionButtonIcon
                                    : ""
                                }
                              />
                            ) : (
                              ""
                            )}
                            {pageActionButtonLabel
                              ? pageActionButtonLabel
                              : "Export"}
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                      <div>
                        {showTitleButton ? (
                          <Button
                            onClick={() => {
                              titleButtonOnClick();
                            }}
                            className="inline-flex items-center font-poppins text-h1 font-medium rounded-lg border border-purple-500 leading-normal default_btn"
                          >
                            {titleButtonIcon ? (
                              <div className="m-auto mr-2">
                                {titleButtonIcon}
                              </div>
                            ) : (
                              ""
                            )}
                            {titleButtonLabel ? titleButtonLabel : ""}
                          </Button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-5">
                  <Col span={24}>{children}</Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
        {helpToggle && (
          <Col span={4} className="h-full overflow-y-auto">
            <Help
              template={helpTemplate}
              helpToggle={helpToggle}
              onHelpClick={onHelpClick}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};
