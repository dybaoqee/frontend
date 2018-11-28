/* eslint-env jest */
import {shallow} from 'enzyme'
import Header from 'components/shared/Shell/Header'
import UserMenu from 'components/shared/Shell/Header/UserMenu'
import { Logo } from 'components/shared/Shell/Header/styles'
import Link from 'next/link'

describe('Header', () => {
  it.only('should render unauthenticated', () => {
    const header = shallow(<Header />)

    expect(header.find(Link)).toHaveLength(3)

    expect(
      header
        .find(Logo)
        .exists()
    ).toEqual(true)

    expect(
      header
        .find('[href="/listings"]')
        .find('span')
        .text()
    ).toEqual('Buscar Imóveis')

    expect(
      header
        .find('[href="/listings/sell"]')
        .find('span')
        .text()
    ).toEqual('Quero anunciar')

    expect(header.find(UserMenu).exists()).toEqual(false)
    expect(header.find('[href="/listings/sell"]').exists()).toEqual(
      true
    )
  })

  it('should render authenticated', () => {
    const header = shallow(<Header authenticated={true} isAdmin={true} />)
    expect(header.find(Link)).toHaveLength(3)

    expect(header.find(UserMenu).exists()).toEqual(true)

    expect(
      header
        .find(Logo)
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
