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
    const rootUrl = 'https://cdn.jsdelivr.net/gh/urlib/js_0@master/';
    const imgListJson = `${rootUrl}json/loadBackground.imageList.d00f8cce.json`;
    const blankGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const retryDuration = 1 * 1000; // ms, will *= 2 each unsuccessful attempt

    window.isWebpSupported = window.isWebpSupported || (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);
    const fetchImgList = async () => {
        const reportError = err => {
            console.warn(`fetchImgList: An error occured: ${err.message}. Use blank.gif as fallback. `);
        };
        return await fetch(imgListJson, {
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
    const updImgList = async () => {
        // global imgList, imgListUpdAt
        if (!window.imgListUpdAt) {
            window.imgList = await fetchImgList() || [{ fallback: blankGif }];
            window.imgListUpdAt = Date.now();
        } else {
            if (Date.now() - window.imgListUpdAt > retryDuration) {
                const newList = await fetchImgList();
                if (newList) {
                    window.imgList = newList;
                    window.imgListUpdAt = Date.now();
                } else {
                    retryDuration *= 2;
                }
            }
        }
    }
    const getImgBlobUrl = async imgUrl => {
        // global imgCache
        window.imgCache = window.imgCache || {};
        if (imgUrl === blankGif) {
            return blankGif;
        } else {
            if (imgUrl in imgCache) {
                return imgCache[imgUrl];
            } else {
                const img = await fetch(imgUrl, { cache: 'force-cache' }).then(res => res.blob()).catch(() => undefined);
                if (img) {
                    imgCache[imgUrl] = URL.createObjectURL(img);
                    return imgCache[imgUrl];
                } else {
                    const urls = Object.values(imgCache);
                    return randomChoice(urls);
                }
            }
        }
    }
    const randomChoice = list => {
        return list[Math.floor(Math.random() * list.length)];
    };
    const setBackgroundImg = async () => {
        const imgUrl = await (async () => {
            await updImgList();
            const img = randomChoice(imgList);
            return await getImgBlobUrl(isWebpSupported && img.webp ? img.webp : img.fallback);
        })();
        const style = document.body.style;
        style.backgroundImage = `url(${imgUrl})`;
        style.backgroundAttachment = 'fixed';
        style.backgroundSize = '100% 100%';
    }

    window.addEventListener('load', async () => {
        await setBackgroundImg();
        setInterval(async () => { await setBackgroundImg(); }, 20 * 1000);
    });
    window.addEventListener('online', async () => {
        await setBackgroundImg();
    });
})();
