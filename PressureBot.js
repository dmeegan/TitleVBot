{
const d = 0.25
const h = 2.5
const l = 30
const s = 5
const N = 12


/* This function calculates the perforation discharge rate (q) using the perforation diameter (d) and in-line distal head (h) */
const perfDis = () => 11.79 * (d ^ 2) * (h ^ 0.5);

/* This function calculates the lateral discharge rate (Q) using the perforation discharge rate (q) and the number of total number of perforations per lateral (N) */
const latDis = () => perfDis() * N

/* This function calucates the total number of perforations per lateral (N) using the lateral length (L) and the perforation spacing (s). Note that this calculation assumes that the perforations start at s/2 and there is 1 additional perforation on the cleanout bend*/
const perfNum = () => l /s + 1

 console.log(perfDis())  
 console.log(latDis())  
 console.log(perfNum())
}