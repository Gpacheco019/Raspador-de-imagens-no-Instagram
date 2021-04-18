const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/path_insta_domain_user/'); //passar ULR do instagram que querira

    const imgList = await page.evaluate(() => {
        //   Toda essa Função será executado no browser
        // pegar todas a imagens que estão na pagina de posts
        const nodeList = document.querySelectorAll('article img');

        // Transformar os nodelist em array
        const imgArray = [...nodeList];
        // Tranformar os node (elementos HTML) em objetos JS
        const imglist = imgArray.map(({ src }) => ({
            src
        }))

        return imglist;
       
    });

    //   escrever os dados em arquivo local (json);
    fs.writeFile('Instagram.json', JSON.stringify(imgList, null, 2), err => {
        if (err) throw new Error('something went wrong')

        console.log('well done!')
    })



    await browser.close();
})();