{
let o = 0.25
let h = 2.5
let N = 12
let L = 30
let s = 5
/* This function calculates the perforation discharge rate (q) using the perforation diameter (d) and in-line distal head (h) */
const perfDis = () => 11.79 * (Math.pow(o,2)) * (Math.sqrt(h));

/* This function calculates the lateral discharge rate (Q) using the perforation discharge rate (q) and the number of total number of perforations per lateral (N) */
const latDis = () => perfDis() * N

/* This function calucates the total number of perforations per lateral (N) using the lateral length (L) and the perforation spacing (s). Note that this calculation assumes that the perforations start at s/2 and there is 1 additional perforation on the cleanout bend*/
const perfNum = () => L /s + 1

const target = () => 0.21 * h



    // head = () => (0.002082 * L) * ((100 / 150)^1.85) * ((perfDis() ^ 1.85) / (latDia ^ 4.8655))

console.log(perfDis())
console.log(latDis())
console.log(perfNum())
}