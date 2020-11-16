function getRandomInt(min, max, exclusions) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    if (exclusions) {
        while(exclusions.includes(randomlyChosenInt)) {
            randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    }
    return randomlyChosenInt;
}