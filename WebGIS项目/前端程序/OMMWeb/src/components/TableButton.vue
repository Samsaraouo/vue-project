<template>
<a-button type="primary" @click="showAddModal"><i aria-label="图标： plus" class="anticon anticon-plus"><svg viewBox="64 64 896 896" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></i>
添加
</a-button>
<a-modal v-model:visible="AddModalVisible" title="添加数据" @ok="AMhandleOk" okText="确定" cancelText="取消">
    <AddData />
    </a-modal>
    <a-button  style="position: relative;left:3px" danger @click="showDeleteModal">删除</a-button>
    <a-modal v-model:visible="DeleteModalVisible" title="删除数据" @ok="DhandleOk" okText="确定" cancelText="取消">
        <DeleteData />
    </a-modal>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AddData from './AddData.vue';
import DeleteData from './DeleteData.vue';
export default defineComponent({
    components: { 
        AddData,
        DeleteData
     },
    setup() {
        const AddModalVisible = ref(false);
        const DeleteModalVisible =ref(false);
        const showAddModal = () => {
            AddModalVisible.value = true;
        };
        const showDeleteModal = () => {
            DeleteModalVisible.value = true;
        };
        const AMhandleOk = e => {
            console.log(e);
            AddModalVisible.value = false;
        };
        const DhandleOk = e => {
            console.log(e);
            DeleteModalVisible.value = false;
        };
        return {
            AddModalVisible,
            showAddModal,
            AMhandleOk,
            DhandleOk,
            DeleteModalVisible,
            showDeleteModal
        };
    },
    
});
</script>

<style >

</style>