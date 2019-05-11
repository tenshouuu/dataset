var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
const fastcsv = require('fast-csv');
const ws = fs.createWriteStream("out.csv");

var inputFile = './bubble9-1.csv';

var parser = parse({delimiter: ','}, function (err, data) {
    let newArray = [
        /*['filename',
            'width',
            'height',
            'class',
            'xmin',
            'ymin',
            'xmax',
            'ymax'],*/
    ];

    async.eachSeries(data, function (line, callback) {
        // do something with the line
        //console.log(line[0]);
        let filename = line[0].replace('bmp', 'jpg');
        line[0] = filename;
        newArray.push(line);
        //console.log(line)
        callback()
    })
    setTimeout(() => {
        console.log('new data', newArray)
        fastcsv
          .write(newArray, { headers: true })
          .pipe(ws);
    }, 2000);
});

fs.createReadStream(inputFile).pipe(parser);