import {
    Hammock,
    HomePageBanner,
    HomePagePalmTree,
    Mascotte,
    Sand,
    SandFront,
    Sea,
    Seafoam,
    WetSand,
} from './SummerStyle'
import PropTypes from 'prop-types'

/**
 * The background menu/animation of Apando.
 * This will become a seasonal background.
 * Currently only spring & summer theme are set.
 * Fall and Winter will be out when the time will come~~
 */
const Summer = ({ children }) => {
    return (
        <HomePageBanner>
            <HomePagePalmTree>
                <Hammock>
                    <Mascotte>{children}</Mascotte>
                </Hammock>
            </HomePagePalmTree>
            <Sand />
            <WetSand />
            <Sea>
                <Seafoam />
            </Sea>
        </HomePageBanner>
    )
}

Summer.propTypes = {
    children: PropTypes.node,
}

export default Summer
