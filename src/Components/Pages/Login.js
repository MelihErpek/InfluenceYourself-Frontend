/*
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
<MdOutlineVisibility />
<MdOutlineVisibilityOff />

To-Do

Password Hide-Show Icon

*/

import React, { useState } from 'react'


import '../../App.css';
import axios from 'axios';
import { Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';
import { tada } from 'react-animations';
import Photo from "./Images/2.jpg"
import { useHistory } from "react-router-dom";
import { StyleSheet, css } from 'aphrodite';
import Tick from './Images/tick.png'


import { setInf, setLoggedIn } from "../../Redux/stores/UserInf"
import { useDispatch } from 'react-redux'

const styles = StyleSheet.create({
    bounce: {
        animationName: tada,
        animationDuration: '1s'
    }
})

export default function Login() {

    const [username, SetUsername] = useState();
    const [password, SetPassword] = useState();
    const [errorField, SetErrorField] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const goToInside = () => {
        history.push("/dashboard");
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
            <Modal.Header closeButton>
                <Modal.Title >You have been logged in succesfull.</Modal.Title>
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
                <Button onClick={() => goToInside()} variant="success">Continue</Button>
            </Modal.Footer>
        </Modal>


    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://vercelbackenddeneme.vercel.app/Login", { username, password });
            localStorage.setItem('loIn', true);
            localStorage.setItem("a-2022-t", response.data.token);
            dispatch(setInf(response.data.user))
            dispatch(setLoggedIn("true"))
            setShow(response.data.success);
            history.push("/dashboard")

        }
        catch (error) {
            SetErrorField("");
            if (error.response.data.ErrorType === "Field") {
                SetErrorField(error.response.data);
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
                            <p className="first">Log in to your account</p>
                            <Col className="second" xs={12} md={5}>
                                <p> Don't have an account yet?</p>
                            </Col>
                            <Col className="second" xs={12} md={4}>
                                <a style={{ color: 'blue', textDecoration: 'none' }} href={"/register"}> Create new account</a>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control onChange={(e) => SetUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" onChange={(e) => SetPassword(e.target.value)} />
                        </Form.Group>

                        <Error ErrorType={errorField.ErrorMessage} />
                        <Button variant="success" type="submit" className="mt-3" >
                            Log in
                        </Button>
                    </Form>

                </Col>
                <Col className="d-flex justify-content-center align-items-center " style={{ background: "linear-gradient(#FD928C, #D4D7D7,#ABD3D4)" }} xs={12} sm={4} md={5}>
                    <Image className="d-none d-lg-block" src={Photo} style={{ height: '50%', width: '50%', borderRadius: '8px' }} alt="idk.com" />
                </Col>

            </Row>
        </div >
    )
}
