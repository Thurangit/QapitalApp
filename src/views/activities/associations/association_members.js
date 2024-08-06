import React, { Fragment, useEffect, useState } from 'react'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';

import { Row, Col, Image, Form, Nav, Dropdown, Tab, Button, Modal, ListGroup, ListGroupItem, Spinner } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ShareOffcanvas from '../../../components/partials/components/shareoffcanvas'
import image1 from '../../../assets/images/activities/image1.jpeg'
import image2 from '../../../assets/images/activities/image2.jpeg'
import image3 from '../../../assets/images/activities/image3.jpeg'
import image4 from '../../../assets/images/activities/image4.jpeg'
import image5 from '../../../assets/images/activities/image5.jpeg'
import image6 from '../../../assets/images/activities/image6.jpeg'
import image7 from '../../../assets/images/activities/image7.jpeg'
import AuthUser from '../../../components/authuser/AuthUser';
import { addPlugins } from 'smooth-scrollbar/plugin';


const MembersOfAssociations = () => {
    const [toggler, setToggler] = useState();
    const { idassociation } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;
    const benef = "Cotisation";
    const [isLoading, setIsLoading] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleShow2 = () => setShow2(true);
    const handleClose2 = () => {
        setShowUser(false);
        setShow2(false);
    }

    var seconduser = 0;


    const [showUser, setShowUser] = useState(false);
    const setUser = () => {
        setShowUser(true);
    };

    const [showLinkToInvit, setShowLinkToInvit] = useState(false);
    const setLinkToInvit = () => {
        setShowLinkToInvit(true);
    };

    const searchuser = () => {
        setIsLoading(true);
        http.post("search/user", inputs)
            .then((res) => {
                seconduser = res.data;
                fetchAllinfo_user1();
                setShowUser(true);
                setIsLoading(false);
            })
            .catch((e) => {
                setIsLoading(false);
                handleClose2();
                console.error("Faillure", e);
            });
    }






    const clickPage = (page) => {
        navigate(page);
    };


    const [count_members_association, setcount_members_association] = useState([]);
    useEffect(() => {
        fetchAllcount_members_association();
    }, []);

    const fetchAllcount_members_association = () => {
        http.get('count/members/association/' + userid + '/' + idassociation).then(res => {
            setcount_members_association(res.data);
        })
    }


    const [members_association, setmembers_association] = useState([]);
    useEffect(() => {
        fetchAllmembers_association();
    }, []);

    const fetchAllmembers_association = () => {
        http.get('get/members/association/' + userid + '/' + idassociation).then(res => {
            setmembers_association(res.data);
        })
    }



    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputs(values => ({ ...values, [name]: value, userid, idassociation, benef }))
    }
    const submitForm = () => {

        http.post('/new/cotisation/association', inputs).then((res) => {



        })
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


    const deleteUser = (id) => {
        const informations = {
            member: id,
        }

        http.post('/delete/member/association', informations).then((res) => {

            fetchAllmembers_association();
            fetchAllcount_members_association();


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

    const page = (page) => {
        navigate(page);
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

    const add_in_association = (iduser) => {
        setIsLoading(true);
        const datas = {
            id_member: iduser,
            userid: userid,
            idassociation: idassociation,
        }
        http.post('/association/add/member', datas).then((res) => {
            fetchAllmembers_association();
            fetchAllcount_members_association();
            handleClose2();
            setIsLoading(false);
            console.log(res.data)
        })
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
                                        <h4 className="me-2 h4">Menu</h4>
                                    </div>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">

                    <Card className="mb-0">
                        <div className="media-support-user-img ">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image2} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Cotisations</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to={"/List/Cotisations/Association/Of/User/" + idassociation} className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>

                </Col>

                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">

                    <Card className="mb-0">
                        <div className="media-support-user-img">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image1} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Epargnes</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/" className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>

                </Col>


                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">

                    <Card className="mb-0">
                        <div className="media-support-user-img">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image1} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Membres</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/Epargne/List" className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>

                </Col>
                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">

                    <Card className="mb-0">
                        <div className="media-support-user-img">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image6} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Forum</h5>
                            <p className="card-text">Documents</p>
                            <Link to="/" className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>

                </Col>
                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">
                    <Card className="mb-0">
                        <div className="media-support-user-img">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image6} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Documents</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/" className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>
                </Col>

                <Col lg="4" sm="6" md="6" xs="12" className="col-lg-4 mb-4">

                    <Card className="mb-0">
                        <div className="media-support-user-img">
                            <Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image6} alt="" />
                        </div>
                        <Card.Body>
                            <h5 className="card-title">Paramètres</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/" className="btn btn-primary">Choisir</Link>
                        </Card.Body>
                    </Card>

                </Col>



            </Row>








            {/* Smartphone */}

            {/* ///////////////////////////////////// Smartphone */}
            <Row className="smarthpone">

                <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
                    <div>
                        <h4 className="normaltitle"> {associations_info.name_association} </h4>
                        <i className="subtext d-flex align-items-center" >{count_members_association} Membres
                            <svg xmlns="http://www.w3.org/2000/svg" className="ms-1" width="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </i>
                    </div>
                    <div className="user-profile">
                        <Image className="theme-color-default-img  rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                        <Image className="theme-color-purple-img rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                        <Image className="theme-color-blue-img rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                        <Image className="theme-color-green-img rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                        <Image className="theme-color-yellow-img rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                        <Image className="theme-color-pink-img rounded-pill avatar-50 img-fluid" src={associations_info.image_association} alt="qapital" />
                    </div>
                </div>





                {/* Membres */}

                <div className="mt-4 mb-2">
                    <div className="d-flex justify-content-between">
                        <h5 className="smalltitle" onClick={handleShow2}>Membres  <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor" />
                            <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor" />
                        </svg></h5>
                        <div onClick={() => page("/Detail/Association/Of/User/" + idassociation)}>
                            <svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor" />
                            </svg>
                        </div>
                    </div>
                    <hr className="hr-horizontal" />
                </div>



                <Col>

                    <Card>


                        <Card.Body>
                            <ul className="list-inline m-0 p-0">
                                {members_association.map((item, idm) => (
                                    <li className="d-flex mb-4 align-items-center" key={idm}>
                                        <Image className="theme-color-default-img  rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <Image className="theme-color-purple-img rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <Image className="theme-color-blue-img rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <Image className="theme-color-green-img rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <Image className="theme-color-yellow-img rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <Image className="theme-color-pink-img rounded-pill avatar-30" src={item.avatar} alt="profil" />
                                        <div className="ms-3 flex-grow-1" >
                                            <h6 className="normaltext">{item.nom}</h6>
                                            <p className="subtext mb-0">{item.prenom}</p>
                                        </div>
                                        <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => deleteUser(item.id)}>
                                            <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                            <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                        </svg>
                                    </li>
                                ))}


                            </ul>
                        </Card.Body>
                    </Card>

                </Col>













                {/* ////////////////////////////////////////////////////////Modals */}





                <Modal show={show2} onHide={handleClose2}>
                    <Modal.Header closeButton>
                        <Modal.Title className="normaltitle">Inviter un utilisateur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {showLinkToInvit ? (
                            <div className="mb-2">
                                <Form.Label htmlFor="exampleInputdate" className="normaltext">Lien d'adhéion</Form.Label>
                                <input
                                    className="form-control"
                                    type="text"
                                    value={"http://192.168.44.44:3000/Join/Association/" + associations_info.name_association + "/" + idassociation + "/" + userid}

                                />
                            </div>) : (<div></div>)}

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
                                <Button variant="primary" onClick={() => add_in_association(info_user1.id)} disabled={isLoading}> {isLoading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Ajouter"}</Button>{' '}
                                <Button variant="danger" onClick={handleClose2}>Annuler</Button>
                            </fom>
                        </div>) : (<div>
                            <form>


                                <Row>

                                    <Col md="6 mt-2 mb-3">
                                        <Form.Label htmlFor="exampleInputdate" className="normaltext">Choisissez</Form.Label>
                                        <Form.Select name="id" onChange={handleChange} className="" >
                                            <option></option>
                                            {contacts_user.map((item, iduser) => (
                                                <option value={item.id_relation} key={iduser}> {item.nom} {item.prenom}</option>
                                            ))}
                                        </Form.Select>
                                    </Col>

                                    <p className="mt-3 normaltext"><Link to="#" onClick={setLinkToInvit}>Lien d'invitation</Link></p>

                                </Row>
                                <Button variant="primary" onClick={searchuser} disabled={isLoading}> {isLoading ? <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                /> : "Choisissez"}</Button>{' '}

                                <Button variant="danger" onClick={handleClose2}>Annuler</Button>


                            </form>
                        </div>)}
                    </Modal.Body>
                </Modal>

            </Row >

        </Fragment >
    )

}

export default MembersOfAssociations;
