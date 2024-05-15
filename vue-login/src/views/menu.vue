<script setup>
import { Document, Location } from "@element-plus/icons-vue";
import bus from "vue3-eventbus";
const props = defineProps({
    titleName: String,
    items: Array
})
const output = (index, indexpath) => {
    console.log(indexpath[1]);
    bus.emit("menu", indexpath[1]);
}
</script>

<template>
    <div class="menu">
        <el-row>
            <el-col :span="24">
                <div class="title">
                    <p class="p"> {{ props.titleName }} </p>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-menu @select="output" default-active="1" class="el-menu-vertical-demo" background-color="#545c6400"
                text-color="#fff" :unique-opened="true" active-text-color="#ffd04b"
                style="max-height: 820px;overflow-y: auto;">
                <el-sub-menu v-for="(item, index) in props.items" :index="item.id" :key="index">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>{{ item.id }}</span>
                    </template>
                    <el-menu-item v-for="(itemc, index) in item.children" :index="item.id + itemc" :key="index">
                        <el-icon>
                            <Document />
                        </el-icon>
                        {{ itemc }}
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-row>
    </div>
</template>

<style scoped>
.menu {
    min-height: calc(91vmin - 3vmax);
    width: 100%;
    box-sizing: border-box;
    margin: .5vmax;
    background-color: #01847F;
    filter: drop-shadow(5px 5px 2px #274847);

    .title {
        background: linear-gradient(135deg, transparent 12px, #3a9393 0) left top, linear-gradient(-45deg, transparent 12px, #3a9393 0) right bottom;
        background-size: 50% 100%;
        background-repeat: no-repeat;
        filter: drop-shadow(5px 5px 1px #406B6A);
        text-align: center;
        height: 3.5vmin;
        color: white;
        margin: 1vmax;
        font: normal bold 1vmax arial, sans-serif;

        .p {
            padding: .4vmin 0 0 0;
            margin: 0;
            text-shadow: .2vmin .2vmin .1vmin #1e1d1d;
        }
    }

    .el-menu-vertical-demo {
        text-align: center;
        width: 100%;
    }

    ::-webkit-scrollbar {
        display: none;
    }
}
</style>