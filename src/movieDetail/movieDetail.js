import {useEffect, useState} from 'react';
import instance from '../components/instance';
import styled from 'styled-components';
import {IMAGE_BASE_URL} from '../constants/constants';
import BgImage from './bgImage';
import moment from 'moment';
import axios from "axios";

import { CircularProgressbar,buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UpperInfo = styled.div`
    position: relative;
    height: 300px;
`;

const BgImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const BackDropImg = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const ImgContainer = styled.div`
    float: left;
    width: 33.33333%;
    padding: 15px;
    img{
        max-width: 100%;
        max-height: 450px;
    }
`;
const InfoContainer = styled.div`
    float: right;
    width: 66.66666%;
    padding: 15px;
    .inline{
        display: inline-block;
        margin-right: 15px;
    }
    .title{
        font-size: 24px;
    }
    .circle{
        width: 50px;
        height: 50px;
        backgoround: rgha(0, 0, 0, 0.5);
        border-radius: 100%;
        padding: 3px;
    }
    .trailerBtn{
        color: #fff;
        background: var(--red);
        padding: 20px 20px;
        border-radius: 5px;
    }
`;

const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 100000;
    iframe{
        width: 600px;
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transfom: translateX(-50%) translateY(-50%);
    }
    .closeBtn{
        position: absolute;
        top: 50px;
        right: 50px;
        color: #fff;
        background: #000;
        font-size: 20px;
    }
`;

const Actors = styled.ul`
    display: flex;
    flex-wrap: wrap;
    li{
        width: 25%;
        padding: 10px;
        img{
            max-width: 100%;
        }
    }
    .actor-info{
        color: var(--red);
        font-size: 16px;
        font-weight: bold;
        .as{
            color: #666;
            font-size: 12px;
            margin-left: 10px;
            margin-right: 10px;
        }
        .character{
            color: #fff;
            font-size: 14px;
        }
    }
`;

const MovieDetail = ({match}) => {

    const [backDropImg, setBackDropImg] = useState("");
    const [posterPath, setPosterPath] = useState("");
    const [title, setTitle] = useState(""); //제목
    const [relDate, setReldate] = useState(""); //릴리즈 날짜
    const [genres, setGenres] = useState([]); //장르
    const [runTime, setRuntime] = useState(""); //상영시간
    const [voteAverage, setVoteAverage] = useState(0); //평점
    const [video, setVideo] = useState(""); //비디오
    const [modal, setModal] = useState(false); //모달 출력 여부
    const [actors, setActors] = useState([]);

    const getMovieDetail = async () => {
        const result = await instance.get(`movie/${match.params.id}`);
        setBackDropImg(result.data.backdrop_path);
        setPosterPath(result.data.poster_path);
        setTitle(result.data.title);
        setReldate(moment(result.data.release_date).format("YYYY"));
        setGenres(result.data.genres[0]);
        const rt = minToHourAndMin(result.data.runtime);
        setRuntime(rt);
        setVoteAverage(result.data.vote_average);

        const trailerRequest = await axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.id}/videos?
            api_key=621db96eb0c46832b8cf5b22234a386b`
        );
        setVideo(trailerRequest.data.results[0].key);
        const credits = await axios.get(
            `https://api.themoviedb.org/3/movie/${match.params.id}/credits?
            api_key=621db96eb0c46832b8cf5b22234a386b`
        );

        const acting = credits.data.cast.filter(
            (item) => item.known_for_department=="Acting"
        );
        setActors(acting);
    };

    //상영시간을 시간 분으로 리턴
    const minToHourAndMin = (e) => {
        const h = Math.floor(e/60);
        const m = e % 60;
        return `${h}시간 ${m}분`;
    }

    useEffect(() => {
        const { id } = match.params;
        if (id) getMovieDetail();
    }, []);

    return (
        <>
            <UpperInfo>
                <BackDropImg src={`${IMAGE_BASE_URL}w1280${backDropImg}` }
                    alt="" />
                <BgImage 
                    imgSrc={
                        backDropImg 
                        ? `${IMAGE_BASE_URL}w1280${backDropImg}` 
                        : `https://via.placeholder.com/1280x500`
                        } 
                        />
                <div className="container">
                    <ImgContainer>
                        <img src={`${IMAGE_BASE_URL}w500${posterPath}`} alt="{title}" />
                    </ImgContainer>
                    <InfoContainer>
                            <h1 className="inline title">{title}</h1>
                            <p className="inline">{relDate}</p>
                            {genres.map((item, index)=>(
                                <p className="inline" key={index}>{item.name}</p>
                                ))}
                            <p className="inline">{runTime}</p>
                            <div className="circle">
                                <CircularProgressbar 
                                    value={voteAverage * 10} 
                                    text={`${voteAverage}%`} 
                                    styles={buildStyles({
                                        pathColor: `#dc2d43`,
                                        textColor: "#dc2d43",
                                        trailColor: "#d6d6d6",
                                        backgroundColor: "#dc2d43",
                                    })} />  
                            </div>
                            <button type="button" className="trailerBtn" onClick={()=> setModal(true)}>
                                PLAY TRAILER
                            </button>
                        </InfoContainer>
                </div>
            </UpperInfo>
            <div className="container">
                <Actors>
                    {actors.map((item, index) => (
                        <li>
                            {/* <img src={`${IMAGE_BASE_URL}w342${item.profile_path}`} 
                            alt={item.name} /> */}
                            <img 
                                src={
                                    item.profile_path
                                    ? `${IMAGE_BASE_URL}w342${item.profile_path}`
                                    : `https://via.placeholder.com/324x5137?text=NO_IMAGE`
                            } alt={item.name} />
                            <div className="actor-info">
                            {item.name} <span>as</span>  
                            <span className="character">{item.character}</span>
                            </div>
                        </li>
                    ))}
                </Actors>
            </div>
            {modal ? (
                    <Modal>
                        <button type="button" 
                        className="closeBtn" 
                        onClick={() => setModal(false)}
                        >
                            닫기
                        </button>
                        <iframe src={`https://www.youtube.com/embed/${video}`} 
                        title={title} 
                        frameborder="0"
                        ></iframe>
                    </Modal>
                ):null}
        </>
    );
}

export default MovieDetail;