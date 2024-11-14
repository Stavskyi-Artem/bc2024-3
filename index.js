const { Command } = require('commander');
const fs = require('fs');

const program = new Command();

program
    .requiredOption('-i, --input <path>', 'шлях до файлу, який даємо для читання')
    .option('-o, --output <path>', 'шлях до файлу, у якому записуємо результат')
    .option('-d, --display', 'вивести результат у консоль');

program.parse(process.argv);

const options = program.opts();

// Перевірка, чи заданий обов'язковий параметр --input
if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

// Перевірка, чи файл існує
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

// Читання даних з файлу
const data = fs.readFileSync(options.input, 'utf-8');

// Якщо заданий параметр --output, записуємо дані у файл
if (options.output) {
    fs.writeFileSync(options.output, data);
}

// Якщо заданий параметр --display, виводимо дані у консоль
if (options.display) {
    console.log(data);
}

// Якщо не задано --output або --display, програма нічого не виводить
