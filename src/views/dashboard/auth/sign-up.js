import { useState, useEffect, React } from 'react'
import { Row, Col, Image, Form, Button, ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'
// img
import facebook from '../../../assets/images/brands/fb.svg'
import google from '../../../assets/images/brands/gm.svg'
import instagram from '../../../assets/images/brands/im.svg'
import linkedin from '../../../assets/images/brands/li.svg'
import auth5 from '../../../assets/images/auth/05.jpg'
import AuthUser from '../../../components/authuser/AuthUser'

const SignUp = () => {

   const { http } = AuthUser();
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({});

   const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;

      setInputs(values => ({ ...values, [name]: value }))


   }




   const submitForm = () => {
      console.log(inputs);
      http.post('/register', inputs).then((res) => {
         alert("Profil créer!")
         //navigate('/List/classes/')
         window.location.reload(false);

      })
   }
   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <div className="col-md-6 d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth5} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </div>
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="11">
                        <Card className="card-transparent auth-card shadow-none d-flex justify-content-center mb-0">
                           <Card.Body>

                              <h2 className="mb-2 text-center">Sign Up</h2>
                              <p className="text-center">Create your Qapital account.</p>
                              <Form>
                                 <Row>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="full-name" className="">Nom</Form.Label>
                                          <Form.Control type="text" className="" name="nom" onChange={handleChange} id="full-name" placeholder=" " required />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="last-name" className="">Prénom</Form.Label>
                                          <Form.Control type="text" name="prenom" onChange={handleChange} className="" id="last-name" placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="date" className="">Date de naissance</Form.Label>
                                          <Form.Control type="date" name="datenaissance" onChange={handleChange} className="" id="email" placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="exampleInputText1">Genre</Form.Label>
                                          <select className="form-select mb-3 shadow-none" name="genre" onChange={handleChange} required>
                                             <option></option>
                                             <option value="M">M</option>
                                             <option value="F">F</option>
                                          </select>
                                       </Form.Group>
                                    </Col>

                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="Pays de residence" className="">Pays de residence *</Form.Label>
                                          <Form.Control type="text" name="paysresidence" onChange={handleChange} className="" id="email" placeholder=" " required />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="Ville de residence" className="">Ville de residence</Form.Label>
                                          <Form.Control type="text" className="" id="email" placeholder=" " name="villeresidence" onChange={handleChange} />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Email *</Form.Label>
                                          <Form.Control type="email" name="email" onChange={handleChange} className="" id="email" placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="phone" className="">Numéro de téléphone *</Form.Label>
                                          <Form.Control type="text" name="telephone" onChange={handleChange} className="" id="phone" placeholder=" " />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Mot de passe</Form.Label>
                                          <Form.Control type="password" name="password" onChange={handleChange} className="" id="password" placeholder=" " required />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="6">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="confirm-password" className="">Confirmé le mot de passe</Form.Label>
                                          <Form.Control type="text" className="" name="cpassword" onChange={handleChange} id="confirm-password" placeholder=" " required />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-center">
                                       <Form.Check className="mb-3 form-check">
                                          <Form.Check.Input type="checkbox" id="customCheck1" />
                                          <Form.Check.Label htmlFor="customCheck1">J'accepte les conditions générales d'utilisation</Form.Check.Label>
                                       </Form.Check>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center">
                                    <Button onClick={submitForm} type="button" variant="primary">Confirmer</Button>
                                 </div>

                                 <p className="mt-3 text-center">
                                    Already have an Account <Link to="/auth/sign-in" className="text-underline">Connexion</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>

               </Col>
            </Row>
         </section>
      </>
   )
}

export default SignUp
