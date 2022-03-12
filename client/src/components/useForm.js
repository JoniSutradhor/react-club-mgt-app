import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '60%',
            margin: theme.spacing(1)
        }
    }
}))

export function Form(props) {
    const classes = useStyle();
    return (
        <form className={classes.root}>
            {props.children}
        </form>
    )
}

