import React, { useState, useEffect } from 'react'
import { Row, Col, Image, Form, Button, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { FaArrowRight } from "react-icons/fa";
import { FaLink } from "react-icons/fa";
import { FaChartBar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { VscSettingsGear } from "react-icons/vsc";
import TabLink from './TabLink';

/* background-color: rgb(248, 241, 241);*/
import '../../App.css';
import CounterAction from "./CounterAction"
export default function Counter() {
    const count = useSelector(state => state.counter.value)
    const isim = useSelector(state => state.counter.isim)
    const soyad = useSelector(state => state.counter.soyad)
    const info = useSelector(state => state.userInfo.userInf);

    //console.log(useSelector(state => state.userInfo))
    //console.log(useSelector(state => state));
    /*
    
    {useSelector(state => state.userInfo).loggedIn ? (<div>var</div>) : (<div>yok</div>)}
            {count}
            {isim}
            {soyad}
            {useSelector(state => state.userInfo.userInf.Email)}
            <Image src={useSelector(state => state.userInfo.userInf.ProfilePicture)} style={{ height: '10%', width: '10%', borderRadius: '100px' }} alt="idk.com" />
            <CounterAction />
    */
    /*
    <Row>
                         <Col>
                             <Image src={useSelector(state => state.userInfo.userInf.ProfilePicture)} style={{ height: '75px', width: '75px', borderRadius: '100px' }} alt="idk.com" />
                         </Col>
                         <Col>
                             <Row>
                                 <div className="AdSoyad">
                                     Melih Erpek
                                 </div>
                                 <div className="AdSoyad">
                                     Melih Erpek
                                 </div>
                             </Row>
 
                         </Col>
                     </Row>
    */

    return (
        <div>
            

        </div >
    )
}
