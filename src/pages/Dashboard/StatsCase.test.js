import { render, screen } from '@testing-library/react'
import { MemberCase, MessageCase, InviteCase } from './StatsCase'

describe('Test Member, Messages & Invite Cases', () => {
    it('updates correctly members cases', () => {
        const { rerender } = render(<MemberCase nb={42} />)

        expect(screen.getByText(42)).toBeTruthy()

        rerender(<MemberCase nb={43} />)

        expect(screen.getByText(43)).toBeTruthy()
    })

    it('updates correctly messages cases', () => {
        const { rerender } = render(<MessageCase nb={42} />)

        expect(screen.getByText(42)).toBeTruthy()

        rerender(<MessageCase nb={43} />)

        expect(screen.getByText(43)).toBeTruthy()
    })
    it('updates correctly invite cases', () => {
        const { rerender } = render(<InviteCase nb={42} />)

        expect(screen.getByText(42)).toBeTruthy()

        rerender(<InviteCase nb={43} />)

        expect(screen.getByText(43)).toBeTruthy()
    })
})
