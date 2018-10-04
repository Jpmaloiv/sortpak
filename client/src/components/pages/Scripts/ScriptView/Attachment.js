import React from 'react';
import AttachmentWindow from './Tabs/AttachmentsTab/AttachmentWindow';
import axios from 'axios';


class Attachment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            file: ""
        }
    }

    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        // axios.get('/api/scripts/attachments/search?id=' + this.props.match.params.id, { headers: { "Authorization": "Bearer " + loginToken } })
        axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer " + loginToken
            },
            url: "/api/books/search?bookId=1"
            // url: "/api/scripts/attachments/search?attachmentId=1"

        }).then((resp) => {
            console.log(resp);
            this.setState({
                file: resp.data.response[0].link
            })
            console.log(this.state.file);
            
        }).catch((err) => {
            console.error(err)
        })
    }
    
        /* if(this.props.match.params.id){
            axios({
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                url: "/api/scripts/attachments/search?id=" + this.props.match.params.id
            }).then((resp) => {
                this.setState({
                    file: resp.data.response[0].link
                })
                
            }).catch((err) => {
                console.error(err)
            })
        } */
        
    
    
    
    
    render() {
        console.log(this.state.file);
        if(this.state.file) {
        return(
            
            <AttachmentWindow 
            file={this.state.file} 
            /> 
            
        )} else {
            return (
                <div>Loading PDF</div>
            )
        }
    }
}

export default Attachment;