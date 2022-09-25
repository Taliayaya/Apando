import styled from 'styled-components'
import Mascotte404 from '../../assets/images/404_motivation_not_found500.png'
import Backgrounds404 from '../../assets/images/404_motivation_not_found_bg.png'

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 2% 5%;
    text-align: center;
    border-radius: 30px;
    background-color: rgba(81, 85, 147, 0.5);
    @media screen and (min-width: 720px) {
        margin: 0 25%;
    }
    @media screen and (max-width: 719px) {
        margin: 0 15%;
    }
`

const Image404 = styled.div`
    position: relative;
    background: no-repeat center url(${Mascotte404}),
        no-repeat center url(${Backgrounds404});
    background-size: 100%;
    max-height: 500px;
    max-width: 500px;
    width: 500px;
    height: 500px;
    @media screen and (max-width: 580px) {
        background-size: 50%;
        height: 300px;
    }
`

const NotFoundTitle = styled.div`
    color: ${(props) => props.theme.font_color};
    font-size: 35px;
    font-weight: 600;
    padding: 0 0 10px;
    @media screen and (max-width: 580px) {
        font-size: 25px;
    }
`

export { Container, Image404, NotFoundTitle }
