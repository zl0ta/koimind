import {Grid, TextField} from "@material-ui/core";
import React, {useState} from "react";
import Autocomplete from '@material-ui/lab/Autocomplete';

let selectedCol = null;
let selectedRow = null;

export default function CustomMenu(props) {
    const rel = props.columnsList;
    const list = rel.map(c => ({ title: c.column, group: c.group }));
    const [rows, setRows] = useState([]);


    function selectCol(ev) {
        selectedCol = ev.target.innerText;
        const search = rel.filter(r => {
            return r.column.trim() === selectedCol.trim();
        });
        if (search.length > 0) {
            try {
                setRows(search[0].table.rowTitles);
            } catch (e) {
                console.error(e);
            }
        }
    }

    function selectRow(ev) {
        selectedRow = ev.target.innerText;
        props.onSelectHandler(selectedCol, selectedRow);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={3}>
                <Autocomplete
                    id="combo-box-demo"
                    options={list}
                    getOptionLabel={(option) => option.title}
                    groupBy={(option) => option.group}
                    style={{ width: 500 }}
                    onChange={selectCol}
                    renderInput={(params) => <TextField {...params} label="Column Title" variant="outlined" />}
                />
            </Grid>

            <Grid item xs={12}>
                <Autocomplete
                    id="combo-box-demo"
                    options={rows}
                    style={{ width: 500 }}
                    onChange={selectRow}
                    renderInput={(params) => <TextField {...params} label="Row Title" variant="outlined" />}
                />
            </Grid>
        </Grid>
    )
}
