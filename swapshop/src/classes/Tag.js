export class Tag {
    constructor(item) {
        this.name = item['name']; 
        this.date_created = item['date_created'];
        this.id = item['id'];
    }

    getName() {
        return this.name;
    }

    getID() {
        return this.id;
    }

    compareTerm(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        if(this.name.toLowerCase().includes(searchTerm)) {
            return true;
        }

        return false;
    }
}