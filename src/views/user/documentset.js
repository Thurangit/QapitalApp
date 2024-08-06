import React, { Fragment, useEffect, useState } from 'react'


import { Row, Col, Image, Form, Tab, Button, InputGroup, Spinner } from 'react-bootstrap'
import Card from '../../components/Card'

import { useParams } from 'react-router-dom'
import AuthUser from '../../components/authuser/AuthUser';
import Axios from 'axios';

const Documentset = () => {
  const { user, http } = AuthUser();
  const { document } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const userid = user.id

  const [info_user, setinfo_user] = useState([]);
  useEffect(() => {
    fetchAllinfo_user();
  }, []);

  const fetchAllinfo_user = () => {
    http.get('infos/user/' + userid).then(res => {
      setinfo_user(res.data);
    })
  }

  const [imagedata, setImagedata] = useState(null);
  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setImagedata(selectedFile);
  };

  const [imagedata1, setImagedata1] = useState(null);
  const handleChange1 = (e) => {
    const selectedFile1 = e.target.files[0];
    setImagedata1(selectedFile1);
  };

  const submitData = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (imagedata) {
      formData.append("file", imagedata);
    }
    if (imagedata1) {
      formData.append("file1", imagedata1);
    }

    Axios.post("http://192.168.44.44:8000/api/set/documents/" + document + "/" + userid, formData)
      .then((res) => {

        fetchAllinfo_user();
        setIsLoading(false);
      })
      .catch((e) => {

      });
  };



  return (
    <Fragment>

      <Tab.Container defaultActiveKey="first">
        <Row>

          <Col xs="12">

            <Card>
              <Card.Header className="d-flex justify-content-between">
                <div className="header-title d-flex align-items-center">
                  <h4 className="card-title text-center normaltitle">Informations Personnelles</h4>
                </div>
              </Card.Header>

              <Card.Body>
                <div className="d-flex justify-content-center mt-2 mb-4">
                  <div className="user-profile">
                    <Image className="theme-color-default-img  rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                    <Image className="theme-color-purple-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                    <Image className="theme-color-blue-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                    <Image className="theme-color-green-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                    <Image className="theme-color-yellow-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                    <Image className="theme-color-pink-img rounded-pill avatar-130 img-fluid" src={info_user.avatar} alt="profil" />
                  </div>
                </div>

                <div className="mt-3">
                  <Form onSubmit={submitData}>
                    <h6>Recto</h6>
                    <InputGroup className=" mb-3">
                      <Form.Control type="file" onChange={handleChange} />
                    </InputGroup>

                    <h6>Verso</h6>

                    <InputGroup className=" mb-3">

                      <Form.Control type="file" onChange={handleChange1} />

                    </InputGroup>

                    <Button variant="info" type="submit" disabled={isLoading}>{isLoading ? <Spinner
                      as="span"
                      animation="grow"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    /> : "Envoyer"}</Button>{"  "}
                  </Form>

                </div>


              </Card.Body>
            </Card>

          </Col>

        </Row>
      </Tab.Container>
    </Fragment>
  )

}

export default Documentset;