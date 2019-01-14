import { updateSelection } from 'components/shared/NeighborhoodPicker/components/CityContainer/selection'

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
})
