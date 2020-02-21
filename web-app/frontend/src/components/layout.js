/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./header";
import "./layout.css";
// import './index.scss';
import { Header as HeaderTabs } from "../helpers/components";

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
                {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
                <HeaderTabs />
                <div
                    style={{
                        margin: `0 auto`,
                        // maxWidth: 960,
                        padding: `0 1.0875rem 1.45rem`,
                    }}
                >
                    <main>{children}</main>

                    <footer style={{ textAlign: "center" }}>
                        Copyright © {new Date().getFullYear()}, Built Source
                        {` `}
                        <a href='https://github.com/iDuckDark/CEG-Capstone'>
                            Code
                        </a>{" "}
                        {` `},
                        <a href='https://trello.com/b/1iLa3eKF/ceg-4912-capstone'>
                            Trello
                        </a>{" "}
                        {` `} and
                        <a href='https://ceg-capstone.herokuapp.com/'>
                            {" "}
                            Server{" "}
                        </a>
                    </footer>
                </div>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
