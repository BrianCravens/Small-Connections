import { Route, Redirect } from "react-router-dom"
import React from "react"
import { withRouter } from "react-router-dom"
import Register from "./auth/Register"
import Login from "./auth/Login"
import useSimpleAuth from "../hooks/ui/useSimpleAuth"
import MemberList from '../components/member/MemberList'
import MemberDetail from '../components/member/MemberDetail'
import GroupList from '../components/group/GroupList'
import GroupDetail from '../components/group/GroupDetail'
import RequestList from '../components/requests/RequestList'


const ApplicationViews = props => {
    
    const { isAuthenticated } = useSimpleAuth() 

    return(
        <React.Fragment>
            <Route
                exact path="/register" render={props => {
                    return <Register {...props} />
                }}
            />
            <Route
                exact path="/login" render={props => {
                    return <Login {...props} />
                }}
            />
            <Route
                exact path="/members" render={props => {
                    return <MemberList {...props} />
                }}
            />
            <Route
                exact path="/members/:memberId(\d+)" render={props => {
                    return <MemberDetail {...props} memberId={parseInt(props.match.params.memberId)} />
                }}
            />
            <Route
                exact path="/groups" render={props => {
                    return <GroupList {...props} />
                }}
            />
            <Route
                exact path="/groups/:groupId(\d+)" render={props => {
                    return <GroupDetail {...props} groupId={parseInt(props.match.params.groupId)} />
                }}
            />
            <Route
                exact path="/membergroups" render={props => {
                    return <RequestList {...props} />
                }}
            />
        </React.Fragment>
    )
}

export default withRouter(ApplicationViews)