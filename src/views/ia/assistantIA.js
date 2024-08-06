import React, {Fragment, useState}from 'react'
import FsLightbox from 'fslightbox-react';

import {Row,Col,Image,Form,Nav,Dropdown,Tab} from 'react-bootstrap'
import Card from '../../components/Card'
import {Link} from 'react-router-dom'
import ShareOffcanvas from '../../components/partials/components/shareoffcanvas'
import image1 from '../../assets/images/activities/image1.jpeg'
import image2 from '../../assets/images/activities/image2.jpeg'
import image3 from '../../assets/images/activities/image3.jpeg'
import image4 from '../../assets/images/activities/image4.jpeg'
import image5 from '../../assets/images/activities/image5.jpeg'
import image6 from '../../assets/images/activities/image6.jpeg'
import image7 from '../../assets/images/activities/image7.jpeg'


const AssistantIA =() =>{
   const [toggler, setToggler] = useState();
  return(
      <Fragment>

         <Tab.Container  defaultActiveKey="first">
            <Row>
               <Col lg="12">
                  <Card>
                        <Card.Body>
                           <div className="d-flex flex-wrap align-items-center justify-content-between">
                              <div className="d-flex flex-wrap align-items-center">

                                 <div className="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                                    <h4 className="me-2 h4">Mon Assistant</h4>
                                 </div>
                              </div>

                           </div>
                        </Card.Body>
                  </Card>
               </Col>


							 <Col lg="12" className="col-lg-12 mb-4">

										 <Card className="mb-0">
										 <div className="media-support-user-img">

										 </div>
										 <Card.Body>
										 <iframe
												 src="https://claude.ai"
												 style={{ width: '100%', height: '90vh' }}
												 frameBorder="0"
											 />
											</Card.Body>
										 </Card>

               </Col>


            </Row>
         </Tab.Container>
      </Fragment>
  )

}

export default AssistantIA;
