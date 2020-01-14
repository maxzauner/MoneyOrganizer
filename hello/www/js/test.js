class Person {
    constructor (first, last, age, interests) {
        this.name = {
            first: first,
            last: last
        };
        this.age = age;
        this.interests = interests;

    }

    biographie() {
        this.bio = function () {
            console.log(this.name.first + " " + this.name.last + " is " + this.age + " years old. He likes "+ this.interests[0] + " and " + this.interests[1]);
        };
        return this.bio();

    }

    greet() {
        this.greeting = function () {
            console.log("Hi im " + this.name.first);
        };
        return this.greeting();
    }


}

let Person1 = new Person("Bob", "Smith", 22, ["music", "sport"]);
Person1.greet();
Person1.biographie();
