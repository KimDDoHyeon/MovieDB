import styled from 'styled-components';
import Palette, {usePalette} from 'react-palette';

const BgImg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

const BgImage = ({imgSrc}) => {

    const {data, loading, error} = usePalette(imgSrc);

    return (<BgImg style={{background: data.vibrant, opacity: 0.5}} />)
}

export default BgImage;