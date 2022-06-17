import Rate from 'rate';
import CustomSearchBabel from "custom-search-babel";
export default (({
  Vue
}) => {
  Vue.use(Rate);
  Vue.use(CustomSearchBabel);
  console.log(1);
});