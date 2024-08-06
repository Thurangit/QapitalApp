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
import sendp from "../../../assets/images/brands/sendp.jpg";

import shap6 from "../../../assets/images/shapes/06.png";

const PaiementsRecu = memo((props) => {
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

    const [payement_sender_list, setpayement_sender_list] = useState([]);
    useEffect(() => {
        fetchAllpayement_sender_list();
    }, []);

    const fetchAllpayement_sender_list = () => {
        http.get('get/payements/of/receiver/' + userid).then(res => {
            setpayement_sender_list(res.data);
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

                                                <td onClick={""}>
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
                                {payement_sender_list.map((item, idc) => (
                                    <li className="d-flex align-items-center  mb-4 " key={idc}>
                                        <Image className="theme-color-default-img  rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <Image className="theme-color-purple-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <Image className="theme-color-blue-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <Image className="theme-color-green-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <Image className="theme-color-yellow-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <Image className="theme-color-pink-img rounded-pill avatar-30" src={sendp} alt="qapital" />
                                        <div className="ms-3 flex-grow-1">
                                            <h6><small>{item.intitule_payl}</small></h6>
                                            <p className="smalltext mb-0">RC: {item.montant_send_payl} XAF | MT: {item.montant_final_payl} XAF</p>
                                        </div>
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                as={CustomToggle}
                                                href="#"
                                                variant=" nav-link"
                                                id="notification-drop"
                                                data-bs-toggle="dropdown"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <g>
                                                        <g>
                                                            <circle cx="7" cy="12" r="1" fill="black" />
                                                            <circle cx="12" cy="12" r="1" fill="black" />
                                                            <circle cx="17" cy="12" r="1" fill="black" />
                                                        </g>
                                                    </g>
                                                </svg>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item href={"/Infos/Cotisation/"}>
                                                    <svg className="me-2" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd"
                                                            d="M12 2.75C17.108 2.75 21.25 6.891 21.25 12C21.25 17.108 17.108 21.25 12 21.25C6.891 21.25 2.75 17.108 2.75 12C2.75 6.891 6.891 2.75 12 2.75Z"
                                                            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                        <path d="M11.9951 8.2041V12.6231" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                            strokeLinejoin="round" />
                                                        <path d="M11.995 15.7959H12.005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <small>Informations</small>
                                                </Dropdown.Item>
                                                <Dropdown.Item href="#">
                                                    <svg width="16" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                                    </svg>
                                                    <small>Quitter</small>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                ))}


                            </ul>
                        </Card.Body>
                    </Card>

                </Col>








            </Row>
        </Fragment >
    )
}
)


export default PaiementsRecu
