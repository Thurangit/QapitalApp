import {useState,memo,Fragment} from 'react'
import {Row,Col,Image,Form,Button,InputGroup,FormControl} from 'react-bootstrap'
import {Card} from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';

// import {bindActionCreators} from "redux"

import {Link, useNavigate,} from 'react-router-dom'

// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar'
import AuthUser from '../../../components/authuser/AuthUser'

const CreateAssociation = memo((props) => {
  
		const { http, user } = AuthUser();
		const navigate = useNavigate();
		const [inputs, setInputs] = useState({});

		const userid = user.id;




		const handleChange = (event) => {
				const name = event.target.name;
				const value = event.target.value;

				setInputs(values => ({ ...values, [name]: value, userid}))
		}
		const submitForm = () => {
		
		
				http.post('/new/association', inputs).then((res) => {
						alert("Association crée!")
						navigate('/List/Association/Of/User/')
						//window.location.reload(false);

			})

			console.log(inputs)
		 }

		 



    return (
        <Fragment>

            <Row>

								<Col lg="12">
                    <Card>
												<Card.Header className="d-flex justify-content-between">
														<div className="header-title">
																<div><h4 className="card-title">Créer Une Nouvelle Association</h4></div>
						
																<hr />
														</div>
												</Card.Header>
												<Card.Body>
														<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vulputate, ex ac venenatis mollis, diam nibh finibus leo</p>

														<Form>
																<Row>
																		<Col md="12 mt-2">
																				<Form.Label  htmlFor="exampleInputdate">Intitulé/Nom de l'association *</Form.Label>
																				<Form.Control type="text"  name="int" onChange={handleChange} required/>
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


export default CreateAssociation
