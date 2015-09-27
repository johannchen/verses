Meteor.methods({
	getESV(ref) {
		return HTTP.get("http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage="+ref+"&output-format=plain-text&include-short-copyright=0&line-length=0&include-passage-horizontal-lines=0&include-passage-references=0&include-headings=0&include-subheadings=0&include-footnotes=0&include-verse-numbers=0&include-first-verse-numbers=0&include-heading-horizontal-lines=0");
	}
});
