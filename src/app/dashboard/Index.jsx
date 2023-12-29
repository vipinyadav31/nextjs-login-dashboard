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
                "https://staging-api.zesthrm.com/api/v1/customer/contact",
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
                {/* from ant start */}
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
                                // type: "email",
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
                    <Col md={12}>
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
                    <Col md={12}>
                    <Form.Item
                        label="Organization name "
                        name="organizationName"
                        rules={[
                            {
                                required: true,
                                message:
                                    "Please enter your Organization name !",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    </Row>
                </Form>
                {/* from ant end  */}
            </Modal>
        </div>
    );
};

export default Index;
