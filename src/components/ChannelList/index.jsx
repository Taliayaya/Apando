import React from 'react'
import {
    StyledChannelList,
    StyledChannelListTop,
    StyledChannelListBottom,
    StyledChannel,
} from './ChannelListStyle'

function ChannelList() {
    return (
        <StyledChannelList>
            <StyledChannelListTop>
                <h2>Le Bon Sauveur</h2>
            </StyledChannelListTop>
            <form action="#">
                <input
                    type="text"
                    name="new_channel"
                    placeholder="Nouveau salon"
                />
                <input type="submit" value="Ajouter" />
            </form>
            <StyledChannelListBottom>
                <StyledChannel Selected>Général</StyledChannel>
                <StyledChannel>Général 2</StyledChannel>
            </StyledChannelListBottom>
        </StyledChannelList>
    )
}

export default ChannelList
