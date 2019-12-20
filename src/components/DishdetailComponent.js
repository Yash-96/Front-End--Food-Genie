import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

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
    if (props.dish == null) {
        return (<div></div>);
    }
    return (
      <div className="container">
      <div className="row">
          <Breadcrumb>
              <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
              <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
              <h3>{props.dish.name}</h3>
              <hr />
          </div>
      </div>
      <div className="row">
          <div className="col-12 col-md-5 m-1">
              <Renderdishes dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
              <Rendercomments comments={props.comments} />
          </div>
      </div>
      </div>
  );
}


export default Dishdetails;
