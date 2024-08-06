import React, { useState, useEffect, memo, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Image,
  Table,
  Modal,
  Form,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/authuser/AuthUser";

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

import image1 from "../../../assets/images/activities/image1.jpeg";
import CountUp from "react-countup";
SwiperCore.use([Navigation]);

const DetailEpargneOfUsers = memo((props) => {
  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;
  const arraynull = [];
  const { idassociation, idepargne } = useParams();

  const [showpc, setShowpc] = useState(false);
  const handleClosepc = () => setShow(false);
  const handleShowpc = () => setShow(true);
  const [showpc1, setShowpc1] = useState(false);
  const handleClosepc1 = () => setShow1(false);
  const handleShowpc1 = () => setShow1(true);
  const [showpc2, setShowpc2] = useState(false);
  const handleClosepc2 = () => setShow2(false);
  const handleShowpc2 = () => setShow2(true);
  const [showpc3, setShow3pc] = useState(false);
  const handleClosepc3 = () => setShow3(false);
  const handleShowpc3 = () => setShow3(true);
  const [showpc4, setShowpc4] = useState(false);
  const handleClosepc4 = () => setShow4(false);
  const handleShowpc4 = () => setShow4(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [show3, setShow3] = useState(false);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  const [show4, setShow4] = useState(false);
  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);
  const [show5, setShow5] = useState(false);
  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  const ref = 0;

  const [epargne_info, setepargne_info] = useState([]);
  useEffect(() => {
    fetchAllepargne_info();
  }, []);

  const fetchAllepargne_info = () => {
    http
      .get("get/info/epargne/" + userid + "/" + idepargne)
      .then((res) => {
        setepargne_info(res.data);
      });
  };

  const [count_members_epargne, setcount_members_epargne] = useState([]);
  useEffect(() => {
    fetchAllcount_members_epargne();
  }, []);

  const fetchAllcount_members_epargne = () => {
    http
      .get("count/members/epargne/" + userid + "/" + idepargne)
      .then((res) => {
        setcount_members_epargne(res.data);
      });
  };

  const nameassociation = epargne_info.name_cotisation;
  const [membres_associations, setmembres_associations] = useState([]);
  useEffect(() => {
    fetchAllmembres_associations();
  }, []);

  const fetchAllmembres_associations = () => {
    http
      .get("list/membres/of/association/" + userid + "/" + idassociation)
      .then((res) => {
        setmembres_associations(res.data);
      });
  };

  const addmember = (id) => {
    const informations = {
      idmember: id,
      idaddby: userid,
      idassociation: idassociation,
      idepargne: idepargne,
    };
    http.post("/new/member/in/epargne", informations).then((res) => {
      fetchAllmembres_epargne();
      fetchAllepargnes_info();
      fetchAllcount_members_epargne();
      handleClose1();
    });
  };



  const [membres_epargne, setmembres_epargne] = useState([]);
  useEffect(() => {
    fetchAllmembres_epargne();
  }, []);

  const fetchAllmembres_epargne = () => {
    http
      .get(
        "list/membres/of/association/epargne/" +
        userid +
        "/" +
        idassociation +
        "/" +
        idepargne
      )
      .then((res) => {
        setmembres_epargne(res.data);
      });
  };
  const [membres_epargne_receivers, setmembres_epargne_receivers] =
    useState([]);
  useEffect(() => {
    fetchAllmembres_epargne_receivers();
  }, []);

  const fetchAllmembres_epargne_receivers = () => {
    http
      .get(
        "list/membres/of/association/cotisation/recerivers/" +
        userid +
        "/" +
        idassociation +
        "/" +
        idepargne
      )
      .then((res) => {
        setmembres_epargne_receivers(res.data);
      });
  };

  ///

  const [epargnes_info, setepargnes_info] = useState([]);
  useEffect(() => {
    fetchAllepargnes_info();
  }, []);

  const fetchAllepargnes_info = () => {
    http.get("info/epargne/of/user/" + userid + "/" + ref).then((res) => {
      setepargnes_info(res.data);
    });
  };

  const [epargnes_transactions, setepargnes_transactions] = useState([]);
  useEffect(() => {
    fetchAllepargnes_transactions();
  }, []);

  const fetchAllepargnes_transactions = () => {
    http
      .get("epargne/transactions/of/user/" + userid + "/" + ref)
      .then((res) => {
        setepargnes_transactions(res.data);
      });
  };

  const total_amount =
    epargnes_info.montant_total_elu + epargnes_info.benefices_elu;

  const value = "0";
  const [showForm, setShowForm] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputs((values) => ({
      ...values,
      [name]: value,
      idassociation,
      idepargne,
      userid,
      nameassociation,
    }));
  };

  const [tourowner, settourowner] = useState([]);
  useEffect(() => {
    fetchAlltourowner();
  }, []);

  const fetchAlltourowner = () => {
    http
      .get(
        "get/beneficiaire/tour/" +
        userid +
        "/" +
        idassociation +
        "/" +
        idepargne
      )
      .then((res) => {
        settourowner(res.data);
      });
  };

  const [showForm2, setShowForm2] = useState(false);
  const customnumber2 = () => {
    if (!showForm2) {
      setShowForm2(true);
    } else {
      setShowForm2(false);
    }
  };

  const submitcotiser = () => {
    http.post("/cotiser/association/cotisation", inputs).then((res) => {
      //alert("Epargne crée!")
      //navigate('/List/classes/')
      //window.location.reload(false);
    });
  };

  const submittour = () => {
    http.post("/set/tour/owner", inputs).then((res) => {
      //alert("Epargne crée!")
      //navigate('/List/classes/')
      //window.location.reload(false);

      setShow4(false);
      fetchAlltourowner();
    });
  };

  const customnumber = () => {
    setShowForm(true);
  };

  const handleSubmit = (event) => {
    // handle submit logic here
  };

  const clickPage = (page) => {
    navigate(page);
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
                        <span className="fs-5">
                          XAF {epargne_info.solde_association_cotisaton}{" "}
                        </span>
                      </div>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <p className="mb-0">Card holder</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>
                        {user.nom} {user.prenom}
                      </h6>
                      <h6 className="ms-5"></h6>
                    </div>
                  </div>
                </div>

                <div className="card-body">
                  <div className="grid-cols-2 d-grid gap">
                    <button
                      className="btn btn-primary text-uppercase"
                      onClick={handleShow2}
                    >
                      Epargner
                    </button>
                    <button
                      className="btn btn-info text-uppercase"
                      onClick={handleShow3}
                    >
                      Retirer
                    </button>
                  </div>
                </div>
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
                      <Image
                        className="theme-color-default-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt="qapital"
                      />
                      <Image
                        className="theme-color-purple-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt=""
                      />
                      <Image
                        className="theme-color-blue-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt=""
                      />
                      <Image
                        className="theme-color-green-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt=""
                      />
                      <Image
                        className="theme-color-yellow-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt=""
                      />
                      <Image
                        className="theme-color-pink-img rounded-pill img-fluid avatar-60 me-3"
                        src={image1}
                        alt=""
                      />
                      <div className="media-support-info">
                        <h6 className="mb-0">
                          {epargne_info.name_cotisation}
                        </h6>
                        <p className="mb-0">{epargnes_info.name_elu}</p>
                      </div>
                    </div>
                    <div className="media-support-body">
                      <p>{epargnes_info.description_elu}</p>
                      <div className="twit-date">
                        Montant à cotiser : {epargne_info.montant_cotisation}{" "}
                        XAF
                      </div>
                      <div className="twit-date">
                        Somme à bénéficier :{" "}
                        {epargne_info.montant_final_cotisation} XAF
                      </div>
                      <div className="twit-date">
                        Nombre de participants : {epargnes_info.objectif_elu}{" "}
                        XAF
                      </div>
                      <div className="twit-date">
                        Date de debut : {epargne_info.debut_cotisation}
                      </div>
                      <div className="twit-date">
                        Date de fin : {epargne_info.fin_cotisation}
                      </div>
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
                <h4 className="card-title">Adhérants</h4>
              </div>
              <div>
                <button className="btn btn-success" onClick={handleShowpc1}>
                  Ajouter des adhérants
                </button>
                <Modal show={showpc1} onHide={handleClosepc1}>
                  <Modal.Header closeButton>
                    <Modal.Title>Membres de l'association</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <div className="table-responsive mt-4">
                      <Table
                        striped
                        id="basic-table"
                        className=" mb-0"
                        role="grid"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Code</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                          </tr>
                        </thead>
                        <tbody>
                          {membres_associations.map((item, idmpc) => (
                            <tr ke={idmpc} onClick={() => addmember(item.id)}>
                              <td></td>
                              <td>{item.code}</td>
                              <td>{item.nom}</td>
                              <td>{item.prenom}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  </Modal.Body>
                </Modal>{" "}
                <button className="btn btn-info" onClick={handleShowpc}>
                  Historiques
                </button>
                <Modal show={showpc} onHide={handleClosepc}>
                  <Modal.Header closeButton>
                    <Modal.Title>Dépôt</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Opérateur</Form.Label>
                        <select
                          name="typetransaction"
                          onChange={handleChange}
                          className="form-select"
                        >
                          <option></option>
                          <option value="OM">Orange Money</option>
                          <option value="MOMO">MTN Mobile Money</option>
                        </select>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        {showForm ? (
                          <div>
                            <Form.Label>Numero de téléphone</Form.Label>
                            <Form.Control
                              name="numero"
                              onChange={handleChange}
                            />
                          </div>
                        ) : (
                          <div>
                            <Form.Label>
                              Choisissez un de vos numéros de téléphone{" "}
                            </Form.Label>
                            <select
                              name="numero"
                              onChange={handleChange}
                              className="form-select"
                            >
                              <option></option>
                              <option value="optionn n v1">Option 1</option>
                              <option value="optionnf gnf2">Option 2</option>
                              <option value="optionf gn,f gn3">Option 3</option>
                            </select>
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group
                        className="mb-2"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Montant XAF</Form.Label>
                        <Form.Control
                          type="number"
                          name="montant"
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <div className="mb-3">
                        <Link to="#" onClick={customnumber}>
                          Utiliser un autre mode de paiement
                        </Link>
                      </div>
                      <Button variant="primary" onClick="">
                        Confirmer
                      </Button>{" "}
                      <Button variant="danger" onClick={handleClosepc}>
                        Annuler
                      </Button>
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
                      <th>#</th>
                      <th>Code</th>
                      <th>Nom</th>
                      <th>Prénom</th>
                      <th>Etat</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membres_epargne.map((item) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <Image
                              className="theme-color-default-img rounded-pill img-fluid avatar-60 me-3"
                              src={image1}
                              alt="qapital"
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.code}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.nom}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.prenom}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.solde_transaction} </h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.date_transaction}</h6>
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

        {/* Modals */}

        <Modal show={showpc2} onHide={handleClosepc2}>
          <Modal.Header closeButton>
            <Modal.Title>Dépôt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {showForm ? (
                  <div>
                    <Form.Label>Choisissez un numero mobile money</Form.Label>
                    <select
                      name="numero"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option></option>
                      <option value="optionn n v1">Option 1</option>
                      <option value="optionnf gnf2">Option 2</option>
                      <option value="optionf gn,f gn3">Option 3</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <Form.Label>Mode de paiement</Form.Label>
                    <Form.Control
                      type="text"
                      name="modepaiement"
                      value="Qapital"
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Montant XAF</Form.Label>
                <Form.Control
                  type="number"
                  name="montant"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="mb-3">
                <Link to="#" onClick={customnumber}>
                  Utiliser un autre mode de paiement
                </Link>
              </div>
              <Button variant="primary" onClick={submitcotiser}>
                Confirmer
              </Button>{" "}
              <Button variant="danger" onClick={handleClosepc2}>
                Annuler
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={showpc3} onHide={handleClosepc3}>
          <Modal.Header closeButton>
            <Modal.Title>Béneficiaires</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive mt-4">
              <Table striped id="basic-table" className=" mb-0" role="grid">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {membres_epargne_receivers.map((item, idbnfpc) => (
                    <tr ke={idbnfpc}>
                      <td>
                        <div className="d-flex align-items-center mb-2">
                          <Image
                            className="theme-color-default-img rounded-pill img-fluid avatar-40 me-3"
                            src={image1}
                            alt="qapital"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center mb-2">
                          <h6>{item.nom}</h6>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center mb-2">
                          <h6>{item.prenom}</h6>
                        </div>
                      </td>

                      <td>
                        <div className="d-flex align-items-center mb-2">
                          <h6>
                            {" "}
                            <Link
                              to={
                                "/Association/Cotisation/Send/Money/" +
                                idassociation +
                                "/" +
                                idepargne +
                                "/" +
                                item.member_cotisation +
                                "/" +
                                item.id +
                                "/" +
                                userid
                              }
                            >
                              {" "}
                              <Button className="btn btn-info">
                                Envoyer
                              </Button>{" "}
                            </Link>
                          </h6>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>
      </Row>

      {/* ///////////////////////////////////// Smartphone */}
      <Row className="smarthpone">
        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
          <div>
            <small className="mb-2">Solde</small>
            <h2 className="counter normaltitle">
              <CountUp
                start={0}
                end={epargne_info.solde_association_cotisaton}
                duration={1}
                decimal=","
                formattingFn={(value) =>
                  value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                }
              />{" "}
              XAF{" "}
            </h2>
            <small className="mb-1 subtext"
              onClick={() =>
                clickPage(
                  "/Association/Cotisation/Transactions/History/" + idassociation + "/" + idepargne
                )
              }>
              Historique{" "}
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </small>
          </div>
          <div className="user-profile">
            <Image
              className="theme-color-default-img  rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
            <Image
              className="theme-color-purple-img rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
            <Image
              className="theme-color-blue-img rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
            <Image
              className="theme-color-green-img rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
            <Image
              className="theme-color-yellow-img rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
            <Image
              className="theme-color-pink-img rounded-pill avatar-50 img-fluid"
              src={epargne_info.image_epargne_association}
              alt="qapital"
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mb-2">
          <div style={{ marginRight: "3px" }}>
            <Button
              to="#"
              className="mt-2 btn btn-danger d-block rounded"
              onClick={handleShow2}
            >
              <svg
                width="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z"
                  fill="currentColor"
                />
                <path
                  d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z"
                  fill="currentColor"
                />
              </svg>{" "}
              <small className="normaltext">Epargner</small>
            </Button>
          </div>
          <div style={{ marginRight: "3px" }}>
            <Button
              to="#"
              className="mt-2 btn btn-danger d-block rounded"
              onClick={() => clickPage("/Association/Epargne/Take/Money/" + idassociation + "/" + idepargne)}
            >
              <svg
                width="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z"
                  fill="currentColor"
                />
                <path
                  d="M11.455 2.22103L8.54604 5.06682C8.24604 5.36094 8.24604 5.83427 8.54804 6.12742C8.85004 6.41959 9.33704 6.41862 9.63704 6.12547L11.23 4.56623V6.06119V14.4515C11.23 14.8654 11.575 15.2014 12 15.2014C12.426 15.2014 12.77 14.8654 12.77 14.4515V4.56623L14.363 6.12547C14.663 6.41862 15.15 6.41959 15.452 6.12742C15.603 5.98036 15.679 5.78849 15.679 5.59566C15.679 5.40477 15.603 5.21291 15.454 5.06682L12.546 2.22103C12.401 2.07981 12.205 1.99995 12 1.99995C11.796 1.99995 11.6 2.07981 11.455 2.22103Z"
                  fill="currentColor"
                />
              </svg>{" "}
              <small className="normaltext">Retirer</small>
            </Button>
          </div>
          <div className="pl-2">
            <Button
              to="#"
              className="mt-2 btn btn-danger d-block rounded"
              onClick={handleShow5}
            >
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor" />
                <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor" />
                <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor" />
                <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor" />
                <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor" />
                <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor" />
              </svg>{" "}
              <small className="normaltext">Forum</small>
            </Button>
          </div>
        </div>

        <Col lg="12" className="mt-3">
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <small>{epargne_info.name_epargne_association}</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="align-items-center">
                <h6><small>Adhérants ({count_members_epargne})</small></h6>
              </div>
              <div className="d-flex align-items-center" onClick={handleShow1}>
                <svg
                  width="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.87651 15.2063C6.03251 15.2063 2.74951 15.7873 2.74951 18.1153C2.74951 20.4433 6.01251 21.0453 9.87651 21.0453C13.7215 21.0453 17.0035 20.4633 17.0035 18.1363C17.0035 15.8093 13.7415 15.2063 9.87651 15.2063Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.8766 11.886C12.3996 11.886 14.4446 9.841 14.4446 7.318C14.4446 4.795 12.3996 2.75 9.8766 2.75C7.3546 2.75 5.3096 4.795 5.3096 7.318C5.3006 9.832 7.3306 11.877 9.8456 11.886H9.8766Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.2036 8.66919V12.6792"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21.2497 10.6741H17.1597"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Card.Header>

            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table id="basic-table" className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th>
                        <small>#</small>
                      </th>
                      <th>
                        <small>Membre</small>
                      </th>
                      <th>
                        <small>Rôle</small>
                      </th>
                      <th>
                        <small>Etat</small>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {membres_epargne.map((item, idmber) => (
                      <tr key={idmber}>
                        <td>
                          <div className="d-flex align-items-center">
                            <Image
                              className="theme-color-default-img rounded-pill img-fluid avatar-30"
                              src={item.avatar}
                              alt=""
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center ">
                            <small>
                              <span className="normaltext w-200">
                                {item.nom}
                              </span>
                              <br />
                              <span className="subtext">{item.prenom}</span>
                            </small>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center ">
                            <small>{item.solde_transaction} </small>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center ">
                            <small>{item.date_transaction}</small>
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

        {/*//////////////////// Modal */}

        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">
              Membres de l'association
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive">
              <Table striped id="basic-table" className=" mb-0" role="grid">
                <thead>
                  <tr>
                    <th>
                      <small>#</small>
                    </th>
                    <th>
                      <small>Nom</small>
                    </th>
                    <th>
                      <small>Prénom</small>
                    </th>
                    <th>
                      <small>Action</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {membres_associations.map((item) => (
                    <tr onClick={() => addmember(item.id)}>
                      <td></td>
                      <td className="normaltext">{item.nom}</td>
                      <td className="normaltext">{item.prenom}</td>
                      <td className="normaltext">Ajouter</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Dépôt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {showForm ? (
                  <div>
                    <Form.Label className="normaltext">
                      Choisissez un numero mobile money
                    </Form.Label>
                    <select
                      name="numero"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option></option>
                      <option value="optionn n v1">Option 1</option>
                      <option value="optionnf gnf2">Option 2</option>
                      <option value="optionf gn,f gn3">Option 3</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <Form.Label className="normaltext">
                      Mode de paiement
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="modepaiement"
                      value="Qapital"
                      onChange={handleChange}
                      disabled
                    />
                  </div>
                )}
              </Form.Group>
              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className="normaltext">Montant XAF</Form.Label>
                <Form.Control
                  type="number"
                  name="montant"
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="mb-3">
                <Link to="#" className="normaltext" onClick={customnumber}>
                  Utiliser un autre mode de paiement
                </Link>
              </div>
              <Button variant="primary" onClick={submitcotiser}>
                Confirmer
              </Button>{" "}
              <Button variant="danger" onClick={handleClose2}>
                Annuler
              </Button>
            </form>
          </Modal.Body>
        </Modal>
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Béneficiaires</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive">
              <Table id="basic-table" className=" mb-0" role="grid">
                <thead>
                  <tr>
                    <th>
                      <small>#</small>
                    </th>
                    <th>
                      <small>Membre</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {membres_epargne_receivers.map((item, idbnf) => (
                    <tr
                      key={idbnf}
                      onClick={() =>
                        clickPage(
                          "/Association/Cotisation/Send/Money/" +
                          idassociation +
                          "/" +
                          idepargne +
                          "/" +
                          item.member_cotisation +
                          "/" +
                          item.id +
                          "/" +
                          userid
                        )
                      }
                    >
                      <td>
                        <div className="d-flex align-items-center">
                          <Image
                            className="theme-color-default-img rounded-pill img-fluid avatar-30"
                            src={image1}
                            alt="qapital"
                          />
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center ">
                          <small>
                            <span className="normaltext w-200">{item.nom}</span>
                            <br />
                            <span className="subtext">{item.prenom}</span>
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <h6 className="normaltext">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </h6>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>

        <Modal show={show4} onHide={handleClose4}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Tour</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                {showForm2 ? (
                  <div>
                    <Form.Label className="normaltext">
                      Enregistrer l'intituler du tour
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="tourowner"
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <div>
                    <Form.Label className="normaltext">
                      Choisissez le bénéficiaire du tour
                    </Form.Label>
                    <select
                      name="tourowner"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option></option>
                      {membres_epargne.map((item, idmc) => (
                        <option keu={idmc} value={item.nom + " " + item.prenom}>
                          {item.nom} {item.prenom}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </Form.Group>
              <div className="mb-3">
                {showForm2 ? (
                  <Link to="#" className="normaltext" onClick={customnumber2}>
                    Choisir parmis les membres
                  </Link>
                ) : (
                  <Link to="#" className="normaltext" onClick={customnumber2}>
                    Enregistrer manuellement
                  </Link>
                )}
              </div>
              <Button variant="primary" onClick={submittour}>
                Confirmer
              </Button>{" "}
              <Button variant="danger" onClick={handleClose4}>
                Annuler
              </Button>
            </form>
          </Modal.Body>
        </Modal>


      </Row>
    </Fragment>
  );
});

export default DetailEpargneOfUsers;
