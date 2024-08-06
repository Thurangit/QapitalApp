import {useState,memo,Fragment} from 'react'
import {Row,Col,Image,Form,Button,InputGroup,FormControl} from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

// import {bindActionCreators} from "redux"

import {Link, useNavigate, useParams} from 'react-router-dom'

// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar'
import AuthUser from '../../../components/authuser/AuthUser'

const EpargneRegist = memo((props) => {
    const [toggler, setToggler] = useState(false);
		const {ref} = useParams();
		const { http, user } = AuthUser();
		const navigate = useNavigate();
		const [inputs, setInputs] = useState({});

		const userid = user.id;




		const handleChange = (event) => {
				const name = event.target.name;
				const value = event.target.value;

				setInputs(values => ({ ...values, [name]: value, userid, ref}))
		}
 
		
		const submitForm = () => {
		
				http.post('/new/epargne', inputs).then((res) => {
						alert("Epargne crée!")
						//navigate('/List/classes/')
						//window.location.reload(false);

			})
		 }



    return (
        <Fragment>

            <Row>

								<Col lg="12">
                    <Card>
												<Card.Header className="d-flex justify-content-between">
														<div className="header-title">
																{ref === "A00001" ? (<div><h4 className="card-title">Nouvelle Epargne Flexible</h4></div>) : (<div></div>)}
																{ref === "A00002" ? (<div><h4 className="card-title">Nouvelle Epargne Stricte</h4></div>) : (<div></div>)}
																{ref === "A00003" ? (<div><h4 className="card-title">Nouvelle Epargne Stricte +</h4></div>) : (<div></div>)}

																<hr />
														</div>
												</Card.Header>
												<Card.Body>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>

														<Form>
																<Row>
																		<Col md="12 mt-2">
																				<Form.Label  htmlFor="exampleInputdate">Intitulé de l'épargne *</Form.Label>
																				<Form.Control type="text"  name="int" onChange={handleChange} required/>
																		</Col>
																		<Col md="6 mt-2">
																				<Form.Label  htmlFor="exampleInputdate">Montant souhaiter (laissez vide si indeterminé)</Form.Label>
																				<Form.Control type="number" name="montant" onChange={handleChange}  id="exampleInputdate" />
																		</Col>
																		<Col md="6 mt-2">
																				<Form.Label  htmlFor="exampleInputdate">Date de fin (laissez vide si indeterminé)</Form.Label>
																				<Form.Control type="date" name="date" onChange={handleChange}  id="exampleInputdate" />
																		</Col>
																		<Col md="12 mt-2">
																				<Form.Label  htmlFor="exampleInputdate">Description</Form.Label>
																				<Form.Control as="textarea" name="desc" onChange={handleChange}   id="exampleFormControlTextarea1" rows="5"/>
																		</Col>
																</Row>

																<Button type="button" onClick={submitForm} variant="btn btn-primary" className="mt-4">Confirmer</Button>
														</Form>
												</Card.Body>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
}
)


export default EpargneRegist
