Meteor.methods({
	getESV(ref) {
		return HTTP.get("http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage="+ref+"&output-format=plain-text&include-short-copyright=0&line-length=0&include-passage-horizontal-lines=0&include-passage-references=0&include-headings=0&include-subheadings=0&include-footnotes=0&include-verse-numbers=0&include-first-verse-numbers=0&include-heading-horizontal-lines=0");
	},
	sendEmail(to, from, subject, text) {
		check([to, from, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			from: from,
			subject: subject,
			text: text
		});
	},
  //TODO: add callback
	addPartner(username) {
		var partner = Accounts.findUserByUsername(username);
		if (partner && !partner.profile.partner) {
      Meteor.users.update(this.userId, {
        $set: {
					"profile.partner": {
						id: partner._id,
						username: username
					}
				}
      });
      Meteor.users.update(partner._id, {
        $set: {
					"profile.partner": {
						id: this.userId,
						username: Meteor.user().username
					}
				}
      });
		} else {
			console.log("failed to add partner!");
		}
	},

	removePartner(id) {
		Meteor.users.update(id, {
			$unset: {"profile.partner": ""}
		});
		Meteor.users.update(this.userId, {
			$unset: {"profile.partner": ""}
		});
	}
});
