import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

export const CustomTabs = (props) => {
  const { activeTabs, tabData, className, onTabClick, currentTab } = props;
  return (
    <div>
      <div
        className={`custom-tab ${
          activeTabs.length === tabData.length ? "allTabSelected" : ""
        } ${className ? className : ""}
        `}
      >
        <Tabs
          onTabClick={(key, event) => {
            if (typeof onTabClick === "function") {
              onTabClick(key, event);
            }
            return;
          }}
          activeKey={currentTab}
        >
          {tabData.map((tab, index) => {
            return (
              <TabPane
                tab={tab?.name}
                key={tab?.key}
                style={tab?.style}
                disabled={tab?.disabled}
              >
                <div
                  className="custom-scrollbar"
                  style={{ height: tab.topDetails ? tab.topDetails : "calc(100vh - 230px)", overflowY: "auto" }}
                >
                  {tab?.content}
                </div>
              </TabPane>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
