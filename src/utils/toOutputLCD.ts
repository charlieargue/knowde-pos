import fs from 'fs';

const toOutputLCD = async (contents: string) => {
    const outputFilename = `output-LCD.txt`;
    fs.appendFileSync(outputFilename, contents + '\n');
    return;

};
export default toOutputLCD;