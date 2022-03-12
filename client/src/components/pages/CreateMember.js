import React, { useState } from 'react';
import { Avatar, TextField, IconButton, Paper, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Input, colors } from '@material-ui/core';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import { createMember } from '../../redux';
import { connect, useDispatch } from 'react-redux';
import Header from './Header';

import { Form } from '../useForm';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initialMembers = {
    memberCreated: 0,
    memberDroped: 0,
    memberUpdated: 0,
    numOfCurrectMember: 0
}
export const CreateMember = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setcell] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [profilePicBlob, setProfilePicBlob] = useState('');
    // const dispatch = useDispatch()

    const addMember = () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('cell', cell);
        data.append('age', age);
        data.append('gender', gender);
        data.append('profilePic', profilePic);

        axios.post('http://localhost:3001/members/create', data)
        props.createMember()
    }

    //Set image on image select
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setProfilePicBlob(URL.createObjectURL(event.target.files[0]));
            setProfilePic(event.target.files[0]);
        }
    }

    const buttonStyle = { width: '60%', margin: '0 10px' }
    const avatarPhotoStyle = { backgroundColor: colors.amber, color: 'white', height: '150px', width: '150px', margin: '20px' }
    const avatarInputStyle = { visibility: 'hidden' }
    const paperStyle = { padding: 20, height: 'auto', width: '90%', margin: '20px auto' }
    return (
        <Paper style={paperStyle} elevation={10}>
            <Header />
            <Form>
                <div width="60%">
                    <div align='center'>
                        <Avatar style={avatarPhotoStyle}>
                            <label htmlFor="profilePic">
                                <Input style={avatarInputStyle} accept="image/*" id="profilePic" type="file" name='profilePic' onChange={onImageChange} />
                                <IconButton aria-label="upload picture" component="span">
                                    {profilePicBlob ? <img id="target" alt='' src={profilePicBlob} height={200} width={200} /> : <AddAPhotoOutlinedIcon />}
                                </IconButton>
                            </label>
                        </Avatar>
                    </div>

                    <div align='center'>
                        <TextField
                            id='name'
                            name='fullName'
                            label='Full Name'
                            type='text'
                            placeholder='Enter full name'
                            onChange={(event) => {
                                setName(event.target.value)
                            }}
                        />
                        <TextField
                            id='email'
                            label='Email'
                            name='email'
                            placeholder='Enter email'
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                        <TextField
                            id='cell'
                            label='Cell'
                            name='cell'
                            placeholder='Enter Cell'
                            onChange={(event) => {
                                setcell(event.target.value)
                            }}
                        />
                        <TextField
                            id='age'
                            label='Age'
                            name='age'
                            placeholder='Enter age'
                            onChange={(event) => {
                                setAge(event.target.value)
                            }}
                        />

                        <FormControl>
                            <FormLabel align='left'>Gender</FormLabel>
                            <RadioGroup row
                                onChange={(event) => {
                                    setGender(event.target.value)
                                }}
                                id="gender"
                                value={gender}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        <Link to='/'>
                            <Button
                                color='default'
                                type='button'
                                style={buttonStyle}
                                onClick={addMember}
                            >
                                Submit
                            </Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </Paper>

    )
}

const mapStateToProps = state => {
    return {
        totalMember: state.totalMember
    }
}

export const mapDispatchToProps = dispatch => {
    return {
        createMember: () => dispatch(createMember())
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateMember)
