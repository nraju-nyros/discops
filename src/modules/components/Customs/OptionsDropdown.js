import { Menu, Dropdown } from "antd";

export const OptionsDropdown = (props) => {
  const { actionButtonItems, actionButtonItemClick, onActionButtonClick } =
    props;

  const optionMenu = (
    <Menu>
      {actionButtonItems.map((item, index) => {
        return (
          <Menu.Item key={`option-menu-${index}`}>
            <div onClick={() => actionButtonItemClick(item)}>{item}</div>
          </Menu.Item>
        );
      })}
    </Menu>
  );

  return actionButtonItems && actionButtonItems.length ? (
    <Dropdown overlay={optionMenu} trigger={["click"]}>
      <img
        src="/images/map/threedots.svg"
        alt="view more"
        className="cursor-pointer"
        style={{ filter: "brightness(0)", height: "18px", width: "18px" }}
        onClick={() => {
          if (typeof onActionButtonClick === "function") {
            onActionButtonClick();
          }
        }}
      />
    </Dropdown>
  ) : (
    ""
  );
};
