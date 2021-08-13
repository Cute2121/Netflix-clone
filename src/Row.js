import React, {useState, useEffect} from 'react';
import './Row.css';
import axios from './axios';
import requests from './requests';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({title, fetchUrl, isLargeRow}) {

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
       // if the [] are blank means it will run once every time Row component loads.
       async function fetchData(){
           const request = await axios.get(fetchUrl);
           console.log(request.data.results);
           setMovies(request.data.results);
           return request;
       } 
       fetchData();
       //await means wait for the requeste to come back with answer.
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100",
        playVars: {autoplay: 1,
        },

    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl(""); 
        } else {
            movieTrailer(movie?.name || "")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error));
        }
    }
    
    return (
        <div className="row">
            <h2>{title}</h2>


            <div className="row-posters">
                {/* row-posters */}

                {movies.map(movie => (
                    <img 
                    key={movie.id}
                    onClick={() => handleClick(movie)}
                    className={`row-poster ${isLargeRow && "row-posterLarge"}`}
                    src={`${base_url}${isLargeRow?movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name} />
                ))}
            </div>
           {trailerUrl && <YouTube className="video"videoId={trailerUrl} opts={opts} /> }
        </div>
    );
}

export default Row;
