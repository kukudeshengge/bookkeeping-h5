import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Cell } from 'zarm'
import { useHistory } from 'react-router-dom'
import CustomIcon from '../CustomIcon'
import { typeMap } from '@/utils'

import s from './style.module.less'

const BillItem = ({ bill }) => {
  const history = useHistory()
  
  const goToDetail = (item) => {
    history.push(`/detail?id=${item.id}`)
  }
  return <div className={s.item}>
    <div className={s.headerDate}>
      <div className={s.date}>{bill.date}</div>
      <div className={s.money}>
        <span>
          <img src="//s.yezgea02.com/1615953405599/zhi%402x.png" alt="支"/>
            <span>¥{bill.expenseMoney}</span>
        </span>
        <span>
          <img src="//s.yezgea02.com/1615953405599/shou%402x.png" alt="收"/>
          <span>¥{bill.incomeMoney}</span>
        </span>
      </div>
    </div>
    {
      bill && bill.bills.map(item => {
        const time = dayjs(Number(item.date)).format('HH:mm')
        return <Cell
          className={s.bill}
          key={item.id}
          onClick={() => goToDetail(item)}
          title={
            <>
              <CustomIcon
                className={s.itemIcon}
                type={item.type_id ? typeMap[item.type_id].icon : 1}
              />
              <span>{item.type_name}</span>
            </>
          }
          description={<span
            style={{ color: item.pay_type == 2 ? 'red' : '#39be77' }}>{`${item.pay_type == 1 ? '-' : '+'}${item.amount}`}</span>}
          help={
            <div>{time === '00:00' ? dayjs(Number(item.date)).format('YYYY-MM') : time} {item.remark ? `| ${item.remark}` : ''}</div>}
        >
        </Cell>
      })
    }
  </div>
}

BillItem.propTypes = {
  bill: PropTypes.object
}

export default BillItem

