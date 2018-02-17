import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from 'components/views/shared/Shell/Header';
import Link from 'next/link'

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render unauthenticated', () => {
    const header = shallow(<Header />);

    expect(header.find(Link)).toHaveLength(3)

    expect(header.find(Link).find('[href="/"] a img [src="/static/logo.png"]').exists()).toEqual(true);
    expect(header.find('[href="/indique"]').find('a').text()).toEqual('Indique e Ganhe');
    expect(header.find('[href="/jobs"]').find('a').text()).toEqual('Trabalhe Conosco');

    expect(header.find('[href="/auth/logout"]').exists()).toEqual(false);
    expect(header.find('[href="/listings/new"]').exists()).toEqual(false);
  })

  it('should render authenticated', () => {
    const header = shallow(<Header authenticated={true}/>);

    expect(header.find(Link)).toHaveLength(5)

    expect(header.find(Link).find('[href="/"] a img [src="/static/logo.png"]').exists()).toEqual(true);
    expect(header.find('[href="/indique"]').find('a').text()).toEqual('Indique e Ganhe');
    expect(header.find('[href="/jobs"]').find('a').text()).toEqual('Trabalhe Conosco');

    expect(header.find('[href="/auth/logout"]').find('a').text()).toEqual('Logout');
    expect(header.find('[href="/listings/new"]').find('a').text()).toEqual('Adicionar Imóvel');
  })
})
