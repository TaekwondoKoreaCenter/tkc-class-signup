import * as emailjs from 'emailjs-com';

export default class EmailSender {
  constructor(info) {
    this.to_email = info['to_email'];
    this.name = info['name'];
  }

  sendEmail(formattedClasses){
    let templateParams = {
      to_email: this.to_email,
      chosen_classes: formattedClasses,
      name: this.name
    }
    emailjs.send('TKC', 'template_nkcxp24', templateParams, 'user_GKwKGiwqaAsUdFs75Pdht')
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(err) {
       console.log('FAILED...', err);
    });
  }
}
