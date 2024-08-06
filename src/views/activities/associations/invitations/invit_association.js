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
import AuthUser from "../../../../components/authuser/AuthUser";

// AOS
import AOS from "aos";
import "../../../../../node_modules/aos/dist/aos";
import "../../../../../node_modules/aos/dist/aos.css";

import SwiperCore, { Navigation } from "swiper";

// Import Swiper styles

// import 'swiper/components/navigation/navigation.scss';

// Redux Selector / Action
import { useSelector } from "react-redux";
// Import selectors & action from setting store
import * as SettingSelector from "../../../../store/setting/selectors";
// install Swiper modules

import image1 from "../../../../assets/images/activities/image1.jpeg";
SwiperCore.use([Navigation]);
const InvitationAssociation = memo((props) => {
  const { http } = AuthUser();
  const navigate = useNavigate();

  const { name_association, idassociation, addby } = useParams();

  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
      idassociation,
      addby,
    }));
  };

  const registermember = () => {
    console.log(inputs);
    http.post("/link/member/association", inputs).then((res) => {

      if (res.data = "Authorized") {
        navigate("/");
      }
      if (res.data = "Unauthorized") {

      }

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
    <div>
      Invitation
      <form>
        <Form.Group className="mb-2">
          <Form.Label className="normaltext">Montant XAF</Form.Label>
          <Form.Control
            type="text"
            name="identifiant"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label className="normaltext">Montant XAF</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={registermember}>
          Confirmer
        </Button>{" "}
        <Button variant="danger" onClick="">
          Annuler
        </Button>
      </form>
    </div>
  );
});

export default InvitationAssociation;
