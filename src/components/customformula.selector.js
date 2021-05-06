import React, { useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { DataGrid } from '@material-ui/data-grid';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Box, CircularProgress, Grid, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import CustomMenu from "./custom.menu";
import SyncIcon from '@material-ui/icons/Sync';
import axios from "axios";
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

let loading = false;

export default function CustomFormulaSelector(props) {
    const classes = useStyles();
    const company = props.selectedCompany || {};
    const showLoading = !!props.showLoading;
    const [formula, setFormula] = useState('');
    const [value, setValue] = useState('');
    let rel = processTables(props.selectedTables);
    const preparedToDisplay = prepareToDisplay(props.selectedTables)


    function prepareToDisplay(tables) {
        const res = [];
        let id = 0;
        tables.forEach(t => {
            let i = 0;
            const columns = t.colTitles || [];
            const rows = (t.rowTitles || []).map((rT) => [rT, ...t.data[i++]]);
            if (rows.length > 0) {
                res.push({id: id++, columns: columns, rows: rows});
            }
        })
        console.log(res);
        return res;
    }

    function setLoading(st) {
        loading = st;
    }

    function fetchAndParsePressReleases() {
        setLoading(true);
        axios({
            url: `${ SERVER_URL }/api/v1/fetch-press-release-by-company/${company.id}`,
            method: 'post',
        })
        .then(
            (result) => {
                setLoading(false);
            },
            (error) => {
                setLoading(false);
                alert('Error occurred: ' + JSON.stringify(error));
            }
        )
    }

    function processTables(tables) {
        const r = [];
        tables.forEach(t => {
            let first = null;
            (t.colTitles || []).forEach(c => {
                if (!first) {
                    first = c.trim();
                } else {
                    r.push({group: first, column: c, table: t});
                }
            })
        });
        return r;
    }

    function selectColRowHandler(col, row) {
        setFormula(`=KOI.QuarterData("${company.code}", "${col}", "${row}")`);
        resolveValue(col, row);
    }

    function resolveValue(col, row) {
        const tables = props.selectedTables.filter(table => table.colTitles.indexOf(col) > -1);
        const findTables = tables.filter(table => table.rowTitles.indexOf(row) > -1);
        if (findTables.length > 0) {
            let res = '';
            findTables.filter(table => {
                const tInd = table.colTitles.indexOf(col);
                const rInd = table.rowTitles.indexOf(row);
                if (tInd > -1 && rInd > -1 && !!table.data[rInd][tInd]) {
                    res = table.data[rInd][tInd];
                }
            });
            return setValue(res);
        }
        return setValue('');
    }

    const CompanyToolbar = () => (
        <Box>
            <b>{company.name}</b>
            <IconButton onClick={(event) => fetchAndParsePressReleases()}>
                <SyncIcon></SyncIcon>
            </IconButton>
            { loading && <CircularProgress disableShrink /> }
        </Box>
    )

    const FormulaAutocompletes = () => (
        <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Custom Formula Wizard
            </Typography>
            { !!company.id ? <CompanyToolbar /> : null }
            <Grid container spacing={1}>
                <Grid container item>
                    <CustomMenu columnsList={rel} onSelectHandler={selectColRowHandler} />
                </Grid>
            </Grid>
            <Box>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Formula:
                </Typography>
                {formula}
            </Box>
            <br />
            <Box>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Current Value:
                </Typography>
                {value}
            </Box>
        </CardContent>
    )

    const ParsedTable = () => (
        <CardContent>
            {preparedToDisplay.map(table => (
                <table border="1px">
                    <thead>

                    <tr>
                        {table.columns.map(c => (
                            <th>{c}</th>
                            )
                        )}
                    </tr>
                    </thead>
                    <tbody>
                        {table.rows.map(r => (
                            <tr>
                                {r.map(cell => (
                                    <td>{cell}</td>
                                ))}
                            </tr>
                            )
                        )}
                    </tbody>
                </table>
                )
            )}
        </CardContent>
    )

    return (
        <Card className={classes.root}>
            { showLoading &&
                <CircularProgress />
            }
            { !showLoading &&
                <FormulaAutocompletes />
            }
            { !showLoading &&
                <ParsedTable />
            }
        </Card>
    );
}
