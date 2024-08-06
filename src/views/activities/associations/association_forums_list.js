import React, { Fragment, useEffect, useState } from 'react'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';

import { Row, Col, Image, Form, Nav, Dropdown, Tab, Button, Modal, ListGroup, ListGroupItem } from 'react-bootstrap'
import Card from '../../../components/Card'
import { Link, useNavigate, useParams } from 'react-router-dom'
import image1 from '../../../assets/images/activities/image1.jpeg'
import image2 from '../../../assets/images/activities/image2.jpeg'
import image6 from '../../../assets/images/activities/image6.jpeg'
import AuthUser from '../../../components/authuser/AuthUser';


const AssociationForumsList = () => {
    const [toggler, setToggler] = useState();
    const { idassociation } = useParams();
    const { http, user } = AuthUser();
    const navigate = useNavigate();
    const userid = user.id;




    const [cotisations_list, setcotisations_list] = useState([]);
    useEffect(() => {
        fetchAllcotisations_list();
    }, []);

    const fetchAllcotisations_list = () => {
        http.get('get/cotisations/of/user/' + userid + '/' + idassociation).then(res => {
            setcotisations_list(res.data);
        })
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




                {/* Forums */}
                <div className='mt-4'>


                    <div className="mb-2">
                        <div className="d-flex justify-content-between">
                            <h5 className="smalltitle">Forums</h5>
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
                                    <ListGroupItem as="li" className="d-flex justify-content-between align-items-center" onClick={() => clickPage("/Association/Forum/" + associations_info.name_association + "/" + idassociation + "/" + idassociation)}>

                                        <div className="">
                                            <span className="normaltext">Général</span>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>

                                    </ListGroupItem>
                                    {cotisations_list.map((item, idcs) => (
                                        <ListGroupItem as="li" onClick={() => clickPage("/Association/Forum/" + item.name_cotisation + "/" + idassociation + "/" + idassociation)} key={idcs} className="d-flex justify-content-between align-items-center" >

                                            <div className="" >
                                                <span className="normaltext">{item.name_cotisation}</span>
                                            </div>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>

                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>



                </div>





            </Row>

        </Fragment>
    )

}

export default AssociationForumsList;
