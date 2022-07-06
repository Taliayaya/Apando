import { Box, Button, CircularProgress } from '@mui/material'
import { green } from '@mui/material/colors'
import { getAuth } from 'firebase/auth'
import React from 'react'
import CustomizedSnackbars from '../../../../../components/CustomizedSnackBar'
import Organisation from '../../../../../utils/organisation'

function LastStep(orgaInfo) {
    const [feedback, setFeedback] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const user = getAuth().currentUser

    const buttonSx = {
        ...(feedback?.severity === 'success' && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    }

    const handleSubmit = async () => {
        if (loading) return
        setLoading(true)
        setFeedback(null)
        await Organisation.add(orgaInfo, user)
        setLoading(false)
        setFeedback({
            message: `L'organisation ${orgaInfo.name} a été créée avec succès !`,
            severity: 'success',
        })
    }
    return (
        <React.Fragment>
            <Box sx={{ m: 1, position: 'relative' }}>
                <Button
                    variant="contained"
                    sx={buttonSx}
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    Finaliser {orgaInfo.name}
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            color: green[500],
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                        }}
                    />
                )}
            </Box>
            <CustomizedSnackbars
                open={!!feedback}
                setOpen={setFeedback}
                {...feedback}
            />
        </React.Fragment>
    )
}

export default LastStep
