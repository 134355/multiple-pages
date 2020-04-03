import request from '@/utils/request'

function toTree (data) {
  const map = {}
  const val = []
  data = data.map(item => {
    const obj = {
      label: item.sv_us_name,
      value: item.user_id,
      pid: item.sv_headquarters_id
    }
    map[item.user_id] = obj
    return obj
  })
  data.forEach(item => {
    const parent = map[item.pid]
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      val.push(item)
    }
  })
  return val
}

/**
 * @description 获取商品销售数据统计信息
 */
function getProSaleStaInfo (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  const data = {
    enddate: params.enddate,
    is_exist_sale: params.is_exist_sale,
    keywards: params.keywards,
    page: params.page,
    pagesize: params.pagesize,
    startdate: params.startdate,
    sv_pc_id: params.sv_pc_id,
    user_id: userId
  }
  console.log(data)
  return request.get('/api/IntelligentAnalysis/GetProSaleStaInfo', {
    params: data
  })
}

/**
 * @description 导出商品销售数据统计信息
 */
function proSaleStaExcel (params) {
  return request.get('/api/IntelligentAnalysis/ProSaleSta_Excel', {
    params
  })
}

/**
 * @description 获取会员消费明细信息
 */
function getMemberSaleStaDetailInfo (params) {
  return request.get('/api/IntelligentAnalysis/GetMemberSaleStaDetailInfo', {
    params
  })
}

/**
 * @description 获取储值卡统计信息
 */
function getValueCardStaInfo (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetValueCardStaInfo', {
    params: data
  })
}

/**
 * @description 获取商品分类 categoryList缓存分类列表
 */
let categoryList
function getFirstCategory (params) {
  return new Promise((resolve, reject) => {
    if (categoryList) {
      return resolve(categoryList)
    }
    request.get('/api/ProductCategory/GetFirstCategory', {
      params
    }).then(res => {
      const data = res.map(item => {
        return {
          value: item.productcategory_id,
          label: item.sv_pc_name
        }
      })
      data.unshift({
        value: -1,
        label: '全部分类'
      })
      categoryList = data
      resolve(data)
    })
  })
}

/**
 * @description 获取店铺列表 storelist缓存店铺列表
 */
let storelist
function getCommonBranchStorelist (params) {
  return new Promise((resolve, reject) => {
    if (storelist) {
      return resolve(storelist)
    }
    request.get('/api/BranchStore/GetCommonBranchStorelist', {
      params
    }).then(res => {
      const data = toTree(res)
      data.push({
        label: '所有店铺',
        value: -1
      })
      storelist = data
      resolve(data)
    })
  })
}

/**
 * @description 门店概况
 */
function getProductAnalysisByShop (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetProductAnalysisByShop', {
    params: data
  })
}

/**
 * @description 门店营业额统计----门店概况(新)调用
 */
function getShopBusAnalysis (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetShopBusAnalysis', {
    params: data
  })
}

/**
 * @description 商品销售排行----门店概况(新)调用
 */
function getProductSalesRank (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetProductSalesRank', {
    params: data
  })
}

/**
 * @description 获取门店会员活跃分布【消费频率】----门店概况(新)调用
 */
function getStoreMemberSaleCountInfo (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetStoreMemberSaleCountInfo', {
    params: data
  })
}

/**
 * @description 会员分析-会员消费分析(金额/单数)----门店概况(新)调用
 */
function getMemberSalesAnalysis (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetMemberSalesAnalysis', {
    params: data
  })
}

/**
 * @description 门店概况导出
 */
function getProAnaByShopExcel (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetProAnaByShop_Excel', {
    params: data
  })
}
/**
 * @description 获取支付金额构成信息
 */
function getPaymentAmountInfo (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetPaymentAmountInfo', {
    params: data
  })
}

/**
 * @description 店铺营业报表
 */
function getUserBusinessInfo (params) {
  // const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  // delete params.user_id
  // const data = {
  //   ...params,
  //   user_id: userId
  // }
  return request.get('/api/IntelligentAnalysis/GetUserBusinessInfo', {
    params
  })
}

/**
 * @description 导出店铺营业报表
 */
function getUserBusinessExcel (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetUserBusiness_Excel', {
    params: data
  })
}

/**
 * @description 获取商品进货统计信息
 */
function getProInStockStaInfo (params) {
  const userId = params.user_id ? params.user_id[params.user_id.length - 1] : ''
  delete params.user_id
  const data = {
    ...params,
    user_id: userId
  }
  return request.get('/api/IntelligentAnalysis/GetProInStockStaInfo', {
    params: data
  })
}

/**
 * @description 每日对账单
 */
function getDailyBillInfo (params) {
  return request.get('/api/IntelligentAnalysis/GetDailyBillInfo', {
    params
  })
}

/**
 * @description 获取交接班信息
 */
function getChangeShiftsInfo (params) {
  return request.get('/api/IntelligentAnalysis/GetChangeShiftsInfo', {
    params
  })
}

/**
 * @description 获取对账信息
 */
function getReconciliationInfo (params) {
  return request.get('/api/IntelligentAnalysis/GetReconciliationInfo', {
    params
  })
}

export {
  getProSaleStaInfo,
  proSaleStaExcel,
  getMemberSaleStaDetailInfo,
  getValueCardStaInfo,
  getFirstCategory,
  getCommonBranchStorelist,
  getUserBusinessInfo,
  getUserBusinessExcel,
  getProductAnalysisByShop,
  getProAnaByShopExcel,
  getPaymentAmountInfo,
  getProInStockStaInfo,
  getProductSalesRank,
  getDailyBillInfo,
  getShopBusAnalysis,
  getStoreMemberSaleCountInfo,
  getMemberSalesAnalysis,
  getChangeShiftsInfo,
  getReconciliationInfo
}
