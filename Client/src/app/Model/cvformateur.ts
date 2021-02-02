export class Cvformateur {
    id: number;
    path: string;
    name: string;
    firstname: string;
    age: number;
    adresse: string;
    cin: number;
    email: number;
    job: string;
    diplome: string;
    experience: string;
    dateNais: string;
    phone: string;
    image: string;
    facebook: string;
    linkedin: string;
    github: string;
    idFormateur: string

    constructor(id= 0, path= '', name = '', firstname= '', age =  0, adresse = '', cin= 1, job = '') {
        this.id = id;
        this.idFormateur= ''
        this.path = path;
        this.name = name;
        this.firstname = firstname;
        this.age = age;
        this.adresse = adresse;
        this.cin = cin;
        this.job = job;
        this.diplome = '';
        this.experience= '';
        this.dateNais= '';
        this.phone= '';
        this.image= '';
        this.facebook = '';
        this.linkedin= '';
        this.github= '';

    }
}
