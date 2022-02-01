// Создать элементы, задать им классы и добавить их в div с id root

const firstDivRef = document.createElement('div');
const secondDivRef = document.createElement('div');
firstDivRef.classList.add('first-div');
secondDivRef.classList.add('second-div');
document.querySelector('#root').append(firstDivRef, secondDivRef)
//  Задача №2

const titleRef = document.createElement('h1');
const bookList = document.createElement('ul');
const addBtn = document.createElement('button');
titleRef.textContent = 'Library';
addBtn.textContent = 'Add';
firstDivRef.append(titleRef, bookList, addBtn);

// Задача №3

const books = [
	{
		id: '1',
		title: `Apple. Эволюция компьютера`,
		author: `Владимир Невзоров`,
		img: `https://bukva.ua/img/products/449/449532_200.jpg`,
		plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей,
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники.
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
	},
	{
		id: '2',
		title: `Как объяснить ребенку информатику`,
		author: `Кэрол Вордерман`,
		img: `https://bukva.ua/img/products/480/480030_200.jpg`,
		plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы,
    оставаясь в безопасности.
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве,
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина -
    объясняются наглядно с помощью иллюстраций и схем.`,
	},
	{
		id: '3',
		title: `Путь скрам-мастера. #ScrumMasterWay`,
		author: `Зузана Шохова`,
		img: `https://bukva.ua/img/products/480/480090_200.jpg`,
		plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой.
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера,
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером,
    какими инструментами ему нужно пользоваться.`,
	},
];

// const listRef = document.querySelector('ul')
function renderList() {
    const markup = books.map(({ title }) => {
    return ` <li>
    <p>${title}</p>
    <button type = "button"> Edit</button>
    <button type = "button"> Delete</button>
    </li>`;
    })
    .join('');
    bookList.insertAdjacentHTML('afterbegin', markup);
    // console.log(markup);
};

renderList();

// Задача №4

function renderBookPreview({title, author, img, plot}) {
    return `<div>
      <h2>${title}</h2>
      <p>${author}</p>
      <img src="${img}" alt="book" width="250px">
      <p>${plot}</p>
    </div>`;
}

//console.log(renderBookPreview(books[0]));

// Задача №5

function formMarkup({title, author, img, plot}) {
    return `<form action="">
      <label>
        Title
        <input type="text" name="Title" value = "${title}">
      </label>
      <label>
        Author
        <input type="text" name="Author" value = "${author}">
      </label>
      <label>
        Image
        <input type="text" name="Image" value = "${img}">
      </label>
      <label>
         Plot
        <input type="text" name="Plot" value = "${plot}">
      </label>
      <button type="button">Save</button>
     </form>`;
};

console.log(formMarkup(books[0]));