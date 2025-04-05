const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Включаем CORS, чтобы можно было обращаться с любого фронта
app.use(cors());

// Загружаем цитаты один раз при старте сервера
let quotes = [];

try {
    const data = fs.readFileSync('belarusian_quotes_translated.json', 'utf-8');
    quotes = JSON.parse(data);
} catch (error) {
    console.error('Не ўдалося загрузіць файл цытат:', error.message);
}

// Endpoint: /quote — вернёт случайную цитату
app.get('/quote', (req, res) => {
    if (quotes.length === 0) {
        return res.status(500).json({ error: 'Цытаты адсутнічаюць' });
    }

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    res.json(randomQuote);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`✅ API сервер працуе на http://localhost:${PORT}`);
});