/**
 * @author
 * ISAB Dev Team
 * 
 * @description
 * Split from urlib/static.isab.top
 * 
 * Awesome background images for ISAB pages.
 * 
 * The latest version can always be found here:
 * https://github.com/urlib/js_0/blob/master/loadBackground.js
 * 
 * You can Load this file from jsDelivr (faster and more reliable):
 * https://cdn.jsdelivr.net/gh/urlib/js_0@latest/loadBackground.js
 * 
 * There is also a minified version (thanks to jsDelivr):
 * https://cdn.jsdelivr.net/gh/urlib/js_0@latest/loadBackground.min.js
 */

(() => {
    const rootUrl = 'https://cdn.jsdelivr.net/';
    const backgroundImageList = [
        {
            name: 'Galaxy',
            origin: 'gh/urlib/bin_0@f5a296f9/fe/94/83/5f/fe94835f3f8985e5965b9fe974d1917858affba03182c2aef5071ffbfcaee61c.png',
            webp: 'gh/urlib/bin_0@f5a296f9/95/11/c2/d9/9511c2d95bdce8999a519c9f7c1910b316c4c6728bf6b7ef7ee9cdfd1a0faeb1.webp'
        },
        {
            name: 'Purple Galaxy',
            origin: 'gh/urlib/bin_0@f5a296f9/db/2e/1e/54/db2e1e54c1152b4dfef159d9668427876d7f5cd0a1a8e8caa83afa83cb4914de.png',
            webp: 'gh/urlib/bin_0@f5a296f9/fa/8b/c2/54/fa8bc254ad36808b3bf8d110e11678acb4206c07f12f95ff5d23d8920268259d.webp'
        },
        {
            name: 'milky-way-2695569',
            origin: 'gh/urlib/bin_0@9df0c1b8/4e/4a/cc/27/4e4acc27fe5141b1569159fd67fd0a3f75bd49d473db7cb037cc34b26ab9345b.jpg',
            webp: 'gh/urlib/bin_0@9df0c1b8/04/63/7c/ad/04637cadfd2f562927ba40237a4dddf8e4e777a40332fab19f1ab6ef84408fa1.webp'
        },
        {
            name: 'ocean-3605547',
            origin: 'gh/urlib/bin_0@9df0c1b8/6a/81/d7/86/6a81d7861a3edeb015f3dd815a1af17f739ac25e6e0cddecb98f818c6de1e030.jpg',
            webp: 'gh/urlib/bin_0@9df0c1b8/09/61/ed/d9/0961edd9edc1a2b0c98fdc6e9254219e1bd4af77eeef8a1f5ee9baa89503730b.webp'
        }
    ];

    const completeUrl = (partialUrl) => {
        return `${rootUrl}${partialUrl}`;
    };
    const checkWebpSupport = () => {
        return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0;
    };
    const isWebpSupported = checkWebpSupport();
    const randomChoice = (list) => {
        list.push(list.shift());
        return list[Math.floor(Math.random() * list.length)];
    };
    const imageChoice = (isWebpSupported) => {
        const image = randomChoice(backgroundImageList);
        return completeUrl(isWebpSupported ? image.webp : image.origin);
    };
    const imageUrl = imageChoice(isWebpSupported);

    window.addEventListener('load', () => {
        const style = document.body.style;
        style.backgroundImage = `url(${imageUrl})`;
        style.backgroundAttachment = 'fixed';
        style.backgroundSize = '100% 100%';
    });
})();
