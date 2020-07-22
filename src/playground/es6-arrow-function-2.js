//arguments object

const add = (a, b) => {
    //console.log(arguments);
    return a + b;
}
console.log(add(55, 1));

//this keyword

const user = {
    name: 'Mike',
    cities: ['Philadelphia', 'New York', 'Dubai'],
    printPlacesLived() {
        return this.cities.map((city) => {
            return this.name + ' has lived in '+city;
        });
    }
};

console.log(user.printPlacesLived());

//Challenge

const multiplier = {
    numbers: [10, 20, 30],
    multiplyBy: 3,
    multiply(){
        return this.numbers.map((number) => number*this.multiplyBy)
    }
};

console.log(multiplier.multiply());