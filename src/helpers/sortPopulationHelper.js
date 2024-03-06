function sortPopulationHelper(population) {
    return population.sort((a, b) => a.population - b.population);
}

export default sortPopulationHelper;