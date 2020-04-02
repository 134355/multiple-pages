const data = [
  {
    id: 1,
    name: '王小虎c',
    date1: '201',
    date2: '2016-05-03'
  },
  {
    id: 2,
    name: '王小虎a',
    date2: '2016-05-02',
    date1: '2002'
  },
  {
    id: 3,
    name: 'sac',
    date2: '2016-05-07',
    date1: '208'
  }
]
const data1 = [
  {
    id: 5,
    name: '王小虎1',
    date1: '202',
    date2: '2016-05-14'
  },
  {
    id: 6,
    name: '王小虎2',
    date2: '2016-05-02',
    date1: '22'
  },
  {
    id: 7,
    name: '王小虎3',
    date2: '2016-05-02',
    date1: '206'
  }
]
const data2 = [
  {
    id: 8,
    name: '王小虎1',
    date1: '202',
    date2: '2016-05-03'
  },
  {
    id: 68,
    name: '王小虎2',
    date2: '2016-05-02',
    date1: '206'
  },
  {
    id: 75,
    name: '王小虎3',
    date2: '2016-05-02',
    date1: '202'
  }
]
export const list = (e) => {
  console.log(e)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ dataList: [...data, ...data1, ...data2], total: 200 })
    }, 2000)
  })
}
