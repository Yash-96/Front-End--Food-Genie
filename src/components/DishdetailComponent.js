import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Modal, ModalHeader, ModalBody,
    Button, Row, Col, Label } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';

    class Dishdetails extends Component {
      constructor(props){
        super(props);
        this.state = {
            isModalOpen: false
        };

      this.toggleModal = this.toggleModal.bind(this);
      }

    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dish.id,values.rating,values.name,values.comment)
        //event.preventDefault();
      }

     Renderdishes(dish){
      return (
        <div>
        <Card>
            <CardImg top src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
        </div>
      );
    }

   Rendercomments(comments){
      if (comments == null){
        return (<div></div>);
      }
      const cmnt = comments.map((com) =>
      {
        return (
          <div>
          <p>Rating: {com.rating}, Review: {com.comment}</p>
          <p>Author: {com.author}, Date: {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
          </div>
        );
      });
      return (
          <div>
          <Card>
          <CardTitle>Comment</CardTitle>
              <CardBody>
                <CardText>{cmnt}</CardText>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Comment</Button>
              </CardBody>
          </Card>
          </div>
        );
      }
render(){

  const maxLength = (len) => (val) => !(val) || (val.length <= len);
  const minLength = (len) => (val) => val && (val.length >= len);
  const required = (val) => val && val.length;

    if (this.props.dish == null) {
        return (<div></div>);
    }

  if (this.props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
  else if (this.props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
        }
  else if (this.props.dish != null)
  {
  const all_comment = this.Rendercomments(this.props.comments);
  const all_dishes = this.Renderdishes(this.props.dish);
    return (
      <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{this.props.dish.name}</h3>
              <hr />
          </div>
      </div>
      <div className="row">
          <div className="col-12 col-md-5 m-1">
              {all_dishes}
          </div>
          <div className="col-12 col-md-5 m-1">
              {all_comment}
          </div>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
              <ModalHeader toggle={this.toggleModal}>Comment</ModalHeader>
              <ModalBody>
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                          <Label htmlFor="rating" md={2}>Rating</Label>
                          <Col md={10}>
                          <Control.select model=".rating" id="rating" name="rating"
                              className="form-control">
                              <option value="none" selected disabled hidden>
                              Select Rating
                              </option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                          </Control.select>
                          </Col>
                      </Row>
                      <Row className="form-group">
                          <Label htmlFor="name" md={2}>Name</Label>
                          <Col md={10}>
                              <Control.text model=".name" id="name" name="name"
                                  placeholder="Name"
                                  className="form-control"
                                  validators={{
                                      required, minLength: minLength(3), maxLength: maxLength(15)
                                  }}
                                   />
                              <Errors
                                  className="text-danger"
                                  model=".name"
                                  show="touched"
                                  messages={{
                                      required: 'Required ',
                                      minLength: 'Must be greater than 2 characters ',
                                      maxLength: 'Must be 15 characters or less'
                                  }}
                               />
                          </Col>
                      </Row>

                      <Row className="form-group">
                          <Label htmlFor="message" md = {2}>Your Comment</Label>
                          <Col md={10}>
                          <Control.textarea model=".comment" id="comment" name="comment"
                          rows="10" className="form-control" />
                          </Col>
                          </Row>
                          <Row className="form-group">
                              <Col md={{size:10, offset: 2}}>
                                  <Button type="submit" color="primary">
                                  Submit Feedback
                                  </Button>
                              </Col>
                          </Row>
                    </LocalForm>
              </ModalBody>
          </Modal>
      </div>
      </div>
  );
}
}
}


export default Dishdetails;
