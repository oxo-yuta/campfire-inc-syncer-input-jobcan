// puppeteer
const puppeteer = require('puppeteer')

// URL
const LOGIN_URL = "https://id.jobcan.jp/users/sign_in?app_key=wf"
const NEW_REQUEST_URL = "https://ssl.wf.jobcan.jp/#/request/new/240083/"
const ACCOUNT_PAGE_URL = "https://id.jobcan.jp/account/"

// STRINGs
const ADMIN_MAIL = "yuta.okuzono@camp-fire.jp"
const MAIL = "yuta.okuzono+jobcan2@camp-fire.jp"
const PASS = "Yuta1024"

class JobCanPuppeteer{

  browser
  page
  logged_in_user_mail

  constructor(){
  }

  async init (){
    this.browser = await puppeteer.launch()
    this.page = await this.browser.newPage()
    await this.login()
  }

  async login(){
    return new Promise( async (resolve, reject) => {
      try{
        // login
        await this.page.goto(LOGIN_URL, {waitUntil: 'networkidle2'})
        await this.page.type('input[name="user[email]"]', MAIL)
        await this.page.type('input[name="user[password]"]', PASS)
        this.page.click('input[type="submit"]');
        await this.page.waitForNavigation({timeout: 60000, waitUntil: 'networkidle2'})
        this.logged_in_user_mail = MAIL
        resolve(true)
      }catch(err){
        console.log('error in goLoginAndSaveCookies')
        reject(err)
      }
    })
  }

  async addRequest(count){
    return new Promise( async (resolve, reject) => {
      try{
        console.log(`work with ${count}`)
        await this.page.goto(NEW_REQUEST_URL, {waitUntil: 'networkidle2'})
        await this.page.waitFor(3000);
        // await this.page.screenshot({path:"1.png"})

        // this.page.click('a[href="https://ssl.wf.jobcan.jp/jbc-oauth/login?lang=en"]')
        // await this.page.waitFor(3000); // ミリ秒
        // await this.page.screenshot({path:"2.png"})

        // this.page.click('a[go-click="/request/"]')
        // await this.page.waitForNavigation({timeout: 60000, waitUntil: 'networkidle2'})
        // await this.page.screenshot({path:"3.png"})


        // await page.waitForSelector('.submitList--hover > .item:nth-child(2) > .item_cursor > .item-description > .ng-scope:nth-child(1)')
        // await page.click('.submitList--hover > .item:nth-child(2) > .item_cursor > .item-description > .ng-scope:nth-child(1)')
        // await this.page.waitForNavigation({timeout: 60000, waitUntil: 'networkidle2'})
        // await this.page.screenshot({path:"4.png"})

        await this.page.type('input[name="title"]', `テスト申請_一般ユーザ２_${count}`)
        // await this.page.screenshot({path:"5.png"})

        this.page.click('button.blueButton')
        await this.page.waitFor(3000);
        // await this.page.screenshot({path:"6.png"})

        this.page.click('button.greenButton')
        await this.page.waitFor(3000)
        // await this.page.screenshot({path:"7.png"})

        if(this.logged_in_user_mail == ADMIN_MAIL){
          // 自分のユーザのときは確認ダイアログが出る
          this.page.click('button[ng-click="ok()"]')
          await this.page.waitFor(3000)
          // await this.page.screenshot({path:"8.png"})
        }
        resolve(true)

      }catch(err){
        console.log('error in goLoginAndSaveCookies')
        reject(err)
      }
    })
  }
}
module.exports = JobCanPuppeteer
