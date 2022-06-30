import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import SettingsIcon from '@mui/icons-material/Settings'
import React from 'react'
import PropTypes from 'prop-types'
import { StepIconRoot } from './StyledOrga'

function StepIcon(props) {
    const { active, completed, className } = props
    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    }

    return (
        <StepIconRoot ownerState={{ active, completed }} className={className}>
            {icons[String(props.icon)]}
        </StepIconRoot>
    )
}

StepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
}

export default StepIcon
