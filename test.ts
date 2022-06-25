export interface Result {
    results: {
        id: number;
        name: string;
        job: string;
    }[];
}

class A implements Result {
    results: { id: number; name: string; job: string }[] = [];

    constructor() {}
}
const a = new A();
const printJobs = (results: Result) => {
    results.results.forEach(({ job }) => {
        console.log(job);
    });
};

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// console.log(data);
//printJobs(data);
// printJobs({
//     results: [
//         {
//             id: 1,
//             name: "Jack",
//             job: "Programmer"
//         }
//     ]
// });
const m: Result = { results: [{ id: 1, name: "Jack", job: "mm" }] };
function getType(variable: any) {
    if (variable === null) {
        return "null";
    } else if (Array.isArray(variable)) {
        return "array";
    } else if (typeof variable === "object" || variable instanceof Object) {
        return variable.constructor.name;
    } else if (variable !== Object(variable)) {
        return typeof variable;
    }
}

const x = () => 2;
console.log(getType(true));
console.log(getType(function foo() {}));
console.log(getType(x));
console.log(getType(undefined));
console.log(getType(null));
console.log(getType(NaN));
console.log(getType(a));
console.log(getType({}));
console.log(getType([1, 2, 3]));
console.log(getType(m));

//readFiles(filesList);
// Promise.all(
//     filesList.map((file) => {
//         return promises.readFile(LEADS_FOLDER_PATH + file);
//     })
// )
//     .then((fileBuffers) => {
//         fileBuffers.forEach((fileBuffer) => {
//             const fileUserArray = fileBuffer.toString().split("\r\n");
//             console.log(l);
//         });
//     })
//     .catch((error) => {
//         console.error(error.message);
//         process.exit(1);
//     });
