import fs from 'fs';

const toOutputLCD = async (contents: string) => {
    // faux print to LCD output (a file)
    console.log("🖥  ~ contents", contents)

    const outputFilename = `output-LCD.txt`; // NOTE: workaround for paths needed when running on my env
    const fs = require('fs');
    fs.appendFileSync(outputFilename, contents + '\n');
    return;

};
export default toOutputLCD;