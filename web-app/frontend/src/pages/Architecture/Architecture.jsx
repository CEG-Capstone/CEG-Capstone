import React, { Component } from "react";
import Layout from "../../components/layout";
import Title from "../../components/Titles/Title";

import design from "../../assets/architecture/Design.png";
import logo from "../../assets/architecture/Logo.png";
import arc from "../../assets/architecture/SystemArch.png";

const Architecture = () => {
    return (
        <Layout>
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    marginTop: "2%",
                    marginBottom: "15%",
                    textAlign: "center",
                }}
            >
                <Title variant='h5' gutterBottom className='title'>
                    System Architecture
                </Title>

                <div style={{ display: "inline-block" }}>
                    <img
                        src={design}
                        style={{ height: "500px", width: "500px" }}
                    ></img>
                </div>
                <div style={{ display: "inline-block" }}>
                    <img
                        src={arc}
                        style={{ height: "500px", width: "700px" }}
                    ></img>
                </div>

                {/* <img src={logo}></img> */}
                {/* <iframe
                    width='640'
                    height='360'
                    src='https://www.youtube.com/embed/ZG5nE0rd4BM'
                    frameborder='0'
                    allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                    allowfullscreen
                ></iframe> */}
            </div>
        </Layout>
    );
};
export default Architecture;