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
SwiperCore.use([Navigation]);
const AssociationCotisationSendMoney = memo((props) => {
  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;
  const { idassociation, idcotisation, iduser, idmember, idsender } =
    useParams();
  const [info_user, setinfo_user] = useState([]);
  useEffect(() => {
    fetchAllinfo_user();
  }, []);

  const fetchAllinfo_user = () => {
    http.get("infos/user/" + iduser).then((res) => {
      setinfo_user(res.data);
    });
  };

  const ref = 0;



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
      idcotisation: idcotisation,
    };
    http.post("/new/member/in/cotisation", informations).then((res) => {
      alert("Epargne crée!");
      //navigate('/List/classes/')
      //window.location.reload(false);
    });

    console.log(informations);
  };

  const [membres_cotisation, setmembres_cotisation] = useState([]);
  useEffect(() => {
    fetchAllmembres_cotisation();
  }, []);

  const fetchAllmembres_cotisation = () => {
    http
      .get(
        "list/membres/of/association/cotisation/" +
        userid +
        "/" +
        idassociation +
        "/" +
        idcotisation
      )
      .then((res) => {
        setmembres_cotisation(res.data);
      });
  };
  const [membres_cotisation_receivers, setmembres_cotisation_receivers] =
    useState([]);
  useEffect(() => {
    fetchAllmembres_cotisation_receivers();
  }, []);

  const fetchAllmembres_cotisation_receivers = () => {
    http
      .get(
        "list/membres/of/association/cotisation/recerivers/" +
        userid +
        "/" +
        idassociation +
        "/" +
        idcotisation
      )
      .then((res) => {
        setmembres_cotisation_receivers(res.data);
      });
  };

  const [cotisation_info, setcotisation_info] = useState([]);
  useEffect(() => {
    fetchAllcotisation_info();
  }, []);

  const fetchAllcotisation_info = () => {
    http
      .get("get/info/cotisations/" + userid + "/" + idcotisation)
      .then((res) => {
        setcotisation_info(res.data);
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
    setInputs((values) => ({ ...values, [name]: value, userid, ref }));
  };

  const submitForm = () => {
    console.log(inputs);
    http.post("/new/transaction/epargne", inputs).then((res) => {
      alert("Epargne crée!");
      //navigate('/List/classes/')
      //window.location.reload(false);
    });
  };

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
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title d-flex align-items-center">
                <h4 className="card-title text-center normaltitle">
                  Envoi d'argent
                </h4>
              </div>

              <span className=" align-items-center">
                <div className="user-profile">
                  <Image
                    className="theme-color-default-img  rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-purple-img rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-blue-img rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-green-img rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-yellow-img rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-pink-img rounded-pill avatar-30 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                </div>
              </span>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-2 mb-3">
                <div className="user-profile">
                  <Image
                    className="theme-color-default-img  rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-purple-img rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-blue-img rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-green-img rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-yellow-img rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-pink-img rounded-pill avatar-110 img-fluid"
                    src={info_user.avatar}
                    alt="profil"
                  />
                </div>
              </div>

              <div className="mb-3">
                <div className="text-center normaltext">
                  {user.nom} {user.prenom}
                </div>
              </div>

              <div>
                <form>
                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="normaltext">Montant XAF</Form.Label>
                    <Form.Control type="number" name="montant" />
                    <Form.Label className="subtext text-info">
                      Solde: XAF
                    </Form.Label>
                  </Form.Group>

                  <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label className="normaltext">
                      Code de confirmation ou mot de passe
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="code"
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button variant="primary" onClick={submitForm}>
                      Confirmer
                    </Button>
                  </div>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
});

export default AssociationCotisationSendMoney;
