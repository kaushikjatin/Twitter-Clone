import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {Container , Form , Row, Col , Button} from 'react-bootstrap/'
import {emailSignInStart} from '../../redux/user/user.actions';
import './Home.styles.scss';
import {TweetUploadStart,TweetsFetchStart} from '../../redux/user/user.actions'



const Home = ({token ,tweets_list,TweetUploadStart,TweetsFetchStart1,EmailSignInStart,token_issue_time,currentUser_id,history})=>{
    useEffect(()=>{
                if(currentUser_id!=null)
                {
                    TweetsFetchStart1(token);
                }
                else 
                {
                    history.push('/signin');
                }
        },[]);
                
        
        const [mytweet,setTweet]=useState('');

        const handleSubmit= async event=>{
            event.preventDefault();
            const hours_diff=Math.abs(new Date().getTime() - new Date(token_issue_time).getTime())/(1000 * 60 * 60);
            if(hours_diff>1){
                history.push('/signin');
            }
            else{
                TweetUploadStart(token , mytweet);
            }
        }

        const handleChange=event=>{
            const {value}=event.target;
            setTweet(value)
        }

        return(
            <Container className='home_page_container' >
                <Row>
                    <Col className='offset-md-3 offset-sm-0' md={6} sm={12}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Update your Status</Form.Label>
                                <Form.Control as="textarea" rows={3} style={{border:'2px solid black'}} onChange={handleChange} value={mytweet} required/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                       </Form>

                        <br/>

                     {
                        (tweets_list.length===0)?(
                            <div className='no_video_statement'>
                                    No Tweets To Show!
                            </div>
                        ):(
                            tweets_list.map((tweet)=>{ 
                                return <div className='tweet_styles'>
                                            <div className='tweet_body'>{tweet.content}</div>
                                            <div className='tweet_author'>by~ {tweet.userName}</div>
                                       </div>
                            })
                        )
                    }
                     


                    </Col>
                </Row>

            </Container>


        )
}

const mapStateToProps = (state)=>{
    return{
        token:'bearer '+state.user.token,
        token_issue_time:state.user.time,
        currentUser_id:state.user.currentUser_id,
        tweets_list:state.user.tweets_list
    }
}

const mapDispatchToProps=(dispatch)=>({
    TweetUploadStart:(token,mytweet)=>dispatch(TweetUploadStart(mytweet,token)),
    TweetsFetchStart1:(token)=>dispatch(TweetsFetchStart(token)),
    EmailSignInStart : (email,password,history)=>dispatch(emailSignInStart({email,password,history}))
})

export default connect(mapStateToProps,mapDispatchToProps)(Home);