import { css } from "@emotion/core";
import ClockLoader from "react-spinners/ClockLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = ({isLoaded}) =>{
    return(
        <ClockLoader 
        color="#ffffff"  loading={isLoaded} 
        css={override} size={50} />
    );
};

export default Loader;