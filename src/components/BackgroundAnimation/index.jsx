// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import {
    HomePageBanner,
    Clouds,
    HomePageTreeAbove,
    HomePageTreeBelow,
} from '../../pages/Home/HomeStyle'
import PropTypes from 'prop-types'
import { Cherryblossom } from '../Cherryblossom'

/**
 * The background menu/animation of Apando.
 * This will become a seasonal background.
 * Currently only the spring theme is set.
 * Summer, Fall and Winter will be out when the time will come~~
 */
const BackgroundAnimation = ({ children, sakura }) => {
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

BackgroundAnimation.propTypes = {
    children: PropTypes.node,
    sakura: PropTypes.bool,
}

export default BackgroundAnimation
