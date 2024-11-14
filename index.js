const fs = require('fs');
const { program } = require('commander');

// Налаштування параметрів командного рядка
program
    .option('-i, --input <path>', 'шлях до файлу для читання')
    .option('-o, --output <path>', 'шлях до файлу для запису результату')
    .option('-d, --display', 'вивести результат у консоль');

// Парсимо аргументи
program.parse(process.argv);

const options = program.opts();

// Перевірка на наявність обовʼязкового параметра -i
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);  // Завершуємо програму після виведення помилки
}

try {
    // Читання JSON з файлу
    const jsonData = JSON.parse(fs.readFileSync(options.input, 'utf8'));

    // Фільтрація записів
    const filteredValues = jsonData
        .filter(item => item.ku === "13" && item.value > 3);  // Можете змінити умови фільтрації

    // Виведення результатів, якщо є дані, що задовольняють умови
    if (filteredValues.length > 0) {
        // Якщо задано опцію --display, вивести результат у консоль
        if (options.display) {
            filteredValues.forEach(item => {
                console.log(JSON.stringify(item, null, 2)); // Виведення кожного елемента у форматі JSON
            });
        }
        // Якщо задано опцію --output, записати результат у файл
        if (options.output) {
            fs.writeFileSync(options.output, JSON.stringify(filteredValues, null, 2), 'utf8');
            console.log(`Результати збережено у файл ${options.output}`);
        }
    } else {
        console.log("Жодне значення не задовольняє умовам фільтрації.");
    }
} catch (error) {
    if (error.code === 'ENOENT') {
        console.error("Cannot find input file");
    } else {
        console.error("Error reading the file:", error.message);
    }
}
