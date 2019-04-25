const url = 'http://localhost:8090/'
describe('/', () => {
  beforeAll(async () => {
    await page.goto(url);
  })

  it('should navigate when clicked on "add transaction" button', async () => {
    const buttonJsPath = `document.querySelector('body > app-shell').shadowRoot.querySelector('list-transactions').shadowRoot.querySelector('mwc-button')`
    const button = (await page.evaluateHandle(buttonJsPath)).asElement()
    await button.click()
    await page.waitForNavigation()
    await expect(page.url()).toEqual(`${url}add-transaction`)
  })
})
