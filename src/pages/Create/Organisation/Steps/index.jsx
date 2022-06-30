import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'

function Steps({ activeStep, orgaInfo, setOrgaInfo }) {
    switch (activeStep) {
        case 0:
            return <Step1 orgaInfo={orgaInfo} setOrgaInfo={setOrgaInfo} />
        case 1:
            return <Step2 orgaInfo={orgaInfo} setOrgaInfo={setOrgaInfo} />
        default:
            return null
    }
}

export default Steps
