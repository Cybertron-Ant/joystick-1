import bcrypt from "bcrypt";
import formatErrorString from "../../lib/formatErrorString";
import runUserQuery from "./runUserQuery";
import generateSession from "./generateSession";
const addSessionToUser = (userId = null, session = null) => {
  try {
    return runUserQuery("addSession", { userId, session });
  } catch (error) {
    throw new Error(formatErrorString("login.addSessionToUser", error));
  }
};
const checkIfValidPassword = (passwordFromLogin = null, passwordHashFromUser = null) => {
  try {
    return bcrypt.compareSync(passwordFromLogin, passwordHashFromUser);
  } catch (error) {
    throw new Error(formatErrorString("login.checkIfValidPassword", error));
  }
};
const login = async (options, { resolve, reject }) => {
  try {
    const user = await runUserQuery("user", {
      emailAddress: options.emailAddress,
      username: options.username
    });
    if (!user) {
      throw new Error(`A user with the ${options.emailAddress ? "email address" : "username"} ${options.emailAddress || options.username} could not be found.`);
    }
    const isValidPassword = checkIfValidPassword(options.password, user.password);
    if (!isValidPassword) {
      return reject("Incorrect password.");
    }
    const session = await generateSession();
    await addSessionToUser(user._id, session);
    const { password, sessions, ...restOfUser } = user;
    return resolve({
      ...session,
      user: {
        ...restOfUser
      }
    });
  } catch (error) {
    reject(formatErrorString("login", error));
  }
};
var login_default = (options) => new Promise((resolve, reject) => {
  login(options, { resolve, reject });
});
export {
  login_default as default
};
