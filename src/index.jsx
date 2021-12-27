import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import App from './pages/App'
import Home from './pages/Home'
import Login from './pages/Login'
import Settings from './pages/Settings'
import SignIn from './pages/SignIn'
import RequireAuth from './components/RequireAuth'
import {
    AuthProvider,
    CurrentChannelProvider,
    UserDataProvider,
    CurrentServerProvider,
    ChatMessageProvider,
} from './utils/context'
import NotFound from './components/NotFound'
import GlobalStyle from './utils/style/GlobalStyle'
import Join from './pages/Join'

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <UserDataProvider>
                    <CurrentServerProvider>
                        <CurrentChannelProvider>
                            <ChatMessageProvider>
                                <GlobalStyle />

                                <Routes>
                                    <Route
                                        path="/"
                                        element={
                                            <>
                                                <Header />
                                                <Home />
                                            </>
                                        }
                                    />
                                    <Route
                                        path="/signin"
                                        element={<SignIn />}
                                    />
                                    <Route
                                        path="/app"
                                        element={
                                            <RequireAuth>
                                                <App />
                                            </RequireAuth>
                                        }
                                    />
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
                                    <Route path="/login" element={<Login />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </ChatMessageProvider>
                        </CurrentChannelProvider>
                    </CurrentServerProvider>
                </UserDataProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
)
