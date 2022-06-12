import React from 'react';
import {Modal, Row, Col, Button } from 'antd';

export const DeleteModal = (props) => {
    const {
        showModal,
        titleText,
        messageText,
        onCancel,
        onConfirm,
    } = props;

    return (
        <Modal
            visible={showModal}
            title=""
            footer={null}
            maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
            className="custom-modal md:w-4/12"
            closable={false}
            onCancel={onCancel}
        >
            <Row>
                <Col span="24">
                    <h4 className="font-poppins text-pickled-bluewood font-semibold text-h2">
                        {titleText}
                    </h4>
                    <h4 className="font-poppins text-regent-gray text-h1">
                        {messageText}
                    </h4>
                </Col>
                <Col span="24" className="text-right mt-3">
                    <Button
                        className="font-poppins font-medium bg-punch text-white text-h1 rounded-lg"
                        onClick={onConfirm}
                    >
                        Yes
                    </Button>
                    <Button
                        className="font-poppins font-medium border border-iron text-regent-gray text-h1 rounded-lg ml-2"
                        onClick={onCancel}
                    >
                        No
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};
