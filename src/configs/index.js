import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import InfoIcon from '@material-ui/icons/Info';

const routes = {
  pathToLogin: '/',
  pathToNews: '/news',
  pathToNewsDetails: '/news/:id',
  pathToAddNews: '/newsadd',
  pathToBusinessPages: '/business-pages',
  pathToAddBusinessPage: '/business-page-add',
  pathToBusinessPageDetails: '/business-pages/:id'
};

export const config = {
  app: {
    title: 'Horondi Admin Portal',
    menuCategories: [
      ['Новини', routes.pathToNews, ImportContactsIcon],
      ['Бізнес сторінки', routes.pathToBusinessPages, InfoIcon]
    ],
    routes,
    serverUrl: 'http://localhost:5000/',
    drawerWidth: 220,
    snackBarDuration: 4000,
    rowsPerPageOptions: [10, 25, 50, 100]
  },
  languages: ['uk', 'en'],
  buttonStyles: {
    ACCEPT_BUTTON_STYLE: 'secondary'
  },
  tableHeadRowTitles: {
    news: ['Аватар', 'Автор', 'Заголовок', 'Дії'],
    businessPages: ['Аватар', 'Код', 'Заголовок', 'Дії']
  },
  tableSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'medium'
  },
  iconSizes: {
    SMALL_SIZE: 'small',
    DEFAULT_SIZE: 'default'
  },
  theme: {
    DARK_THEME: 'dark',
    LIGHT_THEME: 'light'
  },
  statuses: {
    SUCCESS_ADD_STATUS: 'Успішно додано!',
    SUCCESS_DELETE_STATUS: 'Успішно видалено!',
    SUCCESS_UPDATE_STATUS: 'Успішно змінено!',
    ERROR_PAGE_STATUS: 'Сторінку не знайдено!'
  },
  buttonTitles: {
    DELETE_TITLE: 'Видалити',
    EDIT_TITLE: 'Редагувати',
    CREATE_NEWS_TITLE: 'Додати новину',
    REMOVE_TITLE: 'Видалити новину',
    REMOVE_BUSINESS_PAGE_TITLE: 'Видалити сторінку',
    CANCEL_TITLE: 'Відмінити',
    LOGOUT_TITLE: 'Вихід',
    CREATE_BUSINESS_PAGE: 'Додати бізнес сторінку'
  },
  messages: {
    REMOVE_MESSAGE: 'Ви впевнені, що хочете видалити цю новину?',
    REMOVE_BUSINESS_PAGE: 'Ви впевнені, що хочете видалити цю сторінку?',
    LOGOUT_MESSAGE: 'Ви впевнені, що хочете вийти?'
  },
  formRegExp: {
    email:
      '^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([a-z]{2,6}(?:\\.[a-z]{2})?)$',
    password: '^(?!.* )(?=.*[0-9])(?=.*[A-Z]).{8,30}$'
  },
  paginationPayload: {
    skip: 0,
    limit: 5,
    newsPerPage: 6
  }
};
