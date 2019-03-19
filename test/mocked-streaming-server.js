const http = require('http');
const httpProxy = require('http-proxy');
const commandLineArgs = require('command-line-args')

const fs = require('fs');
const path = require('path');


const optionDefinitions = [
  { name: 'proxyTarget', alias: 't', type: String },
  { name: 'hostname', alias: 'h', type: String },
  { name: 'port', alias: 'p', type: Number },
  { name: 'dir', alias: 'd', type: String },
  { name: 'streamStartMarker', type: String },
  { name: 'streamEndMarker', type: String },
  { name: 'match', type: RegExp, defaultOption: true}
]
const options = Object.assign(
    {
        port: 9999,
        dir: 'test/',
        hostname: '127.0.0.1',
        streamStartMarker: '<!-- STREAM -->',
        streamEndMarker: '<!-- /STREAM -->'
    },
    commandLineArgs(optionDefinitions)
);

async function wait(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

const proxy = httpProxy.createProxyServer({});

http.createServer(async (request, response) => {
    let content;
    const shouldStream = request.url.match(options.match);
    if(!shouldStream){
        if(options.proxyTarget){
            proxy.web(request, response, {
                target: options.proxyTarget
            });
            return;
        }
    }
    let fileName = request.url.replace(/\/stream\//, '')
                                .replace(/\//g, path.sep);
    try {
        content =  fs.readFileSync(options.dir + fileName, 'utf8');
    } catch(e) {
        response.statusCode = 404;
        response.end();
        return;
    }
    response.setHeader('Content-Type', 'text/html');
    if(shouldStream){
        // console.log(`Mocking ${request.url}`);
        let streamedRegion = false;
        for(const line of content.split("\n")){
            if(line.includes(options.streamStartMarker)){
                streamedRegion = true;
            } else if(line.includes(options.streamEndMarker)){
                streamedRegion = false;
            }
            response.write(line);
            if(streamedRegion){
                await wait(1000);
            }
        }
        response.end();
    } else {
        await wait(50);
        response.end(content);
    }

}).listen(options.port, options.hostname, () => {
    console.log(`Mocked streaming server running at http://${options.hostname}:${options.port}/`);
    if(options.match){
        console.log(`Mocking only URLs matching ${options.match}`);
    }
    if(options.proxyTarget){
        console.log(`Proxying to ${options.proxyTarget}`);
    }
});