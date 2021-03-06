/**
 * @author
 * ISAB Dev Team
 * 
 * @description
 * Split from urlib/static.isab.top
 * 
 * Awesome background images for ISAB pages.
 * 
 * We have moved to [npm](https://www.npmjs.com/package/32ae08ef). This file is no longer maintained. 
 * 
 * You can Load this file from jsDelivr (fast and reliable):
 * https://cdn.jsdelivr.net/npm/32ae08ef@latest/loadBackground.js
 * 
 * There is also a minified version (thanks to jsDelivr):
 * https://cdn.jsdelivr.net/npm/32ae08ef@latest/loadBackground.min.js
 */

(() => {
    // Basic Tool Functions
    const randomChoice = list => list[Math.floor(Math.random() * list.length)];

    // Configurations
    const imgLists = ['d00f8cce', '8ca2cd3a', '3072a9bf', 'e0b928fc'];
    const blankGif = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
    const refreshDuration = 20 * 1000; // ms
    window.isWebpSupported = window.isWebpSupported || (document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0);

    const fetchImgList = async () => {
        const getImgListUrl = () => `https://cdn.jsdelivr.net/npm/32ae08ef@latest/json/loadBackground.imageList.${randomChoice(imgLists)}.json`;
        const reportError = err => {
            console.warn(`fetchImgList: An error occured: ${err.message}. Use blank.gif as fallback. `);
        };
        return await fetch(getImgListUrl(), {
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
            window.imgList = await fetchImgList();
            window.imgListUpdAt = Date.now();
        } else {
            if (Date.now() - imgListUpdAt >= refreshDuration) {
                const newList = await fetchImgList();
                if (newList) {
                    imgList = newList;
                    imgListUpdAt = Date.now();
                } else {
                    setTimeout(async () => { await updImgList(); }, refreshDuration);
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
    const setBackgroundImg = async () => {
        const imgUrl = await (async () => {
            await updImgList();
            const img = imgList ? randomChoice(imgList) : { fallback: blankGif };
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
