"use client";
import React from "react";
import { Form, Input, Modal, message,Row,Col } from "antd";
import axios from "axios";

const Index = ({ isShow, handleCancel }) => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            console.log(values);
            const response = await axios.post(
                "https://65682d079927836bd9742fb2.mockapi.io/usersData",
                values
            );
             
            handleCancel();
            form.resetFields();
            message.success("User added successfully");
            console.log("Data sent successfully:", response.data);
        } catch (error) {
            console.error("Error posting data:", error);
        }
    };
    return (
        <div>
            <Modal
                title="Add user"
                open={isShow}
                onOk={form.submit}
                okText="Submit"
                onCancel={() => {
                    form.resetFields();
                    handleCancel();
                }}
            >
                <Form
                   layout="vertical"

                    form={form}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                <Row>
                 <Col md={12}>
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col md={12}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your email!",
                            },
                            {
                                type: "email",
                                message: " please enter valid email",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col md={16}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "Please enter your phone number!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Index;
