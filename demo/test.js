

const resultFile = __dirname + '/.results/demo.rtf';

// YM (DEBUG)
const modules = global.modules = require('ym');
// Preload modules required by jsRTF (in real emnvironment need to be loaded before using jsRTF)...
if ( typeof modules === 'object' ) {
    require('inherit');
}

const jsRTF = require('../jsrtf');

if ( typeof modules === 'object' ) {
    console.log('Run demo using YM...');
    modules.require([
        'jsrtf',
    ], testRTF);
}
else {
    console.log('Run demo using commonJS...');
    testRTF(jsRTF);
}

function testRTF (jsRTF) {

    // create rtf
    var myDoc = new jsRTF({
        language : jsRTF.Language.RU,
    });

    var textFormat = new jsRTF.Format({
        spaceBefore : 300,
        spaceAfter : 300,
        paragraph : true,
    });
    myDoc.writeText('demo', textFormat);

    // add table
    var table = new jsRTF.TableElement();
    //add rows
    table.addRow(['Table row', 'with two columns']);
    table.addRow(['Second row', 'and the second column']);
    myDoc.addTable(table);

    myDoc.writeText('demo2', textFormat);
    myDoc.writeText('demo3', textFormat);

    // // add table
    // var table2 = new TableElement();
    // // You can manually set the data *overwrites any data in the table
    // table2.setData([
    //     ['Name', 'Price', 'Sold'],
    //     ['Rubber Ducky', '$10.00', '22'],
    //     ['Widget', '$99.99', '42'],
    //     ['Sproket', '$5.24', '11']
    // ]);
    // //adding a row to an existing data set
    // table2.addRow(['Banana', '$0.12', '1']);
    // myDoc.addTable(table2);

    // make content & write file...
    var content = myDoc.createDocument();
    writeResult(content);
}

function writeResult (content) {

    const
        // nodejs core...
        path  = require('path'),
        fs  = require('fs-extra')
    ;

    // writing file
    fs.ensureDirSync(path.dirname(resultFile));
    fs.writeFile(resultFile, content, function (error) {
        if ( !error ) {
            console.info('Created file ' + resultFile);
        }
        else {
            console.error(error);
        }
    });

}

