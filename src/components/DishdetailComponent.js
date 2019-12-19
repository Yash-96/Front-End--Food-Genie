import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class Dishdetails extends Component{

  constructor(props){
    super(props);
  };

  rendercomments(comments){
    if (comments == null){
      return (<div></div>);
    }
    const cmnt = comments.map((com) =>
    {
      return (
        <div key={com.id}>
        <p>{com.comment}</p>
        <p>-- {com.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</p>
        </div>
      );
    });
    return (
        <div>
        <Card>
            <CardBody>
              <CardTitle>Comment</CardTitle>
              <CardText>{cmnt}</CardText>
            </CardBody>
        </Card>
        </div>
      );
    }
    renderdishes(dish){
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
  render() {
    const dish = this.props.dish
    if (dish == null) {
        return (<div></div>);
    }
    const dishItem = this.renderdishes(dish)
    const commentItem = this.rendercomments(dish.comments)
    return (
        <div className='container'>
        <div className="row">
        <div className="col-12 col-sm-5 m-1">
            {dishItem}
          </div>
          <div className="col-12 col-sm-5 m-1">
            {commentItem}
        </div>
        </div>
        </div>
    );
}
}
export default Dishdetails;
