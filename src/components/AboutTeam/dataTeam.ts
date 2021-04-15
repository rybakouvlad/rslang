interface IDev {
  id: number;
  avatar: string;
  name: string;
  position: string;
  discription: string;
  linkToGitHub: string;
}

export const data: Array<IDev> = [
  {
    id: 1,
    avatar: 'https://i.imgur.com/UFiQt2r.jpg',
    name: 'Vlad',
    position: 'Team Lead',
    discription: `Стартовал приложение, выполнил бекендную часть, реализовал игру «аудиовызов», сделал логику статистики, начало и конец игр, поработал над визуалом приложения.`,
    linkToGitHub: 'https://github.com/rybakouvlad',
  },
  {
    id: 2,
    avatar: 'https://i.imgur.com/EEF6jS4.jpg',
    name: 'Tanya',
    position: 'Software Enginer',
    discription: `Реализовала игру спринт, сделала «скелет» для работы со словарём, реализовала визуальное его представление, поработала над визуалом приложения и добавила ограничения на работу с приложением для незалогиненного пользователя.`,
    linkToGitHub: 'https://github.com/TanyaNovik',
  },
  {
    id: 3,
    avatar: 'https://i.imgur.com/sbXq2Dp.jpg',
    name: 'Artem',
    position: 'Software Enginer',
    discription: "Реализовал главную страницу, стилизацию, аинимацию, а также видеоплеер для неё, реализовал пользовательскую игру, создал основу для вкладки 'О разработчиках'.",
    linkToGitHub: 'https://github.com/artemosadchuck',
  },
  {
    id: 4,
    avatar: 'https://i.imgur.com/FaSPyQl.jpg',
    name: 'Viktar',
    position: 'Software Enginer',
    discription: "Реализовал игру 'Саванна', так же страницу настроек, их отображение, а так же логику работы, частично реализовал компонент карточки ('последовательное' вопроизведение слова и его перевод).",
    linkToGitHub: 'https://github.com/natgeo89',
  },
  {
    id: 5,
    avatar: 'https://i.imgur.com/A4Z0ztC.jpg',
    name: 'Dima',
    position: 'Software Enginer',
    discription: 'Реализовал страницу "О нас", страницу учебника, визуальную часть и логику по работе с ним, навигацию для работы с учебником и словарём реализовал несколько графиков для статистики, работа над стилизацией приложения.',
    linkToGitHub: 'https://github.com/DimaKukhta',
  },
];
