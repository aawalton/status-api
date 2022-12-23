const puppeteer = require('puppeteer'); // v13.0.0 or later

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({"width":1146,"height":1311})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("https://www.wondrium.com/");
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["#sign-in-btn > a > button > span"],["xpath///*[@id=\"sign-in-btn\"]/a/button/span"]], targetPage, timeout);
        const element = await waitForSelectors([["#sign-in-btn > a > button > span"],["xpath///*[@id=\"sign-in-btn\"]/a/button/span"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 15.53057861328125,
            y: 12.97760009765625,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/Your Email"],["#email"],["xpath///*[@id=\"email\"]"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/Your Email"],["#email"],["xpath///*[@id=\"email\"]"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 93.359375,
            y: 18,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/Your Email"],["#email"],["xpath///*[@id=\"email\"]"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/Your Email"],["#email"],["xpath///*[@id=\"email\"]"]], targetPage, { timeout, visible: true });
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select("aawalton@gmail.com");
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type("aawalton@gmail.com");
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "aawalton@gmail.com");
        }
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/Your Password"],["#pass"],["xpath///*[@id=\"pass\"]"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/Your Password"],["#pass"],["xpath///*[@id=\"pass\"]"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 81.359375,
            y: 19,
          },
        });
    }
    {
        const targetPage = page;
        await scrollIntoViewIfNeeded([["aria/Your Password"],["#pass"],["xpath///*[@id=\"pass\"]"]], targetPage, timeout);
        const element = await waitForSelectors([["aria/Your Password"],["#pass"],["xpath///*[@id=\"pass\"]"]], targetPage, { timeout, visible: true });
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select("bxv@cvp5FPT!ptp0zvu");
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type("bxv@cvp5FPT!ptp0zvu");
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, "bxv@cvp5FPT!ptp0zvu");
        }
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await scrollIntoViewIfNeeded([["#send2 > span.btn-text"],["xpath///*[@id=\"send2\"]/span[2]"]], targetPage, timeout);
        const element = await waitForSelectors([["#send2 > span.btn-text"],["xpath///*[@id=\"send2\"]/span[2]"]], targetPage, { timeout, visible: true });
        await element.click({
          offset: {
            x: 40.421875,
            y: 18.45001220703125,
          },
        });
        await Promise.all(promises);
    }

    await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(selectors, frame, timeout) {
      const element = await waitForSelectors(selectors, frame, { visible: false, timeout });
      if (!element) {
        throw new Error(
          'The element could not be found.'
        );
      }
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      const timeoutId = setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          clearTimeout(timeoutId);
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})().catch(err => {
    console.error(err);
    process.exit(1);
});
