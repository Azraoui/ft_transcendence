let _name: string;
let _age: number;
let _hire: boolean;
let _test: any;


function add(n1: number, n2: string = "test"){ // default function
    return n1 + n2;
}

const addTwoNumber = function(n1: number, n2: number, n3?: number): number { // anonymous function
    return n1 + n2;
}

const addNumbers = (n1: number, n2: number) : number => { return n1 + n2;} // arrow function

function sumNumbers(...nums: number[]) : number
{
    let result = 0;
    nums.forEach(element => {
        result += element;
    });
    return result;
}

console.log(add(10, "20"));
console.log(addTwoNumber(10, 20));
console.log(addNumbers(10, 2));

// type alias in typescript
type strandnum = string | number;
let value: strandnum;


// advanced type alias
type movement = {
    up: number,
    down: number,
    right: number,
    left: number
}

type condition = movement & {
    opetion? : boolean;
}

function move(nextMove: condition) {
    return (nextMove.down + nextMove.left) - (nextMove.up + nextMove.right);
}

move({up: 10, down: 10, right: 10, left:10});

// Literal Types

type errorRet = 1 | 0 | -1;

function errorHandler(n1: number): errorRet {
    if (n1 > 0)
        return 1;
    else if (n1 == 0)
        return 0;
    else
        return -1;
}

errorHandler(7);

/**
 * Data Types
 * Tuple
 * -- Is another sort of array type
 * -- we knows exactly how many elements it contains
 * -- we knows which types it contains at specific positions
 */

let articles: readonly [number, string, boolean] = [2018, "The winter is coming", true];
articles = [2022, "world cup", true];
console.log(articles);

const [id, title, published] = articles;
console.log(id);
console.log(title);
console.log(published);


/**
 * Data Types
 * - Enums => Enumerations
 * -- Allow Us To Declare A Set Of Named Constants
 * -- Used For Logical Grouping Collection Of Constants "Collection Of Related Values"
 * -- It Organize Your Code
 * -- By Default Enums Are Number-Based, First Element Is 0
 * -- Theres A Numeric Enums
 * -- Theres A String-Based Enums
 * -- Theres Heterogeneous Enums [String + Number]
 */

const BEGGINER = 10;
const EASY = 9;
const MEDIUM = 5;
const HARD = 1;

enum level {
    BEGGINER,
    EASY, 
    MEDIUM,
    HARD
}

/**
 * Data Types
 * - Type Assertions
 * -- Sometime Compiler Doesnt Know The Information We Do
 * -- TypeScript Is Not Performing Any Check To Make Sure Type Assertion Is Valid
 */

// let myImg = document.getElementById("my-img") as HTMLImageElement;
let myImg = <HTMLImageElement> document.getElementById("my-img");
console.log(myImg.src);

let data: any = 1000;
console.log((<string> data).repeat(3));
console.log((data as string).repeat(3));

/**
 * Type Annotations With Object
 */

let object:{
    readonly name:  string,
    age : number,
    address? : string,
    skills :  {
        css: boolean,
        html: boolean,
        javascript: boolean
    }
} = {
    name : "abdellah",
    age : 19,
    skills: {
        css : true,
        html : true,
        javascript : true
    }
}

/**
 * Interface
 * - Interface Declaration
 * -- Serve Like Types
 * -- The Interface Describes The shape Of An Object
 * -- It Defines The Syntax To Follow
 * 
 * -- Use With Object
 * -- Use with Function
 * -- Use Read Only And Optional Operator
 */

interface User {
    readonly name: string,
    phone: string,
    country: string,
    age?: number
};

let user : User = {
    name : "ayoub",
    phone : "36",
    country : "morocco",
}

user.age = 19;
function printData(data: User){
    console.log(data);
}
printData({name:"mustapha", phone: "3849384", country: "Morocco",});

/**
 * Interface
 * -- Interface Method And Parameters
 */

interface Users {
    id : number,
    username: string,
    country: string,
    welcome() : string,
    getId : () => string,
    setCountry: (country: string) => void
}