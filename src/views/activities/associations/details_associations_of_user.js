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


const DetailsAssociationsOfUsers = () => {
	const [toggler, setToggler] = useState();
	const { idassociation } = useParams();
	const { http, user } = AuthUser();
	const navigate = useNavigate();
	const userid = user.id;


	const [admins_association, setadmins_association] = useState([]);
	useEffect(() => {
		fetchAlladmins_association();
	}, []);

	const fetchAlladmins_association = () => {
		http.get('get/admins/association/' + userid + '/' + idassociation).then(res => {
			setadmins_association(res.data);
		})
	}


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






				<div className="d-flex justify-content-between  mt-4">

					<Col xs="6" style={{ marginRight: "2px" }}>

						<Card>
							<Card.Body>
								<div className="" onClick={() => page("/List/Cotisations/Association/Of/User/" + idassociation)}>
									<div>
										<div className="d-flex">

											<svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M3 16.8701V9.25708H21V16.9311C21 20.0701 19.0241 22.0001 15.8628 22.0001H8.12733C4.99561 22.0001 3 20.0301 3 16.8701ZM7.95938 14.4101C7.50494 14.4311 7.12953 14.0701 7.10977 13.6111C7.10977 13.1511 7.46542 12.7711 7.91987 12.7501C8.36443 12.7501 8.72997 13.1011 8.73985 13.5501C8.7596 14.0111 8.40395 14.3911 7.95938 14.4101ZM12.0198 14.4101C11.5653 14.4311 11.1899 14.0701 11.1701 13.6111C11.1701 13.1511 11.5258 12.7711 11.9802 12.7501C12.4248 12.7501 12.7903 13.1011 12.8002 13.5501C12.82 14.0111 12.4643 14.3911 12.0198 14.4101ZM16.0505 18.0901C15.596 18.0801 15.2305 17.7001 15.2305 17.2401C15.2206 16.7801 15.5862 16.4011 16.0406 16.3911H16.0505C16.5148 16.3911 16.8902 16.7711 16.8902 17.2401C16.8902 17.7101 16.5148 18.0901 16.0505 18.0901ZM11.1701 17.2401C11.1899 17.7001 11.5653 18.0611 12.0198 18.0401C12.4643 18.0211 12.82 17.6411 12.8002 17.1811C12.7903 16.7311 12.4248 16.3801 11.9802 16.3801C11.5258 16.4011 11.1701 16.7801 11.1701 17.2401ZM7.09989 17.2401C7.11965 17.7001 7.49506 18.0611 7.94951 18.0401C8.39407 18.0211 8.74973 17.6411 8.72997 17.1811C8.72009 16.7311 8.35456 16.3801 7.90999 16.3801C7.45554 16.4011 7.09989 16.7801 7.09989 17.2401ZM15.2404 13.6011C15.2404 13.1411 15.596 12.7711 16.0505 12.7611C16.4951 12.7611 16.8507 13.1201 16.8705 13.5611C16.8804 14.0211 16.5247 14.4011 16.0801 14.4101C15.6257 14.4201 15.2503 14.0701 15.2404 13.6111V13.6011Z" fill="currentColor" />
												<path opacity="0.4" d="M3.00293 9.25699C3.01577 8.66999 3.06517 7.50499 3.15803 7.12999C3.63224 5.02099 5.24256 3.68099 7.54442 3.48999H16.4555C18.7376 3.69099 20.3677 5.03999 20.8419 7.12999C20.9338 7.49499 20.9832 8.66899 20.996 9.25699H3.00293Z" fill="currentColor" />
												<path d="M8.30465 6.59C8.73934 6.59 9.06535 6.261 9.06535 5.82V2.771C9.06535 2.33 8.73934 2 8.30465 2C7.86996 2 7.54395 2.33 7.54395 2.771V5.82C7.54395 6.261 7.86996 6.59 8.30465 6.59Z" fill="currentColor" />
												<path d="M15.6953 6.59C16.1201 6.59 16.456 6.261 16.456 5.82V2.771C16.456 2.33 16.1201 2 15.6953 2C15.2606 2 14.9346 2.33 14.9346 2.771V5.82C14.9346 6.261 15.2606 6.59 15.6953 6.59Z" fill="currentColor" />
											</svg><span style={{ marginLeft: "5px" }} className="smalltitle">Cotisations</span>

										</div>
									</div>
									<div className="mt-1">
										<p className="smalltext">Cotisez ensemble afin de bénéficiez ensemble </p>
									</div>

								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col xs="6">
						<Card>
							<Card.Body>
								<div className="" onClick={() => page("/Association/List/Epargnes/" + idassociation)}>
									<div>
										<div className="d-flex">

											<svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path fillRule="evenodd" clipRule="evenodd" d="M21.9964 8.37513H17.7618C15.7911 8.37859 14.1947 9.93514 14.1911 11.8566C14.1884 13.7823 15.7867 15.3458 17.7618 15.3484H22V15.6543C22 19.0136 19.9636 21 16.5173 21H7.48356C4.03644 21 2 19.0136 2 15.6543V8.33786C2 4.97862 4.03644 3 7.48356 3H16.5138C19.96 3 21.9964 4.97862 21.9964 8.33786V8.37513ZM6.73956 8.36733H12.3796H12.3831H12.3902C12.8124 8.36559 13.1538 8.03019 13.152 7.61765C13.1502 7.20598 12.8053 6.87318 12.3831 6.87491H6.73956C6.32 6.87664 5.97956 7.20858 5.97778 7.61852C5.976 8.03019 6.31733 8.36559 6.73956 8.36733Z" fill="currentColor" />
												<path opacity="0.4" d="M16.0374 12.2966C16.2465 13.2478 17.0805 13.917 18.0326 13.8996H21.2825C21.6787 13.8996 22 13.5715 22 13.166V10.6344C21.9991 10.2297 21.6787 9.90077 21.2825 9.8999H17.9561C16.8731 9.90338 15.9983 10.8024 16 11.9102C16 12.0398 16.0128 12.1695 16.0374 12.2966Z" fill="currentColor" />
												<circle cx="18" cy="11.8999" r="1" fill="currentColor" />
											</svg><span style={{ marginLeft: "5px" }} className="smalltitle">Epargnes</span>

										</div>
									</div>
									<div className="mt-1">
										<p className="smalltext">Faites une ou plusieurs épargnes en groupe </p>
									</div>
								</div>
							</Card.Body>
						</Card>
					</Col>



				</div>


				<div className="d-flex justify-content-between align-items-center rapprochementtop">

					<Col xs="6" style={{ marginRight: "2px" }}>

						<Card>
							<Card.Body>
								<div className="" onClick={() => page("/Association/Forums/List/" + idassociation)}>
									<div>
										<div className="d-flex">

											<svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor" />
												<path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor" />
												<path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor" />
												<path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor" />
												<path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor" />
												<path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor" />
											</svg> <span style={{ marginLeft: "5px" }} className="smalltitle">Forums</span>

										</div>
									</div>
									<div className="mt-1">
										<p className="smalltext">Discutez et partagez des informations </p>



									</div>

								</div>
							</Card.Body>
						</Card>
					</Col>
					<Col xs="6">

						<Card>
							<Card.Body>
								<div className="" onClick={() => page("/Association/Menu/" + idassociation)}>
									<div>
										<div className="d-flex">

											<svg width="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path opacity="0.4" d="M22 11.9998C22 17.5238 17.523 21.9998 12 21.9998C6.477 21.9998 2 17.5238 2 11.9998C2 6.47776 6.477 1.99976 12 1.99976C17.523 1.99976 22 6.47776 22 11.9998Z" fill="currentColor" />
												<path fillRule="evenodd" clipRule="evenodd" d="M12.8701 12.6307C12.8701 13.1127 12.4771 13.5057 11.9951 13.5057C11.5131 13.5057 11.1201 13.1127 11.1201 12.6307V8.21069C11.1201 7.72869 11.5131 7.33569 11.9951 7.33569C12.4771 7.33569 12.8701 7.72869 12.8701 8.21069V12.6307ZM11.1251 15.8035C11.1251 15.3215 11.5161 14.9285 11.9951 14.9285C12.4881 14.9285 12.8801 15.3215 12.8801 15.8035C12.8801 16.2855 12.4881 16.6785 12.0051 16.6785C11.5201 16.6785 11.1251 16.2855 11.1251 15.8035Z" fill="currentColor" />
											</svg> <span style={{ marginLeft: "5px" }} className="smalltitle">Informations</span>

										</div>
									</div>
									<div className="mt-1">
										<p className="smalltext">Tout savoir sur sur votre association </p>



									</div>

								</div>
							</Card.Body>
						</Card>
					</Col>



				</div>

				<div className="mb-2">
					<h5 className="smalltitle">Administrateurs</h5>
					<hr className="hr-horizontal" />
				</div>

				<Col>

					<Card>

						<Card.Body>
							<ul className="list-inline m-0 p-0">
								{admins_association.map((item, idxxx) => (
									<li className="d-flex mb-4 align-items-center" key={idxxx}>
										<Image className="theme-color-default-img  rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<Image className="theme-color-purple-img rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<Image className="theme-color-blue-img rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<Image className="theme-color-green-img rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<Image className="theme-color-yellow-img rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<Image className="theme-color-pink-img rounded-pill avatar-30" src={item.avatar} alt="qapital" />
										<div className="ms-3 flex-grow-1">
											<h6 className="normaltext">{item.nom}</h6>
											<p className="mb-0 subtext">{item.prenom}</p>
										</div>
										<Dropdown>
											<Dropdown.Toggle
												as={CustomToggle}
												href="#"
												variant=" nav-link"
												id="notification-drop"
												data-bs-toggle="dropdown"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="20"
													height="24"
													viewBox="0 0 24 24"
													fill="none"
												>
													<g>
														<g>
															<circle cx="7" cy="12" r="1" fill="black" />
															<circle cx="12" cy="12" r="1" fill="black" />
															<circle cx="17" cy="12" r="1" fill="black" />
														</g>
													</g>
												</svg>
											</Dropdown.Toggle>
											<Dropdown.Menu>
												<Dropdown.Item href="#">
													<svg
														width="16"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="me-2"
													>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M14.7366 2.76175H8.08455C6.00455 2.75375 4.29955 4.41075 4.25055 6.49075V17.3397C4.21555 19.3897 5.84855 21.0807 7.89955 21.1167C7.96055 21.1167 8.02255 21.1167 8.08455 21.1147H16.0726C18.1416 21.0937 19.8056 19.4087 19.8026 17.3397V8.03975L14.7366 2.76175Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>{" "}
														<path
															d="M14.4741 2.75V5.659C14.4741 7.079 15.6231 8.23 17.0431 8.234H19.7971"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>{" "}
														<path
															d="M14.2936 12.9141H9.39355"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>{" "}
														<path
															d="M11.8442 15.3639V10.4639"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
													</svg>
													<small>Duplicate</small>
												</Dropdown.Item>
												<Dropdown.Item href="#">
													<svg
														width="20"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="me-2"
													>
														<path
															d="M13.7476 20.4428H21.0002"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
														<path
															fillRule="evenodd"
															clipRule="evenodd"
															d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
														<path
															d="M11.021 6.00098L16.4732 10.1881"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
													</svg>
													<small>Rename</small>
												</Dropdown.Item>
												<Dropdown.Item href="#">
													<svg
														width="20"
														viewBox="0 0 24 24"
														fill="none"
														xmlns="http://www.w3.org/2000/svg"
														className="me-2"
													>
														<path
															d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
														<path
															d="M20.708 6.23975H3.75"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
														<path
															d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
															stroke="currentColor"
															strokeWidth="1.5"
															strokeLinecap="round"
															strokeLinejoin="round"
														></path>
													</svg>
													<small>Delete</small>
												</Dropdown.Item>
											</Dropdown.Menu>
										</Dropdown>
									</li>
								))}


							</ul>
						</Card.Body>
					</Card>

				</Col>






			</Row>

		</Fragment>
	)

}

export default DetailsAssociationsOfUsers;
