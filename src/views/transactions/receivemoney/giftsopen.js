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


const GiftsOpen = memo((props) => {
    const [toggler, setToggler] = useState(false);
    const { refgift, idsender, idreceiver } = useParams();
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

        setIsLoading(true)
        http.post("confirm/gift", inputs)
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
        http.get('git/open/select/' + refgift).then(res => {
            setgift(res.data);
        })
    }
    console.log(gift.id_sender_gift)


    const [info_user, setinfo_user] = useState([]);
    useEffect(() => {
        fetchAllinfo_user();
    }, []);
    const fetchAllinfo_user = () => {
        http.get("infos/user/" + idsender).then((res) => {
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



                <Col onClick={() => page("/Gift/See/" + refgift + "/" + idsender + "/" + idreceiver)}>

                    <Card className="d-flex align-items-center justify-content-center" >

                        <Card.Body>
                            <Row>

                                <Col xs="12" style={{ height: '100vh' }} className="d-flex align-items-center" >
                                    <div >
                                        <figure className="figure">
                                            <Image src={giftimage} className="bd-placeholder-img figure-img img-fluid rounded" />
                                            <figcaption className="figure-caption text-center"></figcaption>
                                        </figure>
                                        <div className="d-flex align-items-center" >
                                            <p>
                                                {info_user1.nom} {info_user1.prenom}
                                                <br />
                                                Vous avez reçu un cadeau de la part de, <br /> You have received the gift from <br />
                                                <b><i>  {info_user.nom} {info_user.prenom} </i></b></p>
                                        </div>
                                    </div>



                                </Col>


                            </Row>
                        </Card.Body>
                    </Card>

                </Col>





            </Row>
        </div>
    )
}
)

export default GiftsOpen
