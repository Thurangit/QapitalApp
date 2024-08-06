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
  InputGroup,
  Spinner,
} from "react-bootstrap";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/authuser/AuthUser";



// AOS
import AOS from "aos";
import "aos";
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
import Axios from "axios";
SwiperCore.use([Navigation]);


const CotisationAPropos = memo((props) => {
  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;
  const { idcotisation } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value, userid, idcotisation }));
  };




  const [imagedata, setImagedata] = useState(null);

  const handleChange2 = (e) => {
    const selectedFile = e.target.files[0];
    setImagedata(selectedFile);
  }
  const submitData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (imagedata) {
      const formData = new FormData();
      formData.append("file", imagedata);

      Axios.post("http://192.168.44.44:8000/api/cotisation/logo/" + idcotisation, formData)
        .then((res) => {
          setIsLoading(false);
          fetchAllcotisation_info();
          handleClose2()
          setIsLoading(false);
        })
        .catch((e) => {
          console.error("Faillure", e);
          handleClose2()
          setIsLoading(false);
        });
    }
    fetchAllcotisation_info();

  };






  const [count_members_cotisation, setcount_members_cotisation] = useState([]);
  useEffect(() => {
    fetchAllcount_members_cotisation();
  }, []);

  const fetchAllcount_members_cotisation = () => {
    http
      .get("count/members/cotisation/" + userid + "/" + idcotisation)
      .then((res) => {
        setcount_members_cotisation(res.data);
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
        setInputs({
          nom: res.data.name_cotisation,
          description: res.data.desc_cotisation,
        });
      });
  };


  ///

  const submitForm = () => {
    setIsLoading(true);
    http.post("/update/info/cotisation", inputs).then((res) => {
      fetchAllcotisation_info();
      handleClose1()
      setIsLoading(false);
    });
  };





  const [info_user, setinfo_user] = useState([]);
  useEffect(() => {
    fetchAllinfo_user();
  }, []);

  const fetchAllinfo_user = () => {
    http.get('infos/user/' + cotisation_info.createby_cotisation).then(res => {
      setinfo_user(res.data);
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
      <Row>
        <Col lg="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title d-flex align-items-center">
                <h4 className="card-title text-center normaltitle">
                  Informations
                </h4>
              </div>
              <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow1}>
                <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                  <path fillRule="evenodd" clipRule="evenodd"
                    d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>

              </span>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-center mt-2 mb-3">
                <div className="user-profile" onClick={handleShow2}>
                  <Image
                    className="theme-color-default-img  rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-purple-img rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-blue-img rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-green-img rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-yellow-img rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <Image
                    className="theme-color-pink-img rounded-pill avatar-110 img-fluid"
                    src={cotisation_info.image_cotisation}
                    alt="profil"
                  />
                  <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.7476 20.4428H21.0002" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd"
                      d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.021 6.00098L16.4732 10.1881" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                      strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              <div className="mt-2">
                <div className="mb-1 normaltext">Nom: <Link className="ms-3">{cotisation_info.name_cotisation}</Link></div>
                <div className="mb-1 normaltext">Fondateur: <Link className="ms-3">{info_user.nom} {info_user.prenom}</Link></div>
                <div className="mb-1 normaltext">Nombre de membres: <Link className="ms-3">{count_members_cotisation}</Link></div>
                <div className="mb-1 normaltext">Date de création: <Link className="ms-3">{new Date(cotisation_info.created_at).toLocaleString()}</Link></div>
                <div className="mb-1 normaltext">Description: <p className="ms-3">{cotisation_info.desc_cotisation}</p></div>
              </div>
            </Card.Body>
          </Card>
        </Col>



        {/* /////////Modals */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Membres</Modal.Title>
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
                    <th>
                      <small>Choisir</small>
                    </th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </Table>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Informations</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="normaltext">Nom</Form.Label>
              <InputGroup className=" mb-3">
                <Form.Control type="text" name="nom" value={inputs.nom} onChange={handleChange} />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="normaltext">Description</Form.Label>
              <InputGroup className=" mb-3">
                <textarea className="form-control" name="description" onChange={handleChange}>{inputs.description}</textarea>
              </InputGroup>
            </Form.Group>
            <Button variant="info" onClick={submitForm} type="submit" disabled={isLoading}>{isLoading ? <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : "Confirmer"}</Button>{"  "}
            <Button variant="danger" onClick={handleClose1}>Annuler</Button>

          </Modal.Body>
        </Modal>




        <Modal show={show2} onHide={handleClose2}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Modifier</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form onSubmit={submitData}>
              <Form.Group className="mb-3">
                <Form.Label>Choisissez la photo</Form.Label>
                <input
                  className="form-control"
                  type="file"
                  onChange={handleChange2}
                />
              </Form.Group>

              <Button variant="info" type="submit" disabled={isLoading}>{isLoading ? <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : "Confirmer"}</Button>{"  "}
              <Button variant="danger" onClick={handleClose2} >Annuler</Button>
            </Form>
          </Modal.Body>
        </Modal >

      </Row>
    </Fragment>
  );
});

export default CotisationAPropos;
