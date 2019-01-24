import {
  updateSelection,
  isNeighborhoodSelected
} from 'components/shared/NeighborhoodPicker/selection'

describe('neighborhood selection test', () => {
  it('should add a neighborhood to selection', () => {
    let neighborhoods = []
    let newSelection = updateSelection(neighborhoods, 'copacabana')
    expect(newSelection).toEqual(['copacabana'])
  })

  it('should remove an already selected neighborhood', () => {
    let neighborhoods = ['copacabana']
    let newSelection = updateSelection(neighborhoods, 'copacabana')
    expect(newSelection).toEqual([])
  })

  it('should return true if the given neighborhood is selected', () => {
    let selectedNeighborhoods = ['copacabana', 'ipanema']
    expect(isNeighborhoodSelected(selectedNeighborhoods, 'ipanema')).toBe(true)
    expect(isNeighborhoodSelected(selectedNeighborhoods, 'botafogo')).toBe(false)
  })
})
