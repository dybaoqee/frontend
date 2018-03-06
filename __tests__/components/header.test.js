/* eslint-env jest */
import {shallow} from 'enzyme'
import Header from 'components/shared/Shell/Header'
import Link from 'next/link'

describe('Header', () => {
  it('should render unauthenticated', () => {
    const header = shallow(<Header />)

    expect(header.find(Link)).toHaveLength(4)

    expect(
      header
        .find(Link)
        .find(
          '[href="/"] a img [src="/static/emcasa-imobiliaria-rio-de-janeiro.png"]'
        )
        .exists()
    ).toEqual(true)

    expect(
      header
        .find('[href="/sell"]')
        .find('a')
        .text()
    ).toEqual('Venda seu Imóvel')

    expect(
      header
        .find('[href="/indique"]')
        .find('a')
        .text()
    ).toEqual('Indique e Ganhe')

    expect(
      header
        .find('[href="/jobs"]')
        .find('a')
        .text()
    ).toEqual('Trabalhe Conosco')

    expect(header.find('[href="/auth/logout"]').exists()).toEqual(false)
    expect(header.find('[href="/listings/new"]').exists()).toEqual(false)
  })

  it('should render authenticated', () => {
    const header = shallow(<Header authenticated={true} isAdmin={true} />)

    expect(header.find(Link)).toHaveLength(6)

    expect(
      header
        .find(Link)
        .find(
          '[href="/"] a img [src="/static/emcasa-imobiliaria-rio-de-janeiro.png"]'
        )
        .exists()
    ).toEqual(true)

    expect(
      header
        .find('[href="/indique"]')
        .find('a')
        .text()
    ).toEqual('Indique e Ganhe')

    expect(
      header
        .find('[href="/jobs"]')
        .find('a')
        .text()
    ).toEqual('Trabalhe Conosco')

    expect(
      header
        .find('[href="/auth/logout"]')
        .find('a')
        .text()
    ).toEqual('Logout')

    expect(
      header
        .find('[href="/listings/new"]')
        .find('a')
        .text()
    ).toEqual('Adicionar Imóvel')
  })

  it('should not show Add Listing button if not admin', () => {
    const header = shallow(<Header authenticated={true} />)

    expect(
      header
        .find(Link)
        .find('[href="/listings/new"]')
        .exists()
    ).toEqual(false)
  })
})
