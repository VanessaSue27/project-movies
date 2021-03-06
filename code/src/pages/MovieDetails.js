import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { API_KEY } from '../key';
import { Movie } from 'components/Movie';
import { Loading } from 'components/Loading';
import { NotFound } from 'components/NotFound';

export const MovieDetails = () => {
  //The movie ID of the movie the user has clicked on will show on the
  //URL, so we use the params feature to access that movie ID
  const { movieID } = useParams();
  const [movie, setMovie] = useState([]);

  //We do a new fetch to the specific movie details endpoint, using the movie ID
  //we got from the params so we make sure to fetch the data for the right movie
  //The movie we want to display is determined with the movie/ setMovie state
  //We set movieID as dependency for this fetch, it will change if the movie id changes
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${API_KEY}&language=en-US`)
     .then((response) => response.json())
     .then((json) => {
       setMovie(json)
     })
     .catch(() => {
       console.error()
     })
  }, [movieID])

  //Logic to implement NotFound and Loading pages. For NotFound
  //I was looking at the Components in dev tools and noticed that
  //when the page is 404 the movie state creates an almost empty
  //object with a property of success: false, this object only appears
  //on 404, so thought of using this info to redirect to my NotFound page
  //For the Loading page, this will appear for barely half second while
  //the fetch is completing, during that time, the movie object is undefined
  //so used that data to implement the Loading page.
  if(movie.success === false) {
    return (
      <NotFound />
    )
  } else if (movie.id === undefined) {
    return (
      <Loading />
    )
  } else {
    return (
      //We send the whole movie object to the Movie component so it has
      //all the data to display
      <Movie {...movie} />
    )
  }
};

//https://dev.to/kapi1/how-to-fix-page-not-found-on-netlify-a4i
//A special _redirects file is added to public folder in order for the redirecting logic
//above to work, this logic to redirect to not found page works locally, but broke down
//when deployed to Netlify. This redirect file helps so that when deployed
//Netlify knows how to handle the route. Info on the article linked above.