import React,{useState} from 'react';
import { connect } from 'react-redux';
import { emailSignUpStart } from '../../redux/user/user.actions';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './SignUp.styles.scss'
import AlertMessage from '../Alert/Alert.component';
import {setSignUpPageAlert} from '../../redux/Alerts/Alert.Actions'



const SignUp = ({emailSignUpStart,history,alertInfo})=>{
    const [credentials,setCredentials]=useState({email:'',password:'',firstName:'',lastName:'',userName:''})
    const {email,password,firstName,lastName,userName}=credentials;
    const handleSubmit= async event=>{
        event.preventDefault();
        emailSignUpStart({email,password,firstName,lastName,userName,history})
    }

    const handleChange=event=>{
        const {value,name}=event.target;
        setCredentials({...credentials,[name]:value})
    }
  

    return(
    <div>
        <AlertMessage setAlertInfo={setSignUpPageAlert} alertInfo={alertInfo}></AlertMessage>
        
        <div className='signup_form'>

            <div className='signup_message'>
                    Register 
                    <div className='additional_message'>
                        Join the community and tweet smoothly!
                    </div>
            </div>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="string" placeholder="First Name" name="firstName" onChange={handleChange} key='firstName'  value={firstName} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="string" placeholder="Last Name" name="lastName" onChange={handleChange} key='lastName' value={lastName} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Email" name="email" key='email' onChange={handleChange}  value={email} required/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="string" placeholder="UserName" name="userName" key='userName' onChange={handleChange}  value={userName} required/>
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password"  key='password' onChange={handleChange}  value={password} required/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>

        </div>

    </div>
    )
}

const mapStateToProps=(state)=>({
    alertInfo:state.alert.signUpPageInfo
})

const mapDispatchToProps=(dispatch)=>({
    emailSignUpStart:(payload)=>{dispatch(emailSignUpStart(payload))}
})

export default connect(mapStateToProps,mapDispatchToProps)(SignUp)