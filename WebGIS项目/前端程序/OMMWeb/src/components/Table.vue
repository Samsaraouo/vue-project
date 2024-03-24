<template><a-layout>
  <a-layout-header class="TableTitle">
<SelectData @changeDataSource="changeDataSource"/>
    </a-layout-header>
   <a-layout-header  class="ButtonRow">
    <TableButton/>
    </a-layout-header>
  <a-layout-content style="background-color: #fff">
    <div class="tableContent">
  <a-table v-model:dataSource="dataSource" :columns="columns" />
</div>
</a-layout-content>
</a-layout>
</template>
<script>
import TableButton from './TableButton.vue';
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'
import SelectData from './SelectData.vue';
  export default defineComponent({
    props:['a'],
    components: {
      TableButton,
      SelectData
  },
    mounted(){

      this.getData();
    },
    methods:{
      changeDataSource(returnSource){
        this.dataSource=returnSource;
      },
      getData(){
        axios({
          headers:{
          'Authorization':"Bearer "+sessionStorage.getItem("token")
        },
          method: 'get',
          url: '/api/GetMI',
        }).then(Response=>{
          message.success(Response.data.message)
          this.dataSource=Response.data.data
          
        })
      }
    },
    data(){
      return{
      dataSource:[],
      }
    },
    setup() {
      return {
        columns: [
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '站点号',
            dataIndex: 'station_code',
            key: 'station_code',
          },
          {
            title: '站点经纬',
            dataIndex: 'longlatitude',
            key: 'longlatitude',
          },
          {
            title: '水深',
            dataIndex: 'water_depth',
            key: 'water_depth',
          },
          {
            title: '锰',
            dataIndex: 'mn',
            key: 'mn',
          },
          {
            title: '铁',
            dataIndex: 'fe',
            key: 'fe',
          },
          {
            title: '钴',
            dataIndex: 'co',
            key: 'co',
          },
          {
            title: '镍',
            dataIndex: 'ni',
            key: 'ni',
          },
          {
            title: '铜',
            dataIndex: 'cu',
            key: 'cu',
          },
          {
            title: '锌',
            dataIndex: 'zn',
            key: 'zn',
          },
          {
            title: '铅',
            dataIndex: 'pb',
            key: 'pb',
          },
          {
            title: '硅',
            dataIndex: 'si',
            key: 'si',
          },
        ],
      };
    },
  });
</script>
<style>
.TableTitle{
  background-color:#fff;
  padding: 10px 5px;
  text-align: center;
}
.ButtonRow{
  padding: 0px 10px;
  background-color:#fff;
  height: 36px;
  line-height: 30px;
}
.tableContent{
  padding: 0px 10px;
}
</style>