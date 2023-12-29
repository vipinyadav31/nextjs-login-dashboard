"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./../page.module.css";
import { DesktopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme, Row, Table } from "antd";
import { Button } from "antd/es/radio";
import Index from "./Index";
const { Header, Content, Sider } = Layout;
import Link from "next/link";
import { useRouter } from "next/navigation";

// function getItem(label, key, icon, children) {
//     return {
//         key,
//         icon,
//         children,
//         label,
//     };
// }
// const items = [getItem("Users", "1", <DesktopOutlined />),
// getItem('Option 2', '2', <DesktopOutlined />, '/option2'), // Add the path '/option2' for example

//   getItem('Option 2', '2', <DesktopOutlined />,null , '/users' 	),
// ];
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
        key: "key",
        align: "center",
    },
    {
        title: "Organization Name",
        dataIndex: "organizationName",
        key: "organizationName",
        align: "center",
    },
];
const App = () => {
    const router = useRouter();

    const [apiData, setApiData] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [signUpCall, setSignUpCall] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://staging-api.zesthrm.com/api/v1/customer/contacts-list"
                );
                const dataWithKeys = response.data.data.map((item) => ({
                    ...item,
                    key: item.id,
                }));
                setApiData(dataWithKeys);

                // setApiData(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [signUpCall]);
    console.log(apiData);

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const onClose = () => {
        setSignUpCall(false);
        // fetchData();
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
                        onClick={(key) => {
                            if (key === "users") {
                                router.push(`/users`);
                            }
                        }}
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
                    >
                        
                    </Menu>
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
                                    marginRight: "3.75rem",
                                }}
                                type="primary"
                                onClick={() => setSignUpCall(true)}
                            >
                                Add
                            </Button>
                        </Row>
                        <Row justify="center">
                            <Table
                                style={{ width: "90%" }}
                                pagination={false}
                                dataSource={apiData}
                                columns={columns}
                                scroll={{ x: true }}
                                bordered
                                
                            />
                        </Row>
                        <Row></Row>
                    </Content>
                </Layout>
                <Index isShow={signUpCall} handleCancel={onClose} />
            </Layout>
        </div>
    );
};
export default App;
