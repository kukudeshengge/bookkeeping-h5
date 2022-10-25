import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm'
import cx from 'classnames'
import s from './style.module.less'
import { getTagList } from '@/api/bill'
import { typeMap } from '@/utils'
import CustomIcon from '@/components/CustomIcon'

const PopupType = forwardRef(({ onSelect }, ref) => {
  const [show, setShow] = useState(false)
  const [active, setActive] = useState('all')
  const [expense, setExpense] = useState([])
  const [income, setIncome] = useState([])
  
  useEffect(async () => {
    // 请求标签接口放在弹窗内，这个弹窗可能会被复用，所以请求如果放在外面，会造成代码冗余。
    const { data } = await getTagList()
    setExpense(data.filter(item => item.type === '1'))
    setIncome(data.filter(item => item.type === '2'))
  }, [])
  
  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  }
  
  const choseType = (item) => {
    setActive(item.id)
    setShow(false)
    onSelect(item)
  }
  return <Popup
    visible={show}
    direction="bottom"
    onMaskClick={() => setShow(false)}
    destroy={false}
    mountContainer={() => document.body}
  >
    <div className={s.popupType}>
      <div className={s.header}>
        请选择类型
        <Icon type="wrong" className={s.cross} onClick={() => setShow(false)}/>
      </div>
      <div className={s.content}>
        <div onClick={() => choseType({ id: 'all' })}
             className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型
        </div>
        <div className={s.title}>支出</div>
        <div className={s.expenseWrap}>
          {
            expense.map((item, index) => {
              return <p
                key={index}
                onClick={() => choseType(item)}
                className={cx({
                  [s.expense]: active == item.id,
                  [s.active]: active == item.id
                })}
              >
                <CustomIcon className={s.iconfont} type={typeMap[item.id].icon}/>
                <span>{item.name}</span>
              </p>
            })
          }
        </div>
        <div className={s.title}>收入</div>
        <div className={s.incomeWrap}>
          {
            income.map((item, index) => {
              return <p
                key={index}
                onClick={() => choseType(item)}
                className={cx({
                  [s.income]: active == item.id,
                  [s.active]: active == item.id
                })}
              >
                <CustomIcon className={s.iconfont} type={typeMap[item.id].icon}/>
                <span>{item.name}</span>
              </p>
            })
          }
        </div>
      </div>
    </div>
  </Popup>
})

PopupType.propTypes = {
  onSelect: PropTypes.func
}

export default PopupType
