import React from 'react';
import { MDBBtn, MDBRow, MDBCol, MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter,  MDBTooltip , MDBContainer} from "mdbreact";

class CommentForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
    
          comment: {
            name: "",
            message: ""
          },
          error:false,
          commentsList:null     
        };
        this.handleFieldChange = this.handleFieldChange.bind(this);
      }

     
    
      
      handleFieldChange = event => {
          
        const { value, id } = event.target;
    
        this.setState({
          ...this.state,
          comment: {
            ...this.state.comment,
            [id]: value
          }
        });
    };

    isFormValid() {
        return this.state.comment.name !== "" && this.state.comment.message !== "";
      }

    CreateComment = () => {
        
        if (!this.isFormValid()) {
            this.setState({ error: true });
            return;
          }
        const updateURL =  `https://firestore.googleapis.com/v1/projects/alo-talabati/databases/(default)/documents/comment`;
          fetch(updateURL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              "name": {stringValue: JSON.stringify(this.state.comment.name)},
              "message": {stringValue: JSON.stringify(this.state.comment.message)},
              }
          })
      });
     }

    render(){ 

        return (
  
    <MDBRow>
        <MDBCol md="6" className="mb-lg-0 my-4">
        <MDBInput id="name" label="Name" outline size="md" onChange={this.handleFieldChange}/>
        <MDBInput id="message" label="Comment" outline size="md" onChange={this.handleFieldChange} />
{this.state.error && <p>All fields are required</p>}
        <MDBBtn onClick={this.CreateComment}>Submit</MDBBtn>
        </MDBCol>
    </MDBRow>
  );
}
}
export default CommentForm;