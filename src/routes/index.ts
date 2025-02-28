import { ROUTE_KEY } from './menus';
import Home from '@/containers/Home';
import EditInfo from '@/containers/EditInfo';
import OrgInfo from '@/containers/OrgInfo';
import ProductInfo from '@/containers/ProductInfo';
import Buy from '@/containers/Buy';
import My from '@/containers/My';
import OrderCourse from '@/containers/OrderCourse';
import MyCard from '@/containers/MyCard';
import MyCourse from '@/containers/MyCourse';

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.ORG_INFO]: OrgInfo,
  [ROUTE_KEY.PRODUCT_INFO]: ProductInfo,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.BUY]: Buy,
  [ROUTE_KEY.EDIT_INFO]: EditInfo,
  [ROUTE_KEY.ORDER_COURSE]: OrderCourse,
  [ROUTE_KEY.MY_CARD]: MyCard,
  [ROUTE_KEY.MY_COURSE]: MyCourse,
};
