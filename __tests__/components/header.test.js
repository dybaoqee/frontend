/* eslint-env jest */
import {shallow} from 'enzyme'
import Header from 'components/shared/Shell/Header'
import Link from 'next/link'

describe('Header', () => {
  it('should render unauthenticated', () => {
    const header = shallow(<Header />)

    expect(header.find(Link)).toHaveLength(7)

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

    expect(
      header
        .find('[href="http://blog.emcasa.com"]')
        .find('a')
        .text()
    ).toEqual('Blog')

    expect(header.find('[href="/auth/logout"]').exists()).toEqual(false)
    expect(header.find('[href="/auth/login"]').exists()).toEqual(true)
    expect(header.find('[href="/auth/signup"]').exists()).toEqual(true)
    expect(header.find('[href="/listings/new"]').exists()).toEqual(true)
  })

  it('should render authenticated', () => {
    const header = shallow(<Header authenticated={true} isAdmin={true} />)

    expect(header.find(Link)).toHaveLength(7)

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
        .find('[href="http://blog.emcasa.com"]')
        .find('a')
        .text()
    ).toEqual('Blog')

    expect(
      header
        .find('[href="/auth/logout"]')
        .find('a')
        .text()
    ).toEqual('Sair')

    expect(
      header
        .find('[href="/listings/sell/know-more"]')
        .find('a')
        .text()
    ).toEqual('Venda')

    expect(header.find('[href="/auth/logout"]').exists()).toEqual(true)
    expect(header.find('[href="/login"]').exists()).toEqual(false)
    expect(header.find('[href="/signup"]').exists()).toEqual(false)
  })
})
