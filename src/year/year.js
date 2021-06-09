import {useEffect, useState} from "react";
import instance from '../components/instance';
import styled from 'styled-components';

import MovieListItem from '../components/movieListItem';

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

const Year = ({match}) => {

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [movies, setMovies] = useState([]);

    const [id,setId] = useState(null);

    const fetchData = async () => {
        const result = await instance.get(`discover/movie?primary_release_year=${match.params.id}&page=${page}`);

        if(id !== match.params.id && id) {
            setMovies([...result.data.results]);
        } else {
            setMovies([...result.data.results]);
        }
        console.log(result.data.results);
        setPage(result.data.page);
        setTotalPages(result.data.total_pages);
        setTotalResults(result.data.total_results);
    };

    const more = () => {
        setPage(page+1);
    }

    useEffect(() => {
        console.log(match.params.id);
        const { id: idNum } = match.params;
        setId(idNum);
        if (idNum) {
            fetchData();
        }
    }, [page, match.params.id]);
    return (
    <div className="constainer">
        <MovieList>
            {movies.map((item, index)=>(
                <MovieListItem key={index} item={item} />
            ))}
        </MovieList>
        {page >= totalPages ? null : (
            <ViewMoreButton type="button" onClick={more}>
                더보기
            </ViewMoreButton>
        )}
    </div>
    );
}

export default Year;