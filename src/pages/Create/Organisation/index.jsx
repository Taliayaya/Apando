import {
    Box,
    Button,
    Step,
    StepButton,
    StepLabel,
    Stepper,
    Typography,
} from '@mui/material'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import Backgrounds from '../../../components/Backgrounds'
import { useAuth } from '../../../utils/hooks'
import { Center, Connector, Wrapper } from './StyledOrga'
import StepIcon from './StepIcon'
import Steps from './Steps'

const steps = ["Nom de l'Organisation", 'Step 2', 'Step 3']

const info = {
    name: '',
}

export default () => {
    const { themeUsed } = useAuth()

    const [orgaInfo, setOrgaInfo] = React.useState(info)

    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep((currentStep) => currentStep - 1)
    }

    const handleStep = (step) => {
        setActiveStep(step)
    }

    return (
        <ThemeProvider theme={themeUsed}>
            <Backgrounds>
                <Center>
                    <Wrapper>
                        <Box
                            sx={{
                                width: '100%',
                                position: 'relative',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                minHeight: '50vh',
                            }}
                        >
                            <Stepper
                                activeStep={activeStep}
                                alternativeLabel
                                connector={<Connector />}
                            >
                                {steps.map((label, index) => (
                                    <Step key={label}>
                                        <StepButton
                                            onClick={() => handleStep(index)}
                                        >
                                            <StepLabel
                                                StepIconComponent={StepIcon}
                                            >
                                                {label}
                                            </StepLabel>
                                        </StepButton>
                                    </Step>
                                ))}
                            </Stepper>
                            {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re
                                        finished
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            pt: 2,
                                        }}
                                    >
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            pt: 2,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Steps
                                            activeStep={activeStep}
                                            orgaInfo={orgaInfo}
                                            setOrgaInfo={setOrgaInfo}
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            pt: 2,
                                        }}
                                    >
                                        <Button
                                            style={{
                                                color: themeUsed.userList_font_color,
                                            }}
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Retour
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {console.log(
                                            orgaInfo,
                                            !(
                                                activeStep === 0 &&
                                                orgaInfo.name.trim().length ===
                                                    0
                                            )
                                        )}
                                        <Button
                                            onClick={handleNext}
                                            style={{
                                                color: themeUsed.home_page_bg_color,
                                            }}
                                            disabled={
                                                activeStep === 0 &&
                                                orgaInfo.name.trim().length ===
                                                    0
                                            }
                                        >
                                            {activeStep === steps.length - 1
                                                ? 'Finish'
                                                : 'Suivant'}
                                        </Button>
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>
                    </Wrapper>
                </Center>
            </Backgrounds>
        </ThemeProvider>
    )
}
