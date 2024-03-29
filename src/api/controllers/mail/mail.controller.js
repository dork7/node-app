const { success, error, info } = require("consola");
const { sendMail } = require("../../services/emailProvider");
const mailModel = require("../../models/mail.model");

exports.sendMail = async (req, res, next) => {
  try {
    const mailRes = await sendMail({
      email: Array.isArray(req.body.email) ? req.body.email.join() : req.body.email,
      subject: req.body.subject ?? '',
      mailBody: req.body.mailBody,
    });
    const storedMail = await this.storeEmails(req.body)
    info({ message: mailRes });
    return res.status(200).json({
      success: true,
      data: mailRes,
      recCount: storedMail
    });
  } catch (error) {
    return next(error);
  }
};

exports.storeEmails = async (emailDataSet) => {
  try {
    const { email, subject, mailBody } = emailDataSet
    if (!Array.isArray(email)) {
      const mailSaved = await new mailModel(emailDataSet).save()
      return mailSaved
    }
    else {
      // bulk add
      const dataSet = email.map(email => { return { email, subject, mailBody } })
      const mailSaved = await mailModel.insertMany(dataSet)
      return mailSaved
    }

  } catch (error) {
    return error
  }
};

exports.getEmailsById = async (req, res, next) => {
  try {
    const emailId = req.params.emailId
    const emailsSaved = await mailModel.getEmailsById(emailId)
    return res.status(200).json({
      success: true,
      data: emailsSaved
    });
  } catch (error) {
    return error
  }
};
