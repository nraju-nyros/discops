import { Modal, Button } from "antd";

export const CustomModal = (props) => {
  const {
    icon,
    titleText,
    messageText,
    isLoading,
    showModal,
    showCancelButton,
    handleCancel,
    confirmButtonText,
    handleConfirm,
    showConfirmButton,
    zIndex,
    wrapperClassName
  } = props;

  return (
    <Modal
      visible={showModal}
      closable={false}
      centered={true}
      wrapClassName={`rounded custom-modal ${wrapperClassName}`}
      footer={null}
      bodyStyle={{ width: "100%" }}
      width={"414px"}
      zIndex={zIndex ? zIndex : 1000}
    >
      <div style={{ color: "#8892A5" }}>
        {icon && <img src={icon} alt="" className="mb-3" />}
        <p
          style={{
            fontSize: 15,
            color: "#383A65",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
          }}
          className="mb-2"
        >
          {titleText}
        </p>
        <div className="custom-model-content">
          <pre
            style={{
              fontSize: 13,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            {messageText}
          </pre>
        </div>
      </div>
      <div className="text-right mt-4">
        {showCancelButton && (
          <Button
            onClick={handleCancel}
            className={`modal-cancel-btn rounded-md h-auto border-2 body-color2 mr-3 shadow-none ${isLoading ? 'opacity-95 pointer-events-none' : ''}`}
            style={{
              borderColor: "#E0E0E3",
              fontSize: 13,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
            }}
          >
            Cancel
          </Button>
        )}
        {showConfirmButton !== false && (
          <Button
            loading={isLoading}
            onClick={handleConfirm}
            className="modal-confirm-button theme-color-bg2 border-blue-900 rounded-md h-auto border-2 mr-3"
            style={{
              fontSize: 13,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 500,
              color: "#ffffff",
              borderColor: "#4f5292",
            }}
          >
            {confirmButtonText}
          </Button>
        )}
      </div>
    </Modal>
  );
};
