import React, { Component } from 'react';
import { fetchTopMovies } from '../actions/movieActions';
import { setMovie } from '../actions/movieActions';
import { connect } from "react-redux";
import { Image } from 'react-bootstrap'
import { Carousel } from 'react-bootstrap'
import { Glyphicon } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';


class MovieHome extends Component {
    constructor(props) {
        super(props);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchTopMovies());
    }

    handleSelect(selectedIndex, e) {
        const { dispatch } = this.props;
        dispatch(setMovie(this.props.movies[selectedIndex]));
    }

    handleClick = (movie) => {
        const { dispatch } = this.props;
        dispatch(setMovie(movie));
    }

    render() {

        const MovieHomeCarousel = ({ movieHome }) => {
            if (!movieHome) { // evaluates to true if currentMovie is null
                return (
                    <div>Loading...</div>
                );
            }

            return (
                <Carousel onSelect={this.handleSelect}>
                    {movieHome.map((movie) =>
                        <Carousel.Item key={movie._Title}>
                            <div>
                                <LinkContainer to={'/movie/' + movie._id} onClick={() => this.handleClick(movie)}>
                                    <Image className="image" src={movie.imageURL} thumbnail />
                                </LinkContainer>
                            </div>
                            <Carousel.Caption>
                                <h3>{movie.Title}</h3>
                                <Glyphicon glyph={'star'} /> {movie.avgRating} -- {movie.Year}
                            </Carousel.Caption>
                        </Carousel.Item>)}
                </Carousel>);
        }

        return (
            <MovieHomeCarousel movieHome={this.props.movies} />
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movie.movies
    }
}

export default connect(mapStateToProps)(MovieHome);