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
    //            Reviewername: '',
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

    //review() {
    //    const { dispatch } = this.props;
    //    dispatch(submitReview(this.state.details))
    //        .then(() => {
    //            this.props.history.push('/');
    //        });
    //}

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
            //const reviewAvg = function (avg) {
            //    var sum = 0;
            //    var i = 0;
            //    let numbers = currentMovie.Reviews.rating;
            //    for (i = 0; i < numbers; i++) {
            //        sum += numbers[i];
            //    }
            //    avg = (sum / numbers.length);
            //    return avg;
            //}

            //var reviewAgg = reviewAvg;

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
                <Form horizontal>
                    <div className="RevForm">
                        <FormGroup controlId="smallQuote">
                            <Col componentClass={ControlLabel} sm={2}>
                                Reviewer Quote:
                        </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.handleChange} value={this.state.details.smallQuote} type="text" placeholder="Review text" />
                            </Col>
                        </FormGroup>

                        <FormGroup controlId="rating">
                            <Col componentClass={ControlLabel} sm={2}>
                                Rating:
                        </Col>
                            <Col sm={10}>
                                <FormControl onChange={this.handleChange} value={this.state.details.rating} type="number" min="0" max="5" placeholder="Rating 1 to 5" />
                            </Col>
                        </FormGroup>

                        <FormGroup>
                            <Col smOffset={2} sm={10}>
                                <Button onClick={this.handleSubmit}>Submit</Button>
                            </Col>
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
