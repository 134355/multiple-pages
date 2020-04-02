<template>
  <div class="logistics">
    <el-form label-width="140px">
      <el-form-item label="自提模式：">
        <div class="pz min-flex min-flex-main-between">
          <span>开启自提模式后自提时间默认为营业时间</span>
          <el-switch v-model="inModel"></el-switch>
        </div>
      </el-form-item>
      <el-form-item label="配送模式：">
        <div class="pz min-flex min-flex-main-between">
          <span></span>
          <el-switch v-model="outModel"></el-switch>
        </div>
      </el-form-item>
      <div v-if="outModel">
        <el-form-item label="每单制作时间：">
          <span>平均</span>
          <el-input-number class="inp" v-model="ProductiveTimePer" size="mini" controls-position="right" :min="1"></el-input-number>
          <span>分钟</span>
        </el-form-item>
        <el-form-item label="配送范围：">
          <span>超过</span>
          <el-input-number class="inp" v-model="DiliverDistance" size="mini" controls-position="right" :min="1"></el-input-number>
          <span>公里，不提供配送服务</span>
        </el-form-item>
        <el-form-item label="配送平台对接：">
          <el-radio-group v-model="DeliverMode">
            <el-radio :label="0">自配送</el-radio>
            <el-radio :label="1">达达配送</el-radio>
          </el-radio-group>
          <div v-if="DeliverMode === 1">
            <el-input placeholder="请输入内容" class="inp1" v-model="SourceId">
              <template slot="prepend">
                <span class="sp">商户编号：</span>
              </template>
            </el-input>
            <el-input placeholder="请输入内容" class="inp1" v-model="ShopId">
              <template slot="prepend">
                <span class="sp">门店编号：</span>
              </template>
            </el-input>
            <el-input placeholder="请输入内容" class="inp1" v-model="CityName">
              <template slot="prepend">
                <span class="sp">城市名：</span>
              </template>
            </el-input>
            <el-input placeholder="请输入内容" class="inp1" v-model="CityCode">
              <template slot="prepend">
                <span class="sp">电话区号：</span>
              </template>
            </el-input>
          </div>
          <div>
            <span style="padding-right: 10px">还没有达达账户</span>
            <el-button type="text" @click="dialogVisible = true">前往快速申请</el-button>
            <span style="padding: 10px">|</span>
            <el-button type="text">参数填写提示</el-button>
          </div>
        </el-form-item>
        <el-form-item label="配送订单类型：">
          <el-radio-group v-model="radio">
            <el-radio :label="0">自营</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最长可预约：">
          <el-input-number class="inp" v-model="MaxDay4Book" size="mini" controls-position="right" :min="1"></el-input-number>
          <span>天</span>
        </el-form-item>
        <el-form-item label="线上订单：">
          <el-radio-group v-model="ReceiveOrderMode">
            <el-radio :label="0">自动接单</el-radio>
            <el-radio :label="1">手动接单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit">立即保存</el-button>
        </el-form-item>
      </div>
    </el-form>

    <el-dialog
      title="申请达达账户"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <div class="title">对接说明</div>
        <p>1.服务方是达达，订单自动传到达达骑手app,由达达骑手派送，具体收费标准，商户和达达协商为准，配送费都将从商户注册的达达账户里进行扣减</p>
        <p>2.通过此链接注册生成的达达账户初始密码会以短信形式发生给注册手机号</p>
        <p>3.连锁门店只需注册一个达达账号，切勿重复注册！</p>
        <div class="title">设置信息</div>
      </div>
      <el-form label-width="80px" label-position="left" size="mini">
        <el-form-item label="手机号码">
          <el-input style="width: 200px;" placeholder="请输入注册手机号码"></el-input>
        </el-form-item>
        <el-form-item label="企业全称">
          <el-input style="width: 200px;" placeholder="请输入企业全称"></el-input>
        </el-form-item>
        <el-form-item label="企业地址">
          <el-select v-model="value" placeholder="选择省份" style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="选择城市" style="width: 100px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input style="width: 200px;" placeholder="请输入具体地址"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input style="width: 200px;" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input style="width: 200px;" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input style="width: 200px;" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'Logistics',
  data () {
    return {
      radio: 0,
      value: '0',
      options: [],
      dialogVisible: false,
      // 配送方式，0：自配送，1：达达配送，2：蜂鸟配送，3：顺丰配送，4：美团配送
      DeliverMode: 0,
      // 电话区号
      CityCode: '',
      // 城市名
      CityName: '',
      // 门店编号
      ShopId: '',
      // 商户编号
      SourceId: '',
      // 配送范围
      DiliverDistance: 3,
      // 最长预约天数
      MaxDay4Book: 1,
      // 每单制作时间
      ProductiveTimePer: 30,
      // 接单模式，0：自动接单，1：手动接单
      ReceiveOrderMode: 0,
      // 自提模式
      inModel: false,
      // 配送模式
      outModel: false,
      jData: {}
    }
  },
  created () {
    this.aa()
    axios.get('http://192.168.1.220:97/api/TakeOutFood/GetUserModuleConfigDetail?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ODEzOTA5OSIsImlhdCI6MTU4NTUzODk0NSwianRpIjpmYWxzZSwiZGVjX2lzc2FsZXNjbGVyayI6ZmFsc2UsImRlY19zYWxlc2NsZXJrX2lkIjowfQ.Q-nr6X4kQhEYTAzkPybeyZDLYsfFmo2iDWG4aa7XZfA&code=ShopCateringWechatConfig')
      .then(res => {
        let data = res.data.values.sv_detail_value
        data = JSON.parse(data)
        this.jData = data
        this.ProductiveTimePer = data.TakeOutWayModel.OutModelConfig.ProductiveTimePer
        this.ReceiveOrderMode = data.TakeOutWayModel.OutModelConfig.ReceiveOrderMode
        this.DiliverDistance = data.TakeOutWayModel.OutModelConfig.DiliverDistance
        this.DeliverMode = data.TakeOutWayModel.OutModelConfig.DeliverMode
        this.MaxDay4Book = data.TakeOutWayModel.OutModelConfig.MaxDay4Book
        this.inModel = data.TakeOutWayModel.inModel
        this.outModel = data.TakeOutWayModel.outModel
        const d = JSON.parse(data.TakeOutWayModel.OutModelConfig.DeviverConfig)
        this.SourceId = d.SourceId
        this.ShopId = d.ShopId
        this.CityName = d.CityName
        this.CityCode = d.CityCode
      })
  },
  methods: {
    aa () {
      axios.get('http://192.168.1.69:2081/api/Wx/SuppurtCitys?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ODEzOTA5OSIsImlhdCI6MTU4NTUzODk0NSwianRpIjpmYWxzZSwiZGVjX2lzc2FsZXNjbGVyayI6ZmFsc2UsImRlY19zYWxlc2NsZXJrX2lkIjowfQ.Q-nr6X4kQhEYTAzkPybeyZDLYsfFmo2iDWG4aa7XZfA')
        .then(res => {
          console.log(res)
        })
    },
    submit () {
      this.jData.TakeOutWayModel.OutModelConfig.ProductiveTimePer = this.ProductiveTimePer
      this.jData.TakeOutWayModel.OutModelConfig.ReceiveOrderMode = this.ReceiveOrderMode
      this.jData.TakeOutWayModel.OutModelConfig.DiliverDistance = this.DiliverDistance
      this.jData.TakeOutWayModel.OutModelConfig.DeliverMode = this.DeliverMode
      this.jData.TakeOutWayModel.OutModelConfig.MaxDay4Book = this.MaxDay4Book
      // this.jData.TakeOutWayModel.OutModelConfig.DeviverConfig.SourceId = this.SourceId
      // this.jData.TakeOutWayModel.OutModelConfig.DeviverConfig.ShopId = this.ShopId
      // this.jData.TakeOutWayModel.OutModelConfig.DeviverConfig.CityName = this.CityName
      // this.jData.TakeOutWayModel.OutModelConfig.DeviverConfig.CityCode = this.CityCode
      this.jData.TakeOutWayModel.OutModelConfig.DeviverConfig = JSON.stringify({
        SourceId: this.SourceId,
        ShopId: this.ShopId,
        CityName: this.CityName,
        CityCode: this.CityCode
      })
      this.jData.TakeOutWayModel.inModel = this.inModel
      this.jData.TakeOutWayModel.outModel = this.outModel

      axios.post('http://192.168.1.220:97/api/TakeOutFood/SaveConfigdetailList?key=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1ODEzOTA5OSIsImlhdCI6MTU4NTUzODk0NSwianRpIjpmYWxzZSwiZGVjX2lzc2FsZXNjbGVyayI6ZmFsc2UsImRlY19zYWxlc2NsZXJrX2lkIjowfQ.Q-nr6X4kQhEYTAzkPybeyZDLYsfFmo2iDWG4aa7XZfA', {
        sv_detail_value: JSON.stringify(this.jData),
        sv_detail_is_enable: true,
        sv_user_configdetail_name: '微信点餐店铺信息配置',
        sv_remark: '微信点餐店铺信息配置',
        config_code: 'ShopCateringWechatConfig'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.logistics {
  padding: 10px;
  background: #ffffff;
  .pz {
    width: 500px;
  }
  .inp {
    margin: 0 6px;
    width: 100px;
  }
  .inp1 {
    margin-right: 10px;
    width: 300px;
  }
  .sp {
    position: relative;
    &::after {
      content: '*';
      position: absolute;
      left: -7px;
      top: 0;
      color: red;
    }
  }
  .title {
    position: relative;
    font-weight: 700;
    line-height: 2;
    &::after {
      content: '';
      position: absolute;
      top: 12px;
      left: -7px;
      width: 4px;
      height: 4px;
      border-radius: 2px;
      background: #000;
    }
  }
}
</style>
