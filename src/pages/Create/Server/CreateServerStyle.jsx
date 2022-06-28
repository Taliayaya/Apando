import styled from 'styled-components'
import { Icon } from '../../Login/LoginSignStyle'

export const StyledText = styled.p`
    color: #999;
    text-align: justify;
    padding: 0 20px;
    line-height: 18px;
`
const Svg = styled(Icon)`
    margin-top: -126px;
`

export const WaveJoin = () => (
    <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
            fill="#4b509d"
            fillOpacity="1"
            d="M0,64L48,90.7C96,117,192,171,288,176C384,181,480,139,576,149.3C672,160,768,224,864,245.3C960,267,1056,245,1152,208C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
    </Svg>
)

export const StyledTextarea = styled.textarea`
    resize: none;
    width: 90%;
    border-radius: 30px;
    outline: none;
    font-size: medium;
    font-family: Arial;
    padding-left: 20px;
    min-height: 100px;
    &:focus,
    &:valid {
        border-color: #4158d0;
    }
`
