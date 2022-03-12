import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import PhotoCameraBackOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

export default function UpdateMemberHeader() {
    const avatarStyle = { backgroundColor: '#00806c' }

    return (
        <Grid align='center'>
            <Avatar style={avatarStyle}>
                <PhotoCameraBackOutlinedIcon />
            </Avatar>
            <h2>Update Members</h2>
            <hr />

        </Grid>
    )
}
