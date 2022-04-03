const puppeteer = require("puppeteer")
const fs = require("fs/promises")

let productsData: any[] = []
export default class SingleProScrup {
    public static proNames = async (msg: string) => {
        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()

        // //scrap from page
        await page.goto(`https://www.rami-levy.co.il/he/online/search?q=${msg}`, { waitUntil: 'networkidle0', })
        const productNames = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div > div>div > div.position-relative.my-md-1.mx-2.m-text.online-product-name.line-height-1-1 > div",
            (el: any) => {
                return el.map((product: any) => product.textContent)
            })
        const pictures = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div > div>div > div.product-img-wrap.position-relative > div",
            (el: any) => {
                return el.map((img: any) => img.style.backgroundImage.slice(5, img.style.backgroundImage.length - 2))
            })
        console.log(pictures)
        const price = await page.$$eval("#main-content > div:nth-child(1) > div.focus-item.online-catalog-wrap.pb-3.pb-lg-1.d-flex.flex-wrap.align-content-end.product-gallery > div >div >div> div.px-1.font-weight-bold.text-right.ml-text.tag-price.blue > div > div > span > span",
            (el: any) => {
                return el.map((product: any) => product.textContent)
            })
        await browser.close()
        for (let i = 0; i < productNames.length; i++) {
            productsData.push({ productNames: productNames[i], pictures: pictures[i], price: price[i] })
        }
        return productsData;
    }
}
