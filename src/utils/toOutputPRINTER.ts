import fs from 'fs';

const toOutputPRINTER = async (contents: string) => {
     const outputFilename = `output-PRINTER.txt`;
     fs.appendFileSync(outputFilename, contents + '\n');
     return;

};
export default toOutputPRINTER;