import fs from 'fs';
import Jimp = require('jimp');

/**
 * 
 * @param inputURL 
 */
export async function filterImageFromURL(inputUrl: string): Promise<string>{
    return new Promise(async (resolve, reject) => {
        try {
            const photo = await Jimp.read(inputUrl);
            const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
            await photo
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            .greyscale() // set greyscale
            .write(__dirname+outpath, (img)=>{
                resolve(__dirname+outpath);
            });
        } catch(error) {
            reject(error);
        }
    });
}

/**
 * 
 * @param files 
 */
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}