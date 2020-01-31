// Подключаем нужные библиотеки
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Запускаем функцию Exspress.js
const app = express()

const port = process.env.PORT || 3000

// Создаем пути к директориям
const publicDirPath = path.join(__dirname, '../public') // Выходим из папки src в папку public
const templatesDirPath = path.join(__dirname, '../templates/views') // Выходим из папки src в папку templates/views
const partialsDirPath = path.join(__dirname, '../templates/partials') // Выходим из папки src в папку templates/partials

// Создаем поддержку HBS
app.set('view engine', 'hbs')
hbs.registerPartials(partialsDirPath)

// Задаем новый путь к папке "views"
app.set('views', templatesDirPath)

// Задаем путь к папке public, чтобы запустить index.html
app.use(express.static(publicDirPath))

// Рендерим файл index.hbs в папке templates/views, по заданному роутингу
app.get('', (req, res) => {
    res.render('index', {
        title: 'Главная'
    })
})

// Рендерим файл help.hbs в папке templates/views, по заданному роутингу
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Помощь'
    })
})

// Рендерим файл about.hbs в папке templates/views, по заданному роутингу
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Обо мне'
    })
})

// Отправляем JSON, по заданному роутингу
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        res.send({
            error: 'No adress provided!'
        })
    } else {
        geocode(req.query.adress, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                res.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forecastData) =>{
                if (error) {
                    res.send({
                        error
                    })
                }
                res.send({
                    forecastData,
                    location,
                    adress: req.query.adress
                })
            });
        });  
    }
})

// Рендерим файл 404.hbs в папке templates/views, по заданному роутингу
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Статья не найдена.'
    })
})

// Рендерим файл 404.hbs в папке templates/views, по заданному роутингу
app.get('*', (req, res) => {
    res.render('404', {
        error: 'Увы, такой страницы нету.'
    })
})

// Запускаем сервер по заданному порту
app.listen(port, () => {
    console.log('Server is running on port 3000')
})