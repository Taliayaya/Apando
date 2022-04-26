import {
    HomePageBanner,
    Clouds,
    HomePageTreeAbove,
    HomePageTreeBelow,
} from '../../pages/Home/HomeStyle'

import { Cherryblossom } from '../Cherryblossom'

const BackgroundAnimation = ({ children, sakura }) => {
    return (
        <HomePageBanner>
            {sakura && <Cherryblossom amount={60} size={10} />}
            <Clouds>
                <HomePageTreeBelow>
                    <HomePageTreeAbove>{children}</HomePageTreeAbove>
                </HomePageTreeBelow>
            </Clouds>
        </HomePageBanner>
    )
}

export default BackgroundAnimation
