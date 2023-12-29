"use client";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import axios from "axios";
import styles from "./../page.module.css";
import {
    DeleteOutlined,
    DesktopOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Row, Table, Popconfirm, message } from "antd";
import { Button } from "antd/es/radio";
import Index from "./Index";
import Edites from "./Edites";
const { Header, Content, Sider } = Layout;
import { useRouter } from "next/navigation";

const App = () => {
    const router = useRouter();
    const deleteButtonRef = useRef(null);
    console.log(deleteButtonRef);
    const [apiData, setApiData] = useState([]);
    // console.log(apiData, "jjjj")
    const [collapsed, setCollapsed] = useState(false);
    const [signUpCall, setSignUpCall] = useState(false);
    const [editRequest, setEditRequest] = useState(false);
    const [editId, setEditId] = useState("");
    const [geted, setGeted] = useState("");

    const isloggedIn = localStorage.getItem("token");
    if (!isloggedIn) {
        router.push("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://65682d079927836bd9742fb2.mockapi.io/usersData"
                );
                setApiData(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [signUpCall, geted, editRequest]);

    const confirm = async (id) => {
        console.log(id);
        const response = await axios.delete(
            `https://65682d079927836bd9742fb2.mockapi.io/usersData/${id}`
        );
        setGeted(response);
        message.success("user deleted successfully ");
    };
    const cancel = (e) => {
        console.log(e);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Action",
            dataIndex: "id",
            width: "15%",
            key: "id",
            render: (id) => (
                <div>
                    <Button
                        onClick={() => {
                            setEditRequest(true);
                            setEditId(id);
                        }}
                    >
                        <EditOutlined />
                    </Button>
                    <Popconfirm
                        // ref={id}
                        ref={deleteButtonRef}
                        title="Delete users"
                        description="Are you sure to delete this users?"
                        onConfirm={() => confirm(id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            // ref={deleteButtonRef}
                            style={{
                                margin: "10px 0px 0px 10px",
                            }}
                        >
                            <DeleteOutlined
                                style={{
                                    color: "red",
                                }}
                            />
                        </Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClose = () => {
        setSignUpCall(false);
        setEditRequest(false);
    };

    return (
        <div className={styles.parent}>
            <Layout style={{ minHeight: "100%" }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <h3 className="d-flex justify-content-center text-white mt-4 mb-4">
                        Zest HRM
                    </h3>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={[
                            {
                                key: "1",
                                icon: <DesktopOutlined />,
                                label: "desktop",
                            },
                        ]}
                    ></Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    />
                    <Content
                        style={{
                            margin: "26px",
                        }}
                    >
                        <Row
                            justify="center"
                            style={{
                                display: "flex",
                                justifyContent: "right",
                            }}
                        >
                            <Button
                                style={{
                                    backgroundColor: "black",
                                    color: "white",
                                    marginRight: "8vw",
                                }}
                                type="primary"
                                onClick={() => setSignUpCall(true)}
                            >
                                Add
                            </Button>
                        </Row>
                        <Row justify="center">
                            <Table
                                style={{ width: "80%" }}
                                pagination={false}
                                dataSource={apiData}
                                columns={columns}
                                scroll={{ x: true }}
                                bordered
                                rowKey={(keys) => keys.id}
                            />
                        </Row>
                        <Row></Row>
                    </Content>
                </Layout>
                <Index isShow={signUpCall} handleCancel={onClose} />
                <Edites
                    isShow={editRequest}
                    handleCancel={onClose}
                    id={editId}
                />
            </Layout>
        </div>
    );
};
export default App;
