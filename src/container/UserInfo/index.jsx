import React, { useEffect, useState } from 'react'
import { Button, FilePicker, Input, Toast } from 'zarm'
import { useHistory } from 'react-router-dom'
import Header from '@/components/Header' // 由于是内页，使用到公用头部
import { imgUrlTrans, getBase64 } from '@/utils'
import s from './style.module.less'
import { getUserInfo as getUserInfoApi } from '@/api/bill'
import { uploadFile, updateUserInfo } from '@/api/bill'

const UserInfo = () => {
  const history = useHistory() // 路由实例
  const [avatar, setAvatar] = useState('') // 头像
  const [signature, setSignature] = useState('') // 个签
  const [formData, setFormData] = useState()
  useEffect(() => {
    getUserInfo() // 初始化请求
  }, [])
  // 获取用户信息
  const getUserInfo = async () => {
    const { data } = await getUserInfoApi()
    setAvatar(imgUrlTrans(data.avatar))
    setSignature(data.signature)
  }
  
  // 获取图片回调
  const handleSelect = async (file) => {
    if (file && file.file.size > 200 * 1024) {
      Toast.show('上传头像不得超过 200 KB！！')
      return
    }
    const formData = new FormData()
    // 生成 form-data 数据类型
    formData.append('file', file.file)
    setFormData(formData)
    const img = await getBase64(file.file)
    setAvatar(img)
    // 通过 axios 设置  'Content-Type': 'multipart/form-data', 进行文件上传
  }
  
  // 编辑用户信息方法
  const save = async () => {
    try {
      let newAvatar;
      if (formData) {
        const { data } = await uploadFile(formData)
        newAvatar = data
      }
      await updateUserInfo({
        signature,
        avatar: newAvatar
      })
      Toast.show('修改成功')
      // 成功后回到个人中心页面
      history.goBack()
    } catch (err) {
      console.log(err)
      Toast.show(err.message)
    }
    
  }
  
  return <>
    <Header title="用户信息"/>
    <div className={s.userinfo}>
      <h1>个人资料</h1>
      <div className={s.item}>
        <div className={s.title}>头像</div>
        <div className={s.avatar}>
          <img className={s.avatarUrl} src={avatar} alt=""/>
          <div className={s.desc}>
            <span>支持 jpg、png、jpeg 格式大小 200KB 以内的图片</span>
            <FilePicker className={s.filePicker} onChange={handleSelect} accept="image/*">
              <Button className={s.upload} theme="primary" size="xs">点击上传</Button>
            </FilePicker>
          </div>
        </div>
      </div>
      <div className={s.item}>
        <div className={s.title}>个性签名</div>
        <div className={s.signature}>
          <Input
            maxLength={15}
            clearable
            type="text"
            value={signature}
            placeholder="请输入个性签名"
            onChange={(value) => setSignature(value)}
          />
        </div>
      </div>
      <Button onClick={save} style={{ marginTop: 50 }} block theme="primary">保存</Button>
    </div>
  </>
}

export default UserInfo
