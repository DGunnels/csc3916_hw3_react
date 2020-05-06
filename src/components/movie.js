import React, { Component } from 'react';
import { connect } from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import { fetchMovie } from "../actions/movieActions";
import { submitReview } from "../actions/movieActions";
import { Col, Form, FormGroup, FormControl, ControlLabel, Button, Label } from 'react-bootstrap';


class Movie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            details: {
                smallQuote: '',
                rating: '',
                id: ''
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let handleChange = Object.assign({}, this.state.details);

        handleChange[event.target.id] = event.target.value;
        this.setState({
            details: handleChange
        });
    }

    handleSubmit(event) {

        this.state.details.id = this.props.selectedMovie.movieId;
        const { dispatch } = this.props;
        dispatch(submitReview(this.props.selectedMovie.movieId, this.state.details))
            .then(() => {
                this.props.history.push('/');
            });
        event.preventDefault();
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
                    <b>{actor.Name}</b>   <Glyphicon glyph={'user'} />    {actor.Character}
                </p>
            );
        };

        const ReviewInfo = ({ reviews = [] }) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.ReviewerName}</b> <Glyphicon glyph={'option-horizontal'} /> {review.smallQuote} <Glyphicon glyph={'option-horizontal'} />     <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            );
        }

        const DetailInfo = ({ currentMovie = [] }) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            
            return (
                <Panel>
                    <Panel.Heading>Movie Details</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imageURL} style={{ "height": 300 }} thumbnail /></Panel.Body>
                    <div className="ActAndRate">
                        <ListGroup>
                            <ListGroupItem>{currentMovie.Title}</ListGroupItem>
                            <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                            <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                        </ListGroup>
                    </div>
                    <Panel.Body><ReviewInfo reviews={currentMovie.Reviews} /></Panel.Body>
                    <ListGroup>
                    </ListGroup>
                </Panel>
            );
        };

        return (
            <div className="FormCombo" >
                <DetailInfo currentMovie={this.props.selectedMovie} />
                <Form onSubmit={this.handleSubmit} horizontal>
                    <div className="center">
                        <FormGroup controlId="smallQuote">
                            <Label for="smallQuote">Reviewer Quote: </Label>
                            <FormControl onChange={this.handleChange} value={this.state.details.smallQuote} type="text" placeholder="Review text" />
                        </FormGroup>
                        <FormGroup controlId="rating">
                            <Label for="rating">Rating: </Label>
                            <FormControl onChange={this.handleChange} value={this.state.details.rating} type="number" min="1" max="5" placeholder="1" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit">Submit</Button>
                        </FormGroup>
                    </div>
                </Form>
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