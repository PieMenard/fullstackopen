const mongoose = require("mongoose");

if (process.argv.length<3) {
	console.log("give password as argument");
	process.exit(1);
}

const password = process.argv[2];

const url =
  `mongodb+srv://piemenard:${password}@fs-phonebook.b6cqw1z.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery",false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
});

const Person = mongoose.model("Person", personSchema);
const input_name = process.argv[3];
const input_number = process.argv[4];

const person = new Person({
	name: input_name,
	number: input_number,
});

//if no name and number input then print entries in phonebook
if (process.argv.length === 3) {
	Person.find({}).then((result) => {
		console.log("phonebook:");
		result.forEach((person) => {
			console.log(person.name, person.number);
		});
		mongoose.connection.close();
	});
}

if (process.argv.length > 3) {
	person.save().then(() => {
		console.log(`added ${input_name} number ${input_number} to phonebook`);
		mongoose.connection.close();
	});
}