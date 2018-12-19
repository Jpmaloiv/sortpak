
import React from 'react';
import BookWindow from './Tabs/AttachmentsTab/AttachmentWindow';
import axios from 'axios';


class Book extends React.Component {
    // constructor(props) {
    //     super(props)
    // }

    state = {
        file: "",
        attachment: ''
    }
    componentDidMount() {

        const loginToken = window.localStorage.getItem("token");
        if (this.props.match.params.paymentId) {
            axios.get('/api/scripts/payments/search?id=' + this.props.match.params.paymentId, { headers: { "Authorization": "Bearer " + loginToken } })
                .then((resp) => {
                    console.log(resp);
                    this.setState({
                        file: `https://s3-us-west-1.amazonaws.com/sortpaktesting/receipts/` + resp.data.response[0].receiptLink,
                        attachment: resp.data.response[0]
                    }, () => console.log(this.state.file));


                }).catch((err) => {
                    console.error(err)
                })
        }

    }



    render() {
        return (
            this.state.file ?
                <BookWindow
                    file={this.state.file}
                /> :
                <div>File Not Found</div>

        );
    }
}

export default Book;