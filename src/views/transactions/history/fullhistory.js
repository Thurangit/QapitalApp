import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import Chart from "react-apexcharts"

import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
// import {bindActionCreators} from "redux"

import AOS from "aos";

import { Line } from 'react-chartjs-2';

import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../../components/authuser/AuthUser.js'

// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar.js'
import Progress from "../../../components/progress.js";

// img
import logo from "../../../assets/logos/logosf.png";
import qrlogo from "../../../assets/images/brands/qrlogo.jpg";
import logogift from "../../../assets/images/brands/logogift.jpg";
import logommoney from "../../../assets/images/brands/logommoney.jpg";

import shap6 from "../../../assets/images/shapes/06.png";

import * as SettingSelector from "../../../store/setting/selectors";
import CountUp from "react-countup";

const FullHistory = memo((props) => {

    const [toggler, setToggler] = useState(false);
    const { ref } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;



    const [last20transactions, setlast20transactions] = useState([]);
    useEffect(() => {
        fetchAlllast20transactions();
    }, []);

    const fetchAlllast20transactions = () => {
        http.get('transactions/of/user/twenty/' + userid).then(res => {
            setlast20transactions(res.data);
        })
    }

    const Page = (page) => {
        navigate(page);
    }




    useSelector(SettingSelector.theme_color);
    const getVariableColor = () => {
        let prefix =
            getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
        if (prefix) {
            prefix = prefix.trim();
        }
        const color1 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary`
        );
        const color2 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}info`
        );
        const color3 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}primary-tint-20`
        );
        const color4 = getComputedStyle(document.body).getPropertyValue(
            `--${prefix}warning`
        );
        return {
            primary: color1.trim(),
            info: color2.trim(),
            warning: color4.trim(),
            primary_light: color3.trim(),
        };
    };
    const variableColors = getVariableColor();

    const colors = [variableColors.primary, variableColors.info];
    useEffect(() => {
        return () => colors;
    });

    useEffect(() => {
        AOS.init({
            startEvent: "DOMContentLoaded",
            disable: function () {
                var maxWidth = 996;
                return window.innerWidth < maxWidth;
            },
            throttleDelay: 10,
            once: true,
            duration: 700,
            offset: 10,
        });
    });




    const chart3 = {
        options: {
            colors: ["#344ed1"],
            chart: {

                sparkline: {
                    enabled: true
                },
                group: 'sparklines',

            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                curve: 'smooth'
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                }
            },
            xaxis: {
                type: 'datetime',
                categories: ["2018-08-19T00:00:00", "2018-09-19T01:30:00", "2018-10-19T02:30:00", "2018-11-19T01:30:00", "2018-12-19T01:30:00"],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
            }
        },
        series: [{
            name: 'series1',
            data: [60, 15, 50, 30, 70]
        },],

    }




    return (
        <Fragment>

            <Row className="pc">
                <Col lg="12">
                    <Card>
                        <Card.Body>
                            <div className="d-flex flex-wrap align-items-center justify-content-between">
                                <div className="d-flex flex-wrap align-items-center">

                                    <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                                        <h4 className="me-2 h4">Mes Associations</h4>
                                    </div>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg="12">
                    <Card>

                        <Card.Body className="p-0">
                            <div className="table-responsive mt-4">

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>











            {/* Smartphone */}

            {/* ///////////////////////////////////// Smartphone */}
            <Row className="smarthpone">

                <Col md="12" lg="12" xs="7">
                    <Row className="row-cols-1">
                        <div className="overflow-hidden d-slider1 " data-aos="fade-up" data-aos-delay="800">
                            <Swiper
                                className="p-0 m-0 mb-2 list-inline "
                                slidesPerView={5}
                                spaceBetween={32}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1 },
                                    550: { slidesPerView: 2 },
                                    991: { slidesPerView: 3 },
                                    1400: { slidesPerView: 3 },
                                    1500: { slidesPerView: 4 },
                                    1920: { slidesPerView: 4 },
                                    2040: { slidesPerView: 7 },
                                    2440: { slidesPerView: 8 }
                                }}

                            >

                                <SwiperSlide className="card card-slide border-primary">
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            <div className="border  bg-soft-danger rounded p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            <div className="progress-detail">
                                                <p className="mb-2">Transactions</p>
                                                <div>
                                                    <h2 className="counter"><CountUp start={0} end={34} duration={3} /></h2>
                                                    <span className="subtext">93,250 XAF </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="card card-slide border-primary">
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            <div className="border  bg-soft-danger rounded p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            <div className="progress-detail">
                                                <p className="mb-2">Envois</p>
                                                <div>
                                                    <h2 className="counter"><CountUp start={0} end={34} duration={3} /></h2>
                                                    <span className="subtext">93,250 XAF </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                                <SwiperSlide className="card card-slide border-primary">
                                    <div className="card-body">
                                        <div className="progress-widget">
                                            <div className="border  bg-soft-danger rounded p-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                                </svg>
                                            </div>
                                            <div className="progress-detail">
                                                <p className="mb-2">Reçus</p>
                                                <div>
                                                    <h2 className="counter"><CountUp start={0} end={34} duration={3} /></h2>
                                                    <span className="subtext">93,250 XAF </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>

                                <div className="swiper-button swiper-button-next"></div>
                                {/* <div className="swiper-button swiper-button-prev"></div> */}
                            </Swiper>
                        </div>
                    </Row>
                </Col>

                <Col xs="5">
                    <Card>
                        <Card.Body>

                            <div className="text-center">
                                <h6 className="counter subtitle"><CountUp start={4} end={100000} duration={3} /> XAF</h6>

                                <span className="text-success">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="20" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </span>

                            </div>
                        </Card.Body>
                        <Chart options={chart3.options} series={chart3.series} type="area" height="40" />
                    </Card>
                </Col>



                <Col className="mt-1">

                    <Card>
                        <Card.Header className="d-flex justify-content-between">
                            <div className="header-title">
                                <h6 className="card-title">Transactions (03 - 2024)</h6>
                            </div>
                            <svg width="18" onClick={""} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor" />
                            </svg>
                        </Card.Header>
                        <Card.Body className="p-0">
                            <div className="table-responsive mt-4">
                                <Table className=" mb-0" role="grid">
                                    <thead>
                                        <tr>
                                            <th scope="col"><small>Destinataire</small></th>
                                            <th className="text-center" scope="col"><small>Montant</small></th>
                                            <th className="text-center" scope="col"><small>Type</small></th>
                                            <th className="text-center" scope="col"><small>Etat</small></th>
                                            <th className="text-center" scope="col"><small>Date</small></th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {last20transactions.map((item, idx) => (
                                            <tr key={idx}>
                                                <td>
                                                    {item.motif_transaction === "Gift" ?
                                                        <div className="d-flex align-items-center" onClick={() => Page("/Gift/Open/" + item.ref_transaction + "/" + item.idsender_transaction + "/" + item.idreceiver_transaction)}>

                                                            <img
                                                                className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                                                                src={logogift}
                                                                alt="profile"
                                                            />
                                                            <small className="normaltext">{item.ref3_transaction}</small>
                                                        </div>
                                                        :
                                                        <div className="d-flex align-items-center">
                                                            <img
                                                                className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                                                                src="https://img.freepik.com/premium-photo/flight-attendant-digital-avatar-generative-ai_934475-9234.jpg"
                                                                alt="profile"
                                                            />
                                                            <small className="normaltext">{item.ref3_transaction}</small>
                                                        </div>}
                                                </td>

                                                <td className="text-center normaltext"><small>3000 XAF</small></td>
                                                <td>
                                                    <div className="text-primary text-center normaltext"><small>Envoi </small></div>
                                                </td>
                                                <td>
                                                    {item.state_transaction === "Accept" ? (<div className="text-success text-center normaltext">Accept</div>) : (<div className="text-danger text-center normaltext">Reject</div>)}

                                                </td>
                                                <td><small className="text-center normaltext">{new Date(item.created_at).toLocaleString()}</small></td>
                                            </tr>
                                        ))}





                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>


                </Col>







            </Row>
        </Fragment>
    )
}
)


export default FullHistory
