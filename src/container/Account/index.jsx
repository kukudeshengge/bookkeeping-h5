import React from 'react'
import { Cell, Input, Button, Toast } from 'zarm'
import { createForm } from 'rc-form'
import Header from '@/components/Header'
import s from './style.module.less'
import { resetPasswordApi } from '@/api/bill'
import md5 from 'js-md5'
import { useHistory } from 'react-router-dom'

const Account = (props) => {
  const history = useHistory();
  // Account 通过 createForm 高阶组件包裹之后，可以在 props 中获取到 form 属性
  const { getFieldProps, getFieldError } = props.form
  
  // 提交修改方法
  const submit = () => {
    // validateFields 获取表单属性元素
    props.form.validateFields(async (error, value) => {
      // error 表单验证全部通过，为 false，否则为 true
      if (!error) {
        if (value.newpass != value.confirm_newpass) {
          Toast.show('新密码输入不一致')
          return
        }
        try {
          await resetPasswordApi({
            old_pass: md5(value.oldpass),
            new_pass: md5(value.newpass),
            confirm_newpass: md5(value.confirm_newpass)
          })
          Toast.show('修改成功，请重新登录');
          history.push('/login');
        } catch (err) {
          console.log(err)
          Toast.show(err.message)
        }
      }
    })
  }
  
  return <>
    <Header title="重制密码"/>
    <div className={s.account}>
      <div className={s.form}>
        <Cell title="原密码">
          <Input
            clearable
            type="password"
            placeholder="请输入原密码"
            {...getFieldProps('oldpass', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="新密码">
          <Input
            clearable
            type="password"
            placeholder="请输入新密码"
            {...getFieldProps('newpass', { rules: [{ required: true }] })}
          />
        </Cell>
        <Cell title="确认密码">
          <Input
            clearable
            type="password"
            placeholder="请再此输入新密码确认"
            {...getFieldProps('confirm_newpass', { rules: [{ required: true }] })}
          />
        </Cell>
      </div>
      <Button className={s.btn} block theme="primary" onClick={submit}>提交</Button>
    </div>
  </>
}

export default createForm()(Account)
