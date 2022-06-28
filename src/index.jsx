import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './/pages/App'
import Home from './/pages/Home'
import Login from './/pages/Login'
import Settings from './/pages/Settings'
import Signup from './/pages/Signup'
import RequireAuth from './/components/RequireAuth'
import {
    AuthProvider,
    CurrentChannelProvider,
    MessageListProvider,
    CurrentServerProvider,
    ChatMessageProvider,
} from './/utils/context'
import NotFound from './/pages/NotFound'
import GlobalStyle from './/utils/style/GlobalStyle'
import Join from './/pages/Join'
import { app } from './/utils/firebase/config'
import Server from './/pages/Create/Server'
import ResetPassword from './/pages/ResetPassword'
import Terms from './/pages/Terms'
import Privacy from './/pages/Privacy'
import Dashboard from './/pages/Dashboard'
import { ThemeProvider } from '@mui/material'
import { themeMui } from './/utils/style/colors'
import IsUserInServer from './/pages/App/IsUserInServer'
import IsUserInChannel from './/pages/App/IsUserInChannel'
import { HelmetProvider } from 'react-helmet-async'
import Organisation from './pages/Create/Organisation'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <HelmetProvider>
                <ThemeProvider theme={themeMui}>
                    <GlobalStyle />
                    <AuthProvider>
                        <MessageListProvider>
                            <CurrentServerProvider>
                                <CurrentChannelProvider>
                                    <ChatMessageProvider>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={
                                                    <>
                                                        <Home />
                                                    </>
                                                }
                                            />
                                            <Route
                                                path="/terms"
                                                element={<Terms />}
                                            />
                                            <Route
                                                path="/privacy"
                                                element={<Privacy />}
                                            />
                                            <Route
                                                path="/signup"
                                                element={<Signup />}
                                            />
                                            <Route element={<RequireAuth />}>
                                                <Route
                                                    path="/app"
                                                    element={<App />}
                                                >
                                                    <Route
                                                        path=":server_name/:server_id"
                                                        element={
                                                            <IsUserInServer />
                                                        }
                                                    >
                                                        <Route
                                                            path=":channel_id"
                                                            element={
                                                                <IsUserInChannel />
                                                            }
                                                        />
                                                    </Route>
                                                </Route>
                                                <Route
                                                    path="/settings"
                                                    element={<Settings />}
                                                />
                                                <Route
                                                    path="/join"
                                                    element={<Join />}
                                                />

                                                <Route
                                                    path="create/server"
                                                    element={<Server />}
                                                />
                                                <Route
                                                    path="create/organisation"
                                                    element={<Organisation />}
                                                />

                                                <Route
                                                    path="/dashboard/:serverid"
                                                    element={<Dashboard />}
                                                />
                                            </Route>
                                            <Route
                                                path="/login"
                                                element={<Login />}
                                            />
                                            <Route
                                                path="/reset"
                                                element={<ResetPassword />}
                                            />
                                            <Route
                                                path="*"
                                                element={<NotFound />}
                                            />
                                        </Routes>
                                    </ChatMessageProvider>
                                </CurrentChannelProvider>
                            </CurrentServerProvider>
                        </MessageListProvider>
                    </AuthProvider>
                </ThemeProvider>
            </HelmetProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
