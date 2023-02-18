const config = require("../config");
const nodeMailer = require("nodemailer");
const storeInstance = require("../store");

// smtps://user%40gmail.com:pass@smtp.gmail.com
// const transport = nodeMailer.createTransport("SMTP", {
const transport = nodeMailer.createTransport({
  // host: config.host,
  // post: config.post,
  // secure: config.secure,
  auth: config.auth,
  service: config.service,
});

const record = storeInstance.store;

module.exports = {
  async sendRegisterCode({ request, response }) {
    try {
      const { email } = request.body;

      const code = Math.random().toString().slice(-4);

      console.log(email, code);
      record.set(email, code);

      setTimeout(() => {
        record.del(email);
      }, 5 * 60 * 1000); // 5min有效期

      const mailOptions = {
        from: config.from,
        to: email,
        subject: "Verify your account",
        text: `Your verify code is ${code}, please finish the operation in 5 minutes!`,
      };

      const info = await new Promise((resolve, reject) => {
        transport.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            // console.log("发送成功", info);
            resolve(info);
          }
        });
      });

      response.body = {
        code: "0000",
        msg: "发送成功",
        data: info,
      };
    } catch (err) {
      console.log(222, err);
    }
  },
};
