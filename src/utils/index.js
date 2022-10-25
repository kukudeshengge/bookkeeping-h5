import axios from './axios'
import { baseUrl } from 'config'

const MODE = import.meta.env.MODE // 环境变量

export const get = (url, data = {}) => {
  const keys = Object.keys(data)
  const params = keys.reduce((prev, next, index) => {
    return prev + `${next}=${data[next]}${index === keys.length - 1 ? '' : '&'}`
  }, keys.length ? '?' : '')
  return axios.get(url + params)
}

export const post = axios.post

export const typeMap = {
  1: {
    icon: 'canyin'
  },
  2: {
    icon: 'fushi'
  },
  3: {
    icon: 'jiaotong'
  },
  4: {
    icon: 'riyong'
  },
  5: {
    icon: 'gouwu'
  },
  6: {
    icon: 'xuexi'
  },
  7: {
    icon: 'yiliao'
  },
  8: {
    icon: 'lvxing'
  },
  9: {
    icon: 'renqing'
  },
  10: {
    icon: 'qita'
  },
  11: {
    icon: 'gongzi'
  },
  12: {
    icon: 'jiangjin'
  },
  13: {
    icon: 'zhuanzhang'
  },
  14: {
    icon: 'licai'
  },
  15: {
    icon: 'tuikuang'
  },
  16: {
    icon: 'qita'
  }
}

export const REFRESH_STATE = {
  normal: 0, // 普通
  pull: 1, // 下拉刷新（未满足刷新条件）
  drop: 2, // 释放立即刷新（满足刷新条件）
  loading: 3, // 加载中
  success: 4, // 加载成功
  failure: 5, // 加载失败
}

export const LOAD_STATE = {
  normal: 0, // 普通
  abort: 1, // 中止
  loading: 2, // 加载中
  success: 3, // 加载成功
  failure: 4, // 加载失败
  complete: 5, // 加载完成（无新数据）
}

export function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    let fileResult = ''
    reader.readAsDataURL(file)
    //开始转
    reader.onload = () => {
      fileResult = reader.result
    }
    //转失败
    reader.onerror = (error) => {
      reject(error)
    }
    //结束 resolve
    reader.onloadend = () => {
      resolve(fileResult)
    }
  })
}

export const imgUrlTrans = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${MODE == 'development' ? 'http://10.99.71.249:7001' : baseUrl}${url}`
    return url
  }
}
