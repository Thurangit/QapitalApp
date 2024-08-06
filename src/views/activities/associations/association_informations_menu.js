import React, { Fragment, useEffect, useState } from 'react'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';

import { Row, Col, Image, Form, Nav, Dropdown, Tab, Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
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


const AssociationsInformationsMenu = () => {
    const [toggler, setToggler] = useState();
    const { idassociation } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;


    const clickCotisation = (cotisation) => {
        navigate('/Cotisation/' + idassociation + '/' + cotisation)
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





    const [associations_info, setassociations_info] = useState([]);
    useEffect(() => {
        fetchAllassociations_info();
    }, []);

    const fetchAllassociations_info = () => {
        http.get('get/info/association/' + userid + '/' + idassociation).then(res => {
            setassociations_info(res.data);
        })
    }



    const quitAssociation = (id) => {
        const informations = {
            member: id,
            idassociation: idassociation,
        }

        http.post('/quit/association', informations).then((res) => {
            navigate("/dashboard");
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
                        <i className="subtext d-flex align-items-center" onClick={() => page("/Association/Members/" + idassociation)}>{count_members_association} Membres
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








                {/* Informations */}

                <div className='mt-4'>


                    <div className="mb-2">
                        <div className="d-flex justify-content-between">
                            <h5 className="smalltitle">Menu</h5>
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

                                <ListGroup as="ul" className="list-group-flush">
                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center" onClick={() => clickPage("/Association/About/" + idassociation)}>

                                        <div className="">
                                            <h6><small>A propos</small></h6>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>

                                    </ListGroupItem>

                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center" onClick={() => clickPage("/Association/Rules/" + idassociation)}>

                                        <div className="" >
                                            <h6><small>Règlement</small></h6>
                                        </div>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>

                                    </ListGroupItem>

                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center">

                                        <div className="" onClick={() => clickPage("/Association/Files/" + idassociation)}>
                                            <h6><small>Documents</small></h6>

                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>

                                    </ListGroupItem>
                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center">

                                        <div className="" onClick={() => clickCotisation(3)}>
                                            <h6><small>Lien d'adhésion</small></h6>

                                        </div>
                                        <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M21.101 9.58786H19.8979V8.41162C19.8979 7.90945 19.4952 7.5 18.999 7.5C18.5038 7.5 18.1 7.90945 18.1 8.41162V9.58786H16.899C16.4027 9.58786 16 9.99731 16 10.4995C16 11.0016 16.4027 11.4111 16.899 11.4111H18.1V12.5884C18.1 13.0906 18.5038 13.5 18.999 13.5C19.4952 13.5 19.8979 13.0906 19.8979 12.5884V11.4111H21.101C21.5962 11.4111 22 11.0016 22 10.4995C22 9.99731 21.5962 9.58786 21.101 9.58786Z" fill="currentColor" />
                                            <path d="M9.5 15.0156C5.45422 15.0156 2 15.6625 2 18.2467C2 20.83 5.4332 21.5001 9.5 21.5001C13.5448 21.5001 17 20.8533 17 18.269C17 15.6848 13.5668 15.0156 9.5 15.0156Z" fill="currentColor" />
                                            <path opacity="0.4" d="M9.50023 12.5542C12.2548 12.5542 14.4629 10.3177 14.4629 7.52761C14.4629 4.73754 12.2548 2.5 9.50023 2.5C6.74566 2.5 4.5376 4.73754 4.5376 7.52761C4.5376 10.3177 6.74566 12.5542 9.50023 12.5542Z" fill="currentColor" />
                                        </svg>
                                    </ListGroupItem>

                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center">

                                        <div className="" onClick={() => quitAssociation(userid)}>
                                            <h6><small className="text-danger">Quitter</small></h6>
                                        </div>
                                        <svg width="16" onClick={() => quitAssociation(userid)} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                                            <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                                        </svg>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                </div>


                {/* ////////////////////////////////////////////////////////Modals */}


            </Row>

        </Fragment>
    )

}

export default AssociationsInformationsMenu;
