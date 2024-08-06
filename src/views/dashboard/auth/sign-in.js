import React from 'react'
import { useState } from 'react'
import { Row, Col, Image, Form, Button, ListGroup, Spinner, } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../../components/Card'

// img
import facebook from '../../../assets/images/brands/fb.svg'
import google from '../../../assets/images/brands/gm.svg'
import instagram from '../../../assets/images/brands/im.svg'
import linkedin from '../../../assets/images/brands/li.svg'
import auth1 from '../../../assets/images/auth/01.jpg'
import logosf from '../../../assets/logos/logosf.png'
import x from '../../../assets/images/brands/x.svg'


import AuthUser from '../../../components/authuser/AuthUser'
import { HttpStatusCode } from 'axios'



const SignIn = () => {
   const { http, setToken } = AuthUser();
   const [id, setId] = useState();
   const [password, setPassword] = useState();
   const [status, setStatus] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [stayLoggedIn, setStayLoggedIn] = useState(false);

   const submitForm = () => {
      setIsLoading(true);

      http.post('login', { id: id, password: password }).then((res) => {
         /* console.log(res.data); */
         setToken(res.data.user, res.data.access_token);
      })
      http.post('login', { id: id, password: password }).then(response => {
         console.log(response.status);
         setStatus(response.status);
         setToken(response.data.user, response.data.access_token);
         setIsLoading(false);
      }).catch(error => {
         console.error(error);

         if (error.response.status === 401) {
            alert('Vous n\'êtes pas autorisé à accéder à cette page.');
         } else if (error.response.status === 404) {
            alert('La page que vous recherchez est introuvable.');
         } else if (error.response.status === 500) {
            alert('Vous avez des problèmes de connexion ');
         } else if (error.response.status === 504) {
            alert('Vous avez des problèmes de connexion ');
         } else {
            alert('Problème de connexion');
         }

         setIsLoading(false);
      });
   }

   let history = useNavigate()
   return (
      <>
         <section className="login-content">
            <Row className="m-0 align-items-center bg-white vh-100">
               <Col md="6">
                  <Row className="justify-content-center">
                     <Col md="10">
                        <Card className="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card">

                           <Card.Body>

                              <div className="d-flex justify-content-center align-content-center align-items-center mb-4 text-center">
                                 <Image style={{ height: '120px' }} src={logosf} alt="" />
                              </div>
                              <Form>
                                 <Row>

                                    <Col lg="12">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="email" className="">Identifiant</Form.Label>
                                          <Form.Control type="email" className="" id="id" aria-describedby="id" placeholder="Email, Numéro de téléphone, Id utlisateur" onChange={e => setId(e.target.value)} id="id" />
                                       </Form.Group >
                                    </Col>
                                    <Col lg="12" className="">
                                       <Form.Group className="form-group">
                                          <Form.Label htmlFor="password" className="">Mot de passe</Form.Label>
                                          <Form.Control type="password" className="" id="password" aria-describedby="password" placeholder=" " onChange={e => setPassword(e.target.value)} id="password" />
                                       </Form.Group>
                                    </Col>
                                    <Col lg="12" className="d-flex justify-content-between">
                                       <Form.Check className="form-check mb-3">
                                          <Form.Check.Input type="checkbox" id="customCheck1" checked={stayLoggedIn} onChange={(e) => setStayLoggedIn(e.target.checked)} />
                                          <Form.Check.Label htmlFor="customCheck1">Rester connecté</Form.Check.Label>
                                       </Form.Check>
                                       <Link to="/auth/recoverpw">Mot de passe oublié?</Link>
                                    </Col>
                                 </Row>
                                 <div className="d-flex justify-content-center mb-5">
                                    <Button onClick={submitForm} type="button" variant="btn btn-primary" disabled={isLoading}>
                                       {isLoading ? <Spinner
                                          as="span"
                                          animation="grow"
                                          size="sm"
                                          role="status"
                                          aria-hidden="true"
                                       /> : "Connexion"}</Button>
                                 </div>
                                 <div className="d-flex justify-content-center ">
                                    <ListGroup as="ul" className="list-group-horizontal list-group-flush">
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={facebook} alt="fb" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={x} alt="x" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={instagram} alt="im" /></Link>
                                       </ListGroup.Item>
                                       <ListGroup.Item as="li" className="border-0 pb-0">
                                          <Link to="#"><Image src={linkedin} alt="li" /></Link>
                                       </ListGroup.Item>
                                    </ListGroup>
                                 </div>
                                 <p className="mt-3 text-center">
                                    Vous n'avez pas de compte? <Link to="/auth/sign-up" className="text-underline">Cliquez ici pour vous enregistrer.</Link>
                                 </p>
                              </Form>
                           </Card.Body>
                        </Card>
                     </Col>
                  </Row>

               </Col>
               <Col md="6" className="d-md-block d-none bg-primary p-0 mt-n1 vh-100 overflow-hidden">
                  <Image src={auth1} className="Image-fluid gradient-main animated-scaleX" alt="images" />
               </Col>
            </Row>
         </section>
      </>
   )
}

export default SignIn
