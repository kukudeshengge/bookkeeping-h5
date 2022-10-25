import React, { useRef, useState, useCallback, useEffect } from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import cx from 'classnames'
import Captcha from 'react-captcha-code'
import CustomIcon from '@/components/CustomIcon'
import { post } from '@/utils'
import md5 from 'js-md5'

import s from './style.module.less'

const Login = () => {
  const captchaRef = useRef()
  const [type, setType] = useState('login') // 登录注册类型
  const [captcha, setCaptcha] = useState('') // 验证码变化后存储值
  const [user_name, setUsername] = useState('') // 账号
  const [password, setPassword] = useState('') // 密码
  const [verify, setVerify] = useState('') // 验证码
  
  //  验证码变化，回调方法
  const handleChange = useCallback((captcha) => {
    setCaptcha(captcha)
  }, [])
  
  const onSubmit = async () => {
    if (!user_name) {
      Toast.show('请输入账号')
      return
    }
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    try {
      if (type == 'login') {
        try {
          const { data } = await post('/user/login', {
            user_name,
            password: md5(password)
          })
          localStorage.setItem('token', data.token)
          window.location.href = '/';
        } catch (err) {
          console.log(err);
          Toast.show(err.message);
        }
      }
      // else {
      //   if (!verify) {
      //     Toast.show('请输入验证码')
      //     return
      //   };
      //   if (verify != captcha) {
      //     Toast.show('验证码错误')
      //     return
      //   };
      //   const { data } = await post('/api/user/register', {
      //     user_name,
      //     password
      //   });
      //   Toast.show('注册成功');
      //    setType('login');
      // }
    } catch (error) {
      Toast.show('系统错误')
    }
  }
  
  useEffect(() => {
    document.title = type == 'login' ? '登录' : '注册'
  }, [type])
  return <div className={s.auth}>
    <div className={s.head}/>
    <div className={s.tab}>
      <span className={cx({ [s.avtive]: type == 'login' })} onClick={() => setType('login')}>登录</span>
      {/*<span className={cx({ [s.avtive]: type == 'register' })} onClick={() => setType('register')}>注册</span>*/}
    </div>
    <div className={s.form}>
      <Cell icon={<CustomIcon type="zhanghao"/>}>
        <Input
          clearable
          type="text"
          placeholder="请输入账号"
          onChange={(value) => setUsername(value)}
        />
      </Cell>
      <Cell icon={<CustomIcon type="mima"/>}>
        <Input
          clearable
          type="password"
          placeholder="请输入密码"
          onChange={(value) => setPassword(value)}
        />
      </Cell>
      {
        type == 'register' ? <Cell icon={<CustomIcon type="mima"/>}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value) => setVerify(value)}
          />
          <Captcha ref={captchaRef} charNum={4} onChange={handleChange}/>
        </Cell> : null
      }
    </div>
    <div className={s.operation}>
      {
        type == 'register' ? <div className={s.agree}>
          <Checkbox/>
          <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
        </div> : null
      }
      <Button onClick={onSubmit} block theme="primary">{type == 'login' ? '登录' : '注册'}</Button>
    </div>
  </div>
}

export default Login
