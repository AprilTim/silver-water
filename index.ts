import fastify from 'fastify';
import './src/startup';


const path = require('path');
const app = fastify();

app.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public',
})

app.get('/*', (request, reply: any) => {
    return reply.sendFile('index.html')
})

const routes = require('./src/Routes/usersRoutes');

routes.forEach((route: any) => {
    app.route(route);
})

app.listen(3000, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})