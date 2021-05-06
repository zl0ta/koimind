import React from "react";
import {Button, Col, Grid, Icon, Input, InputGroup, Panel, Row} from "rsuite";

export default function Dashboard(props) {
    const styles = {
        width: 300,
        marginBottom: 10
    };

    return (
        <Panel>
            <h2>Subscribe to press releases:</h2>
            <Grid>
                <Row>
                    <Col>You Email:</Col>
                    <Col>
                        <InputGroup inside style={styles}>
                            <InputGroup.Addon>
                                <Icon icon="avatar" />
                            </InputGroup.Addon>
                            <Input />
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>Select company:</Col>
                    <Col>
                        <InputGroup inside style={styles}>
                            <InputGroup.Addon>
                            </InputGroup.Addon>
                            <Input />
                        </InputGroup>
                    </Col>
                </Row>
            </Grid>
            <Button>Subscribe</Button>
        </Panel>
    )
}
