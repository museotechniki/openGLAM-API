
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
## Usage scenario

- A developer/researcher is registering to use the API.
- The new account waits for approval by admin
- Admin is issuing an APIkey at approval.
- During approval Admin can also change applicant's role from the default 'developer' to 'admin'
- Ones APIkey has been issued user can use the API
- User can find APIkey on the res.body after login (POST api/v1/users/login?email=YOUR@EMAIL.COM&password=YOUR_PASSWORD)

## API endpoinds

 /api/v1/objects

## Credits

- [Nikolaos Maniatis](https://github.com/nikmaniatis) | twitter:<[@n_maniatis] (https://twitter.com/n_maniatis)>

## Copyright & License

Copyright (c) 2016 Museotechniki Ltd <[http://museotechniki.com/](http://museotechniki.com/)>

Released under the [MIT license](LICENSE.md).
