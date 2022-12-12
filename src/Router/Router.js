import React, { useEffect, useState } from 'react'
import { BrowserRouter as Routers, Switch, Route } from "react-router-dom";
import { Col, Row } from 'react-bootstrap';
import SignUp from '../Components/Pages/SignUp'
import Login from '../Components/Pages/Login'
import TabLink from '../Components/Pages/TabLink'
import Home from '../Components/Pages/Home'
import Profile from '../Components/Pages/Profile'
import SignUpLastStep from '../Components/Pages/SignUpLastStep'
import Header from '../Components/Partial Components/Header'
import { useSelector } from 'react-redux'

export default function Router(props) {
    const loggedIn = useSelector(state => state.userInfo.loggedIn);

    const word = "/p/"

    return (
        <div>
            {loggedIn ? (
                <Row >
                    {console.log("çalışıyor evet olarak")}
                    <Routers>
                        {window.location.pathname.includes(word) ? (
                            null
                        ) : <Col md={2} >
                            <Header />
                        </Col>}


                        <Col >
                            <Switch>
                                <Route path="/" exact component={Home} />
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={SignUp} />
                                <Route path="/dashboard" component={TabLink} />
                                <Route path="/profile" component={Profile} />
                                <Route path="/register-last-step" component={SignUpLastStep} />
                                <Route path="/p/:username" component={Profile} />
                            </Switch>
                        </Col>
                    </Routers>
                </Row >) :
                (<Row >
                    {console.log("çalışıyor hayır olarak")}
                    <Routers>
                        {window.location.pathname.includes(word) ? (
                            null
                        ) : <Header />}
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={SignUp} />
                            <Route path="/dashboard" component={TabLink} />
                            <Route path="/register-last-step" component={SignUpLastStep} />
                            <Route path="/p/:username" component={Profile} />
                        </Switch>
                    </Routers>
                </Row >)

            }

        </div>


    )
}