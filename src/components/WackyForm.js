import React, { Component } from "react";
import {Form} from "react-bootstrap";

class WackyForm extends Component{
    render() {
        return(
            <div className="container">
                <Form>
                    <span>
                        <div id="UnderForm">
                            <Form.Group className="mb-3" controlId="formBasicText">

                            </Form.Group>
                        </div>
                    </span>
                </Form>
            </div>
        )
    }
}
export default WackyForm;