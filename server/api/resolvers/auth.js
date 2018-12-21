const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 
  });

}

function generateToken(user, secret) {
  const { id, email, fullname } = user;
  const token = jwt.sign(
    {
      email: email,
      id: id,
      fullname: fullname
    },
    secret
  );

  return token;
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      console.log('args', args);
      try {
        const hashedPassword = bcrypt.hashSync(args.input.password);
        const user = await context.pgResource.createUser({
          fullname: args.input.fullname,
          email: args.input.email,
          password: hashedPassword
        });
        console.log('new user:', user);
        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return { id: user.id };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      console.log('Logged in user args', args);
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.input.email
        );
        const valid = await bcrypt.compare(args.input.password, user.password);
        if (!valid || !user) {
          console.log('Valid:', valid, 'User', user);
        }
        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
