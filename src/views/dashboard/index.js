import React, { useState, useEffect, memo, Fragment } from "react";
import { Row, Col, Image, Card, Table, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthUser from '../../components/authuser/AuthUser';
//circular
import { urlRoot } from "../../components/authuser/urlApp";
import Circularprogressbar from "../../components/circularprogressbar.js";

// AOS
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";



import logogift from "../../assets/images/brands/logogift.jpg";
//Count-up
import CountUp from "react-countup";

// Redux Selector / Action
import { useSelector } from "react-redux";

// Import selectors & action from setting store
import * as SettingSelector from "../../store/setting/selectors";
import Progress from "../../components/progress";

// install Swiper modules
SwiperCore.use([Navigation]);

const Index = memo((props) => {

  const { http, user } = AuthUser();
  const navigate = useNavigate();

  const userid = user.id;
  const [total_activities, settotal_activities] = useState([]);
  useEffect(() => {
    fetchAlltotal_activities();
  }, []);

  const fetchAlltotal_activities = () => {
    http.get('count/activities/of/user/' + userid).then(res => {
      settotal_activities(res.data);
    })
  }

  const [info_user, setinfo_user] = useState([]);
  useEffect(() => {
    fetchAllinfo_user();
  }, []);

  const fetchAllinfo_user = () => {
    http.get('infos/user/' + userid).then(res => {
      setinfo_user(res.data);
    })
  }


  const [last20transactions, setlast20transactions] = useState([]);
  useEffect(() => {
    fetchAlllast20transactions();
  }, []);

  const fetchAlllast20transactions = () => {
    http.get('transactions/of/user/twenty/' + userid).then(res => {
      setlast20transactions(res.data);
    })
  }


  const [contacts_count, setcontacts_count] = useState([]);
  useEffect(() => {
    fetchAllcontacts_count();
  }, []);

  const fetchAllcontacts_count = () => {
    http.get('contacts/user/count/' + userid).then(res => {
      setcontacts_count(res.data);
    })
  }

  const [invitations_count, setinvitations_count] = useState([]);
  useEffect(() => {
    fetchAllinvitations_count();
  }, []);

  const fetchAllinvitations_count = () => {
    http.get('invitations/user/count/' + userid).then(res => {
      setinvitations_count(res.data);
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

  const myacitivies = () => {
    navigate('/My/Activities/List');
  }

  const Page = (page) => {
    navigate(page);
  }
  var urlAvatar = `${urlRoot}/${info_user.avatar}`;

  return (
    <Fragment>
      <Row className="pc">
        <Col md="12" lg="12">
          <Row className="row-cols-1">
            <div className="overflow-hidden d-slider1 " data-aos="fade-up" data-aos-delay="800">
              <Swiper
                className="p-0 m-0 mb-2 list-inline "
                slidesPerView={5}
                spaceBetween={32}
                navigation={{
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }}
                breakpoints={{
                  320: { slidesPerView: 1 },
                  550: { slidesPerView: 2 },
                  991: { slidesPerView: 3 },
                  1400: { slidesPerView: 3 },
                  1500: { slidesPerView: 4 },
                  1920: { slidesPerView: 4 },
                  2040: { slidesPerView: 7 },
                  2440: { slidesPerView: 8 }
                }}

              >
                <SwiperSlide className="card card-slide" >
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        style={{ width: 60, height: 60 }}
                        value={100}
                        id="circle-progress-01"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Activités</p>
                        <h4 className="counter">
                          <CountUp start={0} end={total_activities} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-02"
                      >
                        <svg
                          className=""
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Following</p>
                        <h4 className="counter">
                          <CountUp start={20} end={158} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={70}
                        id="circle-progress-03"
                      >
                        <svg className="" width="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19,6.41L17.59,5L7,15.59V9H5V19H15V17H8.41L19,6.41Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Followers</p>
                        <h4 className="counter">
                          <CountUp start={120} end={378} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={60}
                        id="circle-progress-04"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Revenue</p>
                        <h4 className="counter">
                          $<CountUp start={212} end={742} duration={3} />K
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.primary}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={50}
                        id="circle-progress-05"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Net Income</p>
                        <h4 className="counter">
                          $<CountUp start={35} end={150} duration={3} />K
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={variableColors.info}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        Linecap="rounded"
                        strokewidth="4px"
                        value={40}
                        style={{ width: 60, height: 60 }}
                        id="circle-progress-06"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Today</p>
                        <h4 className="counter">
                          $<CountUp start={652} end={4600} duration={3} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide className=" card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={colors}
                        Linecap="rounded"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        width="60px"
                        height="60px"
                        value={30}
                        style={{ width: 60, height: 60 }}
                        id="circle-progress-07"
                      >
                        <svg
                          className=""
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">Members</p>
                        <h4 className="counter">
                          <CountUp
                            start={2}
                            end={11.2}
                            duration={3}
                            decimals={1}
                          />
                          M
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <div className="swiper-button swiper-button-next"></div>
                <div className="swiper-button swiper-button-prev"></div>
              </Swiper>
            </div>
          </Row>
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
                        <p className="mb-0">COMPTE PRINCIPAL</p>
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
                        <span className="fs-5 me-2">XAF</span>
                        <span className="fs-5 me-2">{user.solde}</span>
                      </div>
                    </div>
                    <div className="mb-2 d-flex align-items-center justify-content-between">
                      <p className="mb-0">Card holder</p>
                      <p className="mb-0">Expire Date</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                      <h6>{user.nom} {user.prenom}</h6>
                      <h6 className="ms-5">06/11</h6>
                    </div>
                  </div>
                </div>

              </div>

            </Col>



          </Row>
        </Col>
        <Col md="12" lg="6">
          <Row>
            <Col md="12" lg="12">
              <div
                className="card"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                <div className="pb-0 border-0 card-header">
                  <div className="text-center">
                    <div className="user-profile">
                      <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                      <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                      <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                      <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                      <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                      <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src="" alt="qapital" />
                    </div>
                    <div className="mt-3">
                      <h3 className="d-inline-block">{user.prenom}</h3>

                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <div className="text-center card-body d-flex justify-content-around">
                    <div>
                      <h3 className="mb-1">
                        <small>750</small>
                      </h3>
                      <p className="mb-0 text-gray">Contacts</p>
                    </div>
                    <hr className="hr-vertial" />
                    <div>
                      <h3 className="mb-1">
                        <small>750</small>
                      </h3>
                      <p className="mb-0 text-gray">New Customers</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" data-aos="fade-up" data-aos-delay="500">

              </div>
            </Col>



          </Row>
        </Col>
        <Col sm="12">
          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Dernières transactions</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th>Destinataire</th>
                      <th>Montant</th>
                      <th>Type</th>
                      <th>Etat</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {last20transactions.map((item, idx) => (
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img
                              className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                              src=""
                              alt="profile"
                            />
                            {item.ref3_transaction}
                          </div>
                        </td>

                        <td>XAF 3000</td>
                        <td>

                          <div className="text-primary">Envoi</div>
                        </td>
                        <td>
                          {item.state_transaction === "Accept" ? (<div className="text-success">Accept</div>) : (<div className="text-danger">Reject</div>)}

                        </td>
                        <td>{new Date(item.created_at).toLocaleString()}</td>
                      </tr>
                    ))}




                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>





      {/* ///////////////////////////////////// Smartphone */}
      <Row className="smarthpone">

        <div className="d-flex justify-content-between align-items-center mt-2">
          <div>
            <small className="mb-2">Solde</small>
            <h2 className="counter"><CountUp start={0} end={info_user.solde} duration={1} decimal="," formattingFn={(value) => value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} />
              {" "}XAF</h2>
            <small className="mb-2"><span className="badge rounded-pill bg-success">Verified</span></small>
          </div>
          <div className="user-profile">
            <Image className="theme-color-default-img  rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
            <Image className="theme-color-purple-img rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
            <Image className="theme-color-blue-img rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
            <Image className="theme-color-green-img rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
            <Image className="theme-color-yellow-img rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
            <Image className="theme-color-pink-img rounded-pill avatar-60 img-fluid" src={urlAvatar} alt="qapital" />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-1">


          <div className="me-1" onClick={() => Page("/Send/Money/Menu")}>
            <Button to="#" className="mt-4 btn btn-danger d-block rounded">
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M6.447 22C3.996 22 2 19.9698 2 17.4755V12.5144C2 10.0252 3.99 8 6.437 8L17.553 8C20.005 8 22 10.0302 22 12.5256V17.4846C22 19.9748 20.01 22 17.563 22H16.623H6.447Z" fill="currentColor" />
                <path d="M11.455 2.22103L8.54604 5.06682C8.24604 5.36094 8.24604 5.83427 8.54804 6.12742C8.85004 6.41959 9.33704 6.41862 9.63704 6.12547L11.23 4.56623V6.06119V14.4515C11.23 14.8654 11.575 15.2014 12 15.2014C12.426 15.2014 12.77 14.8654 12.77 14.4515V4.56623L14.363 6.12547C14.663 6.41862 15.15 6.41959 15.452 6.12742C15.603 5.98036 15.679 5.78849 15.679 5.59566C15.679 5.40477 15.603 5.21291 15.454 5.06682L12.546 2.22103C12.401 2.07981 12.205 1.99995 12 1.99995C11.796 1.99995 11.6 2.07981 11.455 2.22103Z" fill="currentColor" />
              </svg>{" "}

              <small className="normaltext">Envoyer</small></Button>
          </div>
          <div className="me-1" onClick={() => Page("/Receive/Money/Menu")}>
            <Button to="#" className="mt-4 btn btn-danger d-block rounded">
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M17.554 7.29614C20.005 7.29614 22 9.35594 22 11.8876V16.9199C22 19.4453 20.01 21.5 17.564 21.5L6.448 21.5C3.996 21.5 2 19.4412 2 16.9096V11.8773C2 9.35181 3.991 7.29614 6.438 7.29614H7.378L17.554 7.29614Z" fill="currentColor" />
                <path d="M12.5464 16.0374L15.4554 13.0695C15.7554 12.7627 15.7554 12.2691 15.4534 11.9634C15.1514 11.6587 14.6644 11.6597 14.3644 11.9654L12.7714 13.5905L12.7714 3.2821C12.7714 2.85042 12.4264 2.5 12.0004 2.5C11.5754 2.5 11.2314 2.85042 11.2314 3.2821L11.2314 13.5905L9.63742 11.9654C9.33742 11.6597 8.85043 11.6587 8.54843 11.9634C8.39743 12.1168 8.32142 12.3168 8.32142 12.518C8.32142 12.717 8.39743 12.9171 8.54643 13.0695L11.4554 16.0374C11.6004 16.1847 11.7964 16.268 12.0004 16.268C12.2054 16.268 12.4014 16.1847 12.5464 16.0374Z" fill="currentColor" />
              </svg>{" "}
              <small className="normaltext">Recevoir</small></Button>
          </div>
          <div onClick={() => Page("/Transfert/Money/Menu")}>
            <Button to="#" className="mt-4 btn btn-primary d-block rounded">
              <svg width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.8397 20.1642V6.54639" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path d="M20.9173 16.0681L16.8395 20.1648L12.7617 16.0681" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6.91102 3.83276V17.4505" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
                <path d="M2.8335 7.92894L6.91127 3.83228L10.9891 7.92894" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round" />
              </svg>{" "}

              <small className="normaltext">Transfert</small></Button>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center mt-4">

          <Col xs="6" style={{ marginRight: "2px" }}>

            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-between">
                  <div>
                    <div className="d-flex">
                      <div className="bg-primary text-white p-3 rounded">
                        <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.9488 14.54C8.49884 14.54 5.58789 15.1038 5.58789 17.2795C5.58789 19.4562 8.51765 20.0001 11.9488 20.0001C15.3988 20.0001 18.3098 19.4364 18.3098 17.2606C18.3098 15.084 15.38 14.54 11.9488 14.54Z" fill="currentColor" />
                          <path opacity="0.4" d="M11.949 12.467C14.2851 12.467 16.1583 10.5831 16.1583 8.23351C16.1583 5.88306 14.2851 4 11.949 4C9.61293 4 7.73975 5.88306 7.73975 8.23351C7.73975 10.5831 9.61293 12.467 11.949 12.467Z" fill="currentColor" />
                          <path opacity="0.4" d="M21.0881 9.21923C21.6925 6.84176 19.9205 4.70654 17.664 4.70654C17.4187 4.70654 17.1841 4.73356 16.9549 4.77949C16.9244 4.78669 16.8904 4.802 16.8725 4.82902C16.8519 4.86324 16.8671 4.90917 16.8895 4.93889C17.5673 5.89528 17.9568 7.0597 17.9568 8.30967C17.9568 9.50741 17.5996 10.6241 16.9728 11.5508C16.9083 11.6462 16.9656 11.775 17.0793 11.7948C17.2369 11.8227 17.3981 11.8371 17.5629 11.8416C19.2059 11.8849 20.6807 10.8213 21.0881 9.21923Z" fill="currentColor" />
                          <path d="M22.8094 14.817C22.5086 14.1722 21.7824 13.73 20.6783 13.513C20.1572 13.3851 18.747 13.205 17.4352 13.2293C17.4155 13.232 17.4048 13.2455 17.403 13.2545C17.4003 13.2671 17.4057 13.2887 17.4316 13.3022C18.0378 13.6039 20.3811 14.916 20.0865 17.6834C20.074 17.8032 20.1698 17.9068 20.2888 17.8888C20.8655 17.8059 22.3492 17.4853 22.8094 16.4866C23.0637 15.9589 23.0637 15.3456 22.8094 14.817Z" fill="currentColor" />
                          <path opacity="0.4" d="M7.04459 4.77973C6.81626 4.7329 6.58077 4.70679 6.33543 4.70679C4.07901 4.70679 2.30701 6.84201 2.9123 9.21947C3.31882 10.8216 4.79355 11.8851 6.43661 11.8419C6.60136 11.8374 6.76343 11.8221 6.92013 11.7951C7.03384 11.7753 7.09115 11.6465 7.02668 11.551C6.3999 10.6234 6.04263 9.50765 6.04263 8.30991C6.04263 7.05904 6.43303 5.89462 7.11085 4.93913C7.13234 4.90941 7.14845 4.86348 7.12696 4.82926C7.10906 4.80135 7.07593 4.78694 7.04459 4.77973Z" fill="currentColor" />
                          <path d="M3.32156 13.5127C2.21752 13.7297 1.49225 14.1719 1.19139 14.8167C0.936203 15.3453 0.936203 15.9586 1.19139 16.4872C1.65163 17.4851 3.13531 17.8066 3.71195 17.8885C3.83104 17.9065 3.92595 17.8038 3.91342 17.6832C3.61883 14.9167 5.9621 13.6046 6.56918 13.3029C6.59425 13.2885 6.59962 13.2677 6.59694 13.2542C6.59515 13.2452 6.5853 13.2317 6.5656 13.2299C5.25294 13.2047 3.84358 13.3848 3.32156 13.5127Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span>CONTACTS</span>
                    <div>
                      <h3 className="counter"><CountUp start={0} end={contacts_count} duration={3} decimals={0} decimal="," /></h3>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="badge bg-primary">
                      <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor" />
                        <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor" />
                      </svg>
                      <span>{invitations_count}</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs="6">

            <Card>
              <Card.Body>
                <div className="d-flex flex-column align-items-between">
                  <div>
                    <div className="d-flex" onClick={myacitivies}>
                      <div className="bg-primary text-white p-3 rounded">
                        <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path opacity="0.4" d="M16.0756 2H19.4616C20.8639 2 22.0001 3.14585 22.0001 4.55996V7.97452C22.0001 9.38864 20.8639 10.5345 19.4616 10.5345H16.0756C14.6734 10.5345 13.5371 9.38864 13.5371 7.97452V4.55996C13.5371 3.14585 14.6734 2 16.0756 2Z" fill="currentColor" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M4.53852 2H7.92449C9.32676 2 10.463 3.14585 10.463 4.55996V7.97452C10.463 9.38864 9.32676 10.5345 7.92449 10.5345H4.53852C3.13626 10.5345 2 9.38864 2 7.97452V4.55996C2 3.14585 3.13626 2 4.53852 2ZM4.53852 13.4655H7.92449C9.32676 13.4655 10.463 14.6114 10.463 16.0255V19.44C10.463 20.8532 9.32676 22 7.92449 22H4.53852C3.13626 22 2 20.8532 2 19.44V16.0255C2 14.6114 3.13626 13.4655 4.53852 13.4655ZM19.4615 13.4655H16.0755C14.6732 13.4655 13.537 14.6114 13.537 16.0255V19.44C13.537 20.8532 14.6732 22 16.0755 22H19.4615C20.8637 22 22 20.8532 22 19.44V16.0255C22 14.6114 20.8637 13.4655 19.4615 13.4655Z" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3" onClick={myacitivies}>
                    <span>MON MENU</span>
                    <div>
                      <h3 className="counter"><CountUp start={0} end={total_activities} duration={2} decimals={0} decimal="," /></h3>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="badge bg-warning">
                      <svg width="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453Z" fill="currentColor" />
                        <path opacity="0.4" d="M14.0088 19.2283C13.5088 19.1215 10.4627 19.1215 9.96275 19.2283C9.53539 19.327 9.07324 19.5566 9.07324 20.0602C9.09809 20.5406 9.37935 20.9646 9.76895 21.2335L9.76795 21.2345C10.2718 21.6273 10.8632 21.877 11.4824 21.9667C11.8123 22.012 12.1482 22.01 12.4901 21.9667C13.1083 21.877 13.6997 21.6273 14.2036 21.2345L14.2026 21.2335C14.5922 20.9646 14.8734 20.5406 14.8983 20.0602C14.8983 19.5566 14.4361 19.327 14.0088 19.2283Z" fill="currentColor" />
                      </svg>
                      <span>0</span>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>

        </div>



        <Col className="mt-1">

          <Card>
            <Card.Header className="d-flex justify-content-between">
              <div className="header-title">
                <h6 className="card-title">Récentes transactions</h6>
              </div>
              <svg width="18" onClick={() => Page("/History")} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M16.191 2H7.81C4.77 2 3 3.78 3 6.83V17.16C3 20.26 4.77 22 7.81 22H16.191C19.28 22 21 20.26 21 17.16V6.83C21 3.78 19.28 2 16.191 2Z" fill="currentColor" />
                <path fillRule="evenodd" clipRule="evenodd" d="M8.07996 6.6499V6.6599C7.64896 6.6599 7.29996 7.0099 7.29996 7.4399C7.29996 7.8699 7.64896 8.2199 8.07996 8.2199H11.069C11.5 8.2199 11.85 7.8699 11.85 7.4289C11.85 6.9999 11.5 6.6499 11.069 6.6499H8.07996ZM15.92 12.7399H8.07996C7.64896 12.7399 7.29996 12.3899 7.29996 11.9599C7.29996 11.5299 7.64896 11.1789 8.07996 11.1789H15.92C16.35 11.1789 16.7 11.5299 16.7 11.9599C16.7 12.3899 16.35 12.7399 15.92 12.7399ZM15.92 17.3099H8.07996C7.77996 17.3499 7.48996 17.1999 7.32996 16.9499C7.16996 16.6899 7.16996 16.3599 7.32996 16.1099C7.48996 15.8499 7.77996 15.7099 8.07996 15.7399H15.92C16.319 15.7799 16.62 16.1199 16.62 16.5299C16.62 16.9289 16.319 17.2699 15.92 17.3099Z" fill="currentColor" />
              </svg>
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

                    {last20transactions.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          {item.motif_transaction === "Gift" ?
                            <div className="d-flex align-items-center" onClick={() => Page("/Gift/Open/" + item.ref_transaction + "/" + item.idsender_transaction + "/" + item.idreceiver_transaction)}>

                              <img
                                className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                                src={logogift}
                                alt="profile"
                              />
                              <small className="normaltext">{item.ref3_transaction}</small>
                            </div>
                            :
                            <div className="d-flex align-items-center">
                              <img
                                className="rounded img-fluid avatar-30 me-3 bg-soft-primary"
                                src="https://img.freepik.com/premium-photo/flight-attendant-digital-avatar-generative-ai_934475-9234.jpg"
                                alt="profile"
                              />
                              <small className="normaltext">{item.ref3_transaction}</small>
                            </div>}
                        </td>

                        <td className="text-center normaltext"><small>3000 XAF</small></td>
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

export default Index
