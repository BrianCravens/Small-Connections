import { Route, Redirect } from "react-router-dom"
import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import currentUser from "../hooks/ui/useSimpleAuth"
import MemberList from '../components/member/MemberList'
import MemberDetail from '../components/member/MemberDetail'
import GroupList from '../components/group/GroupList'
import GroupDetail from '../components/group/GroupDetail'
import RequestList from '../components/requests/RequestList'
import NavBar from '../nav/NavBar'
import MessageList from '../components/message/MessageList'


const ApplicationViews = props => {
    const user = currentUser
    const [toggle, setToggle] = useState(false)
    const { isAuthenticated } = useSimpleAuth() 
    return(
        <React.Fragment>
            <NavBar toggle={toggle} setToggle={setToggle}{...props} />
            <Route
                exact path="/register" render={props => {
                    return <Register toggle={toggle} {...props} />
                }}
            />
            <Route
                exact path="/login" render={props => {
                    return <Login toggle={toggle} {...props} />
                }}
            />
            
            <Route
                exact path="/members" render={props => {
                    if(isAuthenticated){
                    return <MemberList toggle={toggle} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                    
                }}
            />
            <Route
                exact path="/members/:memberId(\d+)" render={props => {
                    if(isAuthenticated){
                    return <MemberDetail toggle={toggle}{...props} memberId={parseInt(props.match.params.memberId)} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/groups" render={props => {
                    if(isAuthenticated){
                    return <GroupList toggle={toggle} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/groups/:groupId(\d+)" render={props => {
                    if(isAuthenticated){
                    return <GroupDetail toggle={toggle} {...props} groupId={parseInt(props.match.params.groupId)} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/membergroups" render={props => {
                    if(isAuthenticated){
                    return <RequestList toggle={toggle} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/messages" render={props => {
                    if(isAuthenticated){
                    return <MessageList toggle={toggle} currentUser={user} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
            <Route
                exact path="/" render={props => {
                    if(isAuthenticated){
                    return <MessageList toggle={toggle} currentUser={user} {...props} />
                    }else{
                    return <Redirect to='login'/>}
                }}
            />
        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)