import React, {useState, useEffect} from 'react'
import dataManager from '../../modules/dataManager'


const MemberDetail = props => {
    
    const [member, setMember] = useState({user:{}})

    const getMember = () => {
        dataManager.get("members", props.memberId)
        .then((response) => {
            setMember(response)
        })
    }

    useEffect(() => {
        getMember();
    }, [])

    return(
        <>
            <div className="member-details">
                <div className="member-picture-container">
                    <img className="member-picture" alt="Member"  src={member.image}/>
                </div>
                <div className="member-info">
                        <h1>{member.user.first_name} {member.user.last_name}</h1>
                        <h3>{member.address}</h3>
                        <h3>{member.phone}</h3>
                        <h3>{member.user.email}</h3>
                        <h3>{member.birthday}</h3>
                </div>
            </div>
        </>
    )
}

export default MemberDetail