/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import puppeteer from 'puppeteer'

import { scrollIntoViewIfNeeded, waitForSelectors } from '../modules/puppeteer'

export const signIntoWondrium = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const timeout = 5000
  page.setDefaultTimeout(timeout)

  {
    const targetPage = page
    await targetPage.setViewport({ width: 1146, height: 1311 })
  }

  {
    const targetPage = page
    const promises = []
    promises.push(targetPage.waitForNavigation())
    await targetPage.goto('https://www.wondrium.com/')
    await Promise.all(promises)
  }

  {
    const targetPage = page
    await scrollIntoViewIfNeeded(
      [
        ['#sign-in-btn > a > button > span'],
        ['xpath///*[@id="sign-in-btn"]/a/button/span'],
      ],
      targetPage,
      timeout
    )
    const element = await waitForSelectors(
      [
        ['#sign-in-btn > a > button > span'],
        ['xpath///*[@id="sign-in-btn"]/a/button/span'],
      ],
      targetPage,
      { timeout, visible: true }
    )
    await element.click({
      offset: {
        x: 15.53057861328125,
        y: 12.97760009765625,
      },
    })
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded(
      [['aria/Your Email'], ['#email'], ['xpath///*[@id="email"]']],
      targetPage,
      timeout
    )
    const element = await waitForSelectors(
      [['aria/Your Email'], ['#email'], ['xpath///*[@id="email"]']],
      targetPage,
      { timeout, visible: true }
    )
    await element.click({
      offset: {
        x: 93.359375,
        y: 18,
      },
    })
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded(
      [['aria/Your Email'], ['#email'], ['xpath///*[@id="email"]']],
      targetPage,
      timeout
    )
    const element = await waitForSelectors(
      [['aria/Your Email'], ['#email'], ['xpath///*[@id="email"]']],
      targetPage,
      { timeout, visible: true }
    )
    const type = await element.evaluate((el: { type: any }) => el.type)
    if (['select-one'].includes(type)) {
      await element.select('aawalton@gmail.com')
    } else if (
      [
        'textarea',
        'text',
        'url',
        'tel',
        'search',
        'password',
        'number',
        'email',
      ].includes(type)
    ) {
      await element.type('aawalton@gmail.com')
    } else {
      await element.focus()
      await element.evaluate(
        (
          el: { value: any; dispatchEvent: (arg0: Event) => void },
          value: any
        ) => {
          el.value = value
          el.dispatchEvent(new Event('input', { bubbles: true }))
          el.dispatchEvent(new Event('change', { bubbles: true }))
        },
        'aawalton@gmail.com'
      )
    }
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded(
      [['aria/Your Password'], ['#pass'], ['xpath///*[@id="pass"]']],
      targetPage,
      timeout
    )
    const element = await waitForSelectors(
      [['aria/Your Password'], ['#pass'], ['xpath///*[@id="pass"]']],
      targetPage,
      { timeout, visible: true }
    )
    await element.click({
      offset: {
        x: 81.359375,
        y: 19,
      },
    })
  }
  {
    const targetPage = page
    await scrollIntoViewIfNeeded(
      [['aria/Your Password'], ['#pass'], ['xpath///*[@id="pass"]']],
      targetPage,
      timeout
    )
    const element = await waitForSelectors(
      [['aria/Your Password'], ['#pass'], ['xpath///*[@id="pass"]']],
      targetPage,
      { timeout, visible: true }
    )
    const type = await element.evaluate((el: { type: any }) => el.type)
    if (['select-one'].includes(type)) {
      await element.select('bxv@cvp5FPT!ptp0zvu')
    } else if (
      [
        'textarea',
        'text',
        'url',
        'tel',
        'search',
        'password',
        'number',
        'email',
      ].includes(type)
    ) {
      await element.type('bxv@cvp5FPT!ptp0zvu')
    } else {
      await element.focus()
      await element.evaluate(
        (
          el: { value: any; dispatchEvent: (arg0: Event) => void },
          value: any
        ) => {
          el.value = value
          el.dispatchEvent(new Event('input', { bubbles: true }))
          el.dispatchEvent(new Event('change', { bubbles: true }))
        },
        'bxv@cvp5FPT!ptp0zvu'
      )
    }
  }
}
