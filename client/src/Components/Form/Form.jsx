import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Password from 'antd/es/input/Password';
import { AuthContext } from '../AuthProvider'; // Import the AuthContext
import HttpClient from '../../HttpClient';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const { login,setActiveUser } = useContext(AuthContext); // Use the login function from the AuthContext
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/admin" } };
  const fromProtectedRoute = location.state?.fromProtectedRoute || false;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let matcheduser;
      // const matcheduser= users.find((user)=>user.email === values.email && user.password === values.password)
      const response = await HttpClient.post(
        "api/login",
        {
          email: values.email,
          password: values.password,
        }
      );

      if (response.data) {
        matcheduser = response.data;
        login();
        setActiveUser(matcheduser)
        
        // Pass the user's details to the login function
        console.log('login successfull')
        console.log(matcheduser)
        
        if (matcheduser.role === 'manager') {
          navigate('/admin'); // Redirect managers to the admin dashboard
        } else if (matcheduser.role === 'chef'||'cleaning'||'security'||'finance') {
          navigate('/user'); // Redirect chefs to the user dashboard
        } else {
          alert('Invalid role. Please contact an administrator.');
        }
      } else {
        alert('Invalid credentials. Please check and try again.');
      }
      // await fetch('http://192.168.56.1:3000/active-user',
      // {
      //  method:'POST',
      //  headers:{
      //   'Content-Type':'application/json'
      //  } ,
      //  body:JSON.stringify({username:matcheduser.username,role:matcheduser.role,email:matcheduser.email, id:matcheduser.id,image:matcheduser.image})
      // })
      
    },
  });

  return (
    <section className="flexCenter innerWidth paddings formik">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 800 }}
        initialValues={{ remember: true }}
        onFinish={formik.handleSubmit}
        onFinishFailed={formik.handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
