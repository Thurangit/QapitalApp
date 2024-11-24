import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';

// import {bindActionCreators} from "redux"
import { Container } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../../components/authuser/AuthUser'

// Circularprogressbar


const ListEpargnesOfUser = memo((props) => {
  const [toggler, setToggler] = useState(false);
  const { ref } = useParams();
  const { http, user } = AuthUser();
  const navigate = useNavigate();
  const userid = user.id;


  const [epargnes_list, setepargnes_list] = useState([]);
  useEffect(() => {
    fetchAllepargnes_list();
  }, []);

  const fetchAllepargnes_list = () => {
    http.get('get/epargnes/of/user/' + userid).then(res => {
      setepargnes_list(res.data);
    })
  }

  const click = (idepargne) => {
    navigate('/Detail/Epargnes/' + idepargne)
  }

  const NewEpargnePage = () => {
    navigate('/Epargne/List')
  }


  return (
    <Fragment>

      <Row className="pc">
        <Col lg="12">
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <div className="d-flex flex-wrap align-items-center">

                  <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                    <h4 className="me-2 h4">Mes Epargnes</h4>
                  </div>
                </div>

              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg="12">
          <Card>

            <Card.Body className="p-0">
              <div className="table-responsive mt-4">
                <Table striped id="basic-table" className=" mb-0" role="grid">
                  <thead>
                    <tr>
                      <th>Intitulé</th>
                      <th>Type</th>
                      <th>Déposé</th>
                      <th>Bénéfices</th>
                      <th>Solde</th>
                      <th>Objectif</th>
                      <th>Debut</th>
                      <th>Fin</th>
                      <th>Etat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {epargnes_list.map((item) => (
                      <tr>

                        <td onClick={() => click(item.id)}>
                          <div className="d-flex align-items-center">

                            <img
                              className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                              src={""}
                              alt="profile"
                            />
                            <h6>{item.name_elu}</h6>

                          </div>

                        </td>

                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.type_epargne_elu}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.montant_total_elu} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.benefices_elu} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.montant_total_elu + item.benefices_elu} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.objectif_elu} XAF</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.date_debut_elu}</h6>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex align-items-center mb-2">
                            <h6>{item.date_fin_elu}</h6>
                          </div>
                        </td>
                        <td>

                          {item.etat_elu === "En cours" ? (<div className="text-success">En cours</div>) : null}

                        </td>

                      </tr>
                    )

                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>





      {/* ///////////////////////////////////// Smartphone */}
      <Row className="smarthpone">

        <div className="d-flex justify-content-between align-items-center mt-3 mb-2">
          <div>
            <h3 className="normaltitle">Mes Epargnes</h3>
          </div>
          <div className="user-profile">
            <Image className="theme-color-default-img  rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
            <Image className="theme-color-purple-img rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
            <Image className="theme-color-blue-img rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
            <Image className="theme-color-green-img rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
            <Image className="theme-color-yellow-img rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
            <Image className="theme-color-pink-img rounded-pill avatar-50 img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU" alt="qapital" />
          </div>
        </div>

        <Col xs="12" className="mt-3 mb-0">
          <Card>
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between">
                <small className="d-flex align-items-center" onClick={() => NewEpargnePage()}><svg width="18" className='btn-info me-1' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor" />
                  <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor" />
                </svg>{"   "} Nouvelle Epargne</small>
                |
                <small>ABC</small>

              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col>

          <Card>

            <Card.Body>
              <ul className="list-inline m-0 p-0">
                {epargnes_list.map((item, idxs) => (
                  <li className="d-flex mb-4 align-items-center" key={idxs}>
                    <Image className="theme-color-default-img  rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <Image className="theme-color-purple-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <Image className="theme-color-blue-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <Image className="theme-color-green-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <Image className="theme-color-yellow-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <Image className="theme-color-pink-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" onClick={() => click(item.id)} />
                    <div className="ms-3 flex-grow-1" onClick={() => click(item.id)}>
                      <h6 className="normaltext">{item.name_elu} A</h6>
                      <p className="mb-0 text-info subtext" >information</p>
                    </div>
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        href="#"
                        variant=" nav-link"
                        id="notification-drop"
                        data-bs-toggle="dropdown"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g>
                            <g>
                              <circle cx="7" cy="12" r="1" fill="black" />
                              <circle cx="12" cy="12" r="1" fill="black" />
                              <circle cx="17" cy="12" r="1" fill="black" />
                            </g>
                          </g>
                        </svg>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#">
                          <svg
                            width="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="me-2"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M14.7366 2.76175H8.08455C6.00455 2.75375 4.29955 4.41075 4.25055 6.49075V17.3397C4.21555 19.3897 5.84855 21.0807 7.89955 21.1167C7.96055 21.1167 8.02255 21.1167 8.08455 21.1147H16.0726C18.1416 21.0937 19.8056 19.4087 19.8026 17.3397V8.03975L14.7366 2.76175Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M14.4741 2.75V5.659C14.4741 7.079 15.6231 8.23 17.0431 8.234H19.7971"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M14.2936 12.9141H9.39355"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>{" "}
                            <path
                              d="M11.8442 15.3639V10.4639"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <small>Duplicate</small>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="me-2"
                          >
                            <path
                              d="M13.7476 20.4428H21.0002"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12.78 3.79479C13.5557 2.86779 14.95 2.73186 15.8962 3.49173C15.9485 3.53296 17.6295 4.83879 17.6295 4.83879C18.669 5.46719 18.992 6.80311 18.3494 7.82259C18.3153 7.87718 8.81195 19.7645 8.81195 19.7645C8.49578 20.1589 8.01583 20.3918 7.50291 20.3973L3.86353 20.443L3.04353 16.9723C2.92866 16.4843 3.04353 15.9718 3.3597 15.5773L12.78 3.79479Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M11.021 6.00098L16.4732 10.1881"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <small>Rename</small>
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <svg
                            width="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="me-2"
                          >
                            <path
                              d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M20.708 6.23975H3.75"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                          <small>Delete</small>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                ))}


              </ul>
            </Card.Body>
          </Card>

        </Col>





      </Row>

    </Fragment>
  )
}
)


export default ListEpargnesOfUser
