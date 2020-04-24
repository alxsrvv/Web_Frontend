let any_name = 'Helen';
let any_surname = 'Yu';
let any_sex = 'F';
let any_dob = '1/12/1950';

class Person
{
	constructor(Name, Surname, Sex, Dob)
	{
		this.name = Name;
		this.surname = Surname;
		this.sex = Sex;
		this.dob = Dob;
	}

	get_fiscal_code()
	{
		return (this.surname_fiscal(this.surname) + this.name_fiscal(this.name) +  this.date_fiscal());
	}

	surname_fiscal(Surname)
	{
		const vowels = "aeiou";
		Surname = Surname.toLowerCase();
		let code = '';
		let letters = 0;
		for (let i of Surname)
		{
			let isVowel = false;
			for (let j of vowels)
			{
				if (j == i)
					isVowel = true;
			}
			if (!isVowel && letters < 3)
			{
				code += i;
				letters++;
			}
		}
		if (letters < 3)
		{
			for (let i of Surname)
			{
				for (let j of vowels)
				{
					if (j == i)
					{
						code += i;
						letters++;
					}
				}
				if (letters == 3)
					break;
			}
		}
		if (letters < 3)
		{
			for (let i = 0; i < (3 - Surname.length); i++)
				code += 'x';
		}
		return code.toUpperCase();
	}

	name_fiscal(Name)
	{
		const vowels = "aeiou";
		Name = Name.toLowerCase();
		let code = '';
		let letters = 0;
		for (let i of Name)
		{
			let isVowel = false;
			for (let j of vowels)
			{
				if (j == i)
					isVowel = true;
			}
			if (!isVowel && letters < 4)
			{
				code += i;
				letters++;
			}
		}
		if (letters == 4)
			code = code.replace(code[1], '');
		if (letters < 3)
		{
			for (let i of Name)
			{
				for (let j of vowels)
				{
					if (j == i)
					{
						code += i;
						letters++;
					}
				}
				if (letters == 3)
					break;
			}
		}
		if (letters < 3)
		{
			for (let i = 0; i < (3 - Name.length); i++)
				code += 'x';
		}
		return code.toUpperCase();
	}

	date_fiscal() {
		const letter_months = { 1: "A", 2: "B", 3: "C", 4: "D", 5: "E", 6: "H", 7: "L", 8: "M", 9: "P", 10: "R", 11: "S", 12: "T" }
	
		var dobArray = this.dob.split('/');
		let lastChars = dobArray[2].slice(2);
		lastChars += letter_months[Number(dobArray[1])];
		lastChars += (this.sex.toLowerCase() === "m") ? ((dobArray[0].length > 1) ? dobArray[0] : "0"+dobArray[0]) : (Number(dobArray[0])+40).toString();
	
		return lastChars;
	}
}

function output_fiscal_code()
{
	let human = new Person (any_name, any_surname, any_sex, any_dob);
	let code = human.get_fiscal_code();
	console.log('--- Output fiscal code here ---\n');
	console.log('Name:', any_name, '\nSurname:', any_surname, '\nSex:', any_sex, '\nDay of birth:', any_dob);
	console.log("\nItalian fiscal code:", code);
}

output_fiscal_code()