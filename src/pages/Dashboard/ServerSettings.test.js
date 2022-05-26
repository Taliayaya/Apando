import { render, screen, fireEvent } from '@testing-library/react'
import ServerParams from './ServerSettings'

it('renders Params correctly', () => {
    render(
        <ServerParams
            domain="domain"
            serverName="name"
            code="code"
            autoJoin="auto"
        />
    )
    expect(screen.getByText('@domain')).toBeTruthy()
    expect(screen.getByText('code')).toBeTruthy()
    expect(screen.getByText('Automatiquement')).toBeTruthy()
    expect(screen.getByText('Paramètres de name')).toBeTruthy()
    expect(screen.getByTestId('params')).toBeTruthy()
})

it('opens server edit menu with auto', () => {
    render(
        <ServerParams
            domain="domain"
            serverName="name"
            code="code"
            autoJoin="auto"
        />
    )
    fireEvent.click(screen.getByTestId('edit-params'))

    expect(screen.getByDisplayValue('domain')).toBeTruthy()
    expect(screen.getByDisplayValue('code')).toBeTruthy()
    expect(screen.getByDisplayValue('Automatiquement')).toBeTruthy()
})

it('opens server edit menu with manual', () => {
    render(
        <ServerParams
            domain="random.random"
            serverName="random"
            code="42IsTheKey"
            autoJoin="manual"
        />
    )
    fireEvent.click(screen.getByTestId('edit-params'))

    expect(screen.getByDisplayValue('random.random')).toBeTruthy()
    expect(screen.getByDisplayValue('42IsTheKey')).toBeTruthy()
    expect(screen.getByDisplayValue('Sur Demande')).toBeTruthy()
})
