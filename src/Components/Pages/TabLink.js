import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Stack, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import "./Pages.css"
import { AiOutlineDelete } from "react-icons/ai";
import axios from 'axios';
export default function TabLink() {


    let [userInfo, setUserInfo] = useState();
    let [successed, setSuccessed] = useState();
    const [links, SetLinks] = useState([]);
    let [tempName, SetTempName] = useState();
    let [tempLink, SetTempLink] = useState();
    let [color, SetColor] = useState();
    let [buttonColor, SetButtonColor] = useState();
    let [error, SetError] = useState(false);
    let [nameError, SetNameError] = useState(false);
    const img = useSelector(state => (state.userInfo.userInf.ProfilePicture));
    const name = useSelector(state => (state.userInfo.userInf.NameSurname));
    const ID = useSelector(state => (state.userInfo.userInf._id));
    const UserLinks = useSelector(state => (state.userInfo.userInf.Links));
    const UserBGColor = useSelector(state => (state.userInfo.userInf.BGColor));
    const UserButtonColor = useSelector(state => (state.userInfo.userInf.BGColorButton));
    const username = useSelector(state => (state.userInfo.userInf.Username));

    useEffect(() => {
        SetButtonColor(UserButtonColor);
        SetColor(UserBGColor);
        if (UserLinks) {
            SetLinks(UserLinks.Links)
        }
    }, [UserButtonColor, UserBGColor, UserLinks])

    const submit = async (e) => {
        e.preventDefault();
    };
    const remove = (pName) => {
        SetLinks(current =>
            current.filter(employee => {
                return employee.name !== pName;

            }),
        );
    }

    const Link = () => {
        return links.map(({ name, link }) => {
            return (
                <Row style={{ fontSize: 16, marginTop: 10 }}>
                    <Col md={5}>{name}</Col>
                    <Col md={5}> {link}</Col>
                    <Col md={2}> <AiOutlineDelete onClick={() => remove(name)} style={{ cursor: "pointer" }} /></Col>

                </Row>
            );
        })

    }
    const LinkPreview = () => {
        return links.map(({ name, link }) => {
            return (
                <Row style={{ fontSize: 16 }}   >
                    <Col className="mt-1">
                        <Button style={{ backgroundColor: buttonColor, borderColor: buttonColor, marginLeft: 20 }}>
                            <a href={link} target="_blank" style={{ color: "black", textDecoration: "none" }} >{name}</a>
                        </Button>
                    </Col>
                </Row>
            );
        })

    }
    const Error = () => {
        if (error) {
            return <div className="mt-3">
                <Col style={{ color: 'red', fontSize: '15px' }}><small>Her iki alanda dolu olmalıdır.</small></Col>
            </div>
        }
        return <div></div>

    }
    const NameError = () => {
        if (nameError) {
            return <div className="mt-3">
                <Col style={{ color: 'red', fontSize: '15px' }}><small>Bu isimde bir link var.</small></Col>
            </div>
        }
        return <div></div>

    }
    let ColorPickerExample = () => {
        return (
            <div style={{ display: "flex", fontSize: 15, marginTop: 20 }}>
                <Form.Label htmlFor="exampleColorInput" className="my-auto">Choose Your Background Color</Form.Label>
                <Form.Control
                    type="color"
                    defaultValue={color}
                    title="Choose your color"
                    onBlur={(e) => SetColor(e.target.value)}
                    style={{ marginLeft: 20 }}
                />
                <Form.Label htmlFor="exampleColorInput" className="my-auto">Choose Your Button Background Color</Form.Label>
                <Form.Control
                    type="color"
                    defaultValue={buttonColor}
                    title="Choose your color"
                    onBlur={(e) => SetButtonColor(e.target.value)}
                    style={{ marginLeft: 20 }}
                />
            </div>
        );
    }


    let addLink = () => {
        if (tempName && tempLink) {
            links.map(({ name, link }) => {
                if (tempName === name) {
                    SetNameError(true);
                    console.log(",iiiiiiiiiiii", nameError)
                }
            })

        }
        else { SetError(true) }
        if (nameError === false) {
            SetLinks([...links, { name: tempName, link: tempLink }]);
            SetError(false);
        }
    }
    let saveLink = async () => {
        const response = await axios.post("https://vercelbackenddeneme.vercel.app/LinksSave", { links, color, buttonColor, ID });
        setSuccessed(response.data.success);
    }

    const Success = () => {
        if (successed) {
            return <div style={{ color: 'green', fontSize: '15px' }}>
                <Row className="d-flex justify-content-center align-items-center mt-2 " >
                    Your information has been successfully updated.
                </Row >
            </div>
        }
        else {
            return <div></div>
        }
    }

    return (
        <Row className='Link' >
            <Col md={5} >
                <Row>
                    <Col style={{ backgroundColor: '#FFE3E1', borderRadius: 30 }}  >
                        <Form onSubmit={submit}>
                            <Form.Group className="mb-3 mt-3" style={{ display: "flex", fontSize: 15 }}>
                                <Row>
                                    <Col md={1}>
                                        <Form.Label className="mt-2">Name</Form.Label>
                                    </Col>
                                    <Col md={11}>
                                        <Form.Control onChange={(e) => SetTempName(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col >
                                        <Form.Label className="mt-2">Link(https://...)</Form.Label>
                                    </Col>
                                    <Col md={11}>
                                        <Form.Control onChange={(e) => SetTempLink(e.target.value)} />
                                    </Col>
                                </Row>
                                <Stack>
                                    <Button style={{ borderRadius: 10 }} type="submit" className=" my-2 mx-auto" onClick={addLink}>Add Link</Button>
                                </Stack>
                            </Form.Group>
                            <Error />
                            <NameError />

                        </Form> 
                        <Link />
                        <ColorPickerExample />
                    </Col>
                </Row>

                <Row>
                    <Col  >
                        <Col style={{fontSize:14}}>
                            <div>Your Link :</div> <a href={"https://influenceyourself.netlify.app/p/" + username}>https://influenceyourself.netlify.app/p/{username}</a>
                        </Col>
                        <Stack>
                            <Button variant="success" style={{ borderRadius: 100 }} className="mr-0 mt-2 justify-center" onClick={saveLink}>Save Links</Button>
                        </Stack>
                        <Success />
                    </Col>
                </Row>
            </Col >
            <Col md={7} style={{ backgroundColor: color }} className="flex ">
                <Row >
                    <Image className="mx-auto" src={img} style={{ height: '15%', width: '15%', borderRadius: '50%' }} alt="idk.com" />
                </Row>
                <Row className="mt-2" style={{ textAlign: 'center' }}>
                    <Col>
                        {name}
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center' }} className="mt-2">
                    <LinkPreview />
                </Row>
            </Col>
        </Row >
    )
}
