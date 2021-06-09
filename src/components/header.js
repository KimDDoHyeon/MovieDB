import styled from 'styled-components';
import {library} from "@fortawesome/fontawesome-svg-core";
import {faSortDown,faSearch} from "@fortawesome/free-solid-svg-icons";

import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import instance from './instance';

library.add(faSearch, faSortDown);

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  min-height: 50px;
  z-index: 1000;
  background: var(--bg);
  .logo{
    color: var(--red);
  }
  .container{
    display: flex;
    justify-content: space-between;
    min-height: 50px;
    align-items: center;
    .searchType{
      button{
        font-size: 13px;
        background: transparent;
        color: #fff;
        border: 0;
        outline: 0;
        cursor: pointer;
        span{
          margin-left: 10px;
          display: inline-block;
          transition: all 0.2s ease-in-out;
        }
        transition: color 0.2s ease-in-out;
        &:first-child{
          margin-right: 10px
        }
        &:hover, &.on{
          color: var(--red);
          span{
            transform: rotate(180deg);
            transform-origin: center;
          }
        }
      }
    }
  }
`;

const List = styled.div`
  position: fixed;
  top: -200px;
  left: 0;
  right: 0;
  z-index: 1001;
  background: #1a1824;
  transition: top 0.3s ease-in-out;
  padding-top: 50px;
  &.active{
    top: 50px;
  }
  ul{
    li{
      display: inline-flex;
      margin: 3px;
      a{
        background: var(--red);
        color: #fff;
        padding: 10px 30px;
        border-radius: 5px;
      }
    }
  }
`;

const yearFunction = () => {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear - 22;
  const yearArray = [];
  for(let i = currentYear; i > endYear; i--){
    yearArray.push(i);
  }
  return yearArray;
};

const Header = () => {

  const [listGenre, setListGenre] = useState([]);
  const [btn1,setBtn1] = useState(false)
  const [btn2,setBtn2] = useState(false)

  const yearValues = yearFunction();

  const handleBtn1 = () => {
    setBtn1(!btn1);
    setBtn2(false);
  }

  const handleBtn2 = () => {
    setBtn1(false);
    setBtn2(!btn2);
  }

  const getData = async() =>{
    const {
            data: { genres},
          } = await instance.get(`/genre/movie/list`);

    setListGenre(genres);
  }

  useEffect(() => {
    console.log(yearValues);
    getData();
    }, []);

  return (
  <>
        <Navbar>
      <div className="container">
        <Link to="/" className="logo">MOVIE DB</Link>
        <div className="searchType">
        <button type="button" className={btn1 ? "on" : ""} onClick={handleBtn1}>
          장르별
          <span>
          <FontAwesomeIcon icon="sort-down" />
          </span>
          </button>
        <button type="button" className={btn2 ? "on" : ""} onClick={handleBtn2}>
          연도별
          <span>
          <FontAwesomeIcon icon="sort-down" />
          </span>
          </button>
        </div>
      </div>
    </Navbar>
    <List className={btn1 ? "active" : ""}>
      <ul className="#container">
        {listGenre.map((item, index) => (
          <li key={index}>
            <Link to={`/genres/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </List>
    <List className={btn2 ? "active" : ""}>
      <ul className="#container">
        {yearValues.map((item, index) => (
          <li key={index}>
            <Link to={`/year/${item}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </List>
  </>
    );
}

export default Header;