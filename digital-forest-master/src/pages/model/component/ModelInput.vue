<script setup>
import {ref} from "vue";

const form = ref({
  outputYearValue:"",
  outputMonthValue:"",
  outputMonthFromYear:"",
  outputMonthToYear:"",
  outputDailyValue:"",
  outputAnnualScreen:"",
  functionalTypesNum:"",
  headFile:"",
  maskGrid:"",
  precessCells:"",
})
</script>

<template>
  <div class="modelInput">
    <el-form ref="form" :model="form" label-position="top" class="model-input-form">
      <el-form-item label="Need output annual value into grid files?">
        <el-radio-group v-model="form.outputYearValue">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Need output monthly value into grid files?">
        <el-radio-group v-model="form.outputMonthValue">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;From Year:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="form.outputMonthFromYear"
                  style="width: 100px;"></el-input>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;To Year:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="form.outputMonthToYear" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="Need output daily value into grid files?">
        <el-radio-group v-model="form.outputDailyValue">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;From Year:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="form.outputMonthFromYear"
                  style="width: 100px;"></el-input>
        <span>&nbsp;&nbsp;&nbsp;&nbsp;To Year:&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-input v-model="form.outputMonthToYear" style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item label="Need output annual value at screen?">
        <el-radio-group v-model="form.outputAnnualScreen">
          <el-radio label="yes"></el-radio>
          <el-radio label="no"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Number of functional types:">
        <el-input v-model="form.functionalTypesNum"
                  style="width: 100px;"></el-input>
      </el-form-item>
      <el-form-item
          label="Input the head file (arcinfo format) for simulating regions:">
        <el-input v-model="form.headFile" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="Input the mask grid for the region:">
        <el-input v-model="form.maskGrid" style="width: 600px;"></el-input>
      </el-form-item>
      <el-form-item label="The cells you want to process:(Format Start ID End ID)">
        <el-input v-model="form.precessCells" style="width: 100px;"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
.modelInput{
  padding:1vmax;
  color:white;
  box-sizing: border-box;
  width: 97vw;
  margin: .5vmax;
  background-color: #01847F;
  filter: drop-shadow(5px 5px 2px #274847);
}
.el-form{
  --el-text-color-regular: white;
}
.el-radio{
  --el-radio-text-color: white;
}
</style>