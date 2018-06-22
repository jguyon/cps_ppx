#!/usr/bin/env node

var fs = require('fs');

var arch = process.arch;
var platform = process.platform;

if (arch === 'ia32') {
    arch = 'x86';
}

if (platform === 'win32') {
    platform = 'win';
}

var filename = 'bin/cps_ppx-' + platform + '-' + arch + '.exe';
var supported = fs.existsSync(filename);

if (!supported) {
    console.error('cps_ppx does not support this platform :(');
    console.error('');
    console.error('cps_ppx comes prepacked as built binaries to avoid large');
    console.error('dependencies at build-time.');
    console.error('');
    console.error('If you want cps_ppx to support this platform natively,');
    console.error('please open an issue at our repository, linked above. Please');
    console.error('specify that you are on the ' + platform + ' platform,');
    console.error('on the ' + arch + ' architecture.');

    if (!process.env.IS_cps_PPX_CI) {
        process.exit(1);
    }
}

if (process.env.IS_cps_PPX_CI) {
    console.log('cps_ppx: IS_cps_PPX_CI has been set, skipping moving binary in place');
    process.exit(0);
}

if (!fs.existsSync('ppx')) {
    copyFileSync(filename, 'ppx');
    fs.chmodSync('ppx', 0755);
}

if (!fs.existsSync('ppx.exe')) {
    copyFileSync(filename, 'ppx.exe');
    fs.chmodSync('ppx.exe', 0755);
}

function copyFileSync(source, dest) {
    if (typeof fs.copyFileSync === 'function') {
        fs.copyFileSync(source, dest);
    } else {
        fs.writeFileSync(dest, fs.readFileSync(source));
    }
}