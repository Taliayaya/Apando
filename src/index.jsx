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
import CreateServer from './/pages/CreateServer'
import ResetPassword from './/pages/ResetPassword'
import Terms from './/pages/Terms'
import Privacy from './/pages/Privacy'
import Dashboard from './/pages/Dashboard'
import { ThemeProvider } from '@mui/material'
import { themeMui } from './/utils/style/colors'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={themeMui}>
                <AuthProvider>
                    <MessageListProvider>
                        <CurrentServerProvider>
                            <CurrentChannelProvider>
                                <ChatMessageProvider>
                                    <GlobalStyle />

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
                                        <Route
                                            path="/app"
                                            element={
                                                <RequireAuth>
                                                    <App />
                                                </RequireAuth>
                                            }
                                        >
                                            <Route
                                                path=":server_name/:server_id"
                                                element={
                                                    <RequireAuth>
                                                        <App />
                                                    </RequireAuth>
                                                }
                                            >
                                                <Route
                                                    path=":channel_id"
                                                    element={
                                                        <RequireAuth>
                                                            <App />
                                                        </RequireAuth>
                                                    }
                                                />
                                            </Route>
                                        </Route>
                                        <Route
                                            path="/settings"
                                            element={
                                                <RequireAuth>
                                                    <Settings />
                                                </RequireAuth>
                                            }
                                        />
                                        <Route
                                            path="/join"
                                            element={
                                                <RequireAuth>
                                                    <Join />
                                                </RequireAuth>
                                            }
                                        />
                                        <Route
                                            path="/create"
                                            element={
                                                <RequireAuth>
                                                    <CreateServer />
                                                </RequireAuth>
                                            }
                                        />
                                        <Route
                                            path="/dashboard/:serverid"
                                            element={
                                                <RequireAuth>
                                                    <Dashboard />
                                                </RequireAuth>
                                            }
                                        />
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
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
