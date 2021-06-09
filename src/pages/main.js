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

import MovieListItem from '../components/movieListItem';

import Loader from '../components/loader';

library.add(faSearch);



const Searchbar = styled.div`
  position: sticky;
  top: 50px;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: 50px;
  background: var(--bg);
  .container{
    input{
      width: 100%;
      padding: 6.5px 6.5px 6.5px 37.5px;
      background: var(--bg);
      border: 1px solid #495162;
      border-radius: 3px;
      outline: 0;
      color: #fff;
      transition: all 0.2s ease-in-out;
      &:focus {
        background: #fff;
        border: 1px solid red !important;
        color: var(--bg);
      }
    }
    .icon{
      position: absolute;
      top: 3px;
      left: 10px;
      color: var(--text);
      &.inputActive{
        color: var(--red);
      }
    }
  }
`;

const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const ViewMoreButton = styled.button`
  display: block;
  margin: 40px auto;
  background: var(--red);
  color: #fff;
  border: 0;
  outline: 0;
  padding: 20px 40px;
  cursor: pointer;
`;

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

function Main() {

  const [searchText, setSearchText] = useState("");
  const [inputActive, setInputActive] = useState(false);

  // 로딩중
  const [isLoaded, setIsLoaded] = useState(true);
  // 영화 목록
  const [movies, setMovies] = useState([]);
  // 페이지 번호
  const [page, setPage] = useState(1);
  // 전체 페이지 갯수
  const [totalPages, setTotalPages] = useState(0);
  // 전체 영화 갯수
  const [totalResults, setTotalResults] = useState(0);
  //스피너 색상
  const [color, setColor] = useState('#ffffff');
  
  const searchAction = (e) => {
    setSearchText(e.target.value);
    setMovies([]);
    fetchData(`${API_URL}search/movieapi_key=${API_KEY}&
    language=ko-KR&page=${1}&query=${searchText}`);
  };

  const focusHandler = () => {
    setInputActive(!inputActive);
  }

  const fetchData = async(url) => {
    setIsLoaded(true);
    const result = await axios.get(url);
    console.log(result.data.results);
    setMovies([...movies, ...result.data.results]);
    setPage(result.data.page);
    setTotalPages(result.total_pages);
    setTotalResults(result.total_results);
    setIsLoaded(false);
  };

  const more = () => {
    if(searchText === ''){
      fetchData(`${API_URL}movie/popular?api_key=${API_KEY}&
      language=ko-KR&page=${page+1}`);
    } else {
      fetchData(`${API_URL}search/movieapi_key=${API_KEY}&
    language=ko-KR&page=${page + 1}&query=${searchText}`);
    }
    console.log("more");
    fetchData(`${API_URL}movie/popular?api_key=${API_KEY}&
    language=ko-KR&page=${page+1}`);
  }

  //https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
  //아래 api key
  //621db96eb0c46832b8cf5b22234a386b
  useEffect(() => {
    if(searchText === ''){

      fetchData(`${API_URL}movie/popular?api_key=${API_KEY}&
      language=ko-KR&page=${page}`);
    } else {
      fetchData(`${API_URL}search/movieapi_key=${API_KEY}&
    language=ko-KR&page=${page}&query=${searchText}`);
    }
  }, [searchText]);

  return (
  <>
    <Searchbar>
    <div className="container">
      <span className={inputActive ? "icon inputActive": "icon"}>
        <FontAwesomeIcon icon="search" />
      </span>        
      <input type="text" 
      value={searchText} 
      onFocus={focusHandler}
      onBlur={focusHandler}
      onChange={searchAction} 
      placeholder="영화를 검색하세요." />
    </div>
    </Searchbar>
    <div className="container">
      <MovieList>
        {
          movies.map((item, index) => (
            <MovieListItem key={index} item={item} />
            ))
          }
      </MovieList>
          <Loader isLoaded={isLoaded} />
          {page >= totalPages ? null : (
            <ViewMoreButton type="button" onClick=
            {more}>더보기</ViewMoreButton>
            )}
    </div>
  </>
  );
}

export default Main;
