import React from 'react';
import AttachmentWindow from './Tabs/AttachmentsTab/AttachmentWindow';
import axios from 'axios';


class Attachment extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        file: ""
    }
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        axios.get('/api/scripts/attachments/search?id=' + this.props.match.params.id, { headers: { "Authorization": "Bearer " + loginToken } })
          .then((resp) => {
            console.log(resp.data.response);
            this.setState({
                file: resp.data.response[3].link
                // id: resp.data.response.id,
               
            })
            console.log(this.state.file)
          }).catch((error) => {
            console.error(error);
        })
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
        
    }
    
    
    
    render() {
        return(
            this.state.file ? 
            <AttachmentWindow 
            file={this.state.file} 
            /> : 
            <div>Couldn't Find Attachment</div>
        );
    }
}

export default Attachment;