/* eslint-env jest */
import {shallow} from 'enzyme'
import Header from 'components/shared/Shell/Header'
import UserMenu from 'components/shared/Shell/Header/UserMenu'
import Link from 'next/link'

describe('Header', () => {
  it.only('should render unauthenticated', () => {
    const header = shallow(<Header />)

    expect(header.find(Link)).toHaveLength(5)

    expect(
      header
        .find(Link)
        .first()
        .find('img')
        .prop('src')
    ).toEqual('/static/emcasa-imobiliaria-rio-de-janeiro.png')

    expect(
      header
        .find('[href="/listings"]')
        .find('span')
        .text()
    ).toEqual('Buscar Imóveis')

    expect(
      header
        .find('[href="/listings/sell/know-more"]')
        .find('span')
        .text()
    ).toEqual('Quero anunciar')

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
        .find('[href="/dashboard"]')
        .find('span')
        .text()
    ).toEqual('Painel')
    expect(
      header
        .find('[href="/listings/fav"]')
        .find('span')
        .text()
    ).toEqual('Favoritos')
  })
})
