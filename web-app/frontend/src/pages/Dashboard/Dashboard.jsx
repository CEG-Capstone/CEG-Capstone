import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Thermometer from "react-thermometer-component";
import ReactSpeedometer from "react-d3-speedometer";
import Paper from "@material-ui/core/Paper";
// import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { mapDispatchToProps } from "../../helpers/actions";
import { isServerSideRendering, detectMob } from "../../helpers/utils";
import Map from "./Map";
import Temperature from "../Graphs/Temperature";
import Altitude from "../Graphs/Altitude";
import Pressure from "../Graphs/Pressure";
import { getVideoUrl } from "../../helpers/settings";
// const defaultUrl = "https://45.72.149.128:8000/";
// const defaultUrl = "https://www.youtube.com/embed/Q-TEYBltFis";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        const width = isServerSideRendering() ? 1080 : window.innerWidth;
        const height = isServerSideRendering() ? 600 : window.innerHeight;
        this.state = {
            pressure: 0,
            altitude: 0,
            temperature: 0,
            index: 0,
            width,
            height,
            // piUrl: defaultUrl,
        };
        // this.handleURLChange = this.handleURLChange.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
        // this.setAPIs();
        if (!isServerSideRendering())
            window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        if (!isServerSideRendering())
            window.removeEventListener("resize", this.updateDimensions);
    }

    // eslint-disable-next-line react/sort-comp
    updateDimensions() {
        if (!isServerSideRendering())
            this.setState({
                width: window.innerWidth,
                height: window.innerHeight,
            });
    }

    setAPIs() {
        const { actions } = this.props;
        actions.getUsers().then(() => {
            const { users } = this.props;
            // eslint-disable-next-line no-console
            console.log("API is working: ", users);
        });
        this.setSSAR();
    }

    setSSAR() {
        const { actions } = this.props;
        actions.getSSAR().then(() => {
            const { ssar } = this.props;
            const first = ssar[0];
            const { altitude, pressure, temperature } = first;
            this.setState({ altitude, pressure, temperature });
            this.setSSARInterval(ssar);
        });
    }

    setSSARInterval(ssar) {
        setInterval(() => {
            let { index } = this.state;
            index = (index + 1) % ssar.length;
            const { altitude, pressure, temperature } = ssar[index];
            this.setState({ index, altitude, pressure, temperature });
        }, 500);
    }

    renderSpeedometer(val, label) {
        const value = Math.round(val * 100) / 100;
        return (
            <div style={{ height: "100px", width: "200px" }}>
                <ReactSpeedometer
                    height={200}
                    forceRender
                    maxValue={value * 1.5}
                    value={value}
                    needleColor='red'
                    needleTransition='easeElastic'
                    needleTransitionDuration={50}
                    segments={5}
                    currentValueText={`${label} : ${value}`}
                />
            </div>
        );
    }

    renderSpeedometers() {
        const { altitude, pressure } = this.state;
        const marginLeft = detectMob() ? "8%" : "20%";
        const style = { display: "inline-block", marginLeft };
        return (
            <>
                <div style={style}>
                    {this.renderSpeedometer(altitude, "Altitude")}
                </div>
                <div style={style}>
                    {this.renderSpeedometer(pressure, "Pressure")}
                </div>
            </>
        );
    }

    renderTemp() {
        let { temperature } = this.state;
        temperature = Math.round(temperature * 100) / 100;
        return (
            <div
                style={{
                    marginLeft: "16%",
                    marginTop: "8%",
                    zIndex: "2",
                    position: "absolute",
                }}
            >
                <Thermometer
                    theme='dark'
                    value={temperature}
                    max='40'
                    min='20'
                    format='°C'
                    size='large'
                    height='300'
                />
            </div>
        );
    }

    renderVideo() {
        const piUrl = getVideoUrl();
        const { width, height } = this.state;
        return (
            <div>
                <div
                    style={{
                        textAlign: "center",
                        marginLeft: "5%",
                        marginRight: "5%",
                    }}
                >
                    <iframe
                        title='3'
                        width={width * 0.9}
                        height={height / 1.6}
                        src={piUrl}
                        frameBorder='0'
                        allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                    />
                </div>
            </div>
        );
    }

    render() {
        // const graphs = [<Temperature />, <Altitude />, <Pressure />];
        return (
            <div>
                {this.renderVideo()}
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <div
                                style={{
                                    backgroundColor: "#2b2e43",
                                    textAlign: "right",
                                    paddingLeft: "90px",
                                }}
                            >
                                <Map />
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#02aab0",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Temperature
                                </div>
                                <Temperature />
                            </Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#ef629f",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Altitude
                                </div>
                                <Altitude />
                            </Paper>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{ backgroundColor: "#2f3247" }}>
                                <div
                                    style={{
                                        color: "#ffd194",
                                        paddingTop: "10px",
                                        marginLeft: "10px",
                                    }}
                                >
                                    Pressure
                                </div>
                                <Pressure />
                            </Paper>
                        </Grid>

                        {/* {graphs.map((graph, key) => {
                            return (
                                <Grid key={String(key)} item xs={3}>
                                    <Paper>{graph}</Paper>
                                </Grid>
                            );
                        })} */}
                    </Grid>
                </div>

                {/* {this.renderSpeedometers()} */}
                {/* {this.renderTemp()} */}
                {/* <MapChart /> */}
            </div>
        );
    }
}

const mapStateToProps = ({ actionReducer }) => {
    return {
        users: actionReducer.users,
        ssar: actionReducer.ssar,
    };
};

Dashboard.defaultProps = {
    actions: null,
    ssar: null,
    users: null,
};

Dashboard.propTypes = {
    actions: PropTypes.any,
    ssar: PropTypes.any,
    users: PropTypes.any,
};

export default isServerSideRendering()
    ? Dashboard
    : connect(mapStateToProps, mapDispatchToProps)(Dashboard);
