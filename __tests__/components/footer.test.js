import React from 'react'
import {shallow} from 'enzyme'
import Footer from 'components/shared/Shell/Footer'
import Link from 'next/link'

import Header from 'components/shared/Shell/Header'

describe("footer", () => {
  it("should have the same logo as header's", () => {
    const header = shallow(<Header/>)
    const footer = shallow(<Footer/>)

    const urlLogoHeader = header
      .find(Link)
      .find('[href="/"] a img')
      .prop("src")

    const urlLogoFooter = footer
      .find(Link)
      .find('[href="/"] a img')
      .prop("src")

    expect(urlLogoHeader).toBe(urlLogoFooter)

  })
})
