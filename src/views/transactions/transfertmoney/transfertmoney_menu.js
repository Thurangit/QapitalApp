import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns.js';
// import {bindActionCreators} from "redux"

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

const TransfertMoneyOptions = memo((props) => {
    const [toggler, setToggler] = useState(false);
    const { ref } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;


    const click = (idassociation) => {
        navigate('/Detail/Association/Of/User/' + idassociation)
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
                                <Table striped id="basic-table" className=" mb-0" role="grid">
                                    <thead>
                                        <tr>
                                            <th>Intitulé</th>
                                            <th>Date de création</th>
                                            <th>Etat</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </Table>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>











            {/* Smartphone */}

            {/* ///////////////////////////////////// Smartphone */}
            <Row className="smarthpone">

                <div className="d-flex justify-content-between align-items-center mt-3 mb-4">
                    <div>
                        <h6 className="normaltitle">Transfert</h6>
                    </div>
                    <div className="user-profile">
                        <Image className="theme-color-default-img  rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                        <Image className="theme-color-purple-img rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                        <Image className="theme-color-blue-img rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                        <Image className="theme-color-green-img rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                        <Image className="theme-color-yellow-img rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                        <Image className="theme-color-pink-img rounded-pill avatar-50 img-fluid" src={user.avatar} alt="" />
                    </div>
                </div>



                <Col>

                    <Card>

                        <Card.Body>
                            <ul className="list-inline m-0 p-0">

                                <li className="d-flex mb-4 align-items-center" key="idx">
                                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <Image className="theme-color-green-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                    <div className="ms-2 flex-grow-1" onClick={() => click("")}>
                                        <h6 className="normaltext">Recharger mon compte</h6>
                                        <p className="mb-0 subtext">Orange Money & MTN Mobile Money</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>

                                <li className="d-flex mb-4 align-items-center" key="idx">
                                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <Image className="theme-color-green-img rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={logommoney} alt="qapital" />
                                    <div className="ms-2 flex-grow-1" onClick={() => click("")}>
                                        <h6 className="normaltext">Retirer de l'argent</h6>
                                        <p className="mb-0 subtext">Orange Money & MTN Mobile Money</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>



                            </ul>
                        </Card.Body>
                    </Card>

                </Col>





            </Row>
        </Fragment>
    )
}
)


export default TransfertMoneyOptions
