
## Install
To run it requires node.js & mongoDB installed.

Then:

```
$ npm install
```
&
```
$ node server.js
```
## Usage  

The project is still under development and nowhere near any stable version. The (so far) planed usage scenario for user authentication is:
- A developer/researcher is registering to use the API. (POST api/v1/users/register)
- The new account waits for approval by admin
- Admin is issuing an APIkey at approval. (PUT api/v1/users/:id/auth?active=true)
- During approval Admin can also change applicant's role from the default 'developer' to 'admin'(PUT api/v1/users/:id/auth?role=admin)
- User can login to issue an APIkey. User gets back an APIkey on the res.body that returns after login (POST api/v1/users/login?email=YOUR@EMAIL.COM&password=YOUR_PASSWORD)
- User can re-issue APIkey

[TODO: usage scenario for the endpoinds]

## API endpoinds

 /api/v1/objects

## Credits

- [Nikolaos Maniatis](https://github.com/nikmaniatis) | twitter:<[@n_maniatis] (https://twitter.com/n_maniatis)>

## Copyright & License

Copyright (c) 2016 Museotechniki Ltd <[http://museotechniki.com/](http://museotechniki.com/)>

Released under the [MIT license](LICENSE.md).
