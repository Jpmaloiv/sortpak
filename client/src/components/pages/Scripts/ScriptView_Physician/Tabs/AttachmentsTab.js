import React, { Component } from 'react';
import axios from 'axios'

import Moment from 'react-moment'

// // Components
import { Button, Link, Table } from '../../../../common'

import {
  AttachmentModal,
} from '../../../../shared/'

class AttachmentsTab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateAttached: '',
      type: ''
    }
  }


  openNoteModal() {
    this.props.setState({ attachmentModal: {} })
  }

  componentDidMount() {
    const loginToken = window.localStorage.getItem("token");
    axios.get('/api/attachments/search?ScriptId=' + this.props.state.id, { headers: { "Authorization": "Bearer " + loginToken } })
      .then((resp) => {
        console.log(resp); 
        this.setState({
          attachments: resp.data.response,
        })
        console.log(this.state)
      }).catch((error) => {
        console.error(error);
      })
  }



  renderTableHead() {
    console.log(this.state);
    return (
      <thead>
        <tr>
          <th>
            File
          </th>
          <th>
            Date Attached
          </th>
          <th>
            Attached By
          </th>
          <th>
            Type
          </th>
        </tr>
      </thead>
    )
  }

  renderTableBody() {
    return (
      <tbody>
        {this.state.attachments.map(this.renderTableRow.bind(this))}
      </tbody>
    )
  }

  renderTableRow(attachment) {
    console.log(this.state.file);
    return (
      <tr key={attachment.id}>
        <td>
          <Link to={'../attachment/' + attachment.id} activeClassName="active">
            <h3>{attachment.title}</h3>
          </Link>
        </td>
        <td>
          <Moment format={"MM/DD/YYYY"}>{attachment.createdAt}</Moment>
        </td>

        <td>
          {attachment.attachedBy}
        </td>

        <td>
          {attachment.type}
        </td>
      </tr>
    )
  }

  renderTable() {
    return (
      <Table>
        {this.renderTableHead()}
        {this.renderTableBody()}
      </Table>
    )
  }

  // AWS Test
  // getSignedRequest(file){
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('GET', `/sign-s3?file-name=${file.name}&file-type=${file.type}`);
  //   xhr.onreadystatechange = () => {
  //     if(xhr.readyState === 4){
  //       if(xhr.status === 200){
  //         console.log(xhr.responseText);
  //         const xhrResponse = JSON.stringify(xhr.responseText)
  //         const response = JSON.parse(xhrResponse);
  //         this.uploadFile(file, response.signedRequest, response.url);
  //       }
  //       else{
  //         alert('Could not get signed URL.');
  //       }
  //     }
  //   };
  //   xhr.send();
  // }

  // uploadFile(file, signedRequest, url){
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', signedRequest);
  //   xhr.onreadystatechange = () => {
  //     if(xhr.readyState === 4){
  //       if(xhr.status === 200){
  //         document.getElementById('preview').src = url;
  //         document.getElementById('avatar-url').value = url;
  //       }
  //       else{
  //         alert('Could not upload file.');
  //       }
  //     }
  //   };
  //   xhr.send(file);
  // }
  // 

  render() {
    console.log(this.props);
    console.log(this.state);
    if (this.state.attachments) {
      var attachmentList = this.state.attachments.map(function (item, i) {
        console.log(item);
        return (
          <div key={i}>
          </div>
        )

      })
    }
    else {
      return <div>
        <p></p>
      </div>
    }

    console.log(this.state.attachments);

    const {
      state,
      className,
      onCloseModal,
      onCreateNote,
    } = this.props

    // const notes = patient.notes || []
    const {
      attachmentModal
    } = state


    return (
      <div className={className}>

        <Button
          icon="plus"
          title="ATTACH FILE"
          onClick={() => this.openNoteModal()}
        />

        <div className="notes">

          {this.renderTable()}
          {attachmentList}

        </div>


        <AttachmentModal
          content={attachmentModal}
          onClickAway={onCloseModal}
          onSubmit={onCreateNote}
          state={this.state}
          props={this.props}
        />

        {/* <input type="file" id="file-input" onChange={ () => {
            const files = document.getElementById('file-input').files;
            const file = files[0];
            if (file == null) {
              return alert('No file selected.');
            }
            this.getSignedRequest(file);
          }} />
        <p id="status">Please select a file</p>
        <img id="preview" src="/images/default.png" />

        <form method="POST" action="/save-details">
          <input type="hidden" id="avatar-url" name="avatar-url" value="/images/default.png" />
          <input type="text" name="username" placeholder="Username" /><br />
          <input type="text" name="full-name" placeholder="Full name" /><br /><br />
          <input type="submit" value="Update profile" />
        </form> */}

      {/* AWS Test */}
        {/* (() => {
          document.getElementById("file-input").onchange = () => {
            const files = document.getElementById('file-input').files;
            const file = files[0];
            if (file == null) {
              return alert('No file selected.');
            }
            this.getSignedRequest(file);
          }
        })(); */}

      </div>
    )
  }
}

export default AttachmentsTab;

                // import React from 'react'
                // import ReactDOM from 'react-dom'
// import {Link} from 'react-router-dom';
                    // import axios from 'axios'
                    // // import ProfileChange from '../components/ProfileChange.js'
                    // // import UserIcon from '../images/user.png'

// class Profile extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       books: null,
//       bookCount: 0,
//       username: '',
//       title: '',
//       author: '',
//       genre: '',
//       description: '',
//       profileChange: false
//     }
//   }

//   handleClick = () => {
//     this.setState({
//       profileChange: !(this.state.profileChange)
//     })
//   }

//   componentDidMount() {
//     const loginToken = window.localStorage.getItem("token");
//     // let username = (this.props.match.params.username) ? this.props.match.params.username : JSON.parse(window.atob(loginToken.split('.')[1])).username;
//     axios({
//       url: '/api/books/search',
//       method: 'get',
//       headers: { "Authorization": "Bearer " + loginToken }
//     })
//       .then((resp) => {
//         console.log(resp);
//         this.setState({
//           books: resp.data.response,
//           bookCount: resp.data.response.length,
//           username: resp.data.username
//         })


//       }).catch((error) => {
//         console.error(error);
//       })
//   }

//   openNoteModal() {
//     console.log('hello');
//     this.props.setState({ attachmentModal: {} })
//   }

//   render() {
//     const profileChange = this.state.profileChange;

//     const {
//       state,
//       className,
//       onCloseModal,
//       onCreateNote,
//     } = this.props

//     const {
//       attachmentModal
//     } = state

//     var username = this.state.username;
//     if (this.state.books) {
//       var bookList = this.state.books.map(function (item, i) {
//         console.log(item);
//         return (

//           <div key={i}>
//             <div className="story-title-author">
//               <Link to={'../book/' + item.id} activeClassName="active">
//                 <h3 className="story-title">{item.title}</h3>
//               </Link>
//               <h5 className="story-author"><span>Author: </span>{username}</h5>
//             </div>
//             {/* <h6><i>{item.genre.split(',').join(', ')}</i></h6> */}
//             <p>{item.description}</p>
//             <br />
//           </div>
//         )

//       })
//     }
//     else {
//       return <div>
//         <p>None found</p>
//       </div>
//     }
//     const loginToken = window.localStorage.getItem("token");
//     return (
//       <div>
//         <Button
//           icon="plus"
//           title="ATTACH FILE"
//           onClick={() => this.openNoteModal()}
//         />
//         <div className="text-center" id="my-profile">
//           <h2 id="my-profile-header">My Profile</h2>
//           <img style={{ width: 200, height: 200, margin: "0 auto" }} className="img-responsive text-center" src={"/assets/images/users/" + JSON.parse(window.atob(loginToken.split('.')[1])).id + "/user.png"} />
//           <h5><span>Username: </span>{this.state.username}
//             {/* {!(this.props.match.params.username) 
//                         ? <img onClick={this.handleClick} alt="change-user" id="user-change
//                         " />  
//                         : null
//                     } */}
//           </h5>
//           <h6><span>Books Published: </span>{this.state.bookCount}</h6>
//           {/* {!(this.props.match.params.username) 
//                         ? <button className="btn btn-default" onClick={this.handleClick}>Change Info</button> 
//                         : null
//                     } */}
//           {/* checking if profileChange is true and whether a url param username does not exist */}
//           {/* {(this.state.profileChange) && !(this.props.match.params.username) 
//                         ? <ProfileChange />
//                         : null
//                     } */}

//         </div>

//         <div id="profile-stories">
//           <div id="profile-stories-header">
//             <h2>Published Books</h2>
//           </div>
//           <div className="story">
//             {bookList}
//           </div>
//           <div className="story-synopsis">
//             <p></p>
//             <AttachmentModal
//               content={attachmentModal}
//               onClickAway={onCloseModal}
//               onSubmit={onCreateNote}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

// }


// export default Profile;