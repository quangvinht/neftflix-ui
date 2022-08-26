//Pages
import Home from '~/pages/Home/';
import Catalog from '~/pages/Catalog/';

import Detail from '~/pages/Detail/';

//Layout

//config
import config from '~/config/';

//public routes:
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.catalog,
        component: Catalog,
    },
    {
        path: config.routes.search,
        component: Catalog,
    },
    {
        path: config.routes.detail,
        component: Detail,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
