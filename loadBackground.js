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
    // Configurations
    const rootUrl = 'https://cdn.jsdelivr.net/gh/urlib/js_0@latest/';
    const imageListJson = `${rootUrl}json/loadBackground.imageList.d00f8cce.json`;
    const blankGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

    window.isWebpSupported = window.isWebpSupported || (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0);
    const fetchImageList = async () => {
        const reportError = err => {
            console.warn(`fetchImageList: An error occured: ${err.message}. Use blank.gif as fallback. `);
        };
        return await fetch(imageListJson, {
            cache: 'no-store'
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                reportError('Network Error');
                return undefined;
            }
        }).catch(err => {
            reportError(err);
            return undefined;
        });
    };
    const randomChoice = list => {
        list.push(list.shift());
        return list[Math.floor(Math.random() * list.length)];
    };
    const getImageUrl = async () => {
        // global backgroundImageList
        window.backgroundImageList = window.backgroundImageList || await fetchImageList();
        const image = backgroundImageList ? randomChoice(backgroundImageList) : { fallback: blankGif };
        return (isWebpSupported && image.webp) ? image.webp : image.fallback;
    };

    window.addEventListener('load', async () => {
        const imageUrl = await getImageUrl();
        const style = document.body.style;
        style.backgroundImage = `url(${imageUrl})`;
        style.backgroundAttachment = 'fixed';
        style.backgroundSize = '100% 100%';
    });
})();
