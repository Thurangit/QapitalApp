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
SwiperCore.use([Navigation]);

const AssociationsCotisationDetails = memo((props) => {


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
      <Row>
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
                      <div className="twit-date">Montant à cotiser : {epargnes_info.montant_total_elu} XAF</div>
                      <div className="twit-date">Somme à bénéficier : {epargnes_info.benefices_elu} XAF</div>
                      <div className="twit-date">Nombre de participants: {epargnes_info.objectif_elu} XAF</div>
                      <div className="twit-date">Date de debut: {epargnes_info.date_fin_elu}</div>
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
                <Modal className="lg" show={show1} onHide={handleClose1}>
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
                    {epargnes_transactions.map((item) => (
                      <tr>
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
    </Fragment>
  );
})

export default AssociationsCotisationDetails
