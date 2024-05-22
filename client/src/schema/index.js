import Password from 'antd/es/input/Password';
import * as yup from 'yup';

export const basicSchema = yup.object().shape({
    email:yup.string().email('please enter valid email').required('Required'),
    password: yup.string()
})