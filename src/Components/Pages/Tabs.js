import React from 'react'
import TabLink from './TabLink';
import { useSelector } from 'react-redux'
export default function Tabs() {
    const adminTab = useSelector(state => state.userInfo).adminTab;
    if (adminTab === "LinkTab") {
        return (
            <div>
                <TabLink/>
            </div>
        )
    }
    if (adminTab === "StatTab") {
        return (
            <div>
                <div className='d-flex justify-content-center'>
                    stat tabı
                </div >
            </div>
        )
    }
    return(<div> </div>)

}
