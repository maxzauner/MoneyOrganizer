class Person {

    constructor(name) {

        this.name = name;
    }

    toString() {

        return `Name of Person: ${this.name}`;
    }

}

class Student extends Person {
    constructor(name, id) {
        super(name);
        this.id = id;
    }

    toString() {
        return `${super.toString()}, Student-ID: ${this.id}`;
    }
}

let Student1 = new Student("Max", 724872);
let person1 = new Person("Ena");

var addition = function (a, b) {
    var added = a + b;
    return added;
};


let rechnung = addition(3, 5);
console.log(rechnung);
