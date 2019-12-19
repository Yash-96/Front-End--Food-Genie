import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

  function Rendercomments({comments}){
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

    function Renderdishes({dish}){
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

  const Dishdetails = (props) => {
    const dish = props.dish
    if (dish == null) {
        return (<div></div>);
    }
        return (
        <div className='container'>
        <div className="row">
        <div className="col-12 col-sm-5 m-1">
            <Renderdishes dish={props.dish} />
          </div>
          <div className="col-12 col-sm-5 m-1">
            <Rendercomments comments={props.dish.comments} />
        </div>
        </div>
        </div>
    );
}


export default Dishdetails;
