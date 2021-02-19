/**
* 背景：项目迁移，js/jsx 文件中存在大量 px 单位，需转成 rem
* 使用方法：将此文件放到 src 相同目录下，执行 node ./changePx2Rem.js
*/
const path = require('path');
const fs = require('fs');

function translateFile(pathName) {
    console.log(pathName);
    if (pathName.endsWith('.js') || pathName.endsWith('.jsx')) {
        fs.readFile(pathName, (err, data) => {
            if (err) {
                return console.log(err);
            }
            let hasChange = false;
            const result = data.toString().replace(/[0-9]+px/g, (str) => {
                hasChange = true;
                const pxNumber = Number(str.match(/([0-9]+)px/)[1]);
                console.log(pxNumber);
                return pxNumber === 0 ? pxNumber : `${pxNumber / 16}rem`;
            });
            if (hasChange) {
                fs.writeFileSync(pathName, result);
            }
        });
    }
}
function travel(rootPath) {
    let files = null;
    try {
        files = fs.readdirSync(rootPath);
    } catch (error) {
        console.error(error);
    }
    if (files) {
        files.forEach(function (fileName) {
            const pathName = path.join(rootPath, fileName);
            if (fs.statSync(pathName).isDirectory()) {
                travel(pathName);
            } else {
                translateFile(pathName);
            }
        });
    }
}
travel('./src');
