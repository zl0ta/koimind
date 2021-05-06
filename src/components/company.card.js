import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Box, CircularProgress, List, ListItem, TextField} from "@material-ui/core";
import axios from "axios";
import PubSub from "pubsub-js";
import {SERVER_URL} from "../services/config";

const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
});

export default function CompanyCard() {
    const classes = useStyles();
    const defaultCompany = {
        id: '',
        name: '',
        pressReleasesUrl: '',
        code: ''
    };
    const [company, setCompany] = useState(defaultCompany);
    const [loading, setLoading] = useState(false);

    const handleOnChange = event => {
        const { name, value } = event.target;
        setCompany({ ...company, [name]: value });
    }
    PubSub.subscribe('edit-company', (msg, data) => {
        console.log(data);
        setCompany({ ...data });
    });

    function cleanForm() {
        setCompany(defaultCompany);
    }

    function createNewCompany() {
        setLoading(true)
        let suffix = '';
        let method = 'post';
        if (!!company.id) {
            suffix = `/${ company.id }`;
            method = 'put';
        }
        axios({
            url: `${ SERVER_URL }/api/v1/pr-companies${suffix}`,
            method: method,
            data: company
        })
        .then(
            (result) => {
                setLoading(false);
                PubSub.publish('added-company', result.data);
                setCompany({
                    name: '',
                    pressReleasesUrl: '',
                    code: ''
                });
            },
            (error) => {
                setLoading(false);
                alert('Error occurred: ' + JSON.stringify(error));
            }
        )
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Add Company To Track Press Release
                </Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <List>
                        <ListItem>
                            <TextField name="name" value={company.name} onChange={handleOnChange} label="Company Name"/>
                        </ListItem>
                        <ListItem>
                            <TextField name="code" value={company.code} onChange={handleOnChange} label="Code"/>
                        </ListItem>
                        <ListItem>
                            <TextField name="pressReleasesUrl" value={company.pressReleasesUrl} onChange={handleOnChange} label="Press Releases URL"/>
                        </ListItem>
                    </List>
                    { loading && <CircularProgress disableShrink /> }
                </form>
            </CardContent>
            <CardActions className={classes.actions}>
                <Box display="flex" justifyContent="flex-end" m={1} p={1}>
                    <Button size="small" color="secondary" onClick={cleanForm}>Cancel</Button>
                    <Button size="small" color="primary" onClick={createNewCompany}>
                        { !!company.id ? 'Save' : 'Add' }
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
}
