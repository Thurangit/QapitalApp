import React, { useState, useEffect, useRef, memo, Fragment } from "react";
import {
    Row,
    Col,
    Button,
    Card,
    Image,
    Table,
    Modal,
    Form,
    Spinner,
    InputGroup,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/authuser/AuthUser";

// AOS
import AOS from "aos";
import "aos";
import "../../../../node_modules/aos/dist/aos.css";

import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles

// import 'swiper/components/navigation/navigation.scss';

// Redux Selector / Action
import { useSelector } from "react-redux";
// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// install Swiper modules
import image1 from "../../../assets/images/activities/image1.jpeg";
import Axios from "axios";
import axios from "axios";
import fileDownload from 'js-file-download';
SwiperCore.use([Navigation]);


const AssociationForum = memo((props) => {
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;
    const { idassociation } = useParams();

    const [isLoading, setIsLoading] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [documents_association, setdocuments_association] = useState([]);
    useEffect(() => {
        fetchAlldocuments_association();
    }, []);

    const fetchAlldocuments_association = () => {
        http.get('get/documents/association/' + userid + '/' + idassociation).then(res => {
            setdocuments_association(res.data);
        })
    }




    const moveDocument = (id) => {
        const informations = {
            idmember: id,
            idassociation: idassociation,
        };
        console.log(informations)
        http.post("/move/admin/association", informations).then((res) => {

        });
    }



    const [associations_info, setassociations_info] = useState([]);
    useEffect(() => {
        fetchAllassociations_info();
    }, []);

    const fetchAllassociations_info = () => {
        http.get('get/info/association/' + userid + '/' + idassociation).then(res => {
            setassociations_info(res.data);
        })
    }

    ///

    const [count, setCount] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value, idassociation, userid }));
    };

    const [intitule, setIntitule] = useState('');
    const [imagedata, setImagedata] = useState(null);

    const handleChange2 = (e) => {
        const selectedFile = e.target.files[0];
        setImagedata(selectedFile);
    }
    const handleChangeIntitule = (e) => {
        setIntitule(e.target.value);
    }
    const submitData = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (imagedata) {
            const formData = new FormData();
            formData.append("file", imagedata);
            formData.append("intitule", intitule);
            formData.append("idassociation", idassociation);

            Axios.post("http://192.168.44.44:8000/api/set/document/association", formData)
                .then((res) => {
                    fetchAlldocuments_association();
                    handleClose();
                    setIsLoading(false);
                })

                .catch((e) => {
                    console.error("Faillure", e);
                    setIsLoading(false);
                });

        }
    };






    const [messages, setMessages] = useState([]);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const message = event.target.elements.message.value;
        setMessages([...messages, message]);
        event.target.elements.message.value = '';
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    };


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

    return (
        <Fragment>


            <Row className="smarthphone">
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Chat</h2>
                    <div className="chat-box" style={{ height: 'calc(100vh - 150px)', overflowY: 'scroll' }}>

                        {messages.map((message, index) => (
                            <div key={index} className={`message ${index % 2 === 0 ? 'left' : 'right'}`}>
                                <p>{message}</p>
                            </div>
                        ))}

                        <div ref={messagesEndRef} />
                    </div>
                    <Form onSubmit={handleSubmit} className="form-inline">

                        <InputGroup className=" mb-3">
                            <textarea className="form-control" name="message" aria-label="With textarea"></textarea>
                            <Button variant="primary" type="submit">
                                Send
                            </Button>
                        </InputGroup>

                    </Form>
                </Col>



                {/* /////////Modals */}



                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="normaltitle">Nouveau fichier</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>


                        <Form onSubmit={submitData}>
                            <Form.Group className="mb-2">
                                <Form.Label>Nom du document</Form.Label>
                                <input
                                    className="form-control"
                                    type="text"
                                    onChange={handleChangeIntitule}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Choisissez un fichier</Form.Label>
                                <input
                                    className="form-control"
                                    type="file"
                                    onChange={handleChange2}
                                />
                            </Form.Group>




                            <Button variant="info" type="submit">{isLoading ? <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : "Confirmer"}</Button>{"  "}
                            <Button variant="danger" onClick={handleClose}>Annuler</Button>
                        </Form>
                    </Modal.Body>
                </Modal >


            </Row>
        </Fragment >
    );
});

export default AssociationForum;
