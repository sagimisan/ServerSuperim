
// in a new folder be sure to run "npm init -y" and "npm install puppeteer"
const puppeteer = require("puppeteer")
const fs = require("fs/promises")

export default async function scrapFromRamyLevy() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  // //scrap from page
  await page.goto("https://www.rami-levy.co.il/he/online/search?q=שמפו", { waitUntil: 'networkidle0', })
  const productNames = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div > div>div > div.position-relative.my-md-1.mx-2.m-text.online-product-name.line-height-1-1 > div", (el: any) => {
    return el.map((product: any) => product.textContent)
  })
  // console.log(productNames)
  // await fs.appendFile("pro.txt", productNames.join("\r\n"))

  // //scrap imgs from page
  // await page.goto("https://www.rami-levy.co.il/he/online/search?q=שמפו",{  waitUntil: 'networkidle0',})
  //   const pictures = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div > div>div > div.product-img-wrap.position-relative > div", el => {
  //     return el.map(img => img.style.backgroundImage.slice(5,img.style.backgroundImage.length-2))
  //   })
  //   console.log(pictures)
  //       const price = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div >div >div> div.px-1.font-weight-bold.text-right.ml-text.tag-price.blue > div > div > span > span", el => {
  //     return el.map(product => product.textContent)
  //   })
  //   console.log(price)
  // await fs.appendFile("pictures.txt", price.join("\r\n"))


  //scrap from textInput
  // await page.goto("https://www.rami-levy.co.il/he")
  // await page.click("#__layout > div > div:nth-child(1) > div.w-100-vw.position-fixed.online-header-wrap.z-index-5 > div.d-lg-flex.align-items-center.justify-content-between.bd-highlight.bg-gray-100.z-index-10 > div.d-flex.w-100.justify-content-between.bg-white.border-radius-bottom-10.rl-boxshadow > div > div > div.focus-item.d-flex.align-items-center.justify-content-center.d-lg-none.mobile-menu-icon-wrap.search")
  // await page.type("#destination", "שמפו")
  // setTimeout(async () => {
  //   const productNames = await page.$$eval("div> div > div.text-wrap.px-2.xs-text.line-height-1-2.mt-2.overflow-ellipsis", el => {
  //     return el.map(product => product.textContent)
  //   })
  //   // console.log(productNames)
  //   //scrap imgs from page
  //   const pictures = await page.$$eval("#search > div.main-online-search.rl-transition.z-index-999999.show-results > div > div.search-box.my-2.mx-2 > div > div.dropdown.show.bg-white.border-radius-bottom-15 > div > div > div.col-md-6.d-flex.align-items-start.flex-column.bd-highlight.w-100 > div.mb-auto.bd-highlight.w-100 > div > div > div > div >div> div.product-img-wrap.position-relative > div", el => {
  //     return el.map(img => img.style.backgroundImage.slice(5, img.style.backgroundImage.length - 2))
  //   })
  //   const price = await page.$$eval("div > div > div.text-right.blue > span > span", el => {
  //     return el.map(product => product.textContent)
  //   })
  //   // console.log(price)
  //   // await fs.writeFile("pictures.txt", pictures.join("\r\n"))
  // }, 3000);

  await browser.close()
  return productNames

}

scrapFromRamyLevy()