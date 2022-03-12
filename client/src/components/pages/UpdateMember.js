import React, { useState, useEffect } from 'react';
import { Avatar, Paper, TextField, IconButton, Button, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, Input, colors } from '@material-ui/core';

import { Form } from '../useForm';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import UpdateMemberHeader from './UpdateMemberHeader';

// const initialMembers = {
//     memberCreated: 0,
//     memberDroped: 0,
//     memberUpdated: 0,
//     numOfCurrectMember: 0
// }

const memberCurrentDetails = {
    name: '',
    email: '',
    cell: '',
    age: 0,
    gender: '',
    profilePic: ''
}
export default function UpdateMember() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cell, setCell] = useState('');
    const [age, setAge] = useState(0);
    const [gender, setGender] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [profilePicBlob, setProfilePicBlob] = useState('');
    const [loading, setLoading] = useState(false)
    const { id } = useParams();


    // Load Member Data
    useEffect(() => {
        const getMember = async () => {
            setLoading(true);
            await fetch(`http://localhost:3001/members/${id}`)
                .then((res) => {
                    res.json()
                        .then((res) => {
                            setName(res[0].name);
                            setEmail(res[0].email);
                            setCell(res[0].cell);
                            setAge(res[0].age);
                            setGender(res[0].gender);
                            setProfilePic(res[0].profilePic);
                        })
                })
            setLoading(false);
        }
        getMember();
    }, []);
    // Load Member Data

    const updateMember = () => {
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('cell', cell);
        data.append('age', age);
        data.append('gender', gender);
        data.append('profilePic', profilePic);

        axios.post(`http://localhost:3001/members/update/${id}`, data)
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
        <>
            <Paper style={paperStyle} elevation={10}>
                <UpdateMemberHeader />
                <Form>
                    <div width="60%">
                        <div align='center'>
                            <Avatar style={avatarPhotoStyle}>
                                <label htmlFor="profilePic">
                                    <Input style={avatarInputStyle} accept="image/*" id="profilePic" type="file" name='profilePic' onChange={onImageChange} />
                                    <IconButton aria-label="upload picture" component="span">
                                        {profilePicBlob ? <img id="target" alt='' src={profilePicBlob} height={200} width={200} /> : <img id="target" alt='' src={`../${profilePic}`} height={200} width={200} />}
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
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value)
                                }}
                            />
                            <TextField
                                id='email'
                                label='Email'
                                name='email'
                                placeholder='Enter email'
                                value={email}
                                onChange={(event) => {
                                    setEmail(event.target.value)
                                }}
                            />
                            <TextField
                                id='cell'
                                label='Cell'
                                name='cell'
                                placeholder='Enter Cell'
                                value={cell}
                                onChange={(event) => {
                                    setCell(event.target.value)
                                }}
                            />
                            <TextField
                                id='age'
                                label='Age'
                                name='age'
                                placeholder='Enter age'
                                value={age}
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
                                    onClick={updateMember}
                                >
                                    Submit
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </Paper>

        </>
    );
}
