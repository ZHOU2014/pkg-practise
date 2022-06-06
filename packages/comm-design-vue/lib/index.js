import CButton from './CButton/index.js';
import CInput from './CInput/index.js';

const component = [CButton, CInput];

component.forEach((item) => {
    item.install = (Vue) => {
        Vue.component(item.name, item);
    }
})
export { CButton, CInput };
export default { CButton, CInput };