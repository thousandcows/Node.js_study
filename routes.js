let dummies = ""
for (let i = 0; i < 15; i ++) {
    dummies += `<li>Dummy + ${i}</li>`;
}

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;
    console.log(typeof method);
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Hello! This is the main page</title></head>')
        res.write(`<body><ul id="user-list">${dummies}</ul>`);
        res.write(`<form action="/create-user" method="POST"><input type="text" name="username" placeholder="input username"><button type="submit">submit</button></form></body>`);
        res.write('</html>');
        return res.end();
    }
    if (url === '/create-user' && method === 'POST') {
        const body = [];
        req.on('error', (err) => {
            console.error(err);
            res.statusCode = 400;
            res.end();
        })
        req.on('data', username => {
            body.push(username);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const user = parsedBody.split('=')[1];
            console.log(user);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    };

}

module.exports = { requestHandler };