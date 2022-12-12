import React from 'react'
import { Image,Row } from 'react-bootstrap';
import HomeP from './Images/home.png'
export default function Home() {
    return (
        <div className="">
            <Row className="justify-content-center">
                <Image  src={HomeP} style={{width:400,marginTop:100}} alt="idk.com" />
                <div style={{ textAlign: 'center' }}>Create and customize your bio link in minutes</div>
            </Row>
        </div>
    )
}
