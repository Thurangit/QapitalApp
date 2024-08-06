import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown, FormGroup, Spinner } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import QRCode from "qrcode-react"
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
import RadioBtn from '../../../components/setting/elements/radio-btn';


const QrAmountSendMoney = memo((props) => {
    const [toggler, setToggler] = useState(false);
    const { idreceiver } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, userid }))
    }
    const [info_user, setinfo_user] = useState([]);
    useEffect(() => {
        fetchAllinfo_user();
    }, []);

    const fetchAllinfo_user = () => {
        http.get("infos/user/" + userid).then((res) => {
            setinfo_user(res.data);
        });
    };
    const [info_user1, setinfo_user1] = useState([]);
    useEffect(() => {
        fetchAllinfo_user1();
    }, []);

    const fetchAllinfo_user1 = () => {
        http.get("infos/user/" + idreceiver).then((res) => {
            setinfo_user1(res.data);
        });
    };
    var amount = inputs.amount
    const confirmamount = () => {
        setIsLoading(true);
        setcode(true)
        console.log(amount)
        setIsLoading(false);
    }

    const [showcode, setShowcode] = useState(false);
    const setcode = () => {
        setShowcode(true);
    };


    const [associations_list, setassociations_list] = useState([]);
    useEffect(() => {
        fetchAllassociations_list();
    }, []);

    const fetchAllassociations_list = () => {
        http.get('get/associations/of/user/' + userid).then(res => {
            setassociations_list(res.data);
        })
    }

    const click = (idassociation) => {
        navigate('/Detail/Association/Of/User/' + idassociation)
    }


    const page = (page) => {
        navigate(page);
    }

    const qrCodeValue = 'https://example.com'; // Remplacez par la valeur que vous souhaitez encoder dans le QR code



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

                                                <td onClick={() => click(item.id)}>
                                                    <div className="d-flex align-items-center">

                                                        <img
                                                            className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                                                            src={""}
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

                <Col lg="12">
                    <Card>

                        <Card.Body>

                            <div>
                                {showcode ? (

                                    <div >

                                        <h3 className="mt-1 mb-4 text-center">Digital Pay QRcode</h3>
                                        <div className="d-flex justify-content-center mt-2 mb-4">
                                            <div className="user-profile">
                                                <Image
                                                    className="theme-color-default-img  rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-purple-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-blue-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-green-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-yellow-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-pink-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-center mt-4">

                                            <QRCode
                                                value={"12"}

                                                logoWidth={50}

                                                size={250} />

                                        </div>

                                        <p className="text-center mt-1 mb-4 normaltext">Scan Me</p>
                                        <div className="d-flex mt-4 ">
                                            <Image className="theme-color-default-img  rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <Image className="theme-color-purple-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <Image className="theme-color-blue-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <Image className="theme-color-green-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <Image className="theme-color-yellow-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <Image className="theme-color-pink-img rounded-pill avatar-30" src={logo} alt="qapital" />
                                            <div className="ms-2 flex-grow-1" onClick={() => page("/Simple/Send/Money")}>
                                                <p className="normaltext">
                                                    Vous un envoi faites de: {amount} XAF
                                                    <br />
                                                    Avec pour motif: Simple Transfert
                                                </p>

                                            </div>
                                        </div>
                                    </div>) : (
                                    <div>
                                        <div className="d-flex justify-content-center mt-2 mb-3">
                                            <div className="user-profile">
                                                <Image
                                                    className="theme-color-default-img  rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-purple-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-blue-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-green-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-yellow-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                                <Image
                                                    className="theme-color-pink-img rounded-pill avatar-110 img-fluid"
                                                    src={info_user.avatar}
                                                    alt="profil"
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <div className="text-center normaltext">

                                            </div>
                                        </div>

                                        <div>
                                            <form>
                                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                                    <Form.Label className="normaltext">Montant XAF</Form.Label>
                                                    <Form.Control type="number" name="amount" placeholder="1000000" onChange={handleChange} />
                                                    <Form.Label className="subtext text-info">
                                                        Solde: {info_user.solde} XAF
                                                    </Form.Label>
                                                </Form.Group>

                                                <Form.Group className="mb-2" controlId="formBasicPassword">
                                                    <Form.Label className="normaltext">
                                                        Code de confirmation ou mot de passe
                                                    </Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        name="code"
                                                        onChange={handleChange}
                                                    />
                                                </Form.Group>
                                                <div className="mt-3">
                                                    <Button variant="primary" onClick={confirmamount}>
                                                        Confirmer
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                )}

                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}
)


export default QrAmountSendMoney
