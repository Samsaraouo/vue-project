<template>
  <div id="reload" @click="reload">
  <reload-outlined style="font-size: 18px; cursor: pointer;"/>
</div>
<div style="float:right;padding: 0%;">
  
  <a-dropdown>
    <div @click.prevent id="userindex">
      <a-avatar size="small">
    <template #icon><UserOutlined /></template>
  </a-avatar>
  <div style="float:right;padding: 0px 5px;" > 
    <a style="color:black;" @click.prevent>
      {{usernickname}}
    </a>
  </div>
  </div>
    <template #overlay>
      <a-menu>
        <a-menu-item><RouterLink to="/main/setting">
          <SettingOutlined /><div style="float: right;">设置</div>
        </RouterLink>
        </a-menu-item>
        <a-menu-item @click="logout()"><PoweroffOutlined />
<div style="float: right;">登出</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <!-- <a-avatar size="small">
    <template #icon><UserOutlined /></template>
  </a-avatar> -->
  <!-- <a-dropdown>
    <a style="color: black;" @click.prevent>
      {{username}}
      <DownOutlined />
    </a>
    <template #overlay>
      <a-menu>
        <a-menu-item><RouterLink to="/main/setting">
          <SettingOutlined /><div style="float: right;">设置</div>
        </RouterLink>
        </a-menu-item>
        <a-menu-item @click="logout()"><PoweroffOutlined />
<div style="float: right;">登出</div>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown> -->
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { SettingOutlined,UserOutlined,PoweroffOutlined,DownOutlined,ReloadOutlined} from '@ant-design/icons-vue';
import { message } from 'ant-design-vue'
export default defineComponent({
  components: {
    SettingOutlined,
    UserOutlined,
    PoweroffOutlined,
    DownOutlined,
    ReloadOutlined
  },
  methods:{
    reload(){
      this.$router.go(0)
    },
    logout(){
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      this.$router.push("/login")
      message.success("登出成功")
    }
  },
  setup() {
    const usernickname=sessionStorage.getItem("usernickname")
    return {
      usernickname,
    };
  },
});
</script>
<style>
#userindex{
  padding: 0px 5px;
  width:100%;
  background-color:rgb(255, 255, 255);
  cursor: pointer
}
#userindex:hover{
background-color:rgb(249, 249, 249);
}
#reload{
  padding: 0px 20px;
  background-color:rgb(255, 255, 255);
  float: left;
}

</style>