import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from "rsuite";

export default function Sign_up(props) {
    return (
        <Form layout="horizontal">
            <br></br>
            <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl name="f-name" type="text" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="l-name" type="text" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" type="email" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Confirm password</ControlLabel>
                <FormControl name="conf-password" type="password" />
            </FormGroup>
            <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary">Submit</Button>
                <Button appearance="default">
                    <Link to="/login" style={{ textDecoration: 'none' }}>
                        Log in
                    </Link>
                </Button>
            </ButtonToolbar>
            </FormGroup>
        </Form>
    )
}