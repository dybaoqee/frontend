import React from 'react';
import {shallow} from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/header';

configure({ adapter: new Adapter() });

describe('Header', () => {
  it('should render correctly', () => {
    const header = shallow(<Header />);

    expect(header.find('[href="/indique"]').find('a').text())
      .toEqual('Indique e Ganhe')
  })
})
