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

import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundAnimation from '../../components/BackgroundAnimation'
import Header from '../../components/Header'
import { Container, Image404, NotFoundTitle } from './StyleNotFound'

function NotFound() {
    const navigate = useNavigate()
    return (
        <BackgroundAnimation sakura={true}>
            <Header authLinks={true} />
            <Container>
                <Image404 />
                <NotFoundTitle>
                    Oupsss, il semblerait que tu te sois perdu dans cette forêt.
                </NotFoundTitle>
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/app')}
                >
                    Revenir à l'app
                </Button>
            </Container>
        </BackgroundAnimation>
    )
}

export default NotFound
