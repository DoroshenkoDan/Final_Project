import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

// Замокаємо будь-який GET-запит і відповімо імітованими даними
mock.onGet().reply(200, { data: 'mocked response' });

export default mock;

