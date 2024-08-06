import React, { Fragment, useEffect, useState } from 'react'

import { Row, Col, Image, Form, Nav, Dropdown, Tab, Button, Modal, InputGroup, Spinner } from 'react-bootstrap'
import Card from '../../components/Card'

import { Link, useNavigate } from 'react-router-dom'
// img

import om from "../../assets/images/brands/om.png";
import momo from "../../assets/images/brands/momo.png";

import AuthUser from '../../components/authuser/AuthUser';
import Axios from 'axios';

const ProfileUser = () => {
    const [toggler, setToggler] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const { user, http } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;
    var seconduser = 0;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = () => setShow1(true);
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);
    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);
    const [show5, setShow5] = useState(false);
    const handleClose5 = () => {
        setShow5(false);
        setShowUser(false);
    };
    const handleShow5 = () => setShow5(true);



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

    const [transactions_setters, settransactions_setters] = useState([]);
    useEffect(() => {
        fetchAlltransactions_setters();
    }, []);

    const fetchAlltransactions_setters = () => {
        http.get('get/transactions/setters/' + userid).then(res => {
            settransactions_setters(res.data);
        })
    }

    const fetchAllinfo_user = () => {
        http.get('infos/user/' + userid).then(res => {
            setinfo_user(res.data);

            setInputs({

                email: res.data.email,
                tel: res.data.num_tel_one,
                whatsapp: res.data.num_tel_two,
                pays: res.data.nationalite,
                ville: res.data.ville_residence,
                userid: res.data.id,

            });
        })
    }

    const [imagedata, setImagedata] = useState(null);

    const handleChange2 = (e) => {
        const selectedFile = e.target.files[0];
        setImagedata(selectedFile);
    }
    const submitData = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (imagedata) {
            const formData = new FormData();
            formData.append("file", imagedata);

            Axios.post("http://192.168.44.44:8000/api/set/profilephoto/" + userid, formData)
                .then((res) => {

                    setIsLoading(false);
                    handleClose1();
                    fetchAllinfo_user();
                })
                .catch((e) => {
                    console.error("Faillure", e);
                });

        }
    };






    const confirminformations = () => {
        setIsLoading(true);
        http.post("set/informations/", inputs)
            .then((res) => {

                setIsLoading(false);
                handleClose();
                fetchAllinfo_user();
            })
            .catch((e) => {
                setIsLoading(false);
                console.error("Faillure", e);
            });
    }
    const confirmids = () => {
        setIsLoading(true);
        http.post("set/identifiants/", inputs)
            .then((res) => {
                console.log(res);
                handleClose2();
                if (res.data === "email_exist") {
                    alert("Cette adresse email est déjà associée à un autre compte veuillez en choisir un autre")
                } else { }
                if (res.data === "tel_exist") {
                    alert("Ce numéro est déjà associée à un autre compte veuillez en choisir un autre")
                } else { }
                if (res.data === "whatsapp_exist") {
                    alert("Ce contact whatsapp est déjà associée à un autre compte veuillez en choisir un autre")
                } else { }
                if (res.data === "new_renew_error") {
                    alert("Le nouveau mot de passe et sa confirmation ne correspondent pas")
                } else { }
                if (res.data === "new_renew_error") {
                    alert("Ancien mot de passe erroné")
                } else { }


                setIsLoading(false);
                fetchAllinfo_user();

            })
            .catch((e) => {
                console.error("Faillure", e);
            });
    }

    const confirmtransactions = () => {
        setIsLoading(true);
        http.post("set/transactions/setters", inputs)
            .then((res) => {

                setIsLoading(false);
                handleClose4();
                fetchAllinfo_user();
                fetchAlltransactions_setters();
            })
            .catch((e) => {
                setIsLoading(false);
                console.error("Faillure", e);
            });
    }


    const [showUser, setShowUser] = useState(false);
    const setUser = () => {
        setShowUser(true);
    };
    const searchuser = () => {
        setIsLoading(true);
        http.post("search/user", inputs)
            .then((res) => {
                seconduser = res.data
                console.log(res.data)
                fetchAllinfo_user1();
                setShowUser(true);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                handleClose5();
                console.error("Faillure", e);
            });
    }

    const invituser = (id_invit) => {
        setIsLoading(true)

        const informations = {
            owner: userid,
            invit: id_invit,
        }
        http.post("invit/user", informations)
            .then((res) => {
                seconduser = 0;
                console.log(res.data);
                fetchAllcontacts_user();
                fetchAllcontacts_invitations();

                setShowUser(false);
                setIsLoading(false);
                handleClose5();
            })
            .catch((e) => {
                handleClose5();
                setShowUser(false);
                setIsLoading(false);
                console.error("Faillure", e);
            });
    }

    const acceptinvit = (id_invit) => {
        setIsLoading(true)

        const informations = {
            owner: id_invit,
            invit: userid,
        }

        console.log(informations)

        http.post("accept/invit/user", informations)
            .then((res) => {
                seconduser = 0;
                console.log(res.data);
                fetchAllcontacts_user();
                fetchAllcontacts_invitations();
                setShowUser(false);
                setIsLoading(false);
            })
            .catch((e) => {
                setShowUser(false);
                setIsLoading(false);
                console.error("Faillure", e);
            });
    }

    const [info_user1, setinfo_user1] = useState([]);
    useEffect(() => {
        fetchAllinfo_user1();
    }, []);

    const fetchAllinfo_user1 = () => {
        http.get('infos/user/' + seconduser).then(res => {
            setinfo_user1(res.data);
        })
    }

    const [contacts_user, setcontacts_user] = useState([]);
    useEffect(() => {
        fetchAllcontacts_user();
    }, []);

    const fetchAllcontacts_user = () => {
        http.get('contacts/user/' + userid).then(res => {
            setcontacts_user(res.data);
        })
    }

    const [contacts_invitations, setcontacts_invitations] = useState([]);
    useEffect(() => {
        fetchAllcontacts_invitations();
    }, []);

    const fetchAllcontacts_invitations = () => {
        http.get('invitations/user/' + userid).then(res => {
            setcontacts_invitations(res.data);
        })
    }




    return (
        <Fragment>

            <Tab.Container defaultActiveKey="first">
                <Row>
                    <Col xs="12">
                        <Card>
                            <Card.Body>

                                <Nav as="ul" className="d-flex nav-pills justify-content-between align-items-center mb-0 text-center profile-tab" data-toggle="slider-tab" id="profile-pills-tab" role="tablist">
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="first" className="normaltext">Informations</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="second" className="normaltext">Transactions</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li">
                                        <Nav.Link eventKey="third" className="normaltext">Amis</Nav.Link>
                                    </Nav.Item>

                                </Nav>

                            </Card.Body>

                        </Card>
                    </Col>
                    <Col xs="12">
                        <Tab.Content className="profile-content">
                            <Tab.Pane eventKey="first" id="profile-feed">

                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title d-flex align-items-center" onClick={handleShow}>
                                            <h4 className="card-title text-center normaltitle">Informations Personnelles</h4>
                                        </div>

                                        <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow}>
                                            <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>

                                        <div className="d-flex justify-content-center mt-2 mb-4">
                                            <div className="user-profile" onClick={handleShow1}>
                                                <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                                                <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="mt-2">
                                            <div className="mb-1">Nom: <Link to="#" className="ms-3">{user.nom}</Link></div>
                                            <div className="mb-1">Prénom: <Link to="#" className="ms-3">{user.prenom}</Link></div>
                                            <div className="mb-1">Genre: <Link to="#" className="ms-3">{user.genre}</Link></div>
                                            <div className="mb-1">Date de naissance: <Link to="#" className="ms-3">{user.date_n}</Link></div>
                                            <div className="mb-1">Ville de résidence: <Link to="#" className="ms-3">{info_user.ville_residence}</Link></div>
                                        </div>

                                    </Card.Body>
                                </Card>

                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title d-flex align-items-center">
                                            <h4 className="card-title text-center normaltitle">Identifiants</h4>
                                        </div>

                                        <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow2}>
                                            <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-1">id: <Link to="#" className="ms-3">{info_user.code}</Link></div>
                                        <div className="mb-1">Email: <Link to="#" className="ms-3">{info_user.email}</Link></div>
                                        <div className="mb-1">Téléphone: <Link to="#" className="ms-3">{info_user.num_tel_one}</Link></div>
                                        <div className="mb-1">Whatsapp: <Link to="#" className="ms-3">{info_user.num_tel_two}</Link></div>
                                        <div className="mb-1">Mot de passe: <Link to="#" className="ms-3">******</Link></div>

                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title d-flex align-items-center">
                                            <h4 className="card-title text-center normaltitle">Documents</h4>
                                        </div>


                                    </Card.Header>
                                    <Card.Body>
                                        <div className="mb-1 d-flex justify-content-between">
                                            <div to="#" className="d-flex align-items-center">Pièce d'identité</div>
                                            <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow3}>
                                                <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                    <path fillRule="evenodd" clipRule="evenodd"
                                                        d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                        strokeLinejoin="round" />
                                                </svg>
                                            </span>

                                        </div>
                                    </Card.Body>
                                </Card>


                            </Tab.Pane>
                            <Tab.Pane eventKey="second" id="profile-activity">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title d-flex align-items-center">
                                            <h4 className="card-title text-center normaltitle">Modes de paiement</h4>
                                        </div>

                                        <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow4}>
                                            <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                                <path fillRule="evenodd" clipRule="evenodd"
                                                    d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                                                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                            </svg>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>
                                        <ul className="list-inline m-0 p-0">

                                            {transactions_setters.map((item, idtrs) => (

                                                <li className="d-flex mb-4 align-items-center" key={idtrs}>
                                                    {item.operateur_ts === "Orange Money" ? <Image src={om} alt="story-img" className="rounded-pill avatar-40" /> : null}
                                                    {item.operateur_ts === "MTN Mobile Money" ? <Image src={momo} alt="story-img" className="rounded-pill avatar-40" /> : null}

                                                    <div className="ms-3 flex-grow-1">
                                                        <h6>{item.number_one_ts}</h6>
                                                        <p className="mb-0">{item.operateur_ts}</p>
                                                    </div>
                                                    <Dropdown>
                                                        <Dropdown.Toggle as="span" id="dropdownMenuButton9" data-bs-toggle="dropdown" aria-expanded="false" role="button">
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu className="dropdown-menu-end" aria-labelledby="dropdownMenuButton9">
                                                            <Dropdown.Item href="#">Unfollow</Dropdown.Item>
                                                            <Dropdown.Item href="#">Unfriend</Dropdown.Item>
                                                            <Dropdown.Item href="#">block</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="third" id="profile-friends">
                                <Card>
                                    <Card.Header className="d-flex justify-content-between">
                                        <div className="header-title d-flex align-items-center">
                                            <h4 className="card-title text-center normaltitle">Contacts</h4>
                                        </div>

                                        <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow5}>
                                            <svg
                                                width="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M19.2036 8.66919V12.6792"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M21.2497 10.6741H17.1597"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="list-inline m-0 p-0 mb-3">
                                            {contacts_invitations.map((item, idinvit) => (
                                                <div className="d-flex justify-content-between align-items-center mb-3" key={idinvit}>
                                                    <div className="d-flex align-items-center">
                                                        <Image className="theme-color-default-img  rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-purple-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-blue-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-green-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-yellow-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-pink-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />


                                                        <div className="ms-3">
                                                            <h6 className=''><Link>{item.nom}</Link></h6>
                                                            <p className="mb-0 normaltext"><Link>{item.prenom}</Link></p>
                                                        </div>

                                                    </div>

                                                    <div className="d-flex align-items-center me-2">

                                                        <svg width="18" onClick={() => acceptinvit(item.id_owner)} className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                                            <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                                        </svg> {" "}
                                                        <svg width="18" onClick={""} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                                            <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="list-inline m-0 p-0">

                                            {contacts_user.map((item, idcontact) => (
                                                <div className="d-flex justify-content-between align-items-center mb-3" key={idcontact}>
                                                    <div className="d-flex align-items-center">
                                                        <Image className="theme-color-default-img  rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-purple-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-blue-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-green-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-yellow-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />
                                                        <Image className="theme-color-pink-img rounded-pill avatar-40" src={item.avatar} alt="qapital" />

                                                        {item.state_relation === "wait" ? (
                                                            <div className="ms-3">
                                                                <h6 className=''><Link>{item.nom} </Link></h6>
                                                                <p className="mb-0 normaltext"><Link>{item.prenom}</Link></p>
                                                            </div>) : (
                                                            <div className="ms-3">
                                                                <h6 className=''>{item.nom} </h6>
                                                                <p className="mb-0  normaltext">{item.prenom}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                    {item.state_relation === "wait" ? (
                                                        <div className="d-flex align-items-center me-2">

                                                            <svg width="18" onClick={""} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                                            </svg>
                                                        </div>) : (<div className="d-flex align-items-center me-2">

                                                            <svg width="18" onClick={""} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                                                <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                                            </svg>
                                                        </div>)}
                                                </div>
                                            ))}
                                        </div>
                                        <ul className="list-inline m-0 p-0">



                                        </ul>
                                    </Card.Body>
                                </Card>
                            </Tab.Pane >
                            <Tab.Pane eventKey="fourth" id="profile-profile">

                            </Tab.Pane >
                        </Tab.Content>
                    </Col>


                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Modifier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>

                                <Form.Group className="mb-3" controlId="formBasicPassword">


                                    <div classname="mb-2">
                                        <Form.Label className="normaltext">Ville</Form.Label>
                                        <Form.Control type="text" value={inputs.ville} name="ville" onChange={handleChange} />
                                    </div>


                                </Form.Group>



                                <Button variant="primary" onClick={confirminformations} disabled={isLoading}>{isLoading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Confirmer"}</Button>{' '}
                                <Button variant="danger" onClick={handleClose}>Annuler</Button>
                            </form>
                        </Modal.Body>
                    </Modal >



                    <Modal show={show1} onHide={handleClose1}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Modifier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <Form onSubmit={submitData}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Choisissez la photo</Form.Label>
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
                                <Button variant="danger" onClick={handleClose1}>Annuler</Button>
                            </Form>
                        </Modal.Body>
                    </Modal >




                    <Modal show={show2} onHide={handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Modifier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <div className="mb-2">
                                        <Form.Label className="normaltext">Email</Form.Label>
                                        <Form.Control type="text" value={inputs.email} name="email" onChange={handleChange} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="normaltext">Téléphone</Form.Label>
                                    <InputGroup className=" mb-3">

                                        <span className="input-group-text" id="basic-addon1">+237</span>
                                        <Form.Control type="number" value={inputs.tel} name="tel" onChange={handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="normaltext">Whatsapp</Form.Label>
                                    <InputGroup className=" mb-3">

                                        <span className="input-group-text" id="basic-addon1">+237</span>
                                        <Form.Control type="number" value={inputs.whatsapp} name="whatsapp" onChange={handleChange} />
                                    </InputGroup>
                                </Form.Group>

                                <h6 className="mt-4 mb-3">Modifier votre mot de passe</h6>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="normaltext">Ancien mot de passe</Form.Label>
                                    <InputGroup className=" mb-3">

                                        <Form.Control type="password" name="oldpassword" onChange={handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="normaltext">Nouveau mot de passe</Form.Label>
                                    <InputGroup className=" mb-3">

                                        <Form.Control type="password" name="newpassword" onChange={handleChange} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label className="normaltext">Re-entrez le nouveau mot de passe</Form.Label>
                                    <InputGroup className=" mb-3">

                                        <Form.Control type="password" name="renewpassword" onChange={handleChange} />
                                    </InputGroup>
                                </Form.Group>

                                <Button variant="primary" onClick={confirmids} disabled={isLoading}>{isLoading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Confirmer"}</Button>{' '}
                                <Button variant="danger" onClick={handleClose2}>Annuler</Button>
                            </form>
                        </Modal.Body>
                    </Modal >


                    <Modal show={show3} onHide={handleClose3}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Modifier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <ul>
                                <li><Link to={"/Set/Document/CNI"}>CNI</Link></li>
                                <li><Link to={""}>Recepice</Link></li>
                                <li><Link to={""}>Passport</Link></li>
                                <li><Link to={""}>Permit de conduire</Link></li>
                            </ul>

                            <Button variant="danger" onClick={handleClose3}>Annuler</Button>

                        </Modal.Body>
                    </Modal >


                    <Modal show={show4} onHide={handleClose4}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Modifier</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>


                            <form>

                                <Form.Group className="mb-3" controlId="formBasicPassword">

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="normaltext">Numéro</Form.Label>
                                        <InputGroup className=" mb-3">

                                            <span className="input-group-text" id="basic-addon1">+237</span>
                                            <Form.Control type="number" name="numtel" onChange={handleChange} required />
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label className="normaltext">Opérateur*</Form.Label>
                                        <InputGroup className=" mb-3" >

                                            <Form.Select className="form-select" onChange={handleChange} name="operator" required>
                                                <option defaultValue=""></option>
                                                <option defaultValue="Orange Money">Orange Money</option>
                                                <option defaultValue="MTN Mobile Money">MTN Mobile Money</option>
                                            </Form.Select>
                                        </InputGroup>
                                    </Form.Group>

                                </Form.Group>



                                <Button variant="primary" onClick={confirmtransactions} disabled={isLoading}> {isLoading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Confirmer"}</Button>{' '}
                                <Button variant="danger" onClick={handleClose4}>Annuler</Button>
                            </form>

                        </Modal.Body>
                    </Modal >



                    <Modal show={show5} onHide={handleClose5}>
                        <Modal.Header closeButton>
                            <Modal.Title className="normaltitle">Ajouter</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            {showUser ? (<div>

                                <div className="d-flex justify-content-center mt-2 mb-3">
                                    <div className="user-profile">
                                        <Image
                                            className="theme-color-default-img  rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                        <Image
                                            className="theme-color-purple-img rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                        <Image
                                            className="theme-color-blue-img rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                        <Image
                                            className="theme-color-green-img rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                        <Image
                                            className="theme-color-yellow-img rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                        <Image
                                            className="theme-color-pink-img rounded-pill avatar-110 img-fluid"
                                            src={info_user1.avatar}
                                            alt="profil"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="text-center normaltext">
                                        {info_user1.nom} {info_user1.prenom}
                                    </div>
                                </div>

                                <fom>
                                    <Button variant="primary" onClick={() => invituser(info_user1.id)} disabled={isLoading}> {isLoading ? <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : "Inviter"}</Button>{' '}
                                    <Button variant="danger" onClick={handleClose5}>Annuler</Button>
                                </fom>
                            </div>) : (<div>
                                <form>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            <Form.Label className="normaltext">Identifiant</Form.Label>
                                            <InputGroup className=" mb-3">
                                                <Form.Control type="text" name="id" placeholder="Téléphone, Email" onChange={handleChange} required />
                                            </InputGroup>
                                        </Form.Group>
                                    </Form.Group>
                                    <Button variant="primary" onClick={searchuser} disabled={isLoading}> {isLoading ? <Spinner
                                        as="span"
                                        animation="grow"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    /> : "Confirmer"}</Button>{' '}
                                    <Button variant="danger" onClick={handleClose5}>Annuler</Button>
                                </form>
                            </div>)}
                        </Modal.Body>
                    </Modal >




                </Row >
            </Tab.Container >
        </Fragment >
    )

}

export default ProfileUser;