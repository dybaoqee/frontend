/* eslint-env jest */
import {shallow} from 'enzyme'
import Header from 'components/shared/Shell/Header'
import UserMenu from 'components/shared/Shell/Header/UserMenu'
import Link from 'next/link'

describe('Header', () => {
  it('should render unauthenticated', () => {
    const header = shallow(<Header />)

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
        .find('[href="/listings"]')
        .find('a')
        .text()
    ).toEqual('Compre')

    expect(
      header
        .find('[href="/listings/sell/know-more"]')
        .find('a')
        .text()
    ).toEqual('Venda')

    expect(
      header
        .find('[href="/indique"]')
        .find('a')
        .text()
    ).toEqual('Indique e Ganhe')

    expect(header.find(UserMenu).exists()).toEqual(false)
    expect(header.find('[href="/listings/sell/know-more"]').exists()).toEqual(
      true
    )
  })

  it('should render authenticated', () => {
    const header = shallow(<Header authenticated={true} isAdmin={true} />)
    expect(header.find(Link)).toHaveLength(5)

    expect(header.find(UserMenu).exists()).toEqual(true)

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
        .find('[href="/dashboard"]')
        .find('a')
        .text()
    ).toEqual('Dashboard')

    expect(
      header
        .find('[href="/listings/sell/know-more"]')
        .find('a')
        .text()
    ).toEqual('Venda')
  })
})
