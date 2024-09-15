const http = require('http')
const fs = require('fs');
const qwe = ["ggg","babba","pepe"]

const server = http.createServer(function(req, res){
    console.log(req.method)
    const url = req.url
    if(url === '/'){
        res.writeHead(200,{'Content-type':'text/plain'})
        res.end('Hello World')
    }
    else if(url === '/hhhh'){
        fs.readFile("sigma.png",function(err,data){
        if(err){
            res.writeHead(505,{'Content-type':'text/plain'})
            res.end("505 - error")
        }
        else{
            res.writeHead(200,{'Content-type':'image/png'})
            res.write(data);
            res.end();
        }})
    }
    else if(url === '/sendhtml'){
        openfile(res,'index.html','text/html')
    }
    else if (url  === "/sg"){
        const data = []
        req.on("data",chunk =>{
            console.log("chunk")
            data.push(chunk);
        })
        req.on('end', () => {console.log(data)})
        res.writeHead(200,{"Content-Type":"text/plain"})
        res.write(`ещкере`)
        res.end()
    }
    else if (url  === "/arr"){
        res.writeHead(200,{'Content-type':'text/plain'})
        qwe.map(item =>{res.write(item.toUpperCase() + '\n')})
        res.end();
    }
    else{
        res.writeHead(404,{'Content-type':'text/plain'})
        res.end('not found')
    }
})

const port = process.env.port || 3000
server.listen(port, ()=> console.log('Server is running at port 3000'))

function openfile(res, path, contentType,responseCode){
    if(!responseCode) responseCode = 200
    fs.readFile(path,function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.write('500 server error');
            res.end()
        } else {
            res.writeHead(responseCode,{'Content-Type':contentType})
            res.write(data)
            res.end()
        }

    })
}