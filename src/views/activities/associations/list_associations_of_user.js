import { useState, useEffect, memo, Fragment } from 'react'
import { Row, Col, Table, Image, Form, Button, InputGroup, FormControl, Dropdown } from 'react-bootstrap'
import { Card } from 'react-bootstrap'
import FsLightbox from 'fslightbox-react';
import CustomToggle from '../../../components/dropdowns';
// import {bindActionCreators} from "redux"

import { Link, useNavigate, useParams } from 'react-router-dom'
import AuthUser from '../../../components/authuser/AuthUser'

// Circularprogressbar
import Circularprogressbar from '../../../components/circularprogressbar'
import Progress from "../../../components/progress.js";

// img
import shap1 from "../../../assets/images/shapes/01.png";
import shap2 from "../../../assets/images/shapes/02.png";
import shap3 from "../../../assets/images/shapes/03.png";
import shap4 from "../../../assets/images/shapes/04.png";
import shap5 from "../../../assets/images/shapes/05.png";
import shap6 from "../../../assets/images/shapes/06.png";
import CountUp from "react-countup";

const ListAssociationsOfUser = memo((props) => {
   const [toggler, setToggler] = useState(false);
   const { ref } = useParams();
   const { http, user } = AuthUser();
   const navigate = useNavigate();
   const userid = user.id;


   const [associations_list, setassociations_list] = useState([]);
   useEffect(() => {
      fetchAllassociations_list();
   }, []);

   const fetchAllassociations_list = () => {
      http.get('get/associations/of/user/' + userid).then(res => {
         setassociations_list(res.data);
      })
   }

   const click = (idassociation) => {
      navigate('/Detail/Association/Of/User/' + idassociation)
   }
   const clickPage = (page) => {
      navigate(page);
   };


   return (
      <Fragment>

         <Row className="pc">
            <Col lg="12">
               <Card>
                  <Card.Body>
                     <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div className="d-flex flex-wrap align-items-center">

                           <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                              <h4 className="me-2 h4">Mes Associations</h4>
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
                                 <th>Date de création</th>
                                 <th>Etat</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {associations_list.map((item) => (
                                 <tr>

                                    <td onClick={() => click(item.id)}>
                                       <div className="d-flex align-items-center">

                                          <img
                                             className="rounded img-fluid avatar-40 me-3 bg-soft-primary"
                                             src={shap6}
                                             alt="profile"
                                          />
                                          <h6>{item.name_association}</h6>

                                       </div>

                                    </td>


                                    <td>
                                       <div className="d-flex align-items-center mb-2">
                                          <h6>{item.dayc_association}/{item.monthc_association}/{item.yearc_association}</h6>
                                       </div>
                                    </td>

                                    <td>

                                       {item.state_association === "En cours" ? (<div className="text-success">En cours</div>) : null}

                                    </td>

                                    <td>

                                       <div>
                                          <Link className="btn btn-sm btn-icon text-primary flex-end" data-bs-toggle="tooltip" title="Edit User" to="#" onClick="">
                                             <span className="btn-inner">
                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" >
                                                   <path d="M11.4925 2.78906H7.75349C4.67849 2.78906 2.75049 4.96606 2.75049 8.04806V16.3621C2.75049 19.4441 4.66949 21.6211 7.75349 21.6211H16.5775C19.6625 21.6211 21.5815 19.4441 21.5815 16.3621V12.3341" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                   <path fillRule="evenodd" clipRule="evenodd" d="M8.82812 10.921L16.3011 3.44799C17.2321 2.51799 18.7411 2.51799 19.6721 3.44799L20.8891 4.66499C21.8201 5.59599 21.8201 7.10599 20.8891 8.03599L13.3801 15.545C12.9731 15.952 12.4211 16.181 11.8451 16.181H8.09912L8.19312 12.401C8.20712 11.845 8.43412 11.315 8.82812 10.921Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                   <path d="M15.1655 4.60254L19.7315 9.16854" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                             </span>
                                          </Link>
                                          <Link className="btn btn-sm btn-icon text-danger" data-bs-toggle="tooltip" title="Delete User" to="#" >
                                             <span className="btn-inner">
                                                <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                                                   <path d="M19.3248 9.46826C19.3248 9.46826 18.7818 16.2033 18.4668 19.0403C18.3168 20.3953 17.4798 21.1893 16.1088 21.2143C13.4998 21.2613 10.8878 21.2643 8.27979 21.2093C6.96079 21.1823 6.13779 20.3783 5.99079 19.0473C5.67379 16.1853 5.13379 9.46826 5.13379 9.46826" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                   <path d="M20.708 6.23975H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                   <path d="M17.4406 6.23973C16.6556 6.23973 15.9796 5.68473 15.8256 4.91573L15.5826 3.69973C15.4326 3.13873 14.9246 2.75073 14.3456 2.75073H10.1126C9.53358 2.75073 9.02558 3.13873 8.87558 3.69973L8.63258 4.91573C8.47858 5.68473 7.80258 6.23973 7.01758 6.23973" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                </svg>
                                             </span>
                                          </Link>
                                       </div>
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
                  <h3>Mes Associations</h3>
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




            <Col xs="12" className="mt-3 mb-2">
               <Card>
                  <Card.Body>
                     <div className="d-flex align-items-center justify-content-between">
                        <small className="d-flex align-items-center"><svg width="18" className='btn-info me-1' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path opacity="0.4" d="M16.6667 2H7.33333C3.92889 2 2 3.92889 2 7.33333V16.6667C2 20.0622 3.92 22 7.33333 22H16.6667C20.0711 22 22 20.0622 22 16.6667V7.33333C22 3.92889 20.0711 2 16.6667 2Z" fill="currentColor" />
                           <path d="M15.3205 12.7083H12.7495V15.257C12.7495 15.6673 12.4139 16 12 16C11.5861 16 11.2505 15.6673 11.2505 15.257V12.7083H8.67955C8.29342 12.6687 8 12.3461 8 11.9613C8 11.5765 8.29342 11.2539 8.67955 11.2143H11.2424V8.67365C11.2824 8.29088 11.6078 8 11.996 8C12.3842 8 12.7095 8.29088 12.7495 8.67365V11.2143H15.3205C15.7066 11.2539 16 11.5765 16 11.9613C16 12.3461 15.7066 12.6687 15.3205 12.7083Z" fill="currentColor" />
                        </svg>{"   "} Nouvelle association</small>
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
                        {associations_list.map((item, idx) => (
                           <li className="d-flex mb-4 align-items-center" key="idx">
                              <Image className="theme-color-default-img  rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <Image className="theme-color-purple-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <Image className="theme-color-blue-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <Image className="theme-color-green-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <Image className="theme-color-yellow-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <Image className="theme-color-pink-img rounded-pill avatar-30" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7b3ArkB7Oocsco2nxglnEoCAupiepqWfpmQ&usqp=CAU"} alt="qapital" />
                              <div className="ms-3 flex-grow-1" onClick={() => click(item.id)}>
                                 <h6><small>{item.name_association}</small></h6>
                                 <p className="mb-0"><small><i> {item.state_association === "En cours" ? (<div className="text-success">En cours</div>) : (<div className="text-success">En cours</div>)}</i></small></p>
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
                                    <Dropdown.Item href="#" onClick={() => clickPage("/Association/About/" + item.id)}>
                                       <svg className="me-2" width="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path fillRule="evenodd" clipRule="evenodd"
                                             d="M12 2.75C17.108 2.75 21.25 6.891 21.25 12C21.25 17.108 17.108 21.25 12 21.25C6.891 21.25 2.75 17.108 2.75 12C2.75 6.891 6.891 2.75 12 2.75Z"
                                             stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M11.9951 8.2041V12.6231" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                             strokeLinejoin="round" />
                                          <path d="M11.995 15.7959H12.005" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                       </svg>
                                       <small>Informations</small>
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


export default ListAssociationsOfUser
