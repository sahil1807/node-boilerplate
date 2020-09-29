# Node Boilerplate 🛡️

This is a sample Boilerplate which can be used for starting any new Microservice project using Nodejs.

This example repository has taken a lot of inputs from the blog post ['Bulletproof node.js project architecture'](https://softwareontheroad.com/ideal-nodejs-project-structure?utm_source=github&utm_medium=readme)

## Development

We use `node` version `10.20.1`

```
nvm install 10.20.1
```

```
nvm use 10.20.1
```

The first time, you will need to run

```
npm install
```

Then just start the server with

```
npm run start
```

It uses nodemon for livereloading :peace-fingers:

# API Validation

By using celebrate the req.body schema becomes clary defined at route level, so even frontend devs can read what an API endpoint expects without need to writting a documentation that can get outdated quickly.

```js
route.post(
  '/signup',
  celebrate({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  controller.signup,
);
```

**Example error**

```json
{
  "errors": {
    "message": "child \"email\" fails because [\"email\" is required]"
  }
}
```

[Read more about celebrate here](https://github.com/arb/celebrate) and [the Joi validation API](https://github.com/hapijs/joi/blob/v15.0.1/API.md)


[![HitCount](http://hits.dwyl.com/sahil1807/node-boilerplate.svg)](http://hits.dwyl.com/sahil1807/node-boilerplate)



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
