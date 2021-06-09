import { useState, useEffect } from "react";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

import {Link} from "react-router-dom";

import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import axios from 'axios';

import {API_URL, API_KEY, IMAGE_BASE_URL} from '../constants/constants';

const MovieItem = styled.li`
  width: 25%;
  padding: 10px;
  a{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  @media(max-width: 767px;){
    width: 50%;
  }
  .mvInfo{
    position: relative;
    padding: 10px 40px 8px 8px;
    .year{
      font-size: 11px;
      color: #fff;
    }
    .mvName{
      font-size: 17px;
      color: var(--red);
      font-weight: bold;
    }
    .rate{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 26px;
      height: 26px;
      .CircularProgressbar .CirularProgressbar-text{
        font-size: 30px;
      }
    }
  }
`;

function MovieListItem({item}){
  return(
    <MovieItem>
          <Link to={`/movie/${item.id}`}>
            <img 
            src={`${IMAGE_BASE_URL}w500${item.poster_path}`} 
            alt={item.title}
            className="img-auto" 
            />
            <div className="mvInfo">
            <p className="year">{item.release_date}</p>
            <p className="mvName">{item.title}</p>
            <p className="rate">
              <CircularProgressbar 
              value={item.vote_average * 10} 
              text={`${item.vote_average}%`} 
              styles={buildStyles({
                pathColor: `#dc2d43`,
                textColor: "#dc2d43",
                trailColor: "#d6d6d6",
                backgroundColor: "#dc2d43",
              })} />
            </p>
            </div>
          </Link>
        </MovieItem>
  );
}

export default MovieListItem;