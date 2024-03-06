// Verwacht een regio naam
// Geeft op basis van regio de correcte kleurnaam als String terug
// Maak voor elke kleur aparte css klassen aan

function regionColorNames(region) {
    switch (region) {
        case "Africa":
            return "blue";
        case "Americas":
            return "green";
        case "Asia":
            return "red";
        case "Europe":
            return "yellow";
        case "Oceania":
            return "purple";
        default:
            return "grey";
    }
}

export default regionColorNames;