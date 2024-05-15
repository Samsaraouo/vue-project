<template>
  <div id="table">
    <!-- 面包屑导航-->


    <!-- 卡片试图-->
    <el-card>
      <!-- 搜索和添加 -->
      <!-- gutter每列之间的间隔 槽宽 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入疫木id" v-model="inputValue" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="filterData">查询疫木</el-button>
        </el-col>
      </el-row>
      <!-- <el-table :data="userList" border stripe max-height="800" 
      v-el-table-infinite-scroll="getCompanyList"
        :infinite-scroll-distance="18"
        :infinite-scroll-disabled="disabledScroll"> -->
      <!-- type="index" 会自动排序 -->
      <el-table :data="filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
        <el-table-column type="index" label="索引" width="70"> </el-table-column>
        <el-table-column prop="id" label="疫木id"> </el-table-column>
        <el-table-column prop="linban" label="林班"> </el-table-column>
        <el-table-column prop="xiaoban" label="小班"> </el-table-column>
        <el-table-column prop="dilei_name" label="地类"> </el-table-column>
        <el-table-column prop="cunname" label="村名"></el-table-column>
        <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button @click="handleEdit(row)">编辑</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-dialog v-model="dialogVisible" title="编辑数据" class="centered-dialog" :append-to-body="true">
    <el-form :model="form">
      <!-- 在这里添加你需要编辑的字段 -->
      <el-form-item label="疫木id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="林班">
        <el-input v-model="form.linban"></el-input>
      </el-form-item>
      <el-form-item label="小班">
        <el-input v-model="form.xiaoban"></el-input>
      </el-form-item>
      <el-form-item label="地类">
        <el-input v-model="form.dilei_name"></el-input>
      </el-form-item>
      <el-form-item label="村名">
        <el-input v-model="form.cunname"></el-input>
      </el-form-item>
      <!-- ... -->
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleSave">保 存</el-button>
    </div>
  </el-dialog>
      <div id="pages">
        <el-pagination background @current-change="handleCurrentChange" :current-page="currentPage"
          :page-size="pageSize" layout="prev,pager,next" :total="length">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {get_data,update_data} from './table';
import { ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  data() {
  let pageSize = 13;
    return {
      currentPage: 1,  // 当前页码
      pageSize,  // 每页显示的行数
      // 疫木列表数据
      tableData: [],
      filteredData: [],
      dialogVisible: false,
      showComponent: ref(false),
      inputValue: ref(''),
      length: ref(0),
      form: {},
    };
  },
  created() {
    this.getYimuList();
  },
  methods: {
    handleEdit(row) {
      this.form = { ...row };
      this.dialogVisible = true;
    },
   async handleSave() {
      // 在这里发送请求到服务器，更新数据
      const res =await update_data(this.form);
      if (res=="SUCCESS") {
        // 更新成功，关闭对话框，并重新获取数据
        this.dialogVisible = false;
        await this.getYimuList();
        this.filterData();
        ElMessage.success("编辑成功!");
        
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    async getYimuList() {
      const res = await get_data();
      this.tableData = res;
      this.filteredData = res;
      this.length = this.filteredData.length / this.pageSize;
    },
    filterData() {
    if (this.inputValue) {
      this.filteredData = this.tableData.filter(item => item.id === this.inputValue);
    } else {
      ElMessage.error("查询失败，请输入疫木id");
      this.filteredData = this.tableData;
    }
  },
  },
};

</script>

<style>
#table {
  width: 100vw;
}

.centered-dialog .el-dialog__wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20vh;
  width: 15vw;
  z-index: 10;
}

.el-table {
  margin-top: 15px;
  font-size: 12px;
}

#pages {
  margin-left: auto;
  margin-right: auto;
}
</style>