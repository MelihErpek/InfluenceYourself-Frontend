import React, { useState } from 'react';
import { Row, Col, Image, Form, Button } from 'react-bootstrap';
import Photo from "./Images/2.jpg"
import { useHistory } from "react-router-dom";
import axios from 'axios';

export default function SignUpLastStep() {

    const [name, SetName] = useState();
    const [birthDate, SetBirthDate] = useState();
    const [baseImage, setbaseImage] = useState();
    const [errorField, SetErrorField] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [errorName, SetErrorName] = useState("");
    const [errorBirthDate, SetErrorBirthDate] = useState("");
    const history = useHistory();

    const uploadImage = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setbaseImage(base64);
    }
    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        })
    }

    const goToLogin = () => {
        history.push("/dashboard");
    }
    const submit = async (e) => {
        e.preventDefault();
        SetErrorName("");
        SetErrorBirthDate("");
        SetErrorField("");
        const ID = localStorage.getItem("signUpID");
        try {
            const response = await axios.post("https://vercelbackenddeneme.vercel.app/RegisterLastStep", { name, birthDate, baseImage, ID });
            console.log(response);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.ErrorType === "Field") {
                SetErrorField(error.response.data);
            }
            if (error.response.data.ErrorType === "Name") {
                SetErrorName(error.response.data);
            }
            if (error.response.data.ErrorType === "BirthDate") {
                SetErrorBirthDate(error.response.data);
            }
        }
    };

    const Error = (props) => {
        const message = props.ErrorType;
        return <div className="mt-3">
            <Col style={{ color: 'red', fontSize: '15px' }}><small>{message}</small></Col>
        </div>
    }

    

    return (
        <div style={{ maxWidth: '99.35%' }}>
            <Row >
                <Col style={{ height: '92.5vh' }} className=" d-flex align-items-center justify-content-center " xs={12} sm={8} md={7}>
                    <Form className="mb-3 w-50" onSubmit={submit}>
                        <Row className="mb-3">
                            <p className="first ">Let's complete the profile</p>
                            <Col className="second" xs={12} md={5}>
                                <p>Let's complete the profile</p>
                            </Col>

                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label >Your Name</Form.Label>
                            <Form.Control onChange={(e) => SetName(e.target.value)} />
                            <Error ErrorType={errorName.ErrorMessage} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control type="date" onChange={(e) => SetBirthDate(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" onChange={(e) => uploadImage(e)} />
                        </Form.Group>
                        <Error ErrorType={errorBirthDate.ErrorMessage} />
                        <Error ErrorType={errorField.ErrorMessage} />
                        <Button variant="success" type="submit" className="mt-3" >
                            Finish
                        </Button>
                    </Form>
                </Col >
                <Col className="d-flex justify-content-center align-items-center " style={{ background: "linear-gradient(#FD928C, #D4D7D7,#ABD3D4)" }} xs={12} sm={4} md={5}>
                    <Image className="d-none d-lg-block" src={Photo} style={{ height: '50%', width: '50%', borderRadius: '8px' }} alt="idk.com" />
                </Col>

            </Row >
        </div >
    )
}
