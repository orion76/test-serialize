## Тестовое задание

Выполнил: Глазков Павел   
Резюме: [click](https://samara.hh.ru/resume/39dc1200ff0cfa41f00039ed1f3567316a6159)


### Отчет: [report.txt](report.txt)

### Идея

Максимальное значение элемента сериализируемого массива - 300 (число)   

Для хранения элемента массива при "стандартной сериализации" (метод массива toString()) необходимо 1-3 байта (8-24 бит)

Для хранения чисел от 0 до 300 достаточно 9 бит (максимальное значение 511)  

Т.е. данный подход, должен обеспечить необходимый коэффициент сжатия (50%) сериализованного массива.

### Имплементация

**Дано:**   
массив чисел от 1 до 300

**Алгоритм**
1. Конвертируем каждый элемент массива в 9-ти битное двоичное число.
2. Соединяем двоичные числа в одну строку.
3. Разбиваем строку на 6-ти разрядные двоичные числа.(64 значение)
4. Преобразуем двоичное число в 64-ричное (аналог base64)
5. Соединяем все символы в результирующую  строку.

**Done.**
