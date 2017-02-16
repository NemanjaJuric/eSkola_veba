import { ESkolaVebaPage } from './app.po';

describe('e-skola-veba App', function() {
  let page: ESkolaVebaPage;

  beforeEach(() => {
    page = new ESkolaVebaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
