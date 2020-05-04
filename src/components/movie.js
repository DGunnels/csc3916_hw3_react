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

    //constructor() {
    //    super();

    //    this.updateDetails = this.updateDetails.bind(this);
    //    this.review = this.review.bind(this);
    //    this.state = {
    //        details: {
    //            username: '',
    //            smallQuote: '',
    //            rating: ''
    //        }
    //    };
    //}
    //updateDetails(event) {
    //    let updateDetails = Object.assign({}, this.state.details);

    //    updateDetails[event.target.id] = event.target.value;
    //    this.setState({
    //        details: updateDetails
    //    });
    //}
    

    constructor(props) {
        super(props);
        this.state = { smallQuote: '' };
        this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ smallQuote: event.target.value });
    }

    //handleSubmit(event) {
    //    alert('a name is submitted: ' + this.state.value);
    //    event.preventDefault();
    //}

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
                    <b>{actor.Name}</b> - {actor.Character}
                </p>
            );
        };

        const ReviewInfo = ({ reviews = [] }) => {
            return reviews.map((review, i) =>
                <p key={i}>
                    <b>{review.ReviewerName}</b> {review.smallQuote}
                    <Glyphicon glyph={'star'} /> {review.rating}
                </p>
            );
        }

        const MovieReview = ({ currentReview }) => {
            return (
                <Form horizontal key={currentReview} >
                     
                    <FormGroup controlId="smallQuote">
                        <Col componentClass={ControlLabel} sm={2}>
                            Summary Quote:
                        </Col>
                        <Col sm={10}>
                            <FormControl onChange={this.handleChange} value={this.state.smallQuote} type="text" placeholder="Quote." />
                        </Col>
                    </FormGroup>
                </Form>
            )
        }


        const DetailInfo = ({ currentMovie = [] }) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Details</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.imgURL} style={{ "height": 500 }} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.Title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} /> {currentMovie.avgRating} </h4></ListGroupItem>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.Reviews} /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem key={currentMovie}><MovieReview currentReview={currentMovie.Title} /></ListGroupItem>
                    </ListGroup>
                </Panel>

            );
        };
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
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
