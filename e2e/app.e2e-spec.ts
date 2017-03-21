import { PabtrWebPage } from './app.po';

describe('pabtr-web App', () => {
  let page: PabtrWebPage;

  beforeEach(() => {
    page = new PabtrWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
