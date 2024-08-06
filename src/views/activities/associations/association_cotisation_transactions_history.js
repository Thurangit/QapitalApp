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
const AssociationCotisationTransactionsHistory = memo((props) => {
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



  ///

  const [transactions_history_cotisation, settransactions_history_cotisation] = useState([]);
  useEffect(() => {
    fetchAlltransactions_history_cotisation();
  }, []);

  const fetchAlltransactions_history_cotisation = () => {
    http
      .get("get/history/transactions/cotisations/" + userid + "/" + idassociation + "/" + idcotisation)
      .then((res) => {
        settransactions_history_cotisation(res.data);

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
      <Row>
        <Col lg="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h6 className="card-title">Transactions</h6>
              </div>

            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th scope="col"><small>Destinateur</small></th>
                      <th scope="col"><small>Receveur</small></th>
                      <th className="text-center" scope="col"><small>Montant</small></th>
                      <th className="text-center" scope="col"><small>Type</small></th>
                      <th className="text-center" scope="col"><small>Etat</small></th>
                      <th className="text-center" scope="col"><small>Date</small></th>
                    </tr>
                  </thead>
                  <tbody>

                    {transactions_history_cotisation.map((item, idx) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                              src={item.ref5_association_transaction}
                            />
                            <small className="normaltext">{item.ref4_association_transaction}</small>
                          </div>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <small className="normaltext">{item.ref3_association_transaction}</small>
                          </div>
                        </td>


                        <td className="text-center normaltext"><small>{item.montant_association_transaction} XAF</small></td>
                        <td>
                          <div className="text-primary text-center normaltext"><small>{item.type_association_transaction} </small></div>
                        </td>
                        <td>
                          {item.state_association_transaction === "Accept" ? (<div className="text-success text-center normaltext">Accept</div>) : (<div className="text-danger text-center normaltext">Reject</div>)}

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
});

export default AssociationCotisationTransactionsHistory;
