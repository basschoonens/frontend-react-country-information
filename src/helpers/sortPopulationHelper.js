function sortPopulation(population) {
    return population.sort((a, b) => a.population - b.population);
}

export default sortPopulation;