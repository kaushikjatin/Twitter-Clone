import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import { FetchUsersStart,ToggleFollowUser} from '../../redux/UserDashboard/UserDashboard.actions';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import './UsersDashboard.styles.scss';

const UsersDashboard=({users_list,FetchUsersStart,ToggleFollowUser,currentUser_id,token})=>{

    useEffect(()=>{
        if(currentUser_id!=null)
                FetchUsersStart(currentUser_id,token);
    },[FetchUsersStart,token,currentUser_id])

    return(
        <div>
            <Container className='video_container'>
                <Row className="justify-content-md-center">
                    {

                        (users_list.length===0)?(
                            <div className='no_users_statement'>
                                    No Users To Show!
                            </div>
                        )
                        :(users_list.map(user =>{
                            return <Col className='user_card_col' xl="3" xs="12"  lg="4" md="6" key={user.userName}>
                                        <Card className='card' style={{ width: '18rem' }}>
                                                <Card.Body>
                                                    {
                                                        (user.userName.length>15)?(
                                                            <Card.Text className='video_name'>{user.userName.substr(0,15)+'.....'}</Card.Text>
                                                        ):(
                                                            <Card.Text className='video_name'>{user.userName}</Card.Text>
                                                        )
                                                    }
                                                    {
                                                    (user.following==false)?(
                                                        <Button variant="primary" onClick={()=>{ToggleFollowUser(token,user.user_id,currentUser_id)}}>Follow</Button>
                                                    ):(
                                                        <Button variant="success">Following</Button>)
                                                    }
                                                </Card.Body>
                                            </Card>
                                   </Col>
                        })
                        )
                    }
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps=(state)=>({
    users_list:state.all_users.users_list,
    currentUser_id:state.user.currentUser_id,
    token:'bearer '+state.user.token
})


const mapDispatchToProps=(dispatch)=>({
    FetchUsersStart:(currentUser_id,token)=>{dispatch(FetchUsersStart(currentUser_id,token))},
    ToggleFollowUser:(token,celeb_id,currentUser_id)=>{dispatch(ToggleFollowUser(token,celeb_id,currentUser_id))}
})


export default connect(mapStateToProps,mapDispatchToProps)(UsersDashboard);