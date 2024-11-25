import React, { useState, useEffect, memo, Fragment } from "react";
import {
  Row,
  Col,
  Button,
  Card,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";

import { Link, useNavigate, useParams } from "react-router-dom";
import AuthUser from "../../../components/authuser/AuthUser";
import { urlApi } from "../../../components/authuser/urlApp";
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
import axios from "axios";
import fileDownload from 'js-file-download';
SwiperCore.use([Navigation]);


const AssociationFiles = memo((props) => {
  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;
  const { idassociation } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [documents_association, setdocuments_association] = useState([]);
  useEffect(() => {
    fetchAlldocuments_association();
  }, []);

  const fetchAlldocuments_association = () => {
    http.get('get/documents/association/' + userid + '/' + idassociation).then(res => {
      setdocuments_association(res.data);
    })
  }




  const moveDocument = (id) => {
    const informations = {
      idmember: id,
      idassociation: idassociation,
    };
    console.log(informations)
    http.post("/move/admin/association", informations).then((res) => {

    });
  }



  const [associations_info, setassociations_info] = useState([]);
  useEffect(() => {
    fetchAllassociations_info();
  }, []);

  const fetchAllassociations_info = () => {
    http.get('get/info/association/' + userid + '/' + idassociation).then(res => {
      setassociations_info(res.data);
    })
  }

  ///




  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value, idassociation, userid }));
  };

  const [intitule, setIntitule] = useState('');
  const [imagedata, setImagedata] = useState(null);

  const handleChange2 = (e) => {
    const selectedFile = e.target.files[0];
    setImagedata(selectedFile);
  }
  const handleChangeIntitule = (e) => {
    setIntitule(e.target.value);
  }
  const submitData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (imagedata) {
      const formData = new FormData();
      formData.append("file", imagedata);
      formData.append("intitule", intitule);
      formData.append("idassociation", idassociation);

      Axios.post(`${urlApi}/set/document/association`, formData)
        .then((res) => {
          fetchAlldocuments_association();
          handleClose();
          setIsLoading(false);
        })

        .catch((e) => {
          console.error("Faillure", e);
          setIsLoading(false);
        });

    }
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


      <Row className="smarthphone">
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title d-flex align-items-center">
                <h4 className="card-title text-center normaltitle">Fichiers</h4>
              </div>

              <span className="btn btn-outline-primary  btn-icon btn-sm  align-items-center" onClick={handleShow}>
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
              <ul className="list-inline m-0 p-0">
                {documents_association.map((item, idmm) => (
                  <li className="d-flex mb-2 align-items-center" key={idmm}>
                    <div className="ms-0 flex-grow-1 d-flex align-items-center">
                      <span className="normaltext">{item.name_document}</span>
                    </div>
                    <div>
                      <Link to={item.link_document} target="_blank"> <svg width="16" className="me-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1221 15.436L12.1221 3.39502" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                          strokeLinejoin="round" />
                        <path d="M15.0381 12.5083L12.1221 15.4363L9.20609 12.5083" stroke="currentColor" strokeWidth="1.5"
                          strokeLinecap="round" strokeLinejoin="round" />
                        <path
                          d="M16.7551 8.12793H17.6881C19.7231 8.12793 21.3721 9.77693 21.3721 11.8129V16.6969C21.3721 18.7269 19.7271 20.3719 17.6971 20.3719L6.55707 20.3719C4.52207 20.3719 2.87207 18.7219 2.87207 16.6869V11.8019C2.87207 9.77293 4.51807 8.12793 6.54707 8.12793L7.48907 8.12793"
                          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg></Link>
                      <svg onClick={() => moveDocument(item.member_association)} width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.4" d="M19.643 9.48851C19.643 9.5565 19.11 16.2973 18.8056 19.1342C18.615 20.8751 17.4927 21.9311 15.8092 21.9611C14.5157 21.9901 13.2494 22.0001 12.0036 22.0001C10.6809 22.0001 9.38741 21.9901 8.13185 21.9611C6.50477 21.9221 5.38147 20.8451 5.20057 19.1342C4.88741 16.2873 4.36418 9.5565 4.35445 9.48851C4.34473 9.28351 4.41086 9.08852 4.54507 8.93053C4.67734 8.78453 4.86796 8.69653 5.06831 8.69653H18.9388C19.1382 8.69653 19.3191 8.78453 19.4621 8.93053C19.5953 9.08852 19.6624 9.28351 19.643 9.48851Z" fill="red" />
                        <path d="M21 5.97686C21 5.56588 20.6761 5.24389 20.2871 5.24389H17.3714C16.7781 5.24389 16.2627 4.8219 16.1304 4.22692L15.967 3.49795C15.7385 2.61698 14.9498 2 14.0647 2H9.93624C9.0415 2 8.26054 2.61698 8.02323 3.54595L7.87054 4.22792C7.7373 4.8219 7.22185 5.24389 6.62957 5.24389H3.71385C3.32386 5.24389 3 5.56588 3 5.97686V6.35685C3 6.75783 3.32386 7.08982 3.71385 7.08982H20.2871C20.6761 7.08982 21 6.75783 21 6.35685V5.97686Z" fill="red" />
                      </svg>
                    </div>
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>



        {/* /////////Modals */}



        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Nouveau fichier</Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Form onSubmit={submitData}>
              <Form.Group className="mb-2">
                <Form.Label>Nom du document</Form.Label>
                <input
                  className="form-control"
                  type="text"
                  onChange={handleChangeIntitule}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Choisissez un fichier</Form.Label>
                <input
                  className="form-control"
                  type="file"
                  onChange={handleChange2}
                />
              </Form.Group>




              <Button variant="info" type="submit">{isLoading ? <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              /> : "Confirmer"}</Button>{"  "}
              <Button variant="danger" onClick={handleClose}>Annuler</Button>
            </Form>
          </Modal.Body>
        </Modal >


      </Row>
    </Fragment >
  );
});

export default AssociationFiles;
