import React from 'react';
import { Card } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import './about-view.scss';

const AboutView = () => {
  return (
    <Card className="main">
      <Card.Body>
        <Card.Title className="text-center">About Cinefacts</Card.Title>
        <Card.Text>
          The Cinefacts web application was built to showcase the tools and techniques used in modern web development. It serves as an example and reference for developing web applications using the MERN stack.
        </Card.Text>
        <br></br>
        <Card.Title>Front End</Card.Title>
        <Card.Text>
          The client for the web application was built using React and leverages industry standard tools such as Redux, Axios, and React Bootstrap. The project uses react routing and all forms include examples of client side validation. The project is packaged and minimized by Parcel.
        </Card.Text>
        <br></br>
        <Card.Title>Back End</Card.Title>
        <Card.Text>
          The Cinefact API is built in JS using Node.js and Express. The application uses web tokens for authentication and authorization. MongoDB paired with the Mongoose library is used for storing movie and user data. Currently, The API is being hosted by Heroku. 
        </Card.Text> 
      </Card.Body>
    </Card>
  );
}

export default AboutView;
