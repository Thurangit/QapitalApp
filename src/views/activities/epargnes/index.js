import { useState, memo, Fragment } from 'react'
import { Row, Col, Image, Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

// import {bindActionCreators} from "redux"

import { Link } from 'react-router-dom'
// img
import shap2 from '../../../assets/images/shapes/02.png'
import shap4 from '../../../assets/images/shapes/04.png'
import shap6 from '../../../assets/images/shapes/06.png'

import icon1 from '../../../assets/images/icons/01.png'
import icon2 from '../../../assets/images/icons/02.png'
import icon3 from '../../../assets/images/icons/03.png'
import icon4 from '../../../assets/images/icons/04.png'
import icon5 from '../../../assets/images/icons/05.png'

import icon8 from '../../../assets/images/icons/08.png'
import icon6 from '../../../assets/images/icons/06.png'
import icon7 from '../../../assets/images/icons/07.png'

import avatars11 from '../../../assets/images/avatars/01.png'
import avatars22 from '../../../assets/images/avatars/avtar_1.png'
import avatars33 from '../../../assets/images/avatars/avtar_2.png'
import avatars44 from '../../../assets/images/avatars/avtar_3.png'
import avatars55 from '../../../assets/images/avatars/avtar_4.png'
import avatars66 from '../../../assets/images/avatars/avtar_5.png'

import avatars2 from '../../../assets/images/avatars/02.png'
import avatars3 from '../../../assets/images/avatars/03.png'
import avatars4 from '../../../assets/images/avatars/04.png'
import avatars5 from '../../../assets/images/avatars/05.png'
import ShareOffcanvas from '../../../components/partials/components/shareoffcanvas'
// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar'

const EpargneList = memo((props) => {
    const [toggler, setToggler] = useState(false);
    return (
        <Fragment>
            <FsLightbox
                toggler={toggler}
                sources={[icon4, shap2, icon8, shap4, icon2, shap6, icon5, shap4, icon1]}
            />
            <Row>
                <Col lg="4">
                    <Card>
                        <Card.Body>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="d-flex flex-column text-center align-items-center justify-content-between ">
                                    <div className="fs-italic">
                                        <h5>Epargne Flexible</h5>
                                        {/* <div className="text-black-50 mb-1">
                                            <small>Trainer Expert</small> 
                                        </div> */}
                                    </div>
                                    <div className="text-black-50 text-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>


                                    </div>
                                    <div className="card-profile-progress">

                                        <Image className="theme-color-pink-img img-fluid rounded-circle card-img" src={avatars44} alt="qapital" />

                                    </div>
                                    <div className="mt-3 text-center text-black-50">
                                        <p>Épargnez à votre rythme et retirez votre argent quand vous le souhaitez. Aucune contrainte, juste une flexibilité totale pour vos besoins financiers.</p>
                                    </div>
                                    {/* <div className="d-flex icon-pill">
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2  ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-danger" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div> */}
                                    <Link to={"/Epargne/Details/" + "A00001"}><Button variant="btn btn-primary" className="mt-4">Choisir</Button></Link>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card>
                        <Card.Body>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="d-flex flex-column text-center align-items-center justify-content-between ">
                                    <div className="fs-italic">
                                        <h5>Epargne Stricte</h5>
                                        {/* <div className="text-black-50 mb-1">
                                            <small>Trainer Expert</small>
                                        </div> */}
                                    </div>
                                    <div className="text-black-50 text-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                    </div>
                                    <div className="card-profile-progress">

                                        <Image className="theme-color-pink-img img-fluid rounded-circle card-img" src={avatars44} alt="qapital" />

                                    </div>
                                    <div className="mt-3 text-center text-black-50">
                                        <p>Optez pour notre épargne programmée : fixez une date de retrait et, si vous le souhaitez, un montant à atteindre. Retirez uniquement à la date fixée, assurant une gestion optimale de vos économies.</p>
                                    </div>
                                    {/* <div className="d-flex icon-pill">
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2  ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-danger" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div> */}
                                    <Link to={"/Epargne/Details/" + "A00002"}><Button variant="btn btn-primary" className="mt-4">Choisir</Button></Link>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg="4">
                    <Card>
                        <Card.Body>
                            <div className="d-flex align-items-center justify-content-center">
                                <div className="d-flex flex-column text-center align-items-center justify-content-between ">
                                    <div className="fs-italic">
                                        <h5>Epargne Stricte +</h5>
                                        {/* <div className="text-black-50 mb-1">
                                            <small>Trainer Expert</small>
                                        </div> */}
                                    </div>
                                    <div className="text-black-50 text-warning">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 20 20" fill="orange">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>

                                    </div>
                                    <div className="card-profile-progress">

                                        <Image className="theme-color-pink-img img-fluid rounded-circle card-img" src={avatars44} alt="qapital" />

                                    </div>
                                    <div className="mt-3 text-center text-black-50">
                                        <p>Épargnez avec notre plan sécurisé : premier dépôt minimum de 100 000 FCFA pour le fonds de caisse. Retrait uniquement à la date fixée, après un minimum de 7 mois. Profitez de bénéfices garantis pour une gestion optimale de vos économies.</p>
                                    </div>
                                    {/* <div className="d-flex icon-pill">
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-primary" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2  ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-danger" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                                            </svg>
                                        </Link>
                                        <Link to="#" className="btn btn-sm rounded-pill px-2 py-2 ms-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                        </Link>
                                    </div> */}
                                    <Link to={"/Epargne/Details/" + "A00003"}><Button variant="btn btn-primary" className="mt-4">Choisir</Button></Link>
                                </div>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}
)


export default EpargneList
