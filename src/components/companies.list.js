import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {IconButton, List, ListItem, ListItemText, Paper} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import axios from "axios";
import PubSub from "pubsub-js";
import {SERVER_URL} from "../services/config";

const useStyles = makeStyles({
    root: {
        minWidth: 300,
    },
    title: {
        fontSize: 14,
    },
    actions: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    paper: {
        width: 300,
        height: 400,
        overflow: 'auto',
    }
});

export default function CompaniesList(props) {
    const classes = useStyles();
    const [items, setItems] = useState([]);

    const loadListOfCompanies = () => {
        axios({
            url: `${ SERVER_URL }/api/v1/pr-companies`,
            method: 'get'
        })
            .then(
                (result) => {
                    setItems(result.data);
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    const handleClick = (company, e) => {
        props.onCompanySelectStart();
        axios({
            url: `${ SERVER_URL }/api/v1/get-parsed-press-release-by-company/${company.id}`,
            method: 'get',
        })
            .then(
                (result) => {
                    props.onCompanySelect(company, result.data.flatMap(d => d.doc.tables));
                },
                (error) => {
                    alert('Error occurred: ' + JSON.stringify(error));
                }
            )
    }

    const editCompany = (value, e) => {
        PubSub.publish('edit-company', value);
    }

    const deleteClick = (value, e) => {
        axios({
            url: `${SERVER_URL}/api/v1/pr-companies/${value.id}`,
            method: 'delete'
        })
            .then(
                (result) => {
                    const ind = items.indexOf(value);
                    const list = [...items];
                    list.splice(ind, 1);
                    setItems(list);
                    console.log(result.data, ind);
                },
                (error) => {
                    console.error(error);
                }
            )
    }

    const companyList = (items) => (
        <List>
            {items.map(item => (
                <ListItem key={item.id} role="listitem" button>
                    <IconButton aria-label="delete" className={classes.margin} onClick={(e) => deleteClick(item, e)}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    <ListItemText onClick={(e) => handleClick(item, e)}> {item.name} </ListItemText>
                    <IconButton aria-label="create" onClick={(e) => editCompany(item, e)} className={classes.margin}>
                        <CreateIcon fontSize="small" />
                    </IconButton>
                </ListItem>
            ))}
        </List>
    );

    useEffect(() => {
        PubSub.subscribe('added-company', (msg, data) => {
            loadListOfCompanies();
        });

        loadListOfCompanies();
    }, [])

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    List Of Companies
                </Typography>
                {companyList(items)}
            </CardContent>
        </Card>
    );
}
