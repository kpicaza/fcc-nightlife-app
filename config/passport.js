'use strict';

import LocalStrategy  from 'passport-local';
import container from './container';

export default function (passport) {

  const userRepository = container.UserRepository();
  const emitter = container.EventEmitter();

  let emitLoginFailedEvent = function () {
    emitter.emit('LoginWasFailed', {
      name: 'LoginWasFailed',
      data: 'Invalid username or password.',
      occurredOn: new Date()
    });
  };

  let emitUserLoggedInEvent = function (user) {
    emitter.emit('UserLoggedIn', {
      name: 'UserLoggedIn',
      data: {
        id: user.id(),
        username: user.username(),
        email: user.email()
      },
      occurredOn: new Date()
    });
  };

  passport.serializeUser(function (user, done) {
    done(null, user.username());
  });

  passport.deserializeUser(function (username, done) {
    userRepository.byUsername(username).then(function (user) {
      done(null, user);
    });
  });

  passport.use(new LocalStrategy(
    function (username, password, done) {

      userRepository.byUsername(username)
        .then(function (user) {

          return user.verifyPassword(password).then(function (res) {
            if (!res) {
              emitLoginFailedEvent();
              return done(null, false);
            }

            emitUserLoggedInEvent(user);
            done(null, user);
          });
        })
        .catch(function () {
          emitLoginFailedEvent();
          done(null, false);
        });
    }
  ));

}
