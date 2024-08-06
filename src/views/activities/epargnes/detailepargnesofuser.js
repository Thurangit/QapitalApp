import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Button, Card, Image, Table, Modal, Form } from "react-bootstrap";

import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../../components/authuser/AuthUser'


// AOS
import AOS from "aos";
import "../../../../node_modules/aos/dist/aos";
import "../../../../node_modules/aos/dist/aos.css";

import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles

// import 'swiper/components/navigation/navigation.scss';



// Redux Selector / Action
import { useSelector } from "react-redux";
// Import selectors & action from setting store
import * as SettingSelector from "../../../store/setting/selectors";
// install Swiper modules


import image1 from '../../../assets/images/activities/image1.jpeg'
import CountUp from "react-countup";
SwiperCore.use([Navigation]);

const DetailEpargneOfUser = memo((props) => {


  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;
  const { ref } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);


  const [epargnes_info, setepargnes_info] = useState([]);
  useEffect(() => {
    fetchAllepargnes_info();
  }, []);

  const fetchAllepargnes_info = () => {
    http.get('info/epargne/of/user/' + userid + '/' + ref).then(res => {
      setepargnes_info(res.data);
    })
  }

  const [epargnes_transactions, setepargnes_transactions] = useState([]);
  useEffect(() => {
    fetchAllepargnes_transactions();
  }, []);

  const fetchAllepargnes_transactions = () => {
    http.get('epargne/transactions/of/user/' + userid + '/' + ref).then(res => {
      setepargnes_transactions(res.data);
    })
  }



  const total_amount = epargnes_info.montant_total_elu + epargnes_info.benefices_elu;

  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs(values => ({ ...values, [name]: value, userid, ref }))
  }



  const submitForm = () => {
    console.log(inputs);
    http.post('/new/transaction/epargne', inputs).then((res) => {
      alert("Epargne crée!")
      //navigate('/List/classes/')
      //window.location.reload(false);

    })
  }




  const customnumber = () => {
    setShowForm(true);
    console.log(1);
  };

  const handleSubmit = (event) => {
    // handle submit logic here
  };



  const [last20transactions, setlast20transactions] = useState([]);
  useEffect(() => {
    fetchAlllast20transactions();
  }, []);

  const fetchAlllast20transactions = () => {
    http.get('transactions/of/user/twenty/' + userid).then(res => {
      setlast20transactions(res.data);
    })
  }




  useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix =
      getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    if (prefix) {
      prefix = prefix.trim();
    }
    const color1 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary`
    );
    const color2 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}info`
    );
    const color3 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}primary-tint-20`
    );
    const color4 = getComputedStyle(document.body).getPropertyValue(
      `--${prefix}warning`
    );
    return {
      primary: color1.trim(),
      info: color2.trim(),
      warning: color4.trim(),
      primary_light: color3.trim(),
    };
  };
  const variableColors = getVariableColor();

  const colors = [variableColors.primary, variableColors.info];
  useEffect(() => {
    return () => colors;
  });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  });


  return (
    <Fragment>
      <Row className="pc">
        <Col lg="12">
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-wrap align-items-center">

                  <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                    <h4 className="me-2 h4">Epargne</h4>
                  </div>
                </div>

              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md="12" lg="6">
          <Row>
            <Col md="12" lg="12">
              <div
                className="card credit-card-widget"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="pb-4 border-0 card-header">
                  <div className="p-4 border border-white rounded primary-gradient-card">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="font-weight-bold">SOLDE </h5>
                        <p className="mb-0">{epargnes_info.name_elu}</p>
                      </div>
                      <div className="master-card-content">
                        <svg
                          className="master-card-1"
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                          />
                        </svg>
                        <svg
                          className="master-card-2"
                          width="60"
                          height="60"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#ffffff"
                            d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="my-4">
                      <div className="card-number">
                        <span className="fs-5 me-2">{total_amount}</span>
                        <span className="fs-5">XAF</span>
                      </div>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <p className="mb-0">Card holder</p>

                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>{user.nom} {user.prenom}</h6>
                      <h6 className="ms-5"></h6>
                    </div>
                  </div>
                </div>

              </div>
              <div className="card" data-aos="fade-up" data-aos-delay="500">

              </div>
            </Col>


          </Row>
        </Col>
        <Col md="12" lg="6">
          <Row>

            <Col md="12">
              <Card>

                <Card.Body>
                  <div className="twit-feed">
                    <div className="d-flex align-items-center mb-4">
                      <Image className="theme-color-default-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="qapital" />
                      <Image className="theme-color-purple-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="" />
                      <Image className="theme-color-blue-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="" />
                      <Image className="theme-color-green-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="" />
                      <Image className="theme-color-yellow-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="" />
                      <Image className="theme-color-pink-img rounded-pill img-fluid avatar-60 me-3" src={image1} alt="" />
                      <div className="media-support-info">
                        <h6 className="mb-0">
                          {epargnes_info.type_epargne_elu === "A00001" ? (<div>Flexible</div>) : null}
                          {epargnes_info.type_epargne_elu === "A00002" ? (<div>Stricte</div>) : null}
                          {epargnes_info.type_epargne_elu === "A00002" ? (<div>Stricte +</div>) : null}

                        </h6>
                        <p className="mb-0">{epargnes_info.name_elu}</p>
                      </div>
                    </div>
                    <div className="media-support-body">
                      <p>{epargnes_info.description_elu}</p>
                      <div className="twit-date">Montant épargné : {epargnes_info.montant_total_elu} XAF</div>
                      <div className="twit-date">Bénéfice : {epargnes_info.benefices_elu} XAF</div>
                      <div className="twit-date">Objectif : {epargnes_info.objectif_elu} XAF</div>
                      <div className="twit-date">Date de fin : {epargnes_info.date_fin_elu}</div>

                    </div>



                  </div>

                </Card.Body>
              </Card>
            </Col>

          </Row>
        </Col>

        <Col lg="12">
          <Card>

            <Card.Header className="d-flex justify-content-between">

              <div className="header-title">
                <h4 className="card-title">Transactions</h4>
              </div>
              <div>
                <button className="btn btn-success" onClick={handleShow1}>Faire un retrait</button>
                <Modal show={show1} onHide={handleClose1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Retrait</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Nouvelle transaction</Form.Label>
                      <Form.Control type="text" placeholder="Permission Title" />
                    </Form.Group>
                    <Button variant="success">Confirmer</Button>{' '}
                    <Button variant="danger" onClick={handleClose1}>Annuler</Button>
                  </Modal.Body>
                </Modal>


                {" "}
                <button className="btn btn-info" onClick={handleShow}>Faire un dépôt</button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Dépôt</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Opérateur</Form.Label>
                        <select name="typetransaction" onChange={handleChange} className="form-select">
                          <option></option>
                          <option value="OM" >Orange Money</option>
                          <option value="MOMO">MTN Mobile Money</option>
                        </select>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formBasicPassword">


                        {showForm ? (
                          <div>
                            <Form.Label>Numero de téléphone</Form.Label>
                            <Form.Control name="numero" onChange={handleChange} />
                          </div>
                        ) : (
                          <div>
                            <Form.Label>Choisissez un de vos numéros de téléphone </Form.Label>
                            <select name="numero" onChange={handleChange} className="form-select">
                              <option></option>
                              <option value="optionn n v1">Option 1</option>
                              <option value="optionnf gnf2">Option 2</option>
                              <option value="optionf gn,f gn3">Option 3</option>

                            </select>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-2" controlId="formBasicPassword">
                        <Form.Label>Montant XAF</Form.Label>
                        <Form.Control type="number" name="montant" onChange={handleChange} />
                      </Form.Group>
                      <div className="mb-3">
                        <Link to="#" onClick={customnumber}>cliquez ici pour saisir un autre numéro</Link>
                      </div>
                      <Button variant="primary" onClick={submitForm}>Confirmer</Button>{' '}
                      <Button variant="danger" onClick={handleClose}>Annuler</Button>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            </Card.Header>

            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th>Motif</th>
                      <th>Type</th>
                      <th>Montant</th>
                      <th>Solde</th>
                      <th>Date</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {epargnes_transactions.map((item, idrs) => (
                      <tr key={idrs}>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.motif_transaction}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.type_transaction}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.montant_transaction} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.solde_transaction} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.date_transaction}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            {item.state_transaction === "Success" ? (<div className="text-success">{item.state_transaction}</div>) : (<div></div>)}
                          </div>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>





      {/* ////////////// Smartphone */}
      <Row className="smarthpone">

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <small className="mb-0">Solde</small>
            <h2 className="counter"><CountUp start={0} end={0} duration={1} decimal="," formattingFn={(value) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} />
              {" "}XAF</h2>
            <small className="mb-2 text-success subtext">Obj: {epargnes_info.objectif_elu} XAF</small>
          </div>
          <div className="user-profile">
            <Image className="theme-color-default-img  rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
            <Image className="theme-color-purple-img rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
            <Image className="theme-color-blue-img rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
            <Image className="theme-color-green-img rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
            <Image className="theme-color-yellow-img rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
            <Image className="theme-color-pink-img rounded-pill avatar-60 img-fluid" src={"info_user.avatar"} alt="qapital" />
          </div>
        </div>


        <div className="d-flex justify-content-between align-items-center mt-0 mb-2">


          <div className="me-1" >
            <Button to="#" className="mt-4 btn btn-danger d-block rounded">

              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor" />
                <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor" />
              </svg>{" "}
              <small className="normaltext">Epargner</small></Button>
          </div>
          <div className="me-1">
            <Button to="#" className="mt-4 btn btn-danger d-block rounded">
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z" fill="currentColor" />
                <path d="M11.455 2.22103L8.54604 5.06682C8.24604 5.36094 8.24604 5.83427 8.54804 6.12742C8.85004 6.41959 9.33704 6.41862 9.63704 6.12547L11.23 4.56623V6.06119V14.4515C11.23 14.8654 11.575 15.2014 12 15.2014C12.426 15.2014 12.77 14.8654 12.77 14.4515V4.56623L14.363 6.12547C14.663 6.41862 15.15 6.41959 15.452 6.12742C15.603 5.98036 15.679 5.78849 15.679 5.59566C15.679 5.40477 15.603 5.21291 15.454 5.06682L12.546 2.22103C12.401 2.07981 12.205 1.99995 12 1.99995C11.796 1.99995 11.6 2.07981 11.455 2.22103Z" fill="currentColor" />
              </svg>{" "}

              <small className="normaltext">Retirer</small></Button>
          </div>
          <div >
            <Button to="#" className="mt-4 btn btn-primary d-block rounded">
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor" />
              </svg>{" "}

              <small className="normaltext">Historique</small></Button>
          </div>
        </div>

        <Col xs="12" className="mt-3 mb-0">
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <small className="d-flex align-items-center"><svg width="18" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M22 11.9998C22 17.5238 17.523 21.9998 12 21.9998C6.477 21.9998 2 17.5238 2 11.9998C2 6.47776 6.477 1.99976 12 1.99976C17.523 1.99976 22 6.47776 22 11.9998Z" fill="currentColor" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.8701 12.6307C12.8701 13.1127 12.4771 13.5057 11.9951 13.5057C11.5131 13.5057 11.1201 13.1127 11.1201 12.6307V8.21069C11.1201 7.72869 11.5131 7.33569 11.9951 7.33569C12.4771 7.33569 12.8701 7.72869 12.8701 8.21069V12.6307ZM11.1251 15.8035C11.1251 15.3215 11.5161 14.9285 11.9951 14.9285C12.4881 14.9285 12.8801 15.3215 12.8801 15.8035C12.8801 16.2855 12.4881 16.6785 12.0051 16.6785C11.5201 16.6785 11.1251 16.2855 11.1251 15.8035Z" fill="currentColor" />
                </svg>{"   "} {epargnes_info.name_elu}</small>


              </div>
            </Card.Body>
          </Card>
        </Col>


        <Col className="mt-0">

          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h6 className="card-title">Récentes transactions</h6>
              </div>

            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th scope="col"><small>Destinataire</small></th>
                      <th className="text-center" scope="col"><small>Montant</small></th>
                      <th className="text-center" scope="col"><small>Type</small></th>
                      <th className="text-center" scope="col"><small>Etat</small></th>
                      <th className="text-center" scope="col"><small>Date</small></th>
                    </tr>
                  </thead>
                  <tbody>

                    {epargnes_transactions.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                              src="https://img.freepik.com/premium-photo/flight-attendant-digital-avatar-generative-ai_934475-9234.jpg"
                              alt="profile"
                            />
                            <small className="normaltext">{item.ref3_transaction}</small>
                          </div>
                        </td>


                        <td className="text-center normaltext"><small>XAF 3000</small></td>
                        <td>
                          <div className="text-primary text-center normaltext"><small>Envoi </small></div>
                        </td>
                        <td>
                          {item.state_transaction === "Accept" ? (<div className="text-success text-center normaltext">Accept</div>) : (<div className="text-danger text-center normaltext">Reject</div>)}

                        </td>
                        <td><small className="text-center normaltext">{new Date(item.created_at).toLocaleString()}</small></td>
                      </tr>
                    ))}





                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>


        </Col>





      </Row>
    </Fragment>
  );
})

export default DetailEpargneOfUser
