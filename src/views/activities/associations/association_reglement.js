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
SwiperCore.use([Navigation]);


const AssociationReglement = memo((props) => {
  const { http, user } = AuthUser();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const userid = user.id;
  const { idassociation } = useParams();
  const [info_user, setinfo_user] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchAllinfo_user();
  }, []);

  const fetchAllinfo_user = () => {
    http.get("infos/user/" + userid).then((res) => {
      setinfo_user(res.data);
    });
  };



  const [admins_association, setadmins_association] = useState([]);
  useEffect(() => {
    fetchAlladmins_association();
  }, []);

  const fetchAlladmins_association = () => {
    http.get('get/admins/association/' + userid + '/' + idassociation).then(res => {
      setadmins_association(res.data);
    })
  }






  const [data, setData] = useState([]);
  const handleChange3 = (event, editor) => {
    setData(editor.getData());
  }


  let inputs = { 'data': data, 'idassociation': idassociation };

  const [associations_info, setassociations_info] = useState([]);
  useEffect(() => {
    fetchAllassociations_info();
  }, []);

  const fetchAllassociations_info = () => {
    http.get('get/info/association/' + userid + '/' + idassociation).then(res => {
      setassociations_info(res.data)

    })
  }

  ///





  const submitForm = () => {
    setIsLoading(true);
    http.post("/update/reglement/association", inputs).then((res) => {
      fetchAllassociations_info();
      handleClose();
      setIsLoading(false);
    });
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
                <h4 className="card-title text-center normaltitle">Règlement</h4>
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
              <div dangerouslySetInnerHTML={{ __html: associations_info.reglement_association }} />
            </Card.Body>
          </Card>
        </Col>



        {/* /////////Modals */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title className="normaltitle">Ecrire le reglèment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CKEditor
              editor={ClassicEditor}

              data={associations_info.reglement_association}
              onReady={(editor) => {
              }}
              onChange={(event, editor) => {
                handleChange3(event, editor);
              }}
            />

            <Button variant="info" type="submit" onClick={submitForm} disabled={isLoading}>{isLoading ? <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            /> : "Confirmer"}</Button>{"  "}
            <Button variant="danger" onClick={handleClose} >Annuler</Button>
          </Modal.Body>
        </Modal>

      </Row>
    </Fragment>
  );
});

export default AssociationReglement;
