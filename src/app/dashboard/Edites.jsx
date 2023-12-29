import React, { useEffect } from "react";
import { Form, Input, Modal, message, Row, Col } from "antd";
import axios from "axios";

const Edites = ({ isShow, handleCancel, id }) => {
    const [form] = Form.useForm();
    const setFormFields = (userData) => {
        form.setFieldsValue({
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
        });
    };

    const onFinish = async (values) => {
        try {
            const response = await axios.put(
                `https://65682d079927836bd9742fb2.mockapi.io/usersData/${id}`,
                values
            );

            handleCancel();
            form.resetFields();
            message.success("User edited successfully");
            console.log("Data sent successfully:", response.data);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(
                    `https://65682d079927836bd9742fb2.mockapi.io/usersData/${id}`
                );
                setFormFields(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (isShow && id) {
            fetchUserData();
        }
    });

    return (
        <div>
            <Modal
                title="Edit user"
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
                                        type: "email",
                                        message: "Please enter a valid email!",
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
                                        message:
                                            "Please enter your phone number!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        {/* Add other form items as needed */}
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Edites;
