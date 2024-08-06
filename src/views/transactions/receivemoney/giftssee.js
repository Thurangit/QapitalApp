import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown, FormGroup, Spinner } from 'react-bootstrap'
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

import giftimage from "../../../assets/images/brands/gift.gif";
import logo from "../../../assets/logos/logosf.png";
import qrlogo from "../../../assets/images/brands/qrlogo.jpg";
import logogift from "../../../assets/images/brands/logogift.jpg";
import logommoney from "../../../assets/images/brands/logommoney.jpg";
import om from "../../../assets/images/brands/om.png";
import momo from "../../../assets/images/brands/momo.png";


const GiftsSee = memo(() => {
    const [toggler, setToggler] = useState(false);
    const { refgift } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;


    const username = user.nom;



    const [inputs, setInputs] = useState({});



    const [gift, setgift] = useState([]);
    useEffect(() => {
        fetchAllgift();
    }, []);

    const fetchAllgift = () => {
        http.get('git/open/select/' + refgift).then(res => {
            setgift(res.data);
        })
    }

    const [gift_informations, setgift_informations] = useState([]);
    useEffect(() => {
        fetchAllgift_informations();
    }, []);

    const fetchAllgift_informations = () => {
        http.get('gift/select/' + userid + '/' + gift.montant_gift + '/' + gift.id_ref_gift).then(res => {
            setgift_informations(res.data);
        })
    }











    const page = (page) => {
        navigate(page);
    }



    return (
        <div>
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










            {/* ///////////////////////////////////// Smartphone */}
            <Row className="smarthpone">



                <Col >

                    <Card className="d-flex align-items-center justify-content-center">
                        <Card.Body>
                            <Row>

                                <Col xs="12" style={{ height: '100vh' }} className="d-flex align-items-center" >
                                    <div onClick={() => page("/Send/Money/Operators/OM")}>
                                        <div className="d-flex justify-content-center">
                                            <figure className="figure">
                                                <Image src={"http://192.168.44.44:8000/gifts/" + gift.ref2_gift} className="bd-placeholder-img figure-img img-fluid rounded" />
                                            </figure>
                                        </div>
                                        <div className="d-flex mt-2" style={{ fontFamily: 'fantasy' }}>
                                            {gift.text_gift}
                                        </div>
                                        <div className="d-flex justify-content-center align-items-center mt-3" >

                                            <img
                                                className="rounded img-fluid avatar-40 me-2 bg-soft-primary"
                                                src={logogift}
                                                alt=""
                                            />
                                            <small className="normaltitle"><h6 style={{ fontFamily: 'fantasy' }}>{gift.montant_gift} XAF </h6> </small>
                                        </div>
                                    </div>
                                </Col>
                            </Row>



                        </Card.Body>

                    </Card>
                    <Card>
                        <Card.Body>
                            <Row>
                                <h6 className="text-center"> Méthodes De Retrait</h6>

                                <div className="d-flex justify-content-center mt-4" >
                                    <div className="d-flex align-items-center" >

                                        <img
                                            className="rounded img-fluid avatar-50 me-2 bg-soft-primary"
                                            src={logo}
                                            alt="profile"
                                        />
                                        <small className="normaltext">Qapital <br /> {username} </small>
                                    </div>

                                    <div className="d-flex align-items-center mb-2" >

                                        <img
                                            className="rounded img-fluid avatar-50 me-2 ms-3 bg-soft-primary"
                                            src={om}
                                            alt="profile"
                                        />
                                        <small className="normaltext">OM</small>
                                    </div>

                                    <div className="d-flex align-items-center" >

                                        <img
                                            className="rounded img-fluid avatar-50 me-2 ms-3 bg-soft-primary"
                                            src={momo}
                                            alt="profile"
                                        />
                                        <small className="normaltext">MoMo</small>
                                    </div>

                                </div>
                            </Row>

                        </Card.Body>
                    </Card>
                </Col>






            </Row>
        </div>
    )
}
)

export default GiftsSee
