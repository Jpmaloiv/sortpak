import React from 'react';
import axios from 'axios'

class Upload extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        title: '',
        description: '',
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    submitBook = (event) => {
        event.preventDefault();
        const loginToken = window.localStorage.getItem("token");
        let data = new FormData();
        data.append("bookFile", document.getElementById("pdf-file").files[0])
        //:title/:genre/:description/:userId/:price
        axios.post('/api/books/upload?title=' + this.state.title + "&description=" + this.state.description, data, { headers: { "Authorization": "Bearer " + loginToken } })
            .then((data) => {
                console.log(data);
                // window.location = '/profile';
                this.props.history.push("/profile");
            }).catch((error) => {
                console.error(error);
            })
    }

    render() {
        return (
            
                <form id="upload-form" encType="multipart/form-data">
                    <h3>Upload a Book</h3>
                    <label htmlFor="title">Title:</label>
                    <input onChange={this.onChangeHandler} name="title" id="upload-title" type="text" />
                    <br />
                    
                    <br />
                    <label htmlFor="description">Synopsis:</label>
                    <input onChange={this.onChangeHandler} name="description" id="upload-synopsis" type="text" />
                    <br />
                    <label htmlFor="bookFile">Select PDF:</label>
                    <input name="bookFile" onChange={this.onChangeHandler} accept=".pdf" id="pdf-file" type="file" />
                    <br />
                    <input onClick={this.submitBook} className="submit btn btn-default" type="submit" value="Submit" />                    
                </form>
            
        );
    }
}

export default Upload;