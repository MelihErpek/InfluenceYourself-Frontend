import React, { useEffect, useState } from 'react';
import { Row, Col, Form, Button, Stack, Image } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import axios from 'axios'

export default function Profile(props) {
    //console.log(useSelector(state => state.userInfo));
    const [data, setData] = useState();
    const [username] = useState(props.match.params.username);
    const [windowSize, setWindowSize] = useState(getWindowSize());
    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    useEffect(() => {
        axios.post("https://vercelbackenddeneme.vercel.app/Profile", { username }).then(json => setData(json.data.user));

    }, [])
    const LinkPreview = () => {
        if (data) {
            return data.Links.Links.map(({ name, link }) => {
                return (
                    <Row style={{ fontSize: 16 }}   >
                        <Col className="mt-4">
                            <Button style={{ backgroundColor: data.BGColorButton, borderColor: data.BGColorButton, marginLeft: 20 }}>
                                <a href={link} target="_blank" style={{ color: "black", textDecoration: "none" }} >{name}</a>
                            </Button>
                        </Col>
                    </Row>
                );
            })
        }


    }
    return (<div>
        {data ?
            (<div style={{ height: windowSize.innerHeight,backgroundColor: data.BGColor }}>
                <Col  >
                    <Row >
                        <Image className="mx-auto" src={data.ProfilePicture} style={{ height: '10%', width: '10%', borderRadius: '50%', marginTop: 10 }} alt="idk.com" />
                    </Row>
                    <Row className="mt-2" style={{ textAlign: 'center' }}>
                        <Col>
                            {data.NameSurname}
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }} className="mt-2">
                        <LinkPreview />
                    </Row>
                </Col>
            </div>) : (<div></div>)
        }
    </div>);
}
