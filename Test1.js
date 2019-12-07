/* This function calculates the perforation discharge rate (q) using the perforation diameter (d) and in-line distal head (h) */
const q =  (d, h) => {
11.79 * (d^2) * (h^0.5)
}
/* This function calculates the lateral discharge rate (Q) using the perforation discharge rate (q) and the number of total number of perforations per lateral (N) */
const Q = (q, N) => { 
q * N 
}
/* This function calucates the total number of perforations per lateral (N) using the lateral length (L) and the perforation spacing (s). Note that this calculation assumes that the perforations start at s/2 and there is 1 additional perforation on the cleanout bend*/
const N = (L   , s) => {
((L / s) + 1)
}
Console.log(N)
