<script setup>
import {ref} from "vue";

const props = defineProps({
  tableHead: Array,
  tableData: Array,
  showMap: Function
})
const options = Array.from(Array(100), function (value, index) {
  return {value: index + 1924, label: index + 1924}
}).reverse()
const input = ref('')
const value = ref('')
const singleClick = (scope) => {
  props.showMap([scope.row.dataUrl])
}
</script>

<template>
  <div class="menu">
    <el-row>
      <el-col :md="3" :sm="5" :xs="16" class="tool">
        <el-input v-model="input" placeholder="搜索"/>
      </el-col>
      <el-col :md="3" :sm="5" :xs="8" class="tool">
        <el-select v-model="value" placeholder="筛选" size="default">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
      </el-col>
      <el-col :md="10" :sm="1" :xs="0"></el-col>
      <el-col :md="2" :sm="3" :xs="6" class="tool">
        <el-button type="primary">批量查看</el-button>
      </el-col>
      <el-col :md="2" :sm="3" :xs="6" class="tool">
        <el-button type="success">批量新增</el-button>
      </el-col>
      <el-col :md="2" :sm="3" :xs="6" class="tool">
        <el-button type="warning">批量下载</el-button>
      </el-col>
      <el-col :md="2" :sm="3" :xs="6" class="tool">
        <el-button type="danger">批量删除</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="props.tableData" style="width: 100%" class="self-table" ref="multipleTable" max-height="860">
        <el-table-column type="selection" width="55" fixed/>
        <el-table-column v-for="(item,index) in props.tableHead" :key="index" :prop="item.value" :label="item.label"/>
        <el-table-column fixed="right" align="center" label="操作" min-width="100">
          <template #default="scope">
            <el-row>
              <el-col :xl="8">
                <el-button type="primary" size="small" @click="singleClick(scope)">查看</el-button>
              </el-col>
              <el-col :xl="8">
                <el-button type="primary" size="small">编辑</el-button>
              </el-col>
              <el-col :xl="8">
                <el-button type="danger" size="small">删除</el-button>
              </el-col>

            </el-row>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  height: calc(91vmin - 3vmax);
  width: 100%;
  box-sizing: border-box;
  margin: .5vmax;
  background-color: #01847F;
  filter: drop-shadow(5px 5px 2px #274847);

  .tool {
    color: #fff;
    padding: 10px;
  }
}

.self-table {
  position: fixed;
  z-index: 10;
  //box-shadow: 4px 8px 10px 0 #272727;

  .self-table-column {
    background-color: #ffffff00;
  }
}

.el-table {
  --el-table-bg-color: #01847F;
  --el-bg-color: #01847F;
  --el-fill-color-blank: #ffffff22;
  --el-table-header-bg-color: #01847F;
  --el-table-header-text-color: #fff;
  //--el-table-border: 1px solid #00000000;
  --el-table-row-hover-bg-color: #11948F;
  --el-table-border-color: #00000000;
  --el-table-text-color: #fff;
}
</style>