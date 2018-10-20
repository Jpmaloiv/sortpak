import React from 'react';
import AttachmentWindow from './Tabs/AttachmentsTab/AttachmentWindow';
import axios from 'axios';


class Attachment extends React.Component {
    
    state = {
        file: "",
        attachment: ''
    }

    
    componentDidMount() {
        const loginToken = window.localStorage.getItem("token");
        // axios.get('/api/scripts/attachments/search?id=' + this.props.match.params.id, { headers: { "Authorization": "Bearer " + loginToken } })
       /*  axios({
            method: "GET",
            headers: {
                "Authorization": "Bearer " + loginToken
            },
            // url: "/api/books/search?bookId=1"
            url: "/api/scripts/attachments/search?id=1"

        }).then((resp) => {
            console.log(resp);
            this.setState({
                file: resp.data.response[0].link
            })
            console.log(this.state.file);
            
        }).catch((err) => {
            console.error(err)
        }) */
    
    
        
            axios({
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + window.localStorage.getItem("token")
                },
                url: "/api/scripts/attachments/search?id=3"
            }).then((resp) => {
                console.log(resp);
                this.setState({
                    file: resp.data.response[0].link,
                    attachment: resp.data.response[0]
                }, () => console.log(this.state));
                
            }).catch((err) => {
                console.error(err)
            })
        }
        
    
    
    
    
    render() {
       
        return(
            this.state.file ?
            <AttachmentWindow 
            file={this.state.file} 
            /> 
            
         : 
           
                <div>Loading PDF</div>
            
        )
    }
}

export default Attachment;