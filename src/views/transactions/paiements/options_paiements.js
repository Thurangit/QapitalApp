import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';
// import {bindActionCreators} from "redux"

import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../../components/authuser/AuthUser'

// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar'
import Progress from "../../../components/progress.js";

// img
import logo from "../../../assets/logos/logosf.png";
import qrlogo from "../../../assets/images/brands/qrlogo.jpg";
import logogift from "../../../assets/images/brands/logogift.jpg";
import logommoney from "../../../assets/images/brands/logommoney.jpg";
import createp from "../../../assets/images/brands/createp.jpg";
import receivep from "../../../assets/images/brands/receivep.jpg";
import sendp from "../../../assets/images/brands/sendp.jpg";

import shap6 from "../../../assets/images/shapes/06.png";

const PaiementsOptions = memo((props) => {
    const [toggler, setToggler] = useState(false);
    const { ref } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;


    const [associations_list, setassociations_list] = useState([]);
    useEffect(() => {
        fetchAllassociations_list();
    }, []);

    const fetchAllassociations_list = () => {
        http.get('get/associations/of/user/' + userid).then(res => {
            setassociations_list(res.data);
        })
    }

    const page = (page) => {
        navigate(page)
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
                                        {associations_list.map((item) => (
                                            <tr>

                                                <td>
                                                    <div className="d-flex align-items-center">

                                                        <img
                                                            className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                                                            src={shap6}
                                                            alt="profile"
                                                        />
                                                        <h6>{item.name_association}</h6>

                                                    </div>

                                                </td>


                                                <td>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <h6>{item.dayc_association}/{item.monthc_association}/{item.yearc_association}</h6>
                                                    </div>
                                                </td>

                                                <td>

                                                    {item.state_association === "En cours" ? (<div className="text-success">En cours</div>) : null}

                                                </td>

                                                <td>

                                                    <div>
                                                        <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#" onClick="">
                                                            <span className="btn-inner">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                                    <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                        <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#" >
                                                            <span className="btn-inner">
                                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                                    <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </td>

                                            </tr>
                                        )

                                        )}
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
                        <h6 className="normaltitle">Paiements</h6 >
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

                                <li className="d-flex mb-4 align-items-center" onClick={() => page("/Create/Pay")}>
                                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <Image className="theme-color-green-img rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={createp} alt="qapital" />
                                    <div className="ms-2 flex-grow-1">
                                        <h6 className="normaltext">Ajouter un paiement</h6>
                                        <p className="mb-0 subtext">Créer ou Intégrer</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>

                                <li className="d-flex mb-4 align-items-center" onClick={() => page("/Pay/Sent")}>
                                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <Image className="theme-color-green-img rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={receivep} alt="qapital" />
                                    <div className="ms-2 flex-grow-1" >
                                        <h6 className="normaltext">Paiements envoyés</h6>
                                        <p className="mb-0 subtext">Je suis le receveur</p>
                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>


                                <li className="d-flex mb-4 align-items-center" onClick={() => page("/Pay/Receive")}>
                                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <Image className="theme-color-green-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                    <div className="ms-2 flex-grow-1" >
                                        <h6 className="normaltext">Paiements effectués</h6>
                                        <p className="mb-0 subtext">Je suis le payeur</p>
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


export default PaiementsOptions
