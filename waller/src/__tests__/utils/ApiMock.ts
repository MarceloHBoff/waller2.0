import AxiosMock from 'axios-mock-adapter';

import api from '../../services/api';

const apiMock = new AxiosMock(api);

export default apiMock;
