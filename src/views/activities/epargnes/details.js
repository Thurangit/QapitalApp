import { useState, memo, Fragment } from 'react'
import { Row, Col, Image, Form, Button, InputGroup, FormControl } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

// import {bindActionCreators} from "redux"

import { Link, useParams } from 'react-router-dom'
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

const EpargneDetails = memo((props) => {
	const [toggler, setToggler] = useState(false);
	const { ref } = useParams();
	return (
		<Fragment>
			<FsLightbox
				toggler={toggler}
				sources={[icon4, shap2, icon8, shap4, icon2, shap6, icon5, shap4, icon1]}
			/>
			<Row>

				<Col lg="12">
					<Card>
						<Card.Body>
							{ref === "A00001" ? (<div>

								<div className="d-flex align-items-center justify-content-center">
									<div className="d-flex flex-column text-center align-items-center justify-content-between ">
										<div className="fs-italic">
											<h5>Conditions d'utilisation</h5>
											<div className="text-black-50 mb-1">
												<small>Epargne Flexible</small>
											</div>
										</div>


										<div className="card-profile-progress">

											<Image className="theme-color-pink-img img-fluid rounded-circle card-img" src={avatars44} alt="qapital" />

										</div>
										<div className="mt-3 text-black-50" style={{ textAlign: 'left' }}>
											<h3>Conditions Générales d'Utilisation</h3>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>1. Objet de l'Offre</h4>
												<p>
													Cette application permet aux utilisateurs d'épargner à leur rythme et de retirer leur argent quand ils le souhaitent, sans aucune contrainte. Elle offre une flexibilité totale pour répondre aux besoins financiers des utilisateurs.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>2. Inscription et Sécurité</h4>
												<h5>Inscription</h5>
												<p>
													Pour utiliser l'application, les utilisateurs doivent créer un compte en fournissant des informations personnelles exactes et à jour.
												</p>
												<h5>Sécurité</h5>
												<p>
													Nous mettons en œuvre des mesures de sécurité avancées pour protéger les données des utilisateurs. Cependant, les utilisateurs sont responsables de la confidentialité de leurs identifiants de connexion.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>3. Utilisation de l'Application</h4>
												<h5>Épargne</h5>
												<p>
													Les utilisateurs peuvent épargner à leur propre rythme, en effectuant des dépôts ponctuels ou réguliers.
												</p>
												<h5>Retraits</h5>
												<p>
													Les utilisateurs peuvent retirer leur argent à tout moment, sans pénalité ni restriction.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>4. Protection des Données</h4>
												<h5>Confidentialité</h5>
												<p>
													Les informations personnelles des utilisateurs sont traitées conformément à notre politique de confidentialité. Nous ne partageons pas les données des utilisateurs avec des tiers sans leur consentement explicite.
												</p>
												<h5>Sécurité des Transactions</h5>
												<p>
													Toutes les transactions financières sont sécurisées par des protocoles de cryptage de pointe.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>5. Responsabilités</h4>
												<h5>Propriétaire de l'Application</h5>
												<p>
													Nous nous engageons à maintenir l'application fonctionnelle et sécurisée. Cependant, nous ne sommes pas responsables des pertes financières dues à une mauvaise utilisation de l'application par les utilisateurs.
												</p>
												<h5>Utilisateurs</h5>
												<p>
													Les utilisateurs doivent utiliser l'application de manière responsable et conformément aux présentes conditions générales. Toute activité frauduleuse ou abusive entraînera la suspension ou la résiliation du compte utilisateur.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>6. Modifications des Conditions</h4>
												<p>
													Nous nous réservons le droit de modifier ces conditions générales à tout moment. Les utilisateurs seront informés de toute modification via l'application ou par e-mail. Ces modifications n'affecteront pas la somme d'argent investie par les utilisateurs.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>7. Contact et Support</h4>
												<p>
													Pour toute question ou assistance, les utilisateurs peuvent contacter notre service client via l'application ou par e-mail à support@votreapplication.com.
												</p>
											</section>
										</div>

										<Link to={"/Regist/Epargne/" + "A00001"}><Button variant="btn btn-success" className="mt-4">J'ACCEPTE</Button></Link>
									</div>

								</div>

							</div>) : (<div></div>)}
							{ref === "A00002" ? (<div>


								<div className="d-flex align-items-center justify-content-center">
									<div className="d-flex flex-column text-center align-items-center justify-content-between ">
										<div className="fs-italic">
											<h5>Conditions Générales d'Utilisation</h5>
											<div className="text-black-50 mb-1">
												<small>Epargne Stricte</small>
											</div>
										</div>

										<div className="mt-3 text-black-50" style={{ textAlign: 'left' }}>
											<h3>Conditions Générales d'Utilisation</h3>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>1. Objet de l'Offre</h4>
												<p>
													Optez pour notre épargne programmée : fixez une date de retrait et, si vous le souhaitez, un montant à atteindre. Retirez uniquement à la date fixée, assurant une gestion optimale de vos économies.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>2. Inscription et Sécurité</h4>
												<h5>Inscription</h5>
												<p>
													Pour utiliser l'application, les utilisateurs doivent créer un compte en fournissant des informations personnelles exactes et à jour.
												</p>
												<h5>Sécurité</h5>
												<p>
													Nous mettons en œuvre des mesures de sécurité avancées pour protéger les données des utilisateurs. Cependant, les utilisateurs sont responsables de la confidentialité de leurs identifiants de connexion.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>3. Utilisation de l'Application</h4>
												<h5>Épargne Programmée</h5>
												<p>
													Les utilisateurs peuvent fixer une date de retrait et, si souhaité, un montant à atteindre. Les fonds ne peuvent être retirés qu'à la date fixée, garantissant une gestion optimale des économies.
												</p>
												<h5>Retraits</h5>
												<p>
													Les utilisateurs ne peuvent retirer leur argent qu'à la date fixée lors de la programmation de l'épargne. Cette contrainte assure une discipline financière et une meilleure gestion des économies.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>4. Protection des Données</h4>
												<h5>Confidentialité</h5>
												<p>
													Les informations personnelles des utilisateurs sont traitées conformément à notre politique de confidentialité. Nous ne partageons pas les données des utilisateurs avec des tiers sans leur consentement explicite.
												</p>
												<h5>Sécurité des Transactions</h5>
												<p>
													Toutes les transactions financières sont sécurisées par des protocoles de cryptage de pointe.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>5. Responsabilités</h4>
												<h5>Propriétaire de l'Application</h5>
												<p>
													Nous nous engageons à maintenir l'application fonctionnelle et sécurisée. Cependant, nous ne sommes pas responsables des pertes financières dues à une mauvaise utilisation de l'application par les utilisateurs.
												</p>
												<h5>Utilisateurs</h5>
												<p>
													Les utilisateurs doivent utiliser l'application de manière responsable et conformément aux présentes conditions générales. Toute activité frauduleuse ou abusive entraînera la suspension ou la résiliation du compte utilisateur.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>6. Modifications des Conditions</h4>
												<p>
													Nous nous réservons le droit de modifier ces conditions générales à tout moment. Les utilisateurs seront informés de toute modification via l'application ou par e-mail. Ces modifications n'affecteront pas la somme d'argent investie par les utilisateurs.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>7. Contact et Support</h4>
												<p>
													Pour toute question ou assistance, les utilisateurs peuvent contacter notre service client via l'application ou par e-mail à support@votreapplication.com.
												</p>
											</section>
										</div>

										<Link to={"/Regist/Epargne/" + "A00002"}><Button variant="btn btn-success" className="mt-4">J'ACCEPTE</Button></Link>
									</div>

								</div>


							</div>) : (<div></div>)}
							{ref === "A00003" ? (<div>


								<div className="d-flex align-items-center justify-content-center">
									<div className="d-flex flex-column text-center align-items-center justify-content-between ">
										<div className="fs-italic">
											<h5>Conditions Générales d'Utilisation</h5>
											<div className="text-black-50 mb-1">
												<small>Epargne Stricte +</small>
											</div>
										</div>

										<div className="card-profile-progress">

											<Image className="theme-color-pink-img img-fluid rounded-circle card-img" src={avatars44} alt="qapital" />

										</div>
										<div className="mt-3 text-black-50" style={{ textAlign: 'left' }}>
											<h3>Conditions Générales d'Utilisation</h3>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>1. Objet de l'Offre</h4>
												<p>
													Épargnez avec notre plan sécurisé : premier dépôt minimum de 100 000 FCFA pour le fonds de caisse. Retrait uniquement à la date fixée, après un minimum de 7 mois. Profitez de bénéfices garantis pour une gestion optimale de vos économies.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>2. Inscription et Sécurité</h4>
												<h5>Inscription</h5>
												<p>
													Pour utiliser l'application, les utilisateurs doivent créer un compte en fournissant des informations personnelles exactes et à jour.
												</p>
												<h5>Sécurité</h5>
												<p>
													Nous mettons en œuvre des mesures de sécurité avancées pour protéger les données des utilisateurs. Cependant, les utilisateurs sont responsables de la confidentialité de leurs identifiants de connexion.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>3. Utilisation de l'Application</h4>
												<h5>Épargne Sécurisée</h5>
												<p>
													Les utilisateurs doivent effectuer un premier dépôt minimum de 100 000 FCFA pour le fonds de caisse. Les fonds ne peuvent être retirés qu'à la date fixée, après un minimum de 7 mois. Cette contrainte assure une gestion optimale des économies et des bénéfices garantis.
												</p>
												<h5>Retraits</h5>
												<p>
													Les utilisateurs ne peuvent retirer leur argent qu'à la date fixée, après un minimum de 7 mois. Cette contrainte assure une discipline financière et une meilleure gestion des économies.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>4. Protection des Données</h4>
												<h5>Confidentialité</h5>
												<p>
													Les informations personnelles des utilisateurs sont traitées conformément à notre politique de confidentialité. Nous ne partageons pas les données des utilisateurs avec des tiers sans leur consentement explicite.
												</p>
												<h5>Sécurité des Transactions</h5>
												<p>
													Toutes les transactions financières sont sécurisées par des protocoles de cryptage de pointe.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>5. Responsabilités</h4>
												<h5>Propriétaire de l'Application</h5>
												<p>
													Nous nous engageons à maintenir l'application fonctionnelle et sécurisée. Cependant, nous ne sommes pas responsables des pertes financières dues à une mauvaise utilisation de l'application par les utilisateurs.
												</p>
												<h5>Utilisateurs</h5>
												<p>
													Les utilisateurs doivent utiliser l'application de manière responsable et conformément aux présentes conditions générales. Toute activité frauduleuse ou abusive entraînera la suspension ou la résiliation du compte utilisateur.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>6. Modifications des Conditions</h4>
												<p>
													Nous nous réservons le droit de modifier ces conditions générales à tout moment. Les utilisateurs seront informés de toute modification via l'application ou par e-mail. Ces modifications n'affecteront pas la somme d'argent investie par les utilisateurs.
												</p>
											</section>

											<section>
												<h4 style={{ marginBottom: '20px', marginTop: '20px' }}>7. Contact et Support</h4>
												<p>
													Pour toute question ou assistance, les utilisateurs peuvent contacter notre service client via l'application ou par e-mail à support@votreapplication.com.
												</p>
											</section>
										</div>

										<Link to={"/Regist/Epargne/" + "A00001"}><Button variant="btn btn-success" className="mt-4">J'ACCEPTE</Button></Link>
									</div>

								</div>


							</div>) : (<div></div>)}

						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Fragment>
	)
}
)


export default EpargneDetails
