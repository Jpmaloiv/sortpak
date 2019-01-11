import React, { Component } from 'react';

import {
    Button,
    FormModal,
    Table,
    Input,
    TextArea
} from '../../common'

var ReactDOM = require('react-dom');
var PrintTemplate = require ('react-print');


class PrintModal extends React.Component {

    render() {
        const {
            content,
            onClickAway,
        } = this.props

        return (
            <FormModal
                onClickAway={onClickAway}
                visible={!!content}
            >
                <PrintTemplate>
                    <div>
                        <h3>All markup for showing on print</h3>
                        <p>Write all of your "HTML" (really JSX) that you want to show
                  on print, in here</p>
                        <p>If you need to show different data, you could grab that data
                  via AJAX on componentWill/DidMount or pass it in as props</p>
                        <p>The CSS will hide the original content and show what is in your
                  Print Template.</p>
                    </div>
                </PrintTemplate>
            </FormModal>
        );
    }
}

export default PrintModal;
