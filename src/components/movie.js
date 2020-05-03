import React, { Component } from 'react';
import { connect } from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { fetchMovie } from "../actions/movieActions";
import { submitReview } from "../actions/movieActions";
import { Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
//support routing by creating a new component

class Movie extends Component {

    constructor() {
        super();

        this.updateDetails = this.updateDetails.bind(this);
        this.review = this.review.bind(this);
        this.state = {
            details: {
                username: '',
                smallQuote: '',
                rating: 0
            }
        };
    }
    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }

    review() {
        const { dispatch } = this.props;
        dispatch(submitReview(this.state.details))
            .then(() => {
                this.props.history.push('/');
            });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (this.props.selectedMovie == null)
            dispatch(fetchMovie(this.props.movieId));
    }

    render() {
        const ActorInfo = ({ actors = [] }) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.actorName}</b> {actor.characterName}
                </p>
            );
        };

        const ReviewInfo = ({ reviews = [] }) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.username}</b> {review.smallQuote}
                    <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            );
        }
        const MovieReview = ({ currentReview }) => {
            return (
                <Form horizontal key="reviewForm">
                    <FormGroup controlId="ReviewerName">
                        <Col componentClass={ControlLabel} sm={2}>
                            Name
                        </Col>
                        <Col sm={10}>
                            <FormControl key="username" value={this.state.details.ReviewerName} onLoad={this.updateDetails} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="smallQuote">
                        <Col componentClass={ControlLabel} sm={2}>
                            Personal Quote
                        </Col>
                        <Col sm={10}>
                            <FormControl key="Quotes" onChange={this.updateDetails} value={this.state.details.smallQuote} type="smallQuote" placeholder="Personal quote about the movie." />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="rating">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rating between 0 and 5 stars
                        </Col>
                        <Col sm={10}>
                            <FormControl key="Ratings" onChange={this.updateDetails} value={this.state.details.rating} type="Number" min="0" max="5" />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.review}>Submit</Button>
                        </Col>
                    </FormGroup>
                </Form>
            );
        }
        const DetailInfo = ({ currentMovie = [] }) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imgURL} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.Reviews} /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem><MovieReview currentReview={currentMovie.title} /></ListGroupItem>
                    </ListGroup>
                </Panel>

            );
        };
        return (
            <div>
                <DetailInfo currentMovie={this.props.selectedMovie} />
                <MovieReview currentMovie={this.props.selectedMovie} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId
    }
}

export default withRouter(connect(mapStateToProps)(Movie));
