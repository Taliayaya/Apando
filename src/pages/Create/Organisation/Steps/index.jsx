import React from 'react'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'

function Steps({ activeStep, orgaInfo, setOrgaInfo }) {
    switch (activeStep) {
        case 0:
            return <Step1 orgaInfo={orgaInfo} setOrgaInfo={setOrgaInfo} />
        case 1:
            return <Step2 orgaInfo={orgaInfo} setOrgaInfo={setOrgaInfo} />
        case 2:
            return <Step3 orgaInfo={orgaInfo} setOrgaInfo={setOrgaInfo} />
        default:
            return null
    }
}

export default Steps
