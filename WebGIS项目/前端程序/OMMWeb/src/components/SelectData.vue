<template>
    <div style="float:left;padding:5px">
        <a-form layout="inline">
            <a-form-item>
                <a-input v-model:disabled="input1Disable" v-model:placeholder="input1PH" v-model:value="Subdata.input1"></a-input>
            </a-form-item>
            <a-form-item visible="false">
                <a-input v-model:disabled="input2Disable" v-model:placeholder="input2PH" v-model:value="Subdata.input2"></a-input>
            </a-form-item>
      <div>
        <a-radio-group v-model:value="Subdata.code">
          <a-radio-button value="0" @click="querykindclick(0)">按站点号</a-radio-button>
          <a-radio-button value="1" @click="querykindclick(1)">按经纬度</a-radio-button>
          <a-radio-button value="2" @click="querykindclick(2)">按金属类型</a-radio-button>
        </a-radio-group>
      </div>
      <a-select
      ref="select"
      v-model:value="Subdata.orderby"
      style="width: 60px"
      v-model:disabled="selecterDisable"
    >
      <a-select-option value="mn">锰</a-select-option>
      <a-select-option value="fe">铁</a-select-option>
      <a-select-option value="co" >钴</a-select-option>
      <a-select-option value="ni">镍</a-select-option>
      <a-select-option value="cu">铜</a-select-option>
      <a-select-option value="zn">锌</a-select-option>
      <a-select-option value="pb">铅</a-select-option>
      <a-select-option value="si">硅</a-select-option>
    </a-select>
      <a-form-item><a-button type="primary" style="position:relative;left:10px;" @click="SubmitData">
    <template #icon><SearchOutlined /></template>
    查询
  </a-button>
</a-form-item>
<a-form-item>
  <a-tooltip placement="right" title="按站点号查询：返回对应站点的信息；按经纬度查询：返回该点附近所有站点的信息；按金属查询：返回按所选金属的倒序排列的表">
<info-circle-outlined style="color: rgba(64,169,255)" />
        </a-tooltip>
</a-form-item>
    </a-form>
    </div>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { message } from 'ant-design-vue'
  import {SearchOutlined,InfoCircleOutlined} from '@ant-design/icons-vue';
  export default defineComponent({
    components:{
        SearchOutlined,
        InfoCircleOutlined
    },
    data(){
      return{
        Subdata:{
          code:'0',
          input1:'',
          input2:'',
          orderby:'mn'
        }
      }
    },
    methods:{
      SubmitData(){
        
           let _this = this;
           this.axios({
            headers:{
          'Authorization':"Bearer "+sessionStorage.getItem("token")
        },
            method: 'post',
                url: '/api/QueryMetal',
                data: _this.Subdata
           }).then(res=>{
                if(res.data.code==1){
                  message.success(res.data.message);
                  let resdata=res.data.data;
                  this.$emit("changeDataSource",resdata)
                }
                else if(res.data.code==2){
                  message.info(res.data.message)
                }
                else if(res.data.code==0){
                  message.error(res.data.message)
                }
           })
        },
        querykindclick(querykind: number){
            if (querykind==0){
                this.selecterDisable=true;
                this.input1Disable=false;
                this.input2Disable=true;
                this.input1PH ='在此输入要查询的站点号';
                this.input2PH ='';
                this.Subdata.input1=''
                this.Subdata.input2=''
            }
            else if(querykind==1){
                this.selecterDisable=true;
                this.input1Disable=false;
                this.input2Disable=false;
                this.input1PH ='在此输入经度';
                this.input2PH ='在此输入纬度';
                this.Subdata.input1=''
                this.Subdata.input2=''
            }
            else{
                this.selecterDisable=false;
                this.input1Disable=true;
                this.input2Disable=true;
                this.input1PH ='';
                this.input2PH ='';
                this.Subdata.input1=''
                this.Subdata.input2=''
            }
        }
    },
    setup() {
      const querykind = ref('0');
      const input1Disable = ref(false);
      const input2Disable = ref(true);
      const input1PH = ref<string>('在此输入要查询的站点号');
      const input2PH = ref<string>('');
      const metalKind=ref<string>('mn')
      const selecterDisable=ref(true)
      return {
        querykind,
        input1Disable,
        input2Disable,
        metalKind,
        selecterDisable,
        input1PH,
        input2PH
      };
    },
  });
  </script>