import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

export default function Header() {
    const avatarStyle = { backgroundColor: '#00806c' }

    return (
        <Grid align='center'>
            <Avatar style={avatarStyle}>
                <PersonAddOutlinedIcon />
            </Avatar>
            <h2>Add Members</h2>
            <hr />

        </Grid>
    )
}
