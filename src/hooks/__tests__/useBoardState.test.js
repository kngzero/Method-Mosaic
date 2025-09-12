import { renderHook, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import useBoardState from '../useBoardState'

describe('useBoardState undo/redo', () => {
  it('reverts and reapplies state changes', () => {
    const { result } = renderHook(() => useBoardState())

    act(() => result.current.setBoardTitle('First'))
    act(() => result.current.setBoardTitle('Second'))
    expect(result.current.boardTitle).toBe('Second')

    act(() => result.current.undo())
    expect(result.current.boardTitle).toBe('First')

    act(() => result.current.redo())
    expect(result.current.boardTitle).toBe('Second')
  })
})
