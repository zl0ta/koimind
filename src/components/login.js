import React from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, FormControl, ControlLabel, ButtonToolbar, Button } from "rsuite";

export default function Login(props) {
    return (
        <Form layout="horizontal">
            <br></br>
            <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <FormControl name="email" type="email" />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <FormControl name="password" type="password" />
            </FormGroup>
            <FormGroup>
            <ButtonToolbar>
                <Button appearance="primary">Submit</Button>
                <Button appearance="default">
                    <Link to="/sign-up" style={{ textDecoration: 'none' }}>
                        Registration
                    </Link>
                </Button>
            </ButtonToolbar>
            </FormGroup>
        </Form>
    )
}