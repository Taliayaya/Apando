import {
    HomePageBanner,
    Clouds,
    HomePageTreeAbove,
    HomePageTreeBelow,
} from './SpringStyle'
import PropTypes from 'prop-types'
import { Cherryblossom } from './Cherryblossom'

/**
 * The background menu/animation of Apando.
 * This will become a seasonal background.
 * Currently only the spring theme is set.
 * Summer, Fall and Winter will be out when the time will come~~
 */
const Spring = ({ children, sakura }) => {
    return (
        <HomePageBanner>
            {/* Later to turn on/off the blossom animation */}
            {sakura && <Cherryblossom amount={60} size={10} />}
            <Clouds>
                <HomePageTreeBelow>
                    <HomePageTreeAbove>{children}</HomePageTreeAbove>
                </HomePageTreeBelow>
            </Clouds>
        </HomePageBanner>
    )
}

Spring.propTypes = {
    children: PropTypes.node,
    sakura: PropTypes.bool,
}

export default Spring
