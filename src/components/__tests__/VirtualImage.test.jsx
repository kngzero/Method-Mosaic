import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import VirtualImage from '../VirtualImage'

// Mock Image to immediately resolve decoding
class MockImage {
  constructor() {
    this.onload = null
    this.onerror = null
  }
  set src(_src) {}
  decode() { return Promise.resolve() }
}

global.Image = MockImage

describe('VirtualImage', () => {
  it('lazy loads image when it comes into view', async () => {
    let observer
    window.IntersectionObserver = vi.fn((callback) => {
      observer = {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
        trigger: (isIntersecting) => callback([{ isIntersecting, target: {} }])
      }
      return observer
    })

    render(<VirtualImage src="test.jpg" alt="demo" />)
    expect(screen.queryByAltText('demo')).toBeNull()

    observer.trigger(true)
    expect(await screen.findByAltText('demo')).toBeInTheDocument()
  })
})
