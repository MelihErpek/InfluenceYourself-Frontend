import React, { useState } from 'react'
import '../../App.css';
import { Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';
import { tada } from 'react-animations';
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import Photo from "./Images/2.jpg"
import axios from 'axios';
import Tick from './Images/tick.png'
//import Failed from './Images/failed.png'

const styles = StyleSheet.create({
    bounce: {
        animationName: tada,
        animationDuration: '1s'
    }
})

export default function SignUp() {

    const [mail, SetMail] = useState();
    const [username, SetUsername] = useState();
    const [password, SetPassword] = useState();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const [errorMail, SetErrorMail] = useState("");
    const [errorUsername, SetErrorUsername] = useState("");
    const [errorField, SetErrorField] = useState("");
    const history = useHistory();

    const goToLogin = () => {
        history.push("/register-last-step");
    }

    const Success = () => {
        return <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header>
                <Modal.Title >You have been registered.</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <Row className="d-flex justify-content-center align-items-center mb-3" >
                    <Image className={css(styles.bounce)} src={Tick} style={{ height: '30%', width: '30%', borderRadius: '8px' }} alt="idk.com" />
                </Row>
                <Row className="d-flex justify-content-center align-items-center " >
                    You can login now.
                </Row>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center align-items-center ">
                <Button onClick={() => goToLogin()} variant="success">Continue</Button>
            </Modal.Footer>
        </Modal>


    }

    const submit = async (e) => {
        e.preventDefault();
        SetErrorMail("");
        SetErrorUsername("");
        SetErrorField("");
        try {
            const response = await axios.post("https://vercelbackenddeneme.vercel.app/Register", { mail, username, password });
            localStorage.setItem("signUpID", response.data.id);
            setShow(response.data.success);
        } catch (error) {
            console.log(error.response.data);
            if (error.response.data.length === 2) {

                SetErrorMail(error.response.data[0]);
                SetErrorUsername(error.response.data[1]);
            }
            else {
                if (error.response.data.ErrorType === "Email") {
                    SetErrorMail(error.response.data);
                }
                if (error.response.data.ErrorType === "Username") {
                    SetErrorUsername(error.response.data);
                }
                if (error.response.data.ErrorType === "Field") {
                    SetErrorField(error.response.data);
                }

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
            <Success />
            <Row >
                <Col style={{ height: '92.5vh' }} className=" d-flex align-items-center justify-content-center " xs={12} sm={8} md={7}>
                    <Form className="mb-3 w-50" onSubmit={submit}>
                        <Row className="mb-3">
                            <p className="first ">Create Account</p>
                            <Col className="second" xs={12} md={5}>
                                <p>Already have an account?</p>
                            </Col>
                            <Col className="second" xs={12} md={2}>
                                <a style={{ color: 'blue', textDecoration: 'none' }} href={"/login"}> Log in</a>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress1" >
                            <Form.Label >E-Mail</Form.Label>
                            <Form.Control onChange={(e) => SetMail(e.target.value)} type="email" />
                            <Error ErrorType={errorMail.ErrorMessage} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => SetUsername(e.target.value)} />
                            <Error ErrorType={errorUsername.ErrorMessage} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => SetPassword(e.target.value)} />
                        </Form.Group>
                        <Error ErrorType={errorField.ErrorMessage} />
                        <Button variant="success" type="submit" className="mt-3" >
                            Create Account
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
