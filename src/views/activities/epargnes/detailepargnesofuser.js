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
import { Container } from 'react-bootstrap';

import image1 from '../../../assets/images/activities/image1.jpeg'
import CountUp from "react-countup";

import { ListGroup } from 'react-bootstrap';

const transactions = [
  { id: 1, date: '2024-09-15', description: 'Dépôt de salaire', amount: 2500, type: 'credit', status: 'réussi' },
  { id: 2, date: '2024-09-16', description: 'Achat supermarché (courses hebdomadaires)', amount: 100000, type: 'debit', status: 'réussi' },
  { id: 3, date: '2024-09-18', description: 'Paiement loyer appartement centre-ville', amount: 800, type: 'debit', status: 'en attente' },
  { id: 4, date: '2024-09-20', description: 'Remboursement ami (dîner restaurant)', amount: 50, type: 'credit', status: 'réussi' },
  { id: 5, date: '2024-09-22', description: 'Facture électricité (consommation été)', amount: 75.30, type: 'debit', status: 'échoué' },
  { id: 6, date: '2024-09-24', description: 'Retrait DAB pour dépenses courantes', amount: 100, type: 'debit', status: 'réussi' },
  { id: 7, date: '2024-09-26', description: 'Virement reçu (remboursement frais professionnels)', amount: 300, type: 'credit', status: 'en attente' },
  { id: 8, date: '2024-09-28', description: 'Achat en ligne (vêtements et accessoires)', amount: 89.99, type: 'debit', status: 'réussi' },
  { id: 9, date: '2024-09-30', description: 'Remboursement impôts sur le revenu', amount: 150, type: 'credit', status: 'réussi' },
  { id: 10, date: '2024-10-01', description: 'Abonnement streaming (Netflix, Prime, Disney+)', amount: 35.99, type: 'debit', status: 'réussi' },
  { id: 11, date: '2024-10-02', description: 'Vente en ligne (objets d\'occasion)', amount: 75, type: 'credit', status: 'en attente' },
  { id: 12, date: '2024-10-03', description: 'Achat restaurant (anniversaire avec amis)', amount: 85, type: 'debit', status: 'réussi' },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'réussi':
      return 'success';
    case 'échoué':
      return 'danger';
    case 'en attente':
      return 'warning';
    default:
      return 'secondary';
  }
};


const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};


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
  const [visibleTransactions, setVisibleTransactions] = useState(10);
  const loadMore = () => {
    setVisibleTransactions(prevCount => Math.min(prevCount + 5, transactions.length));
  };



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

                  <Container className="mt-5">
                    <Card>
                      <Card.Body>
                        <Card.Title className="mb-4">Transactions récentes</Card.Title>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Montant</th>
                              <th>Statut</th>
                            </tr>
                          </thead>
                          <tbody>
                            {transactions.map((transaction) => (
                              <tr key={transaction.id}>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                                  {transaction.type === 'credit' ? '+' : '-'}
                                  {Math.abs(transaction.amount).toFixed(2)} €
                                </td>
                                <td className={getStatusStyle(transaction.status)}>
                                  {transaction.status}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Container>
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
              <Container className="mt-5">
                <Card>
                  <Card.Body>
                    <Card.Title className="mb-4">Transactions récentes</Card.Title>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Description</th>
                          <th>Montant</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactions.map((transaction) => (
                          <tr key={transaction.id}>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                              {transaction.type === 'credit' ? '+' : '-'}
                              {Math.abs(transaction.amount).toFixed(2)} €
                            </td>
                            <td className={getStatusStyle(transaction.status)}>
                              {transaction.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Container>
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

              <small className="normaltext">Détails</small></Button>
          </div>
        </div>

        <Col xs="12" className="mt-3 mb-0">
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-center">
                <small className="d-flex align-items-center"> <strong>{epargnes_info.name_elu} le testde dnfio iod fionododogioof jnjngidfgio dfo od fgo dfg iod fg</strong></small>


              </div>
            </Card.Body>
          </Card>
        </Col>





        <Col className="mt-0">

          <Card>
            <Card.Body>
              <Card.Title className="mb-3">Transactions
                <br />
                <small className="text-muted">{epargnes_info.name_elu}</small> </Card.Title>
              <ListGroup variant="flush" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                {transactions.slice(0, visibleTransactions).map((transaction) => (
                  <ListGroup.Item key={transaction.id} className="px-0 py-2 border-bottom">
                    <div className="d-flex justify-content-between">
                      <div style={{ flex: '1', minWidth: 0, paddingRight: '10px' }}>
                        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                          {transaction.description}
                        </div>
                        <small className="text-muted">{transaction.date}</small>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                          {transaction.type === 'credit' ? '+' : '-'}
                          {formatNumber(transaction.amount)} XAF
                        </div>
                        <small className={`text-${getStatusStyle(transaction.status)}`}>
                          {transaction.status}
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              {visibleTransactions < transactions.length && (
                <div className="text-center mt-3">
                  <button className="btn btn-outline-primary" onClick={loadMore}>
                    Voir plus
                  </button>
                </div>
              )}
            </Card.Body>
          </Card>


        </Col>





      </Row>
    </Fragment>
  );
})

export default DetailEpargneOfUser
