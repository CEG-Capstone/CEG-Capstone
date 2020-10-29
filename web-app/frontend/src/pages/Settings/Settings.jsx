import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { SEO, Layout } from "../../helpers/components";
// import Settings from "./SettingsPage";
import Login from "../../components/SignIn/Login";
import "../index.scss";

const SettingsPage = () => {
    return (
        <Layout>
            <SEO title='CEG Capstone Project' />
            <Provider store={store}>
                <div
                    className='center-horizontal'
                    style={{ marginTop: "20px" }}
                />
                <Login />
                {/* <Settings /> */}
            </Provider>
        </Layout>
    );
};

export default SettingsPage;
