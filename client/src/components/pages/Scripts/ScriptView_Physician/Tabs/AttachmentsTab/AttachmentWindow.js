// import React from 'react';
// import PDF from 'react-pdf-js';

// class AttachmentWindow extends React.Component {
//   /* constructor(props) {
//     super(props);
//   } */
//   state = {};

//   onDocumentComplete = (pages) => {
//     this.setState({ page: 1, pages });
//   }

//   onPageComplete = (page) => {
//     this.setState({ page });
//   }

//   handlePrevious = () => {
//     this.setState({ page: this.state.page - 1 });
//   }

//   handleNext = () => {
//     this.setState({ page: this.state.page + 1 });
//   }

//   renderPagination = (page, pages) => {
//     let previousButton = <li className="previous" onClick={this.handlePrevious}><i className="fa fa-arrow-left"></i> Previous</li>;
//     if (page === 1) {
//       previousButton = <li className="previous disabled"><i className="fa fa-arrow-left"></i> Previous</li>;
//     }
//     let nextButton = <li className="next" onClick={this.handleNext}>Next <i className="fa fa-arrow-right"></i></li>;
//     if (page === pages) {
//       nextButton = <li className="next disabled">Next <i className="fa fa-arrow-right"></i></li>;
//     }
//     return (
//       <nav id="prev-next">
//         <ul className="pager">
//           {previousButton}
//           {nextButton}
//         </ul>
//       </nav>
//       );
//   }


//   render() {
//     let pagination = null;
//     if (this.state.pages) {
//       pagination = this.renderPagination(this.state.page, this.state.pages);
//     }
//     return (
//       <div>
//         <PDF
//           file={this.state.file}
//           onDocumentComplete={this.onDocumentComplete}
//           onPageComplete={this.onPageComplete}
//           page={this.state.page}
//         />
//         {pagination}
//       </div>
//     )
//   }
// }

// export default AttachmentWindow;

import React from 'react';
import PDF from 'react-pdf-js';

class BookWindow extends React.Component {
  constructor(props) {
    super(props);
  }
  state = {};

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  onPageComplete = (page) => {
    this.setState({ page });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav id="prev-next">
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }


  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div style={{'text-align': 'center !important'}}>
        <PDF
          file={this.props.file}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    )
  }
}

export default BookWindow;
