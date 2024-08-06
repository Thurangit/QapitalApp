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
import logo from "../../../assets/logos/logosf.png";
import qrlogo from "../../../assets/images/brands/qrlogo.jpg";
import logogift from "../../../assets/images/brands/logogift.jpg";
import logommoney from "../../../assets/images/brands/logommoney.jpg";


const GifsParams = memo((props) => {
    const [toggler, setToggler] = useState(false);
    const { idreceiver, amount, idgift } = useParams();
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
    const confirmsendgift = () => {

        setIsLoading(true);
        const informations = {
            userid: userid,
            idreceiver: idreceiver,
            montant: amount,
            idgift: idgift,
            text: inputs.text,
        }
        console.log(informations)
        http.post("confirm/gift", informations)
            .then((res) => {
                setIsLoading(false);
                navigate("/Confirm/Send/Money/" + res.data)
            })
            .catch((e) => {
                setIsLoading(false);
                console.error("Faillure", e);
            });
    }


    const [gift, setgift] = useState([]);
    useEffect(() => {
        fetchAllgift();
    }, []);

    const fetchAllgift = () => {
        http.get('gift/select/' + userid + '/' + amount + '/' + idgift).then(res => {
            setgift(res.data);
        })
    }



    const page = (page) => {
        navigate(page);
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
                        <h6 className="normaltitle">Envoyer <br /> un cadeau</h6>
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
                            <Row>

                                <Col xs="12">
                                    <div className="d-flex justify-content-center" onClick={() => page("/Send/Money/Operators/OM")}>
                                        <figure className="figure">
                                            <Image src={"http://192.168.44.44:8000/gifts/" + gift.link_gift} className="bd-placeholder-img figure-img img-fluid rounded" />
                                            <figcaption className="figure-caption text-center"></figcaption>
                                        </figure>
                                    </div>
                                </Col>
                                <Col xs="12">
                                    <div>
                                        <form>


                                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                                <Form.Label className="normaltext">
                                                    Montant
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="code"
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2" controlId="formBasicPassword">
                                                <Form.Label className="normaltext">
                                                    Texte
                                                </Form.Label>
                                                <textarea className="form-control" name="text" onChange={handleChange}></textarea>
                                            </Form.Group>
                                            <div className="mt-3">
                                                <Button variant="primary" onClick={confirmsendgift}>
                                                    Confirmer
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                </Col>





            </Row>
        </Fragment>
    )
}
)


export default GifsParams
