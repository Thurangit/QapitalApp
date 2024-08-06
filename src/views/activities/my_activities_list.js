import React, { Fragment, useEffect, useState } from 'react'
import FsLightbox from 'fslightbox-react';

import { Row, Col, Image, Form, Nav, Dropdown, Tab } from 'react-bootstrap'
import Card from '../../components/Card'
import { Link, useNavigate } from 'react-router-dom'
import ShareOffcanvas from '../../components/partials/components/shareoffcanvas'
import image1 from '../../assets/images/activities/image1.jpeg'
import image2 from '../../assets/images/activities/image2.jpeg'
import image3 from '../../assets/images/activities/image3.jpeg'
import image4 from '../../assets/images/activities/image4.jpeg'
import image5 from '../../assets/images/activities/image5.jpeg'
import image6 from '../../assets/images/activities/image6.jpeg'
import image7 from '../../assets/images/activities/image7.jpeg'
import AuthUser from '../../components/authuser/AuthUser';


const MyActivitiesList = () => {
	const [toggler, setToggler] = useState();
	const navigate = useNavigate();
	const { http, user } = AuthUser();
	const userid = user.id;


	const [activity_epargne, setactivity_epargne] = useState([]);
	useEffect(() => {
		fetchAllactivity_epargne();
	}, []);

	const fetchAllactivity_epargne = () => {
		http.get('get/exist/activity/for/user/' + userid + '/QA-00001').then(res => {
			setactivity_epargne(res.data);
		})
	}


	const [activity_association, setactivity_association] = useState([]);
	useEffect(() => {
		fetchAllactivity_association();
	}, []);

	const fetchAllactivity_association = () => {
		http.get('get/exist/activity/for/user/' + userid + '/QA-00002').then(res => {
			setactivity_association(res.data);
		})
	}


	const page = (route) => {
		navigate(route);
	}


	return (
		<Fragment>

			<Tab.Container defaultActiveKey="first">
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


					<Col lg="4" className="col-lg-4 mb-4" >

						<Card className="mb-0">
							<div className="media-support-user-img ">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image2} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">Associations</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/Association" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>

					<Col lg="4" className="col-lg-4 mb-4">

						<Card className="mb-0">
							<div className="media-support-user-img">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image5} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">Commerces</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>


					<Col lg="4" className="col-lg-4 mb-4">

						<Card className="mb-0">
							<div className="media-support-user-img">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image1} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">Epargnes</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/Epargne/List" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>
					<Col lg="4" className="col-lg-4 mb-4">

						<Card className="mb-0">
							<div className="media-support-user-img">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image6} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">Frais</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>

					<Col lg="4" className="col-lg-4 mb-4">

						<Card className="mb-0">
							<div className="media-support-user-img">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image3} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">Investissements</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>

					<Col lg="4" className="col-lg-4 mb-4">

						<Card className="mb-0">
							<div className="media-support-user-img">
								<Image className="img-fluid bd-placeholder-img card-img-top" width="100%" src={image7} alt="" />
							</div>
							<Card.Body>
								<h5 className="card-title">paiements automatiques</h5>
								<p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
								<Link to="/" className="btn btn-primary">Choisir</Link>
							</Card.Body>
						</Card>

					</Col>


				</Row>





































				{/* //////////////////////////Smarthphone */}
				<Row className="smarthpone">

					<div className="mb-3">
						<div className="d-flex justify-content-between">
							<h5 className="smalltitle d-flex align-items-center">Menu </h5>
							<div className="d-flex align-items-center">
								<svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path
										d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714"
										stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</div>
						</div>
						<hr className="hr-horizontal" />
					</div>



					{activity_association === "set" ? (
						<Col xs="3" className="mb-4" onClick={() => page("/List/Association/Of/User")}>
							<div className="d-flex align-items-center justify-content-center">
								<Image className="theme-color-default-img  rounded-pill avatar-50" src={image2} alt="qapital" />
								<Image className="theme-color-purple-img rounded-pill avatar-50" src={image2} alt="qapital" />
								<Image className="theme-color-blue-img rounded-pill avatar-50" src={image2} alt="qapital" />
								<Image className="theme-color-green-img rounded-pill avatar-50" src={image2} alt="qapital" />
								<Image className="theme-color-yellow-img rounded-pill avatar-50" src={image2} alt="qapital" />
								<Image className="theme-color-pink-img rounded-pill avatar-50" src={image2} alt="qapital" />

							</div>
							<div className="text-center">
								<small className="subtext">Association</small>
							</div>
						</Col>) : null}

					{activity_epargne === "set" ? (
						<Col xs="3" className="mb-4" onClick={() => page("/List/Epargnes")}>
							<div className="d-flex align-items-center justify-content-center" >
								<Image className="theme-color-default-img  rounded-pill avatar-50" src={image1} alt="qapital" />
								<Image className="theme-color-purple-img rounded-pill avatar-50" src={image1} alt="qapital" />
								<Image className="theme-color-blue-img rounded-pill avatar-50" src={image1} alt="qapital" />
								<Image className="theme-color-green-img rounded-pill avatar-50" src={image1} alt="qapital" />
								<Image className="theme-color-yellow-img rounded-pill avatar-50" src={image1} alt="qapital" />
								<Image className="theme-color-pink-img rounded-pill avatar-50" src={image1} alt="qapital" />

							</div>
							<div className="text-center">
								<small className="subtext">Epargne</small>
							</div>
						</Col>
					) : null}

					<Col xs="3" className="mb-4">
						<div className="d-flex align-items-center justify-content-center">
							<Image className="theme-color-default-img  rounded-pill avatar-50" src={image3} alt="qapital" />
							<Image className="theme-color-purple-img rounded-pill avatar-50" src={image3} alt="qapital" />
							<Image className="theme-color-blue-img rounded-pill avatar-50" src={image3} alt="qapital" />
							<Image className="theme-color-green-img rounded-pill avatar-50" src={image3} alt="qapital" />
							<Image className="theme-color-yellow-img rounded-pill avatar-50" src={image3} alt="qapital" />
							<Image className="theme-color-pink-img rounded-pill avatar-50" src={image3} alt="qapital" />

						</div>
						<div className="text-center">
							<small className="subtext">Invest</small>
						</div>
					</Col>
					<Col xs="3" className="mb-4">
						<div className="d-flex align-items-center justify-content-center">
							<Image className="theme-color-default-img  rounded-pill avatar-50" src={image6} alt="qapital" />
							<Image className="theme-color-purple-img rounded-pill avatar-50" src={image6} alt="qapital" />
							<Image className="theme-color-blue-img rounded-pill avatar-50" src={image6} alt="qapital" />
							<Image className="theme-color-green-img rounded-pill avatar-50" src={image6} alt="qapital" />
							<Image className="theme-color-yellow-img rounded-pill avatar-50" src={image6} alt="qapital" />
							<Image className="theme-color-pink-img rounded-pill avatar-50" src={image6} alt="qapital" />

						</div>
						<div className="text-center">
							<small className="subtext">Frais</small>
						</div>
					</Col>
					<Col xs="3" className="mb-4">
						<div className="d-flex align-items-center justify-content-center">
							<Image className="theme-color-default-img  rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-purple-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-blue-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-green-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-yellow-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-pink-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />

						</div>
						<div className="text-center">
							<small className="subtext">Funding</small>
						</div>
					</Col>
					<Col xs="3" className="mb-4">
						<div className="d-flex align-items-center justify-content-center">
							<Image className="theme-color-default-img  rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-purple-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-blue-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-green-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-yellow-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
							<Image className="theme-color-pink-img rounded-pill avatar-50" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />

						</div>
						<div className="text-center">
							<small className="subtext">Cadeaux</small>
						</div>
					</Col>
					<Col xs="3" className="mb-4">
						<div className="d-flex align-items-center justify-content-center">
							<Image className="theme-color-default-img  rounded-pill avatar-50" src={image5} alt="qapital" />
							<Image className="theme-color-purple-img rounded-pill avatar-50" src={image5} alt="qapital" />
							<Image className="theme-color-blue-img rounded-pill avatar-50" src={image5} alt="qapital" />
							<Image className="theme-color-green-img rounded-pill avatar-50" src={image5} alt="qapital" />
							<Image className="theme-color-yellow-img rounded-pill avatar-50" src={image5} alt="qapital" />
							<Image className="theme-color-pink-img rounded-pill avatar-50" src={image5} alt="qapital" />

						</div>
						<div className="text-center">
							<small className="subtext">Commerce</small>
						</div>
					</Col>

					<Col xs="3"></Col>
					<Col xs="3"></Col>
					<Col xs="3"></Col>

				</Row>
			</Tab.Container>
		</Fragment>
	)

}

export default MyActivitiesList;
